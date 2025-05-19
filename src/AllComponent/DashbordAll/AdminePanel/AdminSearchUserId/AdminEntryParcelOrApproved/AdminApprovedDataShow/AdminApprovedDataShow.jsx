import React from 'react';
import "./AdminApprovedDataShow.css"

const AdminApprovedDataShow = ({ PendingDataSee }) => {

    let { CodAmount, Invoice, StandardEmailUser, StandardParcelId, address, date, district, name, note, number, policeStation, status, weight, _id } = PendingDataSee

console.log(PendingDataSee)
    return (
        <tr className="borderTr">

            <th className="border">
                <h3 className="">{date}</h3>
            </th>
            <th className="border">
                <h3 className="">{StandardParcelId}</h3>
            </th>
            <th className="border">
                <h3 className="">{name}</h3>
            </th>
            <th className="border">
                <h3 className="">Not Assigned</h3>
            </th>
            <th className="border">
                <h3 className="">৳ 6600</h3>
            </th>
            <th className="border">
                <h3 className="">৳ {CodAmount}</h3>
            </th>
            <th className="border">
                <button className="View">View</button>
            </th>
            <th className="border">
                <button className="Print">Print</button>
            </th>

        </tr>
    );
};

export default AdminApprovedDataShow;