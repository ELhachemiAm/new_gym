import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
//   const { id, date } = props;
console.log('PROESSSS', props);
  return (
    <div className="container"  ref={ref}>
    <div className="row">
        <div className="col-12">
            <div className="card">
                <div className="card-body p-0">
                    <div className="row p-5">
                        <div className="col-md-6">
                            <img src="http://via.placeholder.com/400x90?text=logo" />
                        </div>
                        <div className="col-md-6 text-right">
                            <p className="font-weight-bold mb-1">N°: #{props.value.id}</p>
                            <p className="text-muted">Date:{props.value.date_creation}</p>
                        </div>
                        <div className="col-md-6">
                            <p className="font-weight-bold mb-4">Adhérant</p>
                            <p className="mb-1">Nom: {props.value.client_last_name}</p>
                            <p className="mb-1">ID: {props.value.client_id}</p>
                        </div>
                    </div>   
                    <div className="row p-5">
                        <div className="col-md-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="border-0 text-uppercase small font-weight-bold">Abonnement </th>
                                        <th className="border-0 text-uppercase small font-weight-bold">Séances</th>
                                        <th className="border-0 text-uppercase small font-weight-bold">Début</th>
                                        <th className="border-0 text-uppercase small font-weight-bold">Fin</th>
                                        <th className="border-0 text-uppercase small font-weight-bold">Montant</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{props.value.abonnement_name}</td>
                                        <td>{props.value.quantity}</td>
                                        <td>{props.value.start_abc}</td>
                                        <td>{props.value.end_abc}</td>
                                        <td>{props.value.amount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse bg-dark text-white p-4">
                        <div className="py-3 px-5 text-right">
                            <div className="mb-2">Total</div>
                            <div className="h2 font-weight-light">{props.value.amount}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="text-light mt-5 mb-5 text-center small">by : <a className="text-light" target="_blank" href="http://totoprayogo.com">totoprayogo.com</a></div>
</div>
  );
});


// export class ComponentToPrint extends React.PureComponent {
//     render() {
//       return (
//         <div className="container">
//     <div className="row">
//         <div className="col-12">
//             <div className="card">
//                 <div className="card-body p-0">
//                     <div className="row p-5">
//                         <div className="col-md-6">
//                             <img src="http://via.placeholder.com/400x90?text=logo" />
//                         </div>

//                         <div className="col-md-6 text-right">
//                             <p className="font-weight-bold mb-1">Invoice #550</p>
//                             <p className="text-muted">Due to: 4 Dec, 2019</p>
//                         </div>
//                     </div>

//                     <hr className="my-5" />

//                     <div className="row pb-5 p-5">
//                         <div className="col-md-6">
//                             <p className="font-weight-bold mb-4">Client Information</p>
//                             <p className="mb-1">John Doe, Mrs Emma Downson</p>
//                             <p>Acme Inc</p>
//                             <p className="mb-1">Berlin, Germany</p>
//                             <p className="mb-1">6781 45P</p>
//                         </div>

//                         <div className="col-md-6 text-right">
//                             <p className="font-weight-bold mb-4">Payment Details</p>
//                             <p className="mb-1"><span className="text-muted">VAT: </span> 1425782</p>
//                             <p className="mb-1"><span className="text-muted">VAT ID: </span> 10253642</p>
//                             <p className="mb-1"><span className="text-muted">Payment Type: </span> Root</p>
//                             <p className="mb-1"><span className="text-muted">Name: </span> John Doe</p>
//                         </div>
//                     </div>

//                     <div className="row p-5">
//                         <div className="col-md-12">
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th className="border-0 text-uppercase small font-weight-bold">ID</th>
//                                         <th className="border-0 text-uppercase small font-weight-bold">Item</th>
//                                         <th className="border-0 text-uppercase small font-weight-bold">Description</th>
//                                         <th className="border-0 text-uppercase small font-weight-bold">Quantity</th>
//                                         <th className="border-0 text-uppercase small font-weight-bold">Unit Cost</th>
//                                         <th className="border-0 text-uppercase small font-weight-bold">Total</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>1</td>
//                                         <td>Software</td>
//                                         <td>LTS Versions</td>
//                                         <td>21</td>
//                                         <td>$321</td>
//                                         <td>$3452</td>
//                                     </tr>
//                                     <tr>
//                                         <td>1</td>
//                                         <td>Software</td>
//                                         <td>Support</td>
//                                         <td>234</td>
//                                         <td>$6356</td>
//                                         <td>$23423</td>
//                                     </tr>
//                                     <tr>
//                                         <td>1</td>
//                                         <td>Software</td>
//                                         <td>Sofware Collection</td>
//                                         <td>4534</td>
//                                         <td>$354</td>
//                                         <td>$23434</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>

//                     <div className="d-flex flex-row-reverse bg-dark text-white p-4">
//                         <div className="py-3 px-5 text-right">
//                             <div className="mb-2">Grand Total</div>
//                             <div className="h2 font-weight-light">$234,234</div>
//                         </div>

//                         <div className="py-3 px-5 text-right">
//                             <div className="mb-2">Discount</div>
//                             <div className="h2 font-weight-light">10%</div>
//                         </div>

//                         <div className="py-3 px-5 text-right">
//                             <div className="mb-2">Sub - Total amount</div>
//                             <div className="h2 font-weight-light">$32,432</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
    
//     <div className="text-light mt-5 mb-5 text-center small">by : <a className="text-light" target="_blank" href="http://totoprayogo.com">totoprayogo.com</a></div>

// </div>
//       );
//     }
//   }