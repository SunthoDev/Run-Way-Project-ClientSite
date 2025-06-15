import { useState } from 'react';
import "./BalanceRequestAllUser.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const BalanceRequestAllUser = () => {

    const [tabState, setTabState] = useState(1);
    let navigate = useNavigate()


    // ===========================================================================================
    // All Add Balanced Request Data Find
    // =================================================
    let { refetch, data: BalanceReqAllData = [] } = useQuery(["BalanceReqUserProcessAdmin_AllAddBalanceRequestDataGet"], async () => {
        let res = await fetch(`http://localhost:5000/BalanceReqUserProcessAdmin/AllAddBalanceRequestDataGet`)
        return res.json()
    })
    // console.log(BalanceReqAllData)

    let PendingBalanceReqAllData = BalanceReqAllData.filter(Pending => Pending.status == "Pending")
    // console.log(PendingBalanceReqAllData)
    let ApprovedBalanceReqAllData = BalanceReqAllData.filter(Approved => Approved.status == "Approved")
    // console.log(ApprovedBalanceReqAllData)





    return (
        <div className='BalanceRequestAllUserParent bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* (Pending) All PickUp Request Data See */}
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md ">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Add Balance Request All Data Show</h3>

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
                                                                                let res = await fetch(`http://localhost:5000/BalanceReqUserProcessAdmin/AdminDeleteUserAddBalanceReqData/${item?._id}`, {
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
                                                            <br />

                                                            <button onClick={() => {
                                                                navigate(`/dashboard/AdminDashboard/AdminSearchUserId/${item?.userId}`)
                                                            }} className="text-sm px-4 py-1.5 rounded-md transition text-white my-2">View Profile</button>

                                                            <br />
                                                            <button onClick={async () => {
                                                                try {
                                                                    let res = await fetch(`http://localhost:5000/BalanceReqUserProcessAdmin/AdminApprovedUserAddBalanceReqData/${item?._id}`, {
                                                                        method: "PATCH",
                                                                    });
                                                                    let result = await res.json();

                                                                    if (res.ok) {
                                                                        Swal.fire({
                                                                            icon: "success",
                                                                            title: "Approved!",
                                                                            text: "Request Balance Approved successfully.",
                                                                            timer: 1500,
                                                                            showConfirmButton: false
                                                                        });
                                                                        await refetch();
                                                                    }
                                                                } catch (err) {
                                                                    Swal.fire({ icon: "error", title: "Error!", text: err.message || "Something went wrong." });
                                                                }
                                                            }}
                                                                className="text-sm px-4 py-1.5 rounded-md transition text-gray-50">
                                                                Approved
                                                            </button>


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
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
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
                                                                                let res = await fetch(`http://localhost:5000/BalanceReqUserProcessAdmin/AdminDeleteUserAddBalanceReqData/${item?._id}`, {
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
                                                            <br />

                                                            <button onClick={() => {
                                                                navigate(`/dashboard/AdminDashboard/AdminSearchUserId/${item?.userId}`)
                                                            }} className="text-sm px-4 py-1.5 rounded-md transition text-white my-2">View Profile</button>

                                                            <br />
                                                            <button onClick={async () => {
                                                                try {
                                                                    let res = await fetch(`http://localhost:5000/BalanceReqUserProcessAdmin/AdminPendingUserAddBalanceReqData/${item?._id}`, {
                                                                        method: "PATCH",
                                                                    });
                                                                    let result = await res.json();

                                                                    if (res.ok) {
                                                                        Swal.fire({
                                                                            icon: "success",
                                                                            title: "Approved!",
                                                                            text: "Request Balance Approved successfully.",
                                                                            timer: 1500,
                                                                            showConfirmButton: false
                                                                        });
                                                                        await refetch();
                                                                    }
                                                                } catch (err) {
                                                                    Swal.fire({ icon: "error", title: "Error!", text: err.message || "Something went wrong." });
                                                                }
                                                            }}
                                                                className="text-sm px-4 py-1.5 rounded-md transition text-gray-50">
                                                                Pending
                                                            </button>

                                                        </td>
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
        </div>
    );
};

export default BalanceRequestAllUser;