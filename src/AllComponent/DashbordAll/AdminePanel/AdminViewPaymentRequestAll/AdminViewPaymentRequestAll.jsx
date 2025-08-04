import React, { useState } from 'react';
import "./AdminViewPaymentRequestAll.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdminViewPaymentRequestAll = () => {

    const [tabState, setTabState] = useState(1);

    // user data all find use tenStack query 
    let { refetch, data: PaymentRequestDataAll = [] } = useQuery(["AdminAllPaymentRequestData"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/AdminAllPaymentRequestData")
        return res.json()

    })
    // console.log(PaymentRequestDataAll)

    // UnPaid Payment All
    // ================================
    let UnPaidPayment = PaymentRequestDataAll.filter(Approved => Approved.Payment == "UnPaid")
    // console.log(UnPaidPayment)

    // Paid Payment All
    // ================================
    let PaidPayment = PaymentRequestDataAll.filter(Pending => Pending.Payment == "Paid")
    // console.log(PaidPayment)



    return (
        <div className='AdminViewPaymentRequestAllParent bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* USer Payment Request All Data Here !!
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>User Payment Request All</h3>

                    {/* Tabs with Different type of category Payment*/}
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
                                UnPaid Payment Request
                            </button>
                            <button onClick={() => setTabState(2)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Paid Payment Request
                            </button>
                        </div>
                    </div>

                    {/* Tab Content || Paid Unpaid Data Show Here */}
                    {/* ============================================ */}
                    <div className="">
                        {/* ============================================ */}
                        {/* (UnPaid) Data Show Here !! */}
                        {/* ============================================ */}
                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">UnPaid Payment</h2>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID / Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email / Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address / Number</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-indigo-600">Amount</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-green-600">Received Money</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-blue-600">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    UnPaidPayment.slice().reverse().map(Payment =>
                                                        <tr key={Payment?._id}>
                                                            <td className="px-6 py-4">
                                                                <p className="font-medium text-base text-gray-800">ID: {Payment?.ReqPaymentID}</p>
                                                                <p className="font-medium text-base text-gray-800">{Payment?.name} {Payment?.LastName}</p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p className="font-medium text-base text-gray-800">{Payment?.ReqUserEmail}</p>
                                                                <p className="font-medium text-base text-gray-800">{Payment?.UserPaymentReqDate}</p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p className="font-medium text-base text-gray-800">{Payment?.Address}</p>
                                                                <p className="font-medium text-base text-gray-800">{Payment?.Phone}</p>
                                                            </td>
                                                            {/* Amount */}
                                                            <td className="px-6 py-4">
                                                                <p className="font-semibold text-base text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {Payment?.totalBalanceUser} Tk.
                                                                </p>
                                                            </td>
                                                            {/* Received Money */}
                                                            <td className="px-6 py-4">
                                                                <p className="font-semibold text-base text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {Payment?.ReqPay}
                                                                </p>
                                                            </td>
                                                            {/* Status */}
                                                            <td className="px-6 py-4">
                                                                <p className={`font-semibold text-base px-2 py-1 rounded-md inline-block shadow-sm ${Payment?.Payment === 'Paid' ? 'text-green-700 bg-green-100' : 'text-yellow-700 bg-yellow-100'
                                                                    }`}>
                                                                    {Payment?.Payment}
                                                                </p>
                                                            </td>
                                                            {/* Action */}
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => {
                                                                        fetch(`https://server.trustereocourier.com.bd/AdminPaidUserPaymentRequestData/${Payment?._id}`, {
                                                                            method: "PATCH",
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    Swal.fire({
                                                                                        position: 'top-end',
                                                                                        icon: 'success',
                                                                                        title: 'PAyment Request Paid Success',
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                }
                                                                                refetch()
                                                                            })
                                                                    }}
                                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow-sm text-sm">
                                                                    Approve Paid
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            </div>
                        }

                        {/* ============================================ */}
                        {/* (Paid) Data Show Here !! */}
                        {/* ============================================ */}
                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">UnPaid Payment</h2>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID / Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email / Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address / Number</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-indigo-600">Amount</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-green-600">Received Money</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-blue-600">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    PaidPayment.slice().reverse().map(Payment =>
                                                        <tr key={Payment?._id}>
                                                            <td className="px-6 py-4">
                                                                <p className="font-medium text-base text-gray-800">ID: {Payment?.ReqPaymentID}</p>
                                                                <p className="font-medium text-base text-gray-800">{Payment?.name} {Payment?.LastName}</p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p className="font-medium text-base text-gray-800">{Payment?.ReqUserEmail}</p>
                                                                <p className="font-medium text-base text-gray-800">{Payment?.UserPaymentReqDate}</p>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <p className="font-medium text-base text-gray-800">{Payment?.Address}</p>
                                                                <p className="font-medium text-base text-gray-800">{Payment?.Phone}</p>
                                                            </td>
                                                            {/* Amount */}
                                                            <td className="px-6 py-4">
                                                                <p className="font-semibold text-base text-indigo-700 bg-indigo-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {Payment?.totalBalanceUser} Tk.
                                                                </p>
                                                            </td>
                                                            {/* Received Money */}
                                                            <td className="px-6 py-4">
                                                                <p className="font-semibold text-base text-green-700 bg-green-50 px-2 py-1 rounded-md inline-block shadow-sm">
                                                                    {Payment?.ReqPay}
                                                                </p>
                                                            </td>
                                                            {/* Status */}
                                                            <td className="px-6 py-4">
                                                                <p className={`font-semibold text-base px-2 py-1 rounded-md inline-block shadow-sm ${Payment?.Payment === 'Paid' ? 'text-blue-600 bg-blue-100' : 'text-yellow-700 bg-yellow-100'
                                                                    }`}>
                                                                    {Payment?.Payment}
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    )
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

export default AdminViewPaymentRequestAll;