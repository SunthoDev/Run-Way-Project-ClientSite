import { useState } from 'react';
import "./Dispatch.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import React from "react";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const Dispatch = () => {

    const [tabState, setTabState] = useState(1);
    const navigate = useNavigate()

    // ============================================================================================================
    // Created All Hub Find
    // =====================================================
    let { refetch, data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)

    // ========================================================================================================
    // Dispatch All Data Find
    // =====================================================
    let { data: DispatchAllData = [] } = useQuery(["DispatchAllRequestWithTrackingMessage_AllDispatchRequestData"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/DispatchAllRequestWithTrackingMessage/AllDispatchRequestData")
        return res.json()
    })
    // console.log(AllStationOfHub)

    // Filter Sent data of Dispatch
    // =====================================================
    let DispatchSentData = DispatchAllData?.filter(sent => sent.DispatchType === "Sent")

    // Filter Received data of Dispatch
    // =====================================================
    let DispatchReceivedData = DispatchAllData?.filter(Received => Received.DispatchType === "Received")





    // =====================================================
    // Take Group ids collect together by a enter Start 
    // =====================================================

    // Received All Ids together in json array
    // ==========================================
    const [AllId, setIDAll] = useState([]);
    // Received input value
    // ========================
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = inputValue.trim();
            if (value && !AllId.includes(value)) {
                setIDAll([...AllId, value]);
            }
            setInputValue("");
        }
    };

    // Take id remove from json
    // =====================================================
    const removeTag = (index) => {
        setIDAll(AllId.filter((_, i) => i !== index));
    };

    // =====================================================
    // Take Group ids collect together by a enter End
    // =====================================================



    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* (Pending) All PickUp Request Data See */}
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md ">
                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Dispatch Working..</h3>

                    {/* Tabs of Dispatch */}
                    {/* ==================================== */}
                    <div className="flex border-b border-gray-200 space-x-4 mb-4">
                        <button onClick={() => setTabState(1)}
                            className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                }`}
                        >
                            Sent
                        </button>

                        <button onClick={() => setTabState(2)}
                            className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                }`}
                        >
                            Received
                        </button>
                    </div>


                    {/* Tab Content (Dispatch)*/}
                    {/* ==================================== */}
                    <div className="">

                        {/* ==================================== */}
                        {/* Dispatch (Send) */}
                        {/* ==================================== */}
                        {tabState === 1 &&
                            <div className="">
                                <div className="flex justify-center">
                                    {/* Dispatch (Send) Data */}
                                    {/* ==================================== */}
                                    <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                            Send Dispatch
                                        </h2>

                                        <div className="grid grid-cols-7 gap-6">
                                            {/* =============================================== */}
                                            {/* Parcel Multiple Id add System same time Start */}
                                            {/* =============================================== */}
                                            <div className="flex flex-wrap border rounded-lg p-2 min-h-[50px] col-span-4">
                                                {AllId?.map((tag, index) => (
                                                    <div key={index} className="flex items-center bg-black text-white text-sm rounded-full px-3 h-[24px] m-1">
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTag(index)}
                                                            className="ml-2 text-red-500 font-bold"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                                <input
                                                    type="text"
                                                    className="flex-grow items-center bg-black text-white text-sm rounded-full px-3 h-[24px] m-1 w-[20%]"
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Type and press enter..."
                                                />
                                            </div>

                                            {/* Submit parcel here*/}
                                            {/* ================================ */}
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault()
                                                    const DispatchHubName = e.target.HubName.value;
                                                    let date = moment().format("MM/DD/YYYY")
                                                    let time = moment().format("hh:mm A")
                                                    let DispatchId = Math.round(Math.random() * 99999999).toString()
                                                    let TrackingMessage = `Sent to ${DispatchHubName} hub. Dispatch id ${DispatchId}`

                                                    // Dispatch data post 
                                                    // ===================================================================
                                                    let DispatchDataPost = { DispatchId, TrackingMessage, date, time, DispatchType: "Sent", DispatchHubName, DispatchParcelAllId: AllId }
                                                    // console.log(DispatchDataPost)

                                                    // Tracking message post of dispatch 
                                                    // =============================================================
                                                    let TrackingMessagePost = AllId?.map((id, index) => ({
                                                        userOrderIdTracking: id,
                                                        TrackingMessage,
                                                        TrackingDate: date,
                                                        TrackingTime: time
                                                    }));
                                                    // console.log(TrackingMessagePost)


                                                    // Dispatch Send Data Post 
                                                    // ===========================================
                                                    fetch("https://server.trustereocourier.com.bd/DispatchAllRequestWithTrackingMessage/AdminDispatchRequestSend", {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },
                                                        body: JSON.stringify(DispatchDataPost)
                                                    })
                                                        .then(res => res.json())
                                                        .then(data => {
                                                            if (data.insertedId) {
                                                                // Dispatch Tracking Data Post 
                                                                // ===========================================
                                                                fetch("https://server.trustereocourier.com.bd/DispatchAllRequestWithTrackingMessage/AdminTrackingRequestSentOfDispatch", {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json"
                                                                    },
                                                                    body: JSON.stringify(TrackingMessagePost)
                                                                })
                                                                    .then(res => res.json())
                                                                    .then(data => {
                                                                        // console.log(data)
                                                                        if (data.insertedCount > 0) {
                                                                            e.target.reset()
                                                                            setIDAll([]);
                                                                            Swal.fire({
                                                                                position: 'top-end',
                                                                                icon: 'success',
                                                                                title: 'Dispatch Request Success',
                                                                                showConfirmButton: false,
                                                                                timer: 1500
                                                                            })
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                }} className="col-span-3 space-y-4">

                                                <div className="">
                                                    <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        name="HubName"
                                                    >
                                                        <option value="">-- Select Hub Name --</option>
                                                        {AllHubFind?.map((hubName, i) => (
                                                            <option key={i}>
                                                                {hubName?.NameOfHub}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* Submit button */}
                                                    <button
                                                        type="submit"
                                                        className="mt-[8px] bg-blue-500 text-gray-50 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 w-full">
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Show (Sent) all Dispatch Data */}
                                {/* ==================================== */}
                                <div className="w-full bg-white shadow-lg border border-gray-200 mt-[40px] rounded-xl p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sent Dispatch Data</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Parcel Id</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Hub Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tracking Message</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {DispatchSentData?.slice().reverse().map((SentData) =>
                                                    <tr key={SentData?._id}>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.date},{SentData?.time}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.DispatchType} <br /> Dispatch Id: {SentData?.DispatchId} </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800">
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
                                                                        {SentData?.DispatchParcelAllId.map((id, index) => (
                                                                            <li key={index} className="">
                                                                                <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                    <span className="text-sm text-gray-700">{id}</span>

                                                                                    <button onClick={() => {
                                                                                        navigate(`/dashboard/AdminDashboard/AdminSearchStandardParcelId/${id}`)
                                                                                        // console.log(id)
                                                                                    }} className="text-black text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">View</button>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.DispatchHubName}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.TrackingMessage}</td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={async () => {
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
                                                                            let res = await fetch(`https://server.trustereocourier.com.bd/DispatchAllRequestWithTrackingMessage/AdminDeleteDispatchData/${SentData?._id}`, {
                                                                                method: "DELETE",
                                                                            })
                                                                            let result = await res.json()

                                                                            if (res.ok) {
                                                                                Swal.fire({
                                                                                    icon: "success",
                                                                                    title: "Deleted!",
                                                                                    text: "The Dispatch deleted success.",
                                                                                    timer: 1500,
                                                                                    showConfirmButton: false,
                                                                                });
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

                                                            }} className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                            > Delete </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* ==================================== */}
                        {/*  Dispatch (Received) */}
                        {/* ==================================== */}

                        {tabState === 2 &&
                            <div className="">

                                <div className="flex justify-center">
                                    {/* Dispatch (Received) Data */}
                                    {/* ==================================== */}
                                    <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Received Dispatch</h2>
                                        <div className="grid grid-cols-7 gap-6">
                                            {/* =============================================== */}
                                            {/* Parcel Multiple Id add System same time Start */}
                                            {/* =============================================== */}
                                            <div className="flex flex-wrap border rounded-lg p-2 min-h-[50px] col-span-4">
                                                {AllId?.map((tag, index) => (
                                                    <div key={index} className="flex items-center bg-black text-white text-sm rounded-full px-3 h-[24px] m-1">
                                                        {tag}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTag(index)}
                                                            className="ml-2 text-red-500 font-bold"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                                <input
                                                    type="text"
                                                    className="flex-grow items-center bg-black text-white text-sm rounded-full px-3 h-[24px] m-1 w-[20%]"
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder="Type and press enter..."
                                                />
                                            </div>

                                            {/* Submit parcel here*/}
                                            {/* ================================ */}
                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                const DispatchHubName = e.target.HubName.value;
                                                let date = moment().format("MM/DD/YYYY")
                                                let time = moment().format("hh:mm A")
                                                let DispatchId = Math.round(Math.random() * 99999999).toString()
                                                let TrackingMessage = `Received to ${DispatchHubName} hub.`

                                                // Dispatch data post 
                                                // ============================================================
                                                let DispatchDataPost = { DispatchId, TrackingMessage, date, time, DispatchType: "Received", DispatchHubName, DispatchParcelAllId: AllId }
                                                // console.log(DispatchDataPost)

                                                // Tracking message post of dispatch 
                                                // =============================================================
                                                let TrackingMessagePost = AllId?.map((id, index) => ({
                                                    userOrderIdTracking: id,
                                                    TrackingMessage,
                                                    TrackingDate: date,
                                                    TrackingTime: time
                                                }));
                                                // console.log(TrackingMessagePost)

                                                // Dispatch Send Data Post 
                                                // ===========================================
                                                fetch("https://server.trustereocourier.com.bd/DispatchAllRequestWithTrackingMessage/AdminDispatchRequestSend", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(DispatchDataPost)
                                                })
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        if (data.insertedId) {
                                                            // Dispatch Tracking Data Post 
                                                            // ===========================================
                                                            fetch("https://server.trustereocourier.com.bd/DispatchAllRequestWithTrackingMessage/AdminTrackingRequestSentOfDispatch", {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                },
                                                                body: JSON.stringify(TrackingMessagePost)
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    if (data.insertedCount > 0) {
                                                                        e.target.reset()
                                                                        setIDAll([]);
                                                                        Swal.fire({
                                                                            position: 'top-end',
                                                                            icon: 'success',
                                                                            title: 'Dispatch Request Success',
                                                                            showConfirmButton: false,
                                                                            timer: 1500
                                                                        })
                                                                    }
                                                                })
                                                        }
                                                    })

                                            }} className="col-span-3 space-y-4">

                                                <div className="mb-[8px]">
                                                    <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        name="HubName"
                                                    >
                                                        <option value="">-- Select Hub Name --</option>
                                                        {AllHubFind?.map((hubName, i) => (
                                                            <option key={i}>
                                                                {hubName?.NameOfHub}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* Submit button */}
                                                    <button
                                                        type="submit"
                                                        className="mt-[8px ]bg-blue-500 text-gray-50 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 w-full">
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Show (Received) all Dispatch Data */}
                                {/* ==================================== */}
                                <div className="w-full bg-white shadow-lg border border-gray-200 mt-[40px] rounded-xl p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Received Dispatch Data</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Parcel Id</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Hub Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tracking Message</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {DispatchReceivedData?.slice().reverse().map((ReceivedData) =>
                                                    <tr key={ReceivedData?._id}>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.date},{ReceivedData?.time}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.DispatchType} <br /> Dispatch Id: {ReceivedData?.DispatchId} </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800">
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
                                                                        {ReceivedData?.DispatchParcelAllId.map((id, index) => (
                                                                            <li key={index} className="">
                                                                                <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                    <span className="text-sm text-gray-700">{id}</span>

                                                                                    <button onClick={() => {
                                                                                        navigate(`/dashboard/AdminDashboard/AdminSearchStandardParcelId/${id}`)
                                                                                        // console.log(id)
                                                                                    }} className="text-black text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">View</button>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.DispatchHubName}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.TrackingMessage}</td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={async () => {
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
                                                                            let res = await fetch(`https://server.trustereocourier.com.bd/DispatchAllRequestWithTrackingMessage/AdminDeleteDispatchData/${ReceivedData?._id}`, {
                                                                                method: "DELETE",
                                                                            })
                                                                            let result = await res.json()

                                                                            if (res.ok) {
                                                                                Swal.fire({
                                                                                    icon: "success",
                                                                                    title: "Deleted!",
                                                                                    text: "The Dispatch deleted success.",
                                                                                    timer: 1500,
                                                                                    showConfirmButton: false,
                                                                                });
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

                                                            }} className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                            > Delete </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dispatch;