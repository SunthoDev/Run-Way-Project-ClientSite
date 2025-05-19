import React from 'react';
import "./AdminPaymentRequesrWork.css"
import { Link } from 'react-router-dom';

const AdminPaymentRequesrWork = ({PaymentAll}) => {


    let {  _id,ReqPaymentID, ReqPay, TotalCodAmount, TotalDeliveryCharge, subTotal, subTotalOnePercentCharge, totalBalanceUser, name, LastName, photo, userId, Address, BusinessName, Phone, ReqUserEmail, userStatus, UserPaymentReqDate, Payment } = PaymentAll

    // console.log(PaymentAll)

    return (
        <div className='AdminPaymentRequestWork'>

            <div className='PaymentRequestWork'>

                <div className="RequestWork grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{ReqPaymentID}</h3>
                        <h3>Amount: {totalBalanceUser}</h3>
                        <button className='PaidNow'>{Payment}</button>

                    </div>

                    <div className="Tow">
                        <h3>{name} {LastName}</h3>
                        <h3>{Address}</h3>
                        <h3>{UserPaymentReqDate}</h3>
                    </div>

                    <div className="Three">
                        <h3>{Phone}</h3>
                        <h3>{ReqUserEmail}</h3>
                        <Link to={`/dashboard/AdminDashboard/AdminPaymentRequestDetailsAll/${_id}`} className='Pending ml-3'>View</Link>

                    </div>


                </div>


            </div>

        </div>
    );
};

export default AdminPaymentRequesrWork;