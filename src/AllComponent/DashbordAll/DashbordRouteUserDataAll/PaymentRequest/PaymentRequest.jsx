import React, { useContext } from 'react';
import "./PaymentRequest.css"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../../Hook/useRole';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import UserPendingPickupRequest from '../UserMyPickupParcel/UserPendingPickupRequest/UserPendingPickupRequest';
import UserApprovedPickupRequest from '../UserMyPickupParcel/UserApprovedPickupRequest/UserApprovedPickupRequest';


const PaymentRequest = () => {

    // ===================================================
    // Tab Function Create Start
    // ===================================================
    let [toggle, setToggle] = useState(1)
    const [activeTab, setActiveTab] = useState(1); // Track active tab

    let updateToggle = (id) => {
        setToggle(id)
        setActiveTab(id);
    }
    // ===================================================
    // Tab Function Create End
    // ===================================================

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo, status } = roles

    // =======================================

    // TODO: Data lode problems late 
    let { refetch, data: UserPickupRequestData = [] } = useQuery(["UseAllPickupRequestDataGetAll"], async () => {
        let res = await fetch(`http://localhost:5000/UseAllPickupRequestDataGetAll?email=${user?.email}`)
        return res.json()
    })

    // console.log(UserPickupRequestData)

    let PendingPickupRequestData = UserPickupRequestData.filter(Pending => Pending.status == "Pending")
    // console.log(PendingPickupRequestData)
    let ApprovedPickupRequestData = UserPickupRequestData.filter(Approved => Approved.status == "Approved")
    // console.log(ApprovedPickupRequestData)


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
                            const UseEmail = user?.email;
                            // console.log({ trxId, method, amount, charge, finalAmount,UseEmail  });

                            let allInfo = { trxId, method, amount, charge, finalAmount, UseEmail, status: "Pending" }

                            // Payment request data insert 
                            // =================================
                            try {
                                let res = await fetch("http://localhost:5000/UserAddBalanceReq", {
                                    method: "POST",
                                    header: {
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
                                <input type="text" id="trxId" name="trxId" placeholder="Enter TRX ID" className="input input-bordered w-full" required />
                            </div>

                            {/* Payment Method */}
                            <div className="mb-4">
                                <label htmlFor="method" className="block text-gray-700 font-medium mb-1">Payment Method</label>
                                <select id="method" name="method" className="select select-bordered w-full" required>
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
                                <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Amount</label>
                                <input type="number" id="amount" name="amount" placeholder="Enter Amount (৳)" className="input input-bordered w-full" required />
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-full">Submit Payment Request</button>
                        </form>

                    </div>

                    {/* =========================================== */}
                    {/* User All Payment Request Data See */}
                    {/* =========================================== */}

                    <div className="PaymentRequest bg-white p-[28px] rounded-[8px] mt-8 shadow-md">

                        <h2 className='text-black text-[22px] text-center font-[600]'>Payment Request Data</h2>

                        <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                        {/* ============================================= */}
                        {/* Tap panel select to approved to pending */}
                        {/* ============================================= */}
                        <div className="md:flex items-center justify-center gap-4">
                            <button onClick={() => updateToggle(1)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Pending Payment</button>
                            <button onClick={() => updateToggle(2)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Approved Payment</button>
                        </div>
                        {/* ============================================= */}
                        {/* Pending Data */}
                        {/* ============================================= */}
                        <div className={toggle === 1 ? "show-Tab unverifiedData" : "hidden-tab"}>
                            <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Pending Payment Request Data</h2>
                            <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {PendingPickupRequestData.length}</h3>
                            {
                                PendingPickupRequestData.map(PendingData => <UserPendingPickupRequest key={PendingData._id} PendingData={PendingData} refetch={refetch}></UserPendingPickupRequest>)
                            }
                        </div>
                        {/* ============================================= */}
                        {/* Approved Data */}
                        {/* ============================================= */}
                        <div className={toggle === 2 ? "show-Tab unverifiedData" : "hidden-tab"}>
                            <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Approved Payment Request Data</h2>
                            <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {ApprovedPickupRequestData.length}</h3>
                            {
                                ApprovedPickupRequestData.map(ApprovedData => <UserApprovedPickupRequest key={ApprovedData._id} ApprovedData={ApprovedData} refetch={refetch}></UserApprovedPickupRequest>)
                            }
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default PaymentRequest;