import React from 'react';
import "./AdminAmountUpdateParcelUnverifiedData.css"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AdminAmountUpdateParcelUnverifiedData = ({AmountUnverifiedData,refetch}) => {

    let { CodAmount, Invoice, StandardEmailUser, StandardParcelId, address, date, district, name, note, number, policeStation, status, weight, _id ,DeliveryCharge} = AmountUnverifiedData


    let handleAmountUpdateVerified = (id) => {
        // console.log(id)

        fetch(`https://server.trustereocourier.com.bd/AdminAmountChangeDataVerified/${_id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Parcel Approved Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })



    }

    return (
        <Link to={`/dashboard/AdminDashboard/UserTemporeryInvoiceAllStandardData/${StandardParcelId}`} className='AdminAmountUpdateParcelUnverifiedData'>

            <div className='AmountUpdateParcelUnverifiedData'>

                <div className="UpdateParcelUnverifiedData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{StandardParcelId}</h3>
                        <h3>{date}</h3>
                        <h3>{StandardEmailUser}</h3>
                        <button onClick={() => handleAmountUpdateVerified(_id)} className='Verified'>Verified</button>
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

export default AdminAmountUpdateParcelUnverifiedData;