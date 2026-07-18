import React from 'react';
import "./UserPendingConsignment.css"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UserPendingConsignment = ({ ReviewUserData, refetch }) => {

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
                    to={`/dashboard/UserTemporeryInvoiceAllStandardData/${StandardParcelId}`}>
                    <button className="btn btn-sm btn-outline btn-primary">View</button>
                </Link>
                <br />
                {
                    status === "Review" &&
                    <button className="mt-[4px] btn btn-sm btn-outline btn-primary"
                        onClick={() => {
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    fetch(`http://localhost:5000/AdminAndUserDeleteReviewParcel/${ReviewUserData?.StandardParcelId}`, {
                                        method: "DELETE",
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.success && data.deletedParcel > 0) {
                                                Swal.fire({
                                                    title: "✅ User Deleted!",
                                                    text: "The user and related parcel have been successfully removed.",
                                                    icon: "success",
                                                    position: "center",
                                                    showConfirmButton: false,
                                                    timer: 1800,
                                                    timerProgressBar: true,
                                                    background: "#f0fdf4",
                                                    color: "#065f46",
                                                    backdrop: `
                                                            rgba(0,0,0,0.4)
                                                            url("https://i.gifer.com/7efs.gif")
                                                            left top
                                                            no-repeat
                                                        `,
                                                });
                                                refetch();
                                            }
                                        })
                                }
                            });
                        }}
                    >Delete</button>
                }
            </td>
        </tr>
    );
};

export default UserPendingConsignment;