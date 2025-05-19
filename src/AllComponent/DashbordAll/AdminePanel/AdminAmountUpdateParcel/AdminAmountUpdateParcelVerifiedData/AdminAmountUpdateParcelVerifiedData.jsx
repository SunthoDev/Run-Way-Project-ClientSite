import React from 'react';
import "./AdminAmountUpdateParcelVerifiedData.css"
import { Link } from 'react-router-dom';

const AdminAmountUpdateParcelVerifiedData = ({ AmountVerifiedData, refetch }) => {

    let { CodAmount, Invoice, StandardEmailUser, StandardParcelId, address, date, district, name, note, number, policeStation, status, weight, _id, DeliveryCharge } = AmountVerifiedData

    return (
        <tr className='VerifiedData'>
            <td><h3>{StandardParcelId}</h3></td>
            <td><h3>{name}</h3></td>
            <td><h3>{address}</h3></td>
            <td><h3>{status}</h3></td>
            <td><h3>{number}</h3></td>
            <td><h3>{CodAmount}</h3></td>
            <td><h3>{DeliveryCharge}</h3></td>
            <td><Link to={`/dashboard/AdminDashboard/UserTemporeryInvoiceAllStandardData/${StandardParcelId}`}  className='View'>View</Link></td>
        </tr>
    );
};

export default AdminAmountUpdateParcelVerifiedData;