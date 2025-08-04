import React, { useContext } from 'react';
import "./AddBalancePayRequest.css"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../../Hook/useRole';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import moment from "moment";


const AddBalancePayRequest = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo, status } = roles
    const [tabState, setTabState] = useState(1);
    // ====================================================================================



    // ===========================================================================================
    // My All Add Balanced Request Data Find
    // =================================================
    let { refetch, data: BalanceReqAllData = [] } = useQuery(["BalanceReqUserProcessAdmin_UserAllAddBalanceReqData"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/BalanceReqUserProcessAdmin/UserAllAddBalanceReqData/${user?.email}`)
        return res.json()
    })
    // console.log(BalanceReqAllData)

    let PendingBalanceReqAllData = BalanceReqAllData.filter(Pending => Pending.status == "Pending")
    // console.log(PendingBalanceReqAllData)
    let ApprovedBalanceReqAllData = BalanceReqAllData.filter(Approved => Approved.status == "Approved")
    // console.log(ApprovedBalanceReqAllData)



    return (
        <div className='PaymentRequestParent bg-[#F6F6F6]'>

            {status == "pending" ?
                <h2 className='text-black font-[700] text-center mt-[40px] text-[28px]'>Please Waite, For Admin Approved</h2>
                :
                <div className="px-[12px] md:px-4 my-4">

                    <h2 className='text-black font-[700] text-left text-[24px]'>💳 User Can Payment Request Here!</h2>

                    {/* =========================================== */}
                    {/* UserSend Payment Request Data */}
                    {/* =========================================== */}
                    <div className="PaymentRequest bg-white p-[28px] rounded-[8px] mt-8 shadow-md">

                        <h2 className="text-xl font-bold text-[#1e40af] mb-4">💳 Payment Request</h2>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const trxId = e.target.trxId.value;
                            const method = e.target.method.value;
                            const amount = parseFloat(e.target.amount.value);
                            const charge = (amount * 0.015).toFixed(2);
                            const finalAmount = (amount - charge).toFixed(2);
                            const UserEmail = user?.email;
                            let date = moment().format("MM/DD/YYYY")
                            let time = moment().format("hh:mm A")
                            // console.log({ trxId, method, amount, charge, finalAmount,UseEmail  });

                            let allInfo = { trxId, method, amount, charge, finalAmount, UserEmail, status: "Pending", date, time, userId }
                            // console.log(allInfo)

                            // Payment request data insert 
                            // =================================
                            try {
                                let res = await fetch("https://server.trustereocourier.com.bd/BalanceReqUserProcessAdmin/userSendAddBalanceReq", {
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify(allInfo)
                                })
                                let result = await res.json()

                                if (res.ok) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: '🎉 Congratulation! Payment Request Success.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
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

                        }}>
                            {/* TRX ID */}
                            <div className="mb-4">
                                <label htmlFor="trxId" className="block text-gray-700 font-medium mb-1">Transaction ID</label>
                                <input type="text" id="trxId" name="trxId" placeholder="Enter TRX ID" className="input input-bordered w-full bg-white" required />
                            </div>

                            {/* Payment Method */}
                            <div className="mb-4">
                                <label htmlFor="method" className="block text-gray-700 font-medium mb-1">Payment Method</label>
                                <select id="method" name="method" className="select select-bordered w-full bg-white" required>
                                    <option value="">Select Method</option>
                                    <option value="Bkash">Bkash</option>
                                    <option value="Nagad">Nagad</option>
                                    <option value="Rocket">Rocket</option>
                                    <option value="Cash">Cash</option>
                                </select>
                            </div>

                            {/* Charge Message */}
                            <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-sm border border-yellow-300">
                                ⚠️ Note: 1.5% processing fee will be deducted from the total amount.
                            </div>

                            {/* Amount */}
                            <div className="mb-6">
                                <label htmlFor="amount" className="block text-gray-700 font-medium mb-1 ">Amount</label>
                                <input type="number" id="amount" name="amount" placeholder="Enter Amount (৳)" className="input input-bordered w-full bg-white" required />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-full">Submit Payment Request</button>
                        </form>

                    </div>

                    {/* ===================================================== */}
                    {/* My all Add balance request pending / approved data */}
                    {/* ===================================================== */}
                    <div className="bg-white p-6 rounded-xl shadow-md mt-14">

                        <h3 className='text-black text-[24px] font-[600] text-left pb-4'>My all add balance request data</h3>

                        {/* Tabs bar */}
                        {/* ==================================== */}
                        {/* Tabs */}
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

                        {/* Tab Content*/}
                        {/* ==================================== */}
                        <div className="">

                            {/* ==================================== */}
                            {/* Users Pending Data */}
                            {/* ==================================== */}

                            {tabState === 1 &&
                                <div className="flex justify-center">
                                    <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Balance Request: {PendingBalanceReqAllData?.length}</h2>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Pay Method / Trx ID</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Charge</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User Email</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                    </tr>
                                                </thead>
                                                {/* date, time, method,amount, trxId,charge, finalAmount,UserEmail, , status,status,userId  */}
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {PendingBalanceReqAllData?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.date}, {item?.time}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.method} <br /> Trx ID: {item?.trxId}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.amount} </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.charge} </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.UserEmail} <br /> User Id: {item?.userId} </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>

                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => {
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
                                                                                try {
                                                                                    let res = await fetch(`https://server.trustereocourier.com.bd/BalanceReqUserProcessAdmin/AdminDeleteUserAddBalanceReqData/${item?._id}`, {
                                                                                        method: "DELETE",
                                                                                    })
                                                                                    let result = await res.json()

                                                                                    if (res.ok) {
                                                                                        Swal.fire({
                                                                                            icon: "success",
                                                                                            title: "Deleted!",
                                                                                            text: "Request Balance Data Delete Success.",
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
                                                                    }}
                                                                    className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                                >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            }

                            {/* ==================================== */}
                            {/*  Users Approved Data */}
                            {/* ==================================== */}

                            {tabState === 2 &&
                                <div className="flex justify-center">
                                    <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Approved Balance Request: {ApprovedBalanceReqAllData?.length}</h2>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Pay Method / Trx ID</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Charge</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User Email</th>
                                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    </tr>
                                                </thead>
                                                {/* date, time, method,amount, trxId,charge, finalAmount,UserEmail, , status,status,userId  */}
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {ApprovedBalanceReqAllData?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.date}, {item?.time}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.method} <br /> Trx ID: {item?.trxId}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.amount} </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.charge} </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.UserEmail} <br /> User Id: {item?.userId} </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>

                    </div>

                </div>
            }
        </div>
    );
};

export default AddBalancePayRequest;