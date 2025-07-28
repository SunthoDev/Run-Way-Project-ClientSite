import { useState } from 'react';
import "./CreateRiderDataSee.css"
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateRiderDataSee = ({ allUser, handleUser, HandleRider, HandleDelete, refetch }) => {

    // console.log(allUser)
    let { photo, name, LastName, role, email, _id } = allUser


    // ========================================================================================================
    // User data received here fo modal show
    // =============================================
    const [activeUser, setActiveUser] = useState(null);

    // Open the modal a set data on useState
    // =============================================
    const handleAccessClick = (user) => {
        setActiveUser(user);
        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("RiderHubAccess").showModal();
        }, 50);
    };


    // ==========================================================================================================
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("http://localhost:5000/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)



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
                <button onClick={() => handleUser(_id)}>User</button>
                <br />
                <button className="" onClick={() => HandleRider(_id)}>Rides</button>
            </td>
            <td>
                {
                    role == "rider" &&
                    <button onClick={() => handleAccessClick(allUser)}>Access Hub</button>
                }
                <br />
                <button onClick={() => HandleDelete(_id)}>Delete</button>
            </td>

            {/* ========================================================== */}
            {/* Send A Route Access to Sub-Admin Start  */}
            {/* ========================================================== */}
            {activeUser && (
                <dialog id="RiderHubAccess" className="modal"
                    key={activeUser._id}
                >
                    <div className="modal-box w-full max-w-2xl text-white bg-gray-900">
                        <h3 className="font-bold text-xl mb-4">🔐 Send Hub Access to Rider - {activeUser?.name}</h3>
                        <form
                            method="dialog"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                // আলাদা আলাদা ভ্যারিয়েবল হিসেবে ডাটা নিচ্ছি
                                const HubNameUp = formData.get("HubNameUp");

                                let allInfo = {
                                    HubNameUp,
                                }

                                fetch(`http://localhost:5000/AdminUpdateRiderHubName/${activeUser?._id}`, {
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
                                                title: "Rider hub name update is successful",
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        }
                                        refetch()
                                        setActiveUser(null)
                                        document.getElementById("RiderHubAccess").close();
                                    })
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold mb-1">Rider Hub Name - ({activeUser?.MyHubRider})</label>

                                    <select required className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-white"
                                        name="HubNameUp"
                                    >
                                        <option value="">-- Select Hub Name --</option>
                                        {AllHubFind?.map((hubName, i) => (
                                            <option key={i}>
                                                {hubName?.NameOfHub}
                                            </option>
                                        ))}
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
                                    document.getElementById("RiderHubAccess").close()
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

export default CreateRiderDataSee;