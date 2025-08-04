import React, { useState } from 'react';
import "./ParcelInfoOfRider.css"
import useRole from '../../../../Hook/useRole';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from "moment";
import Swal from 'sweetalert2';

const ParcelInfoOfRider = () => {

    const [tabState, setTabState] = useState(1);
    const [roles] = useRole()

    // ===========================================================================================================
    // Rider Send Parcel COD all Amount Request Data Find Here
    // =======================================================================
    let { refetch, data: RiderSendParcelCODReqAll = [] } = useQuery(["AdminAllAssignParcelHere_ParcelCollectCODRequestAllDataFind"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ParcelCollectCODRequestAllDataFind`)
        return res.json()
    })
    // console.log(RiderSendParcelCODReqAll)
    
    // Rider Send Parcel COD all Pending Data Filter Bellow
    // =======================================================================
    let PendingCODRequestData = RiderSendParcelCODReqAll?.filter(Pending => Pending?.status === "Pending")
    // Rider Send Parcel COD all Approved Data Filter Bellow
    // =======================================================================
    let ApprovedCODRequestData = RiderSendParcelCODReqAll?.filter(Approved => Approved?.status === "Approved")







    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='px-2 md:px-4 my-4 pt-[80px] md:pt-0'>

                {/* ======================================================== */}
                {/* Rider Send Parcel COD Request to Bellow  */}
                {/* ======================================================== */}
                <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left side: Fancy Amount Display */}
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-500">Total COD Balance</p>
                        <h2 className="text-2xl font-bold text-indigo-600 tracking-wide">
                            ৳ {roles?.ParcelCODAmountOfRider || 0}
                        </h2>
                    </div>
                    {/* Right side: Button */}
                    <div>
                        <button
                            disabled={!roles?.ParcelCODAmountOfRider || roles?.ParcelCODAmountOfRider === 0}
                            onClick={() => {
                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: "Do you want to send a COD request?",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, send it!'
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        let CODInfo = {
                                            CODReqName: roles?.name,
                                            CODReqLastName: roles?.LastName,
                                            CODReqAddress: roles?.Address,
                                            CODReqEmail: roles?.email,
                                            ParcelTotalCODAmountOfRider: roles?.ParcelCODAmountOfRider,
                                            status:"Pending",
                                        }
                                        // ===================================================
                                        // Parcel Total Cod Amount Request Send  to Rider
                                        // ===================================================
                                        fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ParcelCollectAllCodRequestSend", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(CODInfo)
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                // console.log(data)
                                                if (data.insertedId) {
                                                    // ============================================================
                                                    // Rider When Send a COD Request then his COD balance will be 0 
                                                    // ============================================================
                                                    fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/RiderParcelCODAmountWillBeZero/${roles?.email}`, {
                                                        method: "PATCH",
                                                    })
                                                        .then(res => res.json())
                                                        .then(data => {
                                                            if (data.modifiedCount > 0) {
                                                                refetch()
                                                                Swal.fire({
                                                                    position: 'top-end',
                                                                    icon: 'success',
                                                                    title: 'COD Amount Request Send Successful',
                                                                    showConfirmButton: false,
                                                                    timer: 1500
                                                                })
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                })
                            }
                            } // Optional: your function
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md transition"
                        >
                            COD Amount Request
                        </button>
                    </div>
                </div>

                {/* ==================================================================== */}
                {/* Parcel COD Balance Request All Data See Bellow */}
                {/* ==================================================================== */}
                 <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>My Parcel COD Request Data All</h3>

                {/* Tabs with Different type of category COD Balance Status Data*/}
                {/* ==================================================================== */}
                    <div className="mb-6 gap-3">
                        {/* ================================= */}
                        {/* Tabs */}
                        {/* ================================= */}
                        <div className="flex border-b border-gray-200 space-x-4 mb-4">
                            <button onClick={() => setTabState(1)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Pending
                            </button>
                            <button onClick={() => setTabState(2)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Approved
                            </button>
                        </div>
                    </div>

                    {/* Tab Content All types parcel COD data show */}
                    {/* ============================================ */}
                    <div className="">
                        {/* ==================================================== */}
                        {/* My Parcel COD (PENDING) Request Show below !! */}
                        {/* ==================================================== */}
                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Total Parcel COD Request : {PendingCODRequestData?.length}</h2>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Address</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Amount</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    PendingCODRequestData?.slice().reverse().map(ParcelRequestCOD => (
                                                        <tr key={ParcelRequestCOD?._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqName} {ParcelRequestCOD?.CODReqLastName}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqEmail}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqAddress}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.ParcelTotalCODAmountOfRider}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.status}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        }

                        {/* ==================================================== */}
                        {/* My Parcel COD (APPROVED) Request Show below !! */}
                        {/* ==================================================== */}
                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Total Parcel COD Request : {ApprovedCODRequestData?.length}</h2>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Address</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Amount</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    ApprovedCODRequestData?.slice().reverse().map(ParcelRequestCOD => (
                                                        <tr key={ParcelRequestCOD?._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqName} {ParcelRequestCOD?.CODReqLastName}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqEmail}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqAddress}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.ParcelTotalCODAmountOfRider}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.status}</td>
                                                        </tr>
                                                    ))
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
        </div >
    );
};

export default ParcelInfoOfRider;