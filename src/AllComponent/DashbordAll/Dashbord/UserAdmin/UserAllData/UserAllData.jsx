import React, { useState } from 'react';
import "./UserAllData.css"
import Swal from 'sweetalert2';

const UserAllData = ({ allUser, HandleAdmin, handleUser, HandleRider, HandleSubAdmin, HandleDelete, refetch }) => {
    // console.log(allUser)
    let { photo, name, LastName, role, email, _id } = allUser



    // User data received here fo modal show
    // =============================================
    const [activeUser, setActiveUser] = useState(null);

    // Open the modal a set data on useState
    // =============================================
    const handleAccessClick = (user) => {
        setActiveUser(user);
        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("SubAdminAccessSendToAdmin").showModal();
        }, 50);
    };

    return (
        <tr className='UserAllData'>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={photo} />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <h3>{name}</h3>
            </td>
            <td>
                <h3>{email}</h3>
            </td>
            <td className={`Role ${role == "admin" ? "text-red-700" : role == "rider" ?
                "text-[#22AFA3]" : role == "subAdmin" ? "text-yellow-600" : "text-black"}`}>{role}</td>
            <td>
                <div className="flex items-center">
                    <button className="mr-[8px]" onClick={() => HandleAdmin(_id)}>Admin</button>
                    <button onClick={() => handleUser(_id)}>User</button>
                </div>
                <br />
                <div className="flex items-center">
                    <button className="mr-[8px]" onClick={() => HandleRider(_id)}>Rides</button>
                    <button onClick={() => HandleSubAdmin(_id)}>Sub Admin</button>
                </div>
            </td>
            <td>
                {
                    role == "subAdmin" &&
                    <button onClick={() => handleAccessClick(allUser)}>Access Route</button>
                }
                <br />
                <button onClick={() => HandleDelete(_id)}>Delete</button>
            </td>

            {/* ========================================================== */}
            {/* Send A Route Access to Sub-Admin Start  */}
            {/* ========================================================== */}
            {activeUser && (
                <dialog id="SubAdminAccessSendToAdmin" className="modal"
                    key={activeUser._id}
                >
                    <div className="modal-box w-full max-w-2xl text-white bg-gray-900">
                        <h3 className="font-bold text-xl mb-4">🔐 Sub Admin Route Access to {activeUser?.name}</h3>
                        <form
                            method="dialog"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                // আলাদা আলাদা ভ্যারিয়েবল হিসেবে ডাটা নিচ্ছি
                                const Create_Hub_Access = formData.get("Create_Hub_Access");
                                const My_Hub_Access = formData.get("My_Hub_Access");
                                const Dispatch_Access = formData.get("Dispatch_Access");
                                const Delivery_Monitoring_Access = formData.get("Delivery_Monitoring_Access");
                                const Assign_Parcel_Access = formData.get("Assign_Parcel_Access");
                                const ReturnParcel_Monitoring_Access = formData.get("ReturnParcel_Monitoring_Access");
                                const Balance_Request_Access = formData.get("Balance_Request_Access");
                                const All_Report_Access = formData.get("All_Report_Access");
                                const Approved_Parcel_Access = formData.get("Approved_Parcel_Access");
                                const Coverage_Access = formData.get("Coverage_Access");
                                const View_Payment_Access = formData.get("View_Payment_Access");
                                const AmountUpdate_Parcel_Access = formData.get("AmountUpdate_Parcel_Access");
                                const New_Merchants_Access = formData.get("New_Merchants_Access");
                                const User_Access = formData.get("User_Access");
                                const CreateRider_Access = formData.get("CreateRider_Access");
                                const Hub_Information_Access = formData.get("Hub_Information_Access");
                                const Rider_CODAmount_Request_Access = formData.get("Rider_CODAmount_Request_Access");

                                let allInfo = {
                                    Create_Hub_Access,
                                    My_Hub_Access,
                                    Dispatch_Access,
                                    Delivery_Monitoring_Access,
                                    Assign_Parcel_Access,
                                    ReturnParcel_Monitoring_Access,
                                    Balance_Request_Access,
                                    All_Report_Access,
                                    Approved_Parcel_Access,
                                    Coverage_Access,
                                    View_Payment_Access,
                                    AmountUpdate_Parcel_Access,
                                    New_Merchants_Access,
                                    User_Access,
                                    CreateRider_Access,
                                    Hub_Information_Access,
                                    Rider_CODAmount_Request_Access,
                                }

                                fetch(`http://localhost:5000/AdminSentRoutAccessToSubAdmin/${activeUser?._id}`, {
                                    method: "PATCH",
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(allInfo)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        console.log(data)
                                        if (data.modifiedCount > 0) {
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Route Access Update is successful",
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        }
                                        refetch()
                                        setActiveUser(null)
                                        document.getElementById("SubAdminAccessSendToAdmin").close();
                                    })
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Hub Information Access- ({activeUser?.Hub_Information_Access})</label>
                                    <select name="Hub_Information_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Rider CODAmount Request Access- ({activeUser?.Rider_CODAmount_Request_Access})</label>
                                    <select name="Rider_CODAmount_Request_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Create Hub Access- ({activeUser?.Create_Hub_Access})</label>
                                    <select name="Create_Hub_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">My Hub Access- ({activeUser?.My_Hub_Access})</label>
                                    <select name="My_Hub_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Dispatch Access- ({activeUser?.Dispatch_Access})</label>
                                    <select name="Dispatch_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Delivery Monitoring Access- ({activeUser?.Delivery_Monitoring_Access})</label>
                                    <select name="Delivery_Monitoring_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Assign Parcel Access- ({activeUser?.Assign_Parcel_Access})</label>
                                    <select name="Assign_Parcel_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Return Parcel Monitoring Access- ({activeUser?.ReturnParcel_Monitoring_Access})</label>
                                    <select name="ReturnParcel_Monitoring_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Balance Request Access- ({activeUser?.Balance_Request_Access})</label>
                                    <select name="Balance_Request_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">All Report Access- ({activeUser?.All_Report_Access})</label>
                                    <select name="All_Report_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Approved Parcel Access- ({activeUser?.Approved_Parcel_Access})</label>
                                    <select name="Approved_Parcel_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Coverage Access- ({activeUser?.Coverage_Access})</label>
                                    <select name="Coverage_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">View Payment Access- ({activeUser?.View_Payment_Access})</label>
                                    <select name="View_Payment_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">Amount Update Parcel Access- ({activeUser?.AmountUpdate_Parcel_Access})</label>
                                    <select name="AmountUpdate_Parcel_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">New Merchants Access- ({activeUser?.New_Merchants_Access})</label>
                                    <select name="New_Merchants_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">User Access- ({activeUser?.User_Access})</label>
                                    <select name="User_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-semibold mb-1">CreateRider Access- ({activeUser?.CreateRider_Access})</label>
                                    <select name="CreateRider_Access" defaultValue="No" className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">Save Here</label>
                                    <button type="submit" className="btn btn-primary ml-2">
                                        ✅ Save Access
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="modal-action mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    document.getElementById("SubAdminAccessSendToAdmin").close()
                                    setActiveUser(null)
                                }}
                                className="btn bg-gray-300 text-black"
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
            {/* ========================================================== */}
            {/* Send A Route Access to Sub-Admin End  */}
            {/* ========================================================== */}

        </tr >
    );
};

export default UserAllData;