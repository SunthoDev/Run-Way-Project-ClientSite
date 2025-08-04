import React, { useState } from 'react';
import "./AdminNewMerchants.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdminNewMerchants = () => {

    const [tabState, setTabState] = useState(1);

    let { refetch, data: users = [] } = useQuery(["users"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/users")
        return res.json()

    })
    // console.log(users)

    // Approved User
    // ============================
    let ApprovedUser = users.filter(Approved => Approved.status == "approved")
    // console.log(ApprovedUser)

    // Pending User
    // ============================
    let PendingUser = users.filter(Pending => Pending.status == "pending")
    // console.log(PendingUser)


    return (
        <div className='AdminViewPaymentRequestAllParent bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* User ALl Data here for approved !!
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>New Merchant All</h3>

                    {/* Tabs with Different type of category data*/}
                    {/* =============================================== */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                        {/* ================================= */}
                        {/* Tabs */}
                        {/* ================================= */}
                        <div className="flex border-b border-gray-200 space-x-4 mb-4">
                            <button onClick={() => setTabState(1)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Pending User
                            </button>
                            <button onClick={() => setTabState(2)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Approved User
                            </button>
                        </div>
                    </div>

                    {/* Tab Content || Approved and pending users here !! */}
                    {/* =================================================== */}
                    <div className="">
                        {/* ============================================ */}
                        {/* (Pending) User Show Here !! */}
                        {/* ============================================ */}
                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending User</h2>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 shadow rounded-md">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID / Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-green-600">Number</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-red-600">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    PendingUser.slice().reverse().map(User => (
                                                        <tr key={User?._id} className="hover:bg-gray-50 transition duration-200">
                                                            {/* ID / Name */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm text-gray-500">ID: {User?.userId}</p>
                                                                <p className="font-semibold text-base text-gray-800">{User?.name} {User?.LastName}</p>
                                                            </td>

                                                            {/* Email */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm text-gray-800">{User?.email}</p>
                                                            </td>

                                                            {/* Address */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm text-gray-800">{User?.Address}</p>
                                                            </td>

                                                            {/* Phone Number */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {User?.Phone}
                                                                </p>
                                                            </td>

                                                            {/* Date */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {User?.date}
                                                                </p>
                                                            </td>

                                                            {/* Status */}
                                                            <td className="px-6 py-4">
                                                                <p className={`text-sm font-medium px-2 py-1 rounded-md inline-block shadow-sm ${User?.status === 'Approved'
                                                                    ? 'text-green-700 bg-green-100'
                                                                    : 'text-yellow-700 bg-yellow-100'
                                                                    }`}>
                                                                    {User?.status}
                                                                </p>
                                                            </td>

                                                            {/* Action Button */}
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => {
                                                                        fetch(`https://server.trustereocourier.com.bd/AdminApprovedNewUser/${User?._id}`, {
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
                                                                    }}
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded shadow-sm transition">
                                                                    Approve
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

                        {/* ============================================ */}
                        {/* (Approved) User Show Here !! */}
                        {/* ============================================ */}
                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending User</h2>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 shadow rounded-md">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID / Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Address</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-green-600">Number</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-600">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-semibold text-blue-600">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    ApprovedUser.slice().reverse().map(User => (
                                                        <tr key={User?._id} className="hover:bg-gray-50 transition duration-200">
                                                            {/* ID / Name */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm text-gray-500">ID: {User?.userId}</p>
                                                                <p className="font-semibold text-base text-gray-800">{User?.name} {User?.LastName}</p>
                                                            </td>

                                                            {/* Email */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm text-gray-800">{User?.email}</p>
                                                            </td>

                                                            {/* Address */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm text-gray-800">{User?.Address}</p>
                                                            </td>

                                                            {/* Phone Number */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {User?.Phone}
                                                                </p>
                                                            </td>

                                                            {/* Date */}
                                                            <td className="px-6 py-4">
                                                                <p className="text-sm font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {User?.date}
                                                                </p>
                                                            </td>

                                                            {/* Status */}
                                                            <td className="px-6 py-4">
                                                                <p className={`text-sm font-medium px-2 py-1 rounded-md inline-block shadow-sm ${User?.status === 'Approved'
                                                                    ? 'text-green-700 bg-green-100'
                                                                    : 'text-yellow-700 bg-yellow-100'
                                                                    }`}>
                                                                    {User?.status}
                                                                </p>
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

export default AdminNewMerchants;