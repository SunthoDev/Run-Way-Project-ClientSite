import { useState } from 'react';
import "./ReturnParcelMonitoring.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import React from "react";
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';

const ReturnParcelMonitoring = () => {

    const [tabState, setTabState] = useState(1);
    const navigate = useNavigate()

    // =======================================================================
    // User All Category Parcel Data Find
    // =======================================================================
    let { refetch, data: ReturnAllParcelRequestData = [] } = useQuery(["ReturnParcelRequestWithTrackingMessage_AllReturnParcelRequestData"], async () => {
        let res = await fetch(`http://localhost:5000/ReturnParcelRequestWithTrackingMessage/AllReturnParcelRequestData`)
        return res.json()

    })
    // console.log(ReturnAllParcelRequestData)

    // Return Parcel Pending Status Data
    // ====================================
    let ReturnPendingParcelAll = ReturnAllParcelRequestData?.filter(Pending => Pending?.ReturnStatus === "Pending")
    // console.log(ReturnPendingParcelAll)

    // Return Parcel Approved Status Data
    // ====================================
    let ReturnApprovedParcelAll = ReturnAllParcelRequestData?.filter(approved => approved?.ReturnStatus === "Approved")
    // console.log(ReturnApprovedParcelAll)

    // Search Parcel Show (Pending)
    // =======================================
    let [SearchPendingData, setSearchPendingData] = useState([])
    // Search Parcel Show (Delivered)
    // =======================================
    let [SearchApprovedData, setSearchApprovedData] = useState([])


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
        <div className='ReturnParcelMonitoring bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* (Pending) All PickUp Request Data See */}
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md ">
                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Return Parcel Monitoring</h3>

                    <div className="">

                        {/* ========================================================= */}
                        {/* Return Parcel Data Entry Here */}
                        {/* ========================================================= */}
                        <div className="flex justify-center">
                            <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return parcel id note here</h2>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    const ReturnParcelStatus = e.target.ReturnStatus.value;
                                    let date = moment().format("MM/DD/YYYY")
                                    let time = moment().format("hh:mm A")
                                    let ReturnId = Math.round(Math.random() * 99999999).toString()
                                    let TrackingMessage = `Your parcel return is currently pending and will be processed shortly.
                                    `
                                    // Return All Parcel List in here 
                                    // ============================================================
                                    let ReturnDataPost = { ReturnId, TrackingMessage, date, time, ReturnStatus: "Pending", ReturnParcelStatus, ReturnParcelAllId: AllId }
                                    // console.log(ReturnDataPost)

                                    // Tracking message post of dispatch 
                                    // =============================================================
                                    let TrackingMessagePost = AllId?.map((id, index) => ({
                                        userOrderIdTracking: id,
                                        TrackingMessage,
                                        TrackingDate: date,
                                        TrackingTime: time
                                    }));
                                    // console.log(TrackingMessagePost)

                                    // Return Parcel Data Post
                                    // ===========================================
                                    fetch("http://localhost:5000/ReturnParcelRequestWithTrackingMessage/UserReturnRequestSend", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(ReturnDataPost)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.insertedId) {
                                                // Return Tracking Data Post 
                                                // ===========================================
                                                fetch("http://localhost:5000/ReturnParcelRequestWithTrackingMessage/AdminTrackingRequestSentOfReturnParcel", {
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
                                                                title: 'Return Parcel Request Success',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                        }
                                                    })
                                            }
                                        })

                                }} className="grid grid-cols-7 gap-6">
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

                                    {/* Right side - select picker, submit button*/}
                                    <div className="col-span-3 space-y-4">
                                        <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            name="ReturnStatus"
                                        >
                                            <option value="">-- Select--</option>
                                            <option>
                                                ReturnParcel
                                            </option>

                                        </select>

                                        {/* Submit button */}
                                        <button
                                            type="submit"
                                            className="bg-blue-500 text-gray-50 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 w-full">
                                            Submit
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>

                        {/* ================================================================================== */}
                        {/* Show All Return Parcel Data */}
                        {/* ================================================================================== */}
                        <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                            {/* Tabs with Different type of category parcel*/}
                            {/* =============================================== */}
                            <div className="flex justify-between items-center flex-wrap gap-3">
                                {/* Tabs */}
                                <div className="flex border-b border-gray-200 space-x-4 mb-4">

                                    <button onClick={() => setTabState(1)}
                                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                            }`}
                                    >
                                        Pending Return Parcel
                                    </button>

                                    <button onClick={() => setTabState(2)}
                                        className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                            }`}
                                    >
                                        Approved Return Parcel
                                    </button>
                                </div>
                            </div>

                            {/* Tab Content Pending / Approved return parcel show */}
                            {/* ======================================================== */}
                            <div className="">

                                {/* ============================================ */}
                                {/* (Pending) Return Parcel */}
                                {/* ============================================ */}
                                {tabState === 1 &&
                                    <div className="flex justify-center">
                                        <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                            {/* Search Return Parcel*/}
                                            {/* ==================================== */}
                                            <div className="flex justify-between items-center pb-4">
                                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return Pending Parcel </h2>
                                                {/* Search Section (Pending)*/}
                                                {/* ==================================== */}
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        onBlur={(e) => {
                                                            let date = e.target.value
                                                            let splitDate = date.split("-")
                                                            let SearchDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
                                                            // console.log(SearchDate)

                                                            setSearchPendingData(ReturnPendingParcelAll?.filter(Date => Date?.date === SearchDate && Date?.ReturnStatus == "Pending"))
                                                        }}
                                                        type="date" className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <button
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </div>

                                            {/* ALl Pending Return Parcel Data Show*/}
                                            {/* ====================================== */}
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Return ID</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Return Parcel Id</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Assign Rider</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {
                                                            (SearchPendingData.length > 0
                                                                ? SearchPendingData
                                                                : ReturnPendingParcelAll
                                                            ).slice().reverse().map((ParcelAll) => (
                                                                <tr key={ParcelAll?._id}>
                                                                    <td>
                                                                        <p className="text-sm">{ParcelAll?.date},{ParcelAll?.time}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-sm text-gray-800 font-medium">Return Id: {ParcelAll?.ReturnId}</p>
                                                                    </td>

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
                                                                                    {ParcelAll?.ReturnParcelAllId?.map((id, index) => (
                                                                                        <li key={index} className="">
                                                                                            <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                                <span className="text-sm text-gray-700">{id}</span>

                                                                                                <button onClick={() => {
                                                                                                    navigate(`/dashboard/AdminDashboard/AdminSearchStandardParcelId/${id}`)
                                                                                                }} className="text-black text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">View</button>
                                                                                            </div>
                                                                                        </li>
                                                                                    ))
                                                                                    }
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <span
                                                                            className={`badge badge-sm ${ParcelAll?.ReturnStatus === "Pending" && "badge-success"}`}
                                                                        >
                                                                            {ParcelAll?.ReturnStatus}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            Assign Rider
                                                                        </button>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={async () => {
                                                                                Swal.fire({
                                                                                    title: "Are you sure?",
                                                                                    text: `Delete this return request?`,
                                                                                    icon: "warning",
                                                                                    showCancelButton: true,
                                                                                    confirmButtonColor: "#d33",
                                                                                    cancelButtonColor: "#3085d6",
                                                                                    confirmButtonText: "Yes, delete it!",
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                        try {
                                                                                            const res = await fetch(
                                                                                                `http://localhost:5000/ReturnParcelRequestWithTrackingMessage/AdminDeleteReqOfReturnParcel/${ParcelAll?._id}`,
                                                                                                {
                                                                                                    method: "DELETE",
                                                                                                }
                                                                                            );
                                                                                            const result = await res.json();

                                                                                            if (res.ok) {
                                                                                                Swal.fire({
                                                                                                    icon: "success",
                                                                                                    title: "Deleted!",
                                                                                                    text: "The Return Request was deleted successfully.",
                                                                                                    timer: 1500,
                                                                                                    showConfirmButton: false,
                                                                                                });
                                                                                            } else {
                                                                                                throw new Error(result.message || "Delete failed");
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
                                                                            }}
                                                                            className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {/* ============================================ */}
                                {/* (Approved) Return Parcel */}
                                {/* ============================================ */}
                                {tabState === 2 &&
                                    <div className="flex justify-center">
                                        <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                            {/* Search Return Parcel*/}
                                            {/* ==================================== */}
                                            <div className="flex justify-between items-center pb-4">
                                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Return Approved Parcel </h2>
                                                {/* Search Section (Approved)*/}
                                                {/* ==================================== */}
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        onBlur={(e) => {
                                                            let date = e.target.value
                                                            let splitDate = date.split("-")
                                                            let SearchDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
                                                            // console.log(SearchDate)

                                                            setSearchApprovedData(ReturnApprovedParcelAll?.filter(Date => Date?.date === SearchDate && Date?.ReturnStatus == "Approved"))
                                                        }}
                                                        type="date" className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                    <button
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </div>

                                            {/* ALl Approved Return Parcel Data Show*/}
                                            {/* ====================================== */}
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Return ID</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Return Parcel Id</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {
                                                            (SearchApprovedData.length > 0
                                                                ? SearchApprovedData
                                                                : ReturnApprovedParcelAll
                                                            ).slice().reverse().map((ParcelAll) => (
                                                                <tr key={ParcelAll?._id}>
                                                                    <td>
                                                                        <p className="text-sm">{ParcelAll?.date},{ParcelAll?.time}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-sm text-gray-800 font-medium">Return Id: {ParcelAll?.ReturnId}</p>
                                                                    </td>

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
                                                                                    {ParcelAll?.ReturnParcelAllId?.map((id, index) => (
                                                                                        <li key={index} className="">
                                                                                            <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                                <span className="text-sm text-gray-700">{id}</span>

                                                                                                <button onClick={() => {
                                                                                                    navigate(`/dashboard/AdminDashboard/AdminSearchStandardParcelId/${id}`)
                                                                                                }} className="text-black text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">View</button>
                                                                                            </div>
                                                                                        </li>
                                                                                    ))
                                                                                    }
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <span
                                                                            className={`badge badge-sm ${ParcelAll?.ReturnStatus === "Pending" && "badge-success"}`}
                                                                        >
                                                                            {ParcelAll?.ReturnStatus}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={async () => {
                                                                                Swal.fire({
                                                                                    title: "Are you sure?",
                                                                                    text: `Delete this return request?`,
                                                                                    icon: "warning",
                                                                                    showCancelButton: true,
                                                                                    confirmButtonColor: "#d33",
                                                                                    cancelButtonColor: "#3085d6",
                                                                                    confirmButtonText: "Yes, delete it!",
                                                                                }).then(async (result) => {
                                                                                    if (result.isConfirmed) {
                                                                                        try {
                                                                                            const res = await fetch(
                                                                                                `http://localhost:5000/ReturnParcelRequestWithTrackingMessage/AdminDeleteReqOfReturnParcel/${ParcelAll?._id}`,
                                                                                                {
                                                                                                    method: "DELETE",
                                                                                                }
                                                                                            );
                                                                                            const result = await res.json();

                                                                                            if (res.ok) {
                                                                                                Swal.fire({
                                                                                                    icon: "success",
                                                                                                    title: "Deleted!",
                                                                                                    text: "The Return Request was deleted successfully.",
                                                                                                    timer: 1500,
                                                                                                    showConfirmButton: false,
                                                                                                });
                                                                                            } else {
                                                                                                throw new Error(result.message || "Delete failed");
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
                                                                            }}
                                                                            className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </td>
                                                                </tr>))
                                                        }
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
            </div>
        </div >
    );
};

export default ReturnParcelMonitoring;