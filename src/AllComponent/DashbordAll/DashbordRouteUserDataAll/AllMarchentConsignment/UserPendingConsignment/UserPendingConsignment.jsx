import React from 'react';
import "./UserPendingConsignment.css"
import { Link } from 'react-router-dom';

const UserPendingConsignment = ({ ReviewUserData }) => {

    let { CodAmount, Invoice, StandardEmailUser, StandardParcelId, address, date, district, name, note, number, policeStation, status, weight, _id, DeliveryCharge
    } = ReviewUserData

    // console.log(ReturnedDelivered)

    return (
        <tr className="">
            <td>
                <p className="font-medium text-base text-gray-800">{name}</p>
            </td>
            <td>
                <p className="text-sm text-gray-600">{StandardParcelId}</p>
            </td>
            <td>
                <p className="text-sm font-semibold text-green-600">{CodAmount} ৳</p>
            </td>
            <td>
                <p className="text-sm text-blue-600">{DeliveryCharge} ৳</p>
            </td>
            <td>
                <p className="text-sm text-gray-500">{date}</p>
            </td>
            <td>
                <span
                    className={`badge badge-sm ${status === "Approved" ? "badge-success" : status === "Rejected" ? "badge-error" : "badge-warning"}`}
                >
                    {status}
                </span>
            </td>
            <td>
                <Link
                    to={`/dashboard/UserTemporeryInvoiceAllStandardData/${StandardParcelId}`}
                >
                    <button className="btn btn-sm btn-outline btn-primary">
                        View
                    </button>
                </Link>
            </td>
        </tr>
    );
};

export default UserPendingConsignment;