import React, {useState} from 'react';
import "./ApprovedParcelRoute.css"
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ApprovedParcelRoute = () => {

    // ======================================================================================================
    // Admin all standard delivery data find 
    // ===========================================================
    let { refetch, data: AllParcelData = [] } = useQuery(["AdminAllStandardDeliveryDataFind"], async () => {
        let res = await fetch("http://localhost:5000/AdminAllStandardDeliveryDataFind")
        return res.json()

    })
    // console.log(AllParcelData)

    // Delivered || PartiallyDelivered || Cancel -->> data filter here 
    // ==========================================================================
    let ApprovedPendingData = AllParcelData.filter(approved => approved?.Payment == "No" && approved?.status == "Delivered" || approved?.Payment == "No" && approved?.status == "PartiallyDelivered" || approved?.Payment == "No" && approved?.status == "Cancel")
    // console.log(ApprovedPendingData)

    // ============================================================================================================
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("http://localhost:5000/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)

    // =======================================
    // Search Parcel by (Hub) data
    // =======================================
    let [HubSearchPendingData, setHubSearchPendingData] = useState([])
    // console.log(HubSearchPendingData)





    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Delivery, Partially Delivered, Cancel Data Approved Here</h3>

                    <div className="flex justify-center">
                        <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                            {/* Search user Request Approved parcel by a Hub Name */}
                            {/* ========================================================= */}
                            <div className="flex justify-between items-center pb-4">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Data: {ApprovedPendingData.length}</h2>
                                {/* Search Section (Pending)*/}
                                {/* ==================================== */}
                                <div className="flex items-center gap-2">
                                    <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        name="stationOfHub"
                                        onBlur={(e) => {
                                            const HubName = e.target.value
                                            setHubSearchPendingData(ApprovedPendingData?.filter(Pending => Pending?.MyHub === HubName))
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

                            {/* All user Request Approved Data Show Here */}
                            {/* ========================================================= */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Email</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            ((HubSearchPendingData.length > 0 ? HubSearchPendingData :
                                                ApprovedPendingData)?.slice().reverse().map((ParcelAll) =>

                                                <tr key={ParcelAll?._id}>
                                                    <td>
                                                        <p className="font-medium text-base text-gray-800">{ParcelAll?.name}</p>
                                                        <p className="text-sm text-gray-600">{ParcelAll?.number}</p>
                                                        <p className="text-sm text-black">MyHub: {ParcelAll?.MyHub}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-gray-600">Parcel Category: {ParcelAll?.ParcelCategory}</p>
                                                        <p className="text-sm text-gray-800 font-medium">Parcel Id: {ParcelAll?.StandardParcelId}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-gray-600">{ParcelAll?.address}</p>
                                                        <p className="text-sm text-gray-800 font-medium">P.s: {ParcelAll?.policeStation}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-semibold text-green-600">Amount: {ParcelAll?.CodAmount} ৳</p>
                                                        <p className="text-sm text-blue-600">Delivery Charge: {ParcelAll?.DeliveryCharge} ৳</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-gray-500">{ParcelAll?.date}, {ParcelAll?.time} </p>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`badge badge-sm ${ParcelAll?.status === "Pending" && "badge-success"}`}
                                                        >
                                                            {ParcelAll?.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-[8px]">
                                                        <Link
                                                            to={`/dashboard/AdminDashboard/UserTemporeryInvoiceAllStandardData/${ParcelAll?.StandardParcelId}`}
                                                        >
                                                            <button className="btn btn-sm btn-outline btn-primary mb-[8px]">View</button>
                                                        </Link>
                                                        <br />
                                                        <button onClick={() => {
                                                            fetch(`http://localhost:5000/AdminApprovedParcelStandardDataYesPayment/${ParcelAll?._id}`, {
                                                                method: "PATCH",
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    if (data.modifiedCount > 0) {
                                                                        Swal.fire({
                                                                            position: 'top-end',
                                                                            icon: 'success',
                                                                            title: 'Parcel Approved Success',
                                                                            showConfirmButton: false,
                                                                            timer: 1500
                                                                        })
                                                                    }
                                                                    refetch()
                                                                })

                                                        }} className="btn btn-sm btn-outline btn-primary">
                                                            Approved
                                                        </button>
                                                    </td>
                                                </tr>))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovedParcelRoute;