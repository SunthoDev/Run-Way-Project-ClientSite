import React from 'react';
import "./AdminConsignmentApprovedPendingData.css"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AdminConsignmentApprovedPendingData = ({ ConsignmentApprovedPending ,refetch}) => {

    // console.log(ConsignmentApprovedPending)

    let { CodAmount, Invoice, StandardEmailUser, StandardParcelId, address, date, district, name, note, number, policeStation, status, weight, _id,DeliveryCharge } = ConsignmentApprovedPending

    let HandleAdminBackPendingData=(id)=>{
        // console.log(id)
        fetch(`http://localhost:5000/AdminConsignmentApprovedPendingDataBackPending/${id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Back Pending Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })
    }





    return (
        <Link to={`/dashboard/AdminDashboard/UserTemporeryInvoiceAllStandardData/${StandardParcelId}`} className='AdminConsignmentApprovedPendingData'>

            <div className='ConsignmentApprovedPendingData'>

                <div className="ConsignmentData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{StandardParcelId}</h3>
                        <h3>{date}</h3>
                        <button onClick={()=>HandleAdminBackPendingData(_id)} className='BackPending'>Back Pending</button>
                        
                    </div>
                    <div className="Tow">
                        <h3>{name}</h3>
                        <h3>{address}</h3>
                        <h3>{number}</h3>
                        <button className='NotAssigned'>Not Assigned</button>

                    </div>
                    <div className="Three">
                        <h3>Cod Amount: {CodAmount}</h3>
                        <h3>Charge: {DeliveryCharge}</h3>
                        <button className='Pending'>{status}</button>
                        <br />
                        <div className="">
                            <button className='Unassigned'>Unassigned</button>
                            {/* <button className='Zero'>0</button> */}
                        </div>
                        {/* <button className='Zero'>0</button> */}

                    </div>


                </div>


            </div>
        </Link>
    );
};

export default AdminConsignmentApprovedPendingData;