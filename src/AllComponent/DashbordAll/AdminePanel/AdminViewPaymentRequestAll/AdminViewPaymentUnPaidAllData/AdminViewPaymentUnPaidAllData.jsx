import React from 'react';
import "./AdminViewPaymentUnPaidAllData.css"
import Swal from 'sweetalert2';

const AdminViewPaymentUnPaidAllData = ({ UnPaidAllData, refetch }) => {

    let { _id, ReqPaymentID, ReqPay, TotalCodAmount, TotalDeliveryCharge, subTotal, subTotalOnePercentCharge, totalBalanceUser, name, LastName, photo, userId, Address, BusinessName, Phone, ReqUserEmail, userStatus, UserPaymentReqDate, Payment } = UnPaidAllData

    let handlePaymentRequestPaid = (id) => {
        // console.log(id)

        fetch(`http://localhost:5000/AdminPaidUserPaymentRequestData/${_id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'PAyment Request Paid Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                refetch()
            })

    }


    return (
        <div className='AdminViewPaymentUnPaidAllData'>

            <div className='ViewPaymentUnPaidAllData'>

                <div className="UnPaidAllData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{ReqPaymentID}</h3>
                        <h3>Amount: {totalBalanceUser}</h3>
                        <button onClick={()=>handlePaymentRequestPaid(_id)} className='PaidNow'>Paid Now</button>

                    </div>

                    <div className="Tow">
                        <h3>{name} {LastName}</h3>
                        <h3>{Address}</h3>
                        <h3>{UserPaymentReqDate}</h3>
                    </div>

                    <div className="Three">
                        <h3>{Phone}</h3>
                        <h3>{ReqUserEmail}</h3>
                        <button className='Pending'>{Payment}</button>
                        <button className='Pending ml-3'>{ReqPay}</button>

                    </div>


                </div>


            </div>
        </div>
    );
};

export default AdminViewPaymentUnPaidAllData;