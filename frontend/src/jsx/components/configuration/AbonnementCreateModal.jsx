import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Table } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import {notifySuccess, notifyError} from '../Alert'

// import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
import useForm from 'react-hook-form';
import createPalette from "@material-ui/core/styles/createPalette";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

function refreshPage() {
  window.location.reload(false);
}

const AbonnementCreateModal = ({show, onShowShange}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
    const activitiesEND = `${process.env.REACT_APP_API_URL}/rest-api/salle-activite/`
    const abonnementCreateEND = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/create`
    // const creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/rest-api/abonnement/`
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    // const [numberOfDays, setNumberOfDays] = useState('')
    const [seancesQuantity, setSeancesQuantity] = useState('')
    const [activity, setActivity] = useState([])
    const [selectedActivities, setSelectedActivities] = useState([])
    const [duree, setDuree] = useState('')
    const [displayLength, setDisplayLength] = useState(true)
    const [length, setLength] = useState("Nombre d'heures")
    const [typeOfValue, setTypeOfValue] = useState("VO")
    // const [numOfWeek, setNumOfWeek] = useState(false)
    
    const [alertSuccess, setAlertSuccess] = useState(false)
    const [helpText, setHelpText] = useState("Abonnement limité par un nombre d'heures")
    const [alertError, setAlertError] = useState(false)
    const activities = useGetAPI(activitiesEND)
    
  const  DureeAb = [
    {mois :'1 Jour', jours : 1},
    {mois :'15 Jour', jours : 15},
    {mois :'45 Jour', jours : 45},
    {mois :'1 mois', jours : 30},
    {mois :'2 mois', jours : 60},
    {mois :'3 mois', jours : 90},
    {mois :'4 mois', jours : 120},
    {mois :'6 mois', jours : 180},
    {mois :'12 mois', jours : 360},
  ]
    const getSelectedActivities = () => {
        console.log(
            'les activitesss', activity
        );
      for (let i = 0; i < activity.length; i++) {
          selectedActivities.push(activity[i]['id'])
      }
    }
    const handleTypeOfValueChange = (event) => {
        setTypeOfValue(event.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        for (let i = 0; i < activity.length; i++) {
            selectedActivities.push(activity[i]['id'])
        }
        const abonnementFormData = {
            name              : name,
            price             : price,
            seances_quantity  : Number(seancesQuantity),
            salles          : selectedActivities,
            length    : duree,
            type_of : typeOfValue

        }
        await axios.post(abonnementCreateEND, abonnementFormData)
        .then( res => {
            notifySuccess('Abonnement creer avec succés')
            handleShow()
        }).catch(err => {
            notifyError("Erreur lors de la creation de l'abonnement")
        })
      }

return ( 
    <Modal  className="fade bd-example-modal-lg" size="xl"onHide={handleShow} show={show}>
    <Modal.Header>
      <Modal.Title className='text-black'>Creer un nouvel abonnement </Modal.Title>
      <Button variant="" className="close" onClick={handleShow} > <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleSubmit}>
            <div className="form-group row">
            <label className="col-sm-3 col-form-label">Type d'abonnement </label>
              <div className="col-sm-9">
              <small className="m-0 text-success" htmlFor="">{helpText}</small>

              <RadioGroup row aria-label="position" name="position" value={typeOfValue} onChange={handleTypeOfValueChange}>
                <FormControlLabel
                    value="VO"
                    control={<Radio color="primary" />}
                    label="Volume Horaire"
                    labelPlacement="start"
                    selected={true}
                    onClick={e => {
                        setLength("Nombre d'heures")
                        // setTypeOfValue(e => )
                        setDisplayLength(true)
                        setHelpText("Abonnement limité par un nombre d'heures")
                    }}
                />
                <FormControlLabel
                    value="SF"
                    control={<Radio color="primary" />}
                    label="Seances Fix"
                    labelPlacement="start"
                    onClick={e => {
                        setLength("Nombre de séances")
                        setDisplayLength(true)
                        setHelpText("Abonnement limité par un nombre de seance et des horaires fix")
                    }}
                />
                <FormControlLabel
                    value="SL"
                    control={<Radio color="primary" />}
                    label="Seances Libre"
                    labelPlacement="start"
                    onClick={e => {
                        setLength("Nombre de séances")
                        setDisplayLength(true)
                        setHelpText("Abonnement limité par un nombre de seance avec des horaires fléxible")
                    }}
                />
                  <FormControlLabel
                    value="AL"
                    control={<Radio color="primary" />}
                    label="Accés Libre"
                    labelPlacement="start"
                    onClick={e => {
                        setDisplayLength(false)
                        setHelpText("Abonnement limité uniquement par sa date")
                    }}
                />
              </RadioGroup>
              </div>

          </div>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nom </label>
              <div className="col-sm-9">
                  <input type="text" value={name} className="form-control" placeholder="..." onChange={e => setName(e.target.value)}/>
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Prix </label>
              <div className="col-sm-9">
                  <input type="number"value={price} className="form-control" placeholder="..." onChange={e => setPrice(e.target.value)}/>
              </div>
          </div>
            
            <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Durée </label>
                <div className="form-group col-sm-9">
                    <Autocomplete
                        onChange={(event, value) => 
                        {
                            try {
                            setDuree(value.jours)
                        } catch (error) {
                            setDuree('')
                        }}
                        }
                        options={DureeAb}
                        getOptionLabel={(option) =>  option['mois']}
                        renderInput={(params) => <TextField {...params} label="Mois" variant="outlined" />}
                        />
                </div>
            </div>
            {
                displayLength &&
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">{length} </label>
                    <div className="col-sm-9">
                        <input type="number"value={seancesQuantity} className="form-control" placeholder="..." onChange={e => setSeancesQuantity(e.target.value)}/>
                    </div>
                </div>
            }
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Salles </label>
              <div className="col-sm-9">
                  <Autocomplete
                      multiple
                      onChange={((event, value) =>  setActivity(value))} 
                      options={activities}
                      id="size-small-standard-multi"
                      getOptionLabel={(option) =>  ( option['name'])}
                      renderInput={(params) =>
                  (<TextField {...params} name="salles" label="Salles" variant="outlined" fullWidth />)}
                  />
              </div>
          </div>

          <div className="form-group row">
              <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                      Valider
                  </button>
              </div>
          </div>
      </form>
     </Modal.Body>

    </Modal>
)

}
export default AbonnementCreateModal;