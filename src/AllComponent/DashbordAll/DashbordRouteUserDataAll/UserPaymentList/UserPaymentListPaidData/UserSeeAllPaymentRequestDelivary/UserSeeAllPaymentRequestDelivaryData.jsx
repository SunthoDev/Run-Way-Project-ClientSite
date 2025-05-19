import React from 'react';
import "./UserSeeAllPaymentRequestDelivaryData.css"

const UserSeeAllPaymentRequestDelivaryData = ({PaymentStandardDataAll}) => {
        // console.log(PaymentStandardDataAll)
        let { _id, ApprovedName, CodAmount, DeliveryCharge, StandardEmailUser ,date,StandardParcelId,name,weight,status} = PaymentStandardDataAll
    return (
        <div className='UserSeePaymentRequestAllPaymentDataShow'>

            <div className='PaymentRequestAllPaymentDataShow grid  grid-cols-1 md:grid-cols-2 gap-1'>

                <div className="grid grid-cols-3 gap-2">
                    <h3>{date}</h3>
                    <h3>ID: #{StandardParcelId}</h3>
                    <h3>{name}</h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <h3>COD Amount: {CodAmount}</h3>
                    <h3>Charge: {DeliveryCharge}</h3>
                    <button>{status}</button>
                </div>

            </div>
        </div>
    );
};

export default UserSeeAllPaymentRequestDelivaryData;