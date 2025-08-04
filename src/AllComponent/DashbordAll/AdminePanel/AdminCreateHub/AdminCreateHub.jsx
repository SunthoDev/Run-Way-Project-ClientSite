import React, { useState } from "react";
import "./AdminCreateHub.css"
import moment from "moment";
import Swal from "sweetalert2";
import { useQuery } from '@tanstack/react-query';

const AdminCreateHub = () => {

    // All Police Station find that is add  to coverage 
    // =====================================================
    let { refetch, data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/CoveragesPoliceStationAll")
        return res.json()
    })

    // ============================================================================================================
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)

    // Deleted Created Hub
    // =====================================================
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete hub`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                // Hub request data insert 
                // =================================
                try {
                    let res = await fetch(`https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/HubNameDeleted/${id}`, {
                        method: "DELETE",
                    })
                    let result = await res.json()

                    if (res.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "The hub has been deleted.",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        await refetch();
                    }
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: err.message || "Something went wrong",
                    });
                }
            }
        });
    };



    // ============================================================================================================
    // Created All Police Station find of Hub
    // =====================================================
    let { data: AllStationOfHub = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_PoliceStationWithOfHub"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/PoliceStationWithOfHub")
        return res.json()
    })
    // console.log(AllStationOfHub)

    // Deleted Police Station Of Hub
    // =====================================================
    const HandleDeleteHubStations = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Delete hub`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                // Hub request data insert 
                // =================================
                try {
                    let res = await fetch(`https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/DeletedPoliceStationWithOfHub/${id}`, {
                        method: "DELETE",
                    })
                    let result = await res.json()

                    if (res.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "The police station of hub has been deleted.",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        await refetch();
                    }
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: err.message || "Something went wrong",
                    });
                }
            }
        });
    };


    return (
        <div className="HubCreateAdminParent bg-[#F6F6F6]">


            {/* ================================================== */}
            {/* Create hub || With Update Police Station of Hub */}
            {/* ================================================== */}

            <div className="HubCreate bg-[#F6F6F6] flex justify-between items-center px-[12px] md:px-4 my-4">

                {/* Create hub Only */}
                {/* ================================================== */}
                <div className="w-full max-w-lg bg-white border border-gray-200 shadow-md rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Create Admin Hub
                    </h2>

                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        const NameOfHub = e.target.HubName.value;
                        let date = moment().format("MM/DD/YYYY")
                        let time = moment().format("hh:mm A")
                        // console.log({ NameOfHub, date });

                        let allInfo = { NameOfHub, date ,time}

                        // Hub request data insert 
                        // =================================
                        try {
                            let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/CreateHub", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(allInfo)
                            })
                            let result = await res.json()

                            // ✅ check if already exists
                            if (result.message === "Already existing this Hub") {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Hub already exists",
                                    text: `Please change this hub name and try later!`,
                                });
                                return; // exit early
                            }

                            if (res.ok) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "🎉 Hub created successfully!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                refetch()
                                e.target.reset();
                            }

                        } catch (error) {
                            console.error("An error occurred:", error.message);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.message || 'Something went wrong!'
                            });
                        } finally {
                            console.log("This will always run (finally block).");
                        }

                    }} className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 bg-wite"> Hub Name </label>
                            <input type="text" required placeholder="Enter hub name" name="HubName" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-150"> Create Hub </button>
                    </form>

                </div>

                {/* Add Police-Station With Hub*/}
                {/* ================================================== */}
                <div className="w-full max-w-lg bg-white border border-gray-200 shadow-md rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Add Police Station With Hub
                    </h2>

                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        const PoliceStation = e.target.stationOfHub.value;
                        const HubName = e.target.HubNames.value;
                        let date = moment().format("MM/DD/YYYY")
                        let time = moment().format("hh:mm A")

                        // console.log({ PoliceStation, HubName, date });

                        let allInfo = { PoliceStation, HubName, date, time }

                        // Hub request data insert 
                        // =================================
                        try {
                            let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/CreatePoliceStationWithHub", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(allInfo)
                            })
                            let result = await res.json()

                            // ✅ check if already exists
                            if (result.message === "Already existing this Police Station") {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Already exists Police Station with hub",
                                    text: `Please change others Police Station .`,
                                });
                                return; // exit early
                            }

                            if (res.ok) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "🎉 Police Station add with hub successfully!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                refetch()
                                e.target.reset();
                            }

                        } catch (error) {
                            console.error("An error occurred:", error.message);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.message || 'Something went wrong!'
                            });
                        } finally {
                            console.log("This will always run (finally block).");
                        }

                    }} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"> Police Station </label>
                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="stationOfHub"
                            >
                                <option value="">-- Select Police Station --</option>
                                {AllCoveragesPoliceStation?.map((station, i) => (
                                    <option key={i}>
                                        {station?.AddPoliceStation}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1"> Hub Name </label>
                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="HubNames"
                            >
                                <option value="">-- Select Hub Name --</option>
                                {AllHubFind?.map((hubName, i) => (
                                    <option key={i}>
                                        {hubName?.NameOfHub}
                                    </option>
                                ))}
                            </select>
                        </div>



                        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-150"> Create Hub </button>
                    </form>

                </div>

            </div>

            {/* ============================================ */}
            {/* Create all hub show below */}
            {/* ============================================ */}

            <div className="bg-[#F6F6F6] px-[12px] md:px-4 my-4 flex justify-center">
                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Hub List</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Police Station</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {AllHubFind?.map((Hub) =>
                                    <tr key={Hub?._id}>
                                        <td className="px-6 py-4 text-sm text-gray-800">{Hub?.date}</td>

                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            { 
                                                (() => {
                                                    const matchedHub = AllStationOfHub?.filter(hub => hub.HubName === Hub?.NameOfHub);

                                                    // console.log(matchedHub)

                                                    return (
                                                        <div className="relative inline-block text-left z-20">
                                                            <div className="dropdown dropdown-left">
                                                                <button
                                                                    tabIndex={0}
                                                                    role="button"
                                                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-sm rounded-md font-medium transition-all shadow-sm z-[40]"
                                                                > Click </button>
                                                                <ul
                                                                    tabIndex={0}
                                                                    className="dropdown-content menu absolute mt-2 right-0 bg-white rounded-md shadow-lg w-60 p-2 space-y-1 border border-gray-200 z-[100]"
                                                                >
                                                                    {matchedHub?.length > 0 ? (
                                                                        matchedHub.map((station, i) => (
                                                                            <li key={i} className="">
                                                                                <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                    <span className="text-sm text-gray-700">{station?.PoliceStation}</span>
                                                                                    <button onClick={() => HandleDeleteHubStations(station?._id)} className="text-red-500 text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">Delete</button>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    ) : (
                                                                        <li>
                                                                            <div className="px-2 py-1 text-sm text-gray-400">No stations found</div>
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    );
                                                })()
                                            }
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800">{Hub?.NameOfHub}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDelete(Hub?._id)} className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                            > Delete </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default AdminCreateHub;

{/* {
    ( ()=>{

        let x= 40
        let y=80


        return (<>



        </>)
    }) ()
} */}
