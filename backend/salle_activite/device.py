# coding=utf-8
import sys
import os
import time
from ctypes import *
from NetSDK.NetSDK import NetClient
from NetSDK.SDK_Callback import *
from NetSDK.SDK_Enum import *
from NetSDK.SDK_Struct import *
from client.models import Client

file = "c:/log.log"
@CB_FUNCTYPE(c_int, c_char_p, c_uint, C_LDWORD)
def SDKLogCallBack(szLogBuffer, nLogSize, dwUser):
    # try:
    #     with open(file, 'a') as f:
    #         f.write(szLogBuffer.decode())
    # except Exception as e:
    #     print(e)
    return 1

class AccessControl:
    def __init__(self):

        self.loginID = C_LLONG()
        self.playID = C_LLONG()
        self.freePort = c_int()
        self.m_DisConnectCallBack = fDisConnect(self.DisConnectCallBack)
        self.m_ReConnectCallBack = fHaveReConnect(self.ReConnectCallBack)
        self.m_MessCallBackEx1 = fMessCallBackEx1(self.messCallBackEx1)
        self.m_AnalyzerDataCallBack = fAnalyzerDataCallBack(self.AnalyzerDataCallBack)
        self.sdk = NetClient()
        self.sdk.InitEx(self.m_DisConnectCallBack)
        self.sdk.SetAutoReconnect(self.m_ReConnectCallBack)
                        
        self.ip = ''
        self.port = 0
        self.username = ''
        self.password = ''
        self.operatetype = 0
        self.findHandle = 0
        self.recordNo = 0
        self.alarmEvent = 0
        self.lAnalyzerHandle = C_LLONG()
       
    def get_login_info(self, ip, port, username, password):
        self.ip         = ip
        self.port       = port
        self.username   = username
        self.password   = password

    def login(self):
        if not self.loginID:
            stuInParam = NET_IN_LOGIN_WITH_HIGHLEVEL_SECURITY()
            stuInParam.dwSize = sizeof(NET_IN_LOGIN_WITH_HIGHLEVEL_SECURITY)
            stuInParam.szIP = self.ip.encode()
            stuInParam.nPort = self.port
            stuInParam.szUserName = self.username.encode()
            stuInParam.szPassword = self.password.encode()
            stuInParam.emSpecCap = EM_LOGIN_SPAC_CAP_TYPE.TCP
            stuInParam.pCapParam = None

            stuOutParam = NET_OUT_LOGIN_WITH_HIGHLEVEL_SECURITY()
            stuOutParam.dwSize = sizeof(NET_OUT_LOGIN_WITH_HIGHLEVEL_SECURITY)

            self.loginID, device_info, error_msg = self.sdk.LoginWithHighLevelSecurity(stuInParam, stuOutParam)
            if self.loginID != 0:
                print("Login succeed. Channel num:" + str(device_info.nChanNum))
                return True
            else:
                print("Login failed. " + error_msg)
                return False

    def logout(self):
        if self.loginID:
            if self.playID:
                self.sdk.StopRealPlayEx(self.playID)
                self.playID = 0
            if self.alarmEvent:
                self.sdk.StopListen(self.loginID)
                self.alarmEvent = 0
            if self.lAnalyzerHandle:
                self.sdk.StopLoadPic(self.lAnalyzerHandle)
                self.lAnalyzerHandle = 0
            self.sdk.Logout(self.loginID)
            self.loginID = 0
        print("Logout succeed")

    def DisConnectCallBack(self, lLoginID, pchDVRIP, nDVRPort, dwUser):
        print("Device-OffLine")

    def ReConnectCallBack(self, lLoginID, pchDVRIP, nDVRPort, dwUser):
        print("Device-OnLine")

    def AnalyzerDataCallBack(self, lAnalyzerHandle, dwAlarmType, pAlarmInfo, pBuffer, dwBufSize, dwUser, nSequence, reserved):
        if self.lAnalyzerHandle == lAnalyzerHandle:
            print("AnalyzerDataCallBack!! lAnalyzerHandle:%s" % lAnalyzerHandle)
            if dwAlarmType == EM_EVENT_IVS_TYPE.ACCESS_CTL:
                print("ACCESS_CTL callback, dwBufSize:%d " % dwBufSize)
                # data handle
                pic_buf = cast(pBuffer, POINTER(c_ubyte * dwBufSize)).contents
                with open('./picture.jpg', 'wb+') as f:
                    f.write(pic_buf)

    def card_infos(self, card_n, door_ip):
        dictio = {'card' : card_n, 'door' : door_ip}
        print("dictioooo",dictio)
        has_perm = False
        # if card_n:
        card = card_n.decode("utf-8")
        print(' la carte est ', card)
        print(' la carte type ', type(card))
        client  = Client.objects.get(hex_card=card)
        try:

            if client :
                has_perm = client.has_permission(door_ip)
        except:
            print('client doesnt exist or doesnt have permission to get in')
            return has_perm
        print(' la has_perm has_perm>>>>> ', has_perm)
        return has_perm
            # if has_perm :
            #     return True
            # else:  
            #     return False
   
            # self.open_door()
    #check from db if this card has access 
            # self.get_login_info(ip='192.168.1.2', port=37777, username='admin', password='123456')
            # login_result = self.login()
            # if login_result:
            #     print(' yes')
      
            #     self.open_door()
            # else:
            #     print('NOOOO')





    def messCallBackEx1(self, lCommand, lLoginID, pBuf, dwBufLen, pchDVRIP, nDVRPort, bAlarmAckFlag, nEventID, dwUser):
        # print('rani SELF lLoginID' , self.loginID)
        # print('rani lLoginID' , lLoginID)
        if (lLoginID != self.loginID):
            print('le code et la cl?? sont different')
            return

            # return
        if (lCommand == SDK_ALARM_TYPE.ALARM_ACCESS_CTL_EVENT):
            print("ALARM_ACCESS_CTL_EVENT")  # ????????????; Access control event
            alarm_info = cast(pBuf, POINTER(NET_A_ALARM_ACCESS_CTL_EVENT_INFO)).contents
            card_n = alarm_info.szCardNo
            door = self.ip
            # print(' the door one door', door)
            # print(' the door one nDoor', alarm_info.nPort)
            card_infos = self.card_infos(card_n,door)
            if card_infos : 
                self.open_door()
                # self.logout()
                # self.login()
                # self.alarm_listen()
            print('card_infos => ', card_infos)

    def alarm_listen(self):
        if self.alarmEvent == 0:
            # ???????????????????????? set alarm callback
            self.sdk.SetDVRMessCallBackEx1(self.m_MessCallBackEx1, 0)

            result = self.sdk.StartListenEx(self.loginID)
            if result:
                print("StartListenEx operate succeed.")
                self.alarmEvent = 1
            else:
                print("????????????????????????(StartListenEx operate fail). " + self.sdk.GetLastErrorMessage())
                return False
        else:
            print("StartListenEx operate already successful.")
        return True

    def access_operate(self):
        stuInParam = NET_CTRL_ACCESS_OPEN()
        stuInParam.dwSize = sizeof(NET_CTRL_ACCESS_OPEN)
        stuInParam.nChannelID = 0 # channel
        stuInParam.emOpenDoorType = EM_OPEN_DOOR_TYPE.EM_OPEN_DOOR_TYPE_REMOTE
        stuInParam.emOpenDoorDirection = EM_OPEN_DOOR_DIRECTION.EM_OPEN_DOOR_DIRECTION_FROM_ENTER
        print(' access_operate')
        result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_OPEN, stuInParam, c_char(), 5000)
        # result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_OPEN, stuInParam, c_char(), 5000)
        # if result:
        #     print("Open the door succeed.")
        #     stuInParam = NET_CTRL_ACCESS_CLOSE()
        #     stuInParam.dwSize = sizeof(NET_CTRL_ACCESS_CLOSE)
        #     stuInParam.nChannelID = 0
        #     result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_CLOSE, stuInParam, c_char(), 5000)
        #     # result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_CLOSE, stuInParam, c_char(), 5000)
        #     if result:
        #         print("Close the door succeed.")
        #     else:
        #         print("Close the door fail. " + self.sdk.GetLastErrorMessage())
        #         return False
        # else:
        #     print("Open the door fail. " + self.sdk.GetLastErrorMessage())
        #     return False
        return True

    def open_door(self):
        print(' open_door')
        stuInParam = NET_CTRL_ACCESS_OPEN()
        stuInParam.dwSize = sizeof(NET_CTRL_ACCESS_OPEN)
        stuInParam.nChannelID = 0 # channel
        stuInParam.emOpenDoorType = EM_OPEN_DOOR_TYPE.EM_OPEN_DOOR_TYPE_REMOTE
        stuInParam.emOpenDoorDirection = EM_OPEN_DOOR_DIRECTION.EM_OPEN_DOOR_DIRECTION_FROM_ENTER
        result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_OPEN, stuInParam, c_char(), 5000)

                # result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_OPEN, stuInParam, c_char(), 5000)
        # if result:
        #     print("Open the door succeed.")
        #     stuInParam = NET_CTRL_ACCESS_CLOSE()
        #     stuInParam.dwSize = sizeof(NET_CTRL_ACCESS_CLOSE)
        #     stuInParam.nChannelID = 0
        #     result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_CLOSE, stuInParam, c_char(), 5000)
        #     # result = self.sdk.ControlDeviceEx(self.loginID, CtrlType.ACCESS_CLOSE, stuInParam, c_char(), 5000)
        #     if result:
        #         print("Close the door succeed.")
        #     else:
        #         print("Close the door fail. " + self.sdk.GetLastErrorMessage())
        #         return False
        # else:
        #     print("Open the door fail. " + self.sdk.GetLastErrorMessage())
        return True
        