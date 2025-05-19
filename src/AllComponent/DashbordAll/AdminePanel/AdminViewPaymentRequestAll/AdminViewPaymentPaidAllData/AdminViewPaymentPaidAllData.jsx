import React from 'react';
import "./AdminViewPaymentPaidAllData.css"

const AdminViewPaymentPaidAllData = ({ PaidAllData, refetch }) => {

    let { _id, ReqPaymentID, ReqPay, TotalCodAmount, TotalDeliveryCharge, subTotal, subTotalOnePercentCharge, totalBalanceUser, name, LastName, photo, userId, Address, BusinessName, Phone, ReqUserEmail, userStatus, UserPaymentReqDate, Payment } = PaidAllData

    return (
        <div className='AdminViewPaymentPaidAllData'>

            <div className='ViewPaymentPaidAllData'>

                <div className="PaidAllData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{ReqPaymentID}</h3>
                        <h3>Amount: {totalBalanceUser}</h3>

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

export default AdminViewPaymentPaidAllData;