import React from 'react';
import "./UserPaymentListUnPaidData.css"

const UserPaymentListUnPaidData = ({ UnPaidPaymentData }) => {
    // console.log(UnPaidPaymentData)

    let { _id, ReqPaymentID, ReqPay, TotalCodAmount, TotalDeliveryCharge, subTotal, subTotalOnePercentCharge, totalBalanceUser, name, LastName, photo, userId, Address, BusinessName, Phone, ReqUserEmail, userStatus, UserPaymentReqDate, Payment } = UnPaidPaymentData

    return (
        <div className='UserPaymentListUnPaidData'>

            <div className='PaymentListUnPaidData'>

                <div className="UnPaidAllData grid grid-cols-1 md:grid-cols-3 gap-4 items-center">

                    <div className="One">
                        <h3>ID: #{ReqPaymentID}</h3>
                        <h3>Amount: {totalBalanceUser}</h3>
                        {/* <button onClick={() => handlePaymentRequestPaid(_id)} className='PaidNow'>Paid Now</button> */}

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

export default UserPaymentListUnPaidData;