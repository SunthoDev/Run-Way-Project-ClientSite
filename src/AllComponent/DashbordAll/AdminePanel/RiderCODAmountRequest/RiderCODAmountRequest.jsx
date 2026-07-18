import React, { useState } from 'react';
import "./RiderCODAmountRequest.css"
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from "moment";
import Swal from 'sweetalert2';

const RiderCODAmountRequest = () => {

    const [tabState, setTabState] = useState(1);

    // ===========================================================================================================
    // Rider Send Parcel COD all Amount Request Data Find Here
    // =======================================================================
    let { refetch, data: RiderSendParcelCODReqAll = [] } = useQuery(["AdminAllAssignParcelHere_ParcelCollectCODRequestAllDataFind"], async () => {
        let res = await fetch(`http://localhost:5000/AdminAllAssignParcelHere/ParcelCollectCODRequestAllDataFind`)
        return res.json()
    })
    // console.log(RiderSendParcelCODReqAll)

    // Rider Send Parcel COD all Pending Data Filter Bellow
    // =======================================================================
    let PendingCODRequestData = RiderSendParcelCODReqAll?.filter(Pending => Pending?.status === "Pending")
    // Rider Send Parcel COD all Approved Data Filter Bellow
    // =======================================================================
    let ApprovedCODRequestData = RiderSendParcelCODReqAll?.filter(Approved => Approved?.status === "Approved")


    // ============================================================================================================
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("http://localhost:5000/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)
    let [SearchCodData, setSearchCodData] = useState([])
    // console.log(SearchCodData)




    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='px-2 md:px-4 my-4 pt-[80px] md:pt-0'>

                {/* ==================================================================== */}
                {/* Parcel COD Balance Request All Data See Bellow */}
                {/* ==================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Rider Parcel COD Request Data All</h3>

                    {/* Tabs with Different type of category COD Balance Status Data*/}
                    {/* ==================================================================== */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">

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

                        {/* ======================================== */}
                        {/* Search a Parcel by a (Hub) name */}
                        {/* ======================================== */}
                        <div className="flex items-center gap-2">
                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="stationOfHub"
                                onBlur={(e) => {
                                    const HubName = e.target.value
                                    setSearchCodData(RiderSendParcelCODReqAll?.filter(CodRequest => CodRequest?.riderHub === HubName))
                                }}
                            >
                                <option value="">-- Select Hub Name --</option>
                                {AllHubFind?.map((hubName, i) => (
                                    <option key={i}>
                                        {hubName?.NameOfHub}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                            >
                                Search
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
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rider Total Parcel COD Request : {PendingCODRequestData?.length}</h2>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Address</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Amount</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    (SearchCodData.length > 0 ? SearchCodData 
                                                    : PendingCODRequestData)?.slice().reverse().map(ParcelRequestCOD => (
                                                        <tr key={ParcelRequestCOD?._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqName} {ParcelRequestCOD?.CODReqLastName}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.riderHub}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqEmail}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqAddress}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.ParcelTotalCODAmountOfRider}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.status}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">
                                                                <button
                                                                    onClick={() => {
                                                                        fetch(`http://localhost:5000/AdminAllAssignParcelHere/AdminRiderParcelCodeReqAmountStatusApproved/${ParcelRequestCOD?._id}`, {
                                                                            method: "PATCH",
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    Swal.fire({
                                                                                        position: "top-end",
                                                                                        icon: "success",
                                                                                        title: "Parcel COD request approved has been success",
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                }
                                                                                refetch()
                                                                            })

                                                                    }}
                                                                    className="btn btn-sm btn-outline btn-primary"
                                                                >Approved</button>
                                                            </td>
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
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rider Total Parcel COD Request : {ApprovedCODRequestData?.length}</h2>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Address</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Amount</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                { 
                                                (SearchCodData.length > 0 ? SearchCodData 
                                                    : ApprovedCODRequestData)?.slice().reverse().map(ParcelRequestCOD => (
                                                        <tr key={ParcelRequestCOD?._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqName} {ParcelRequestCOD?.CODReqLastName}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.riderHub}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqEmail}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.CODReqAddress}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.ParcelTotalCODAmountOfRider}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequestCOD?.status}</td>
                                                            <td className="px-6 py-4 text-gray-800 font-medium">
                                                                <button
                                                                    onClick={async () => {
                                                                        const result = await Swal.fire({
                                                                            title: "Are you sure?",
                                                                            text: "You won't be able to revert this!",
                                                                            icon: "warning",
                                                                            showCancelButton: true,
                                                                            confirmButtonColor: "#3085d6",
                                                                            cancelButtonColor: "#d33",
                                                                            confirmButtonText: "Yes, delete it!"
                                                                        });

                                                                        if (result.isConfirmed) {
                                                                            const res = await fetch(`http://localhost:5000/AdminAllAssignParcelHere/AdminRiderParcelCodeReqAmountDelete/${ParcelRequestCOD?._id}`, {
                                                                                method: "DELETE",
                                                                            });
                                                                            const data = await res.json();

                                                                            if (data.deletedCount > 0) {
                                                                                await Swal.fire({
                                                                                    position: "top-end",
                                                                                    icon: "success",
                                                                                    title: "Parcel COD request has been deleted successfully",
                                                                                    showConfirmButton: false,
                                                                                    timer: 1500
                                                                                });

                                                                                refetch(); // Make sure `refetch` is a valid function in your component
                                                                            }
                                                                        }
                                                                    }}
                                                                    className="btn btn-sm btn-outline btn-primary"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
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
        </div>
    );
};

export default RiderCODAmountRequest;