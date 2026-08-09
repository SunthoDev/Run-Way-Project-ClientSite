import React from 'react';
import "./CurrentBalanceDetailsAllData.css"

const CurrentBalanceDetailsAllData = ({ AmountPaymentDataAll }) => {

    let {_id,AmountChangeAdminStatus,AmountChangeDate,ApprovedName,ApprovedOffice,CodAmount,DeliveryCharge,Invoice,Payment,StandardEmailUser,StandardParcelId,address,date,district,name,note,number,policeStation,status,weight,ApprovedDate }=AmountPaymentDataAll
    // console.log(AmountPaymentDataAll)

    return (
        <tr className='CurrentBalanceDetailsAllData'>
            <th>
                <h4>{date}</h4>
            </th>
            <th>
                <h4>{StandardParcelId}</h4>
            </th>
            <th>
                <h4>{weight}</h4>
            </th>
            <th>
                <h4>{name}</h4>
            </th>
            <th>
                <h4>{CodAmount}</h4>
            </th>
            <th>
                <h4>{DeliveryCharge}</h4>
            </th>
            <th>
                <h4 className='status'>{status}</h4>
            </th>

        </tr>
    );
};

export default CurrentBalanceDetailsAllData;