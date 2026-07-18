import React, { useState } from 'react';
import "./UserBankDetailsAdd.css"
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';


const UserBankDetailsAdd = () => {

    let BankDetailsAddUserData = useLoaderData()
    //    console.log(BankDetailsAddUserData)
    let { email, _id, name, LastName, userId } = BankDetailsAddUserData
    const [roles] = useRole()
    let { status, RoutePasswordDetails } = roles

    // Router password verify bellow !!
    // ===============================================
    const [isVerified, setIsVerified] = useState(false);

    let handleBankInformationAddUser = (event) => {
        event.preventDefault()
        let BankName = event.target.bankName.value
        let AccountName = event.target.accountName.value
        let AccountNumber = event.target.accountNumber.value
        let BranchName = event.target.branchName.value
        let RoutingNo = event.target.routingNo.value
        let BakashNo = event.target.bkashNum.value
        let RocketNo = event.target.rocketNum.value
        let NagadNo = event.target.nagadNum.value

        let allBankInformationData = { BankName, AccountName, AccountNumber, BranchName, RoutingNo, BakashNo, RocketNo, NagadNo }
        // console.log(allBankInformationData)

        fetch(`http://localhost:5000/UserBankDetailsAddAndUpdate/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allBankInformationData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Bank Details Add  Success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div>
            {
                RoutePasswordDetails?.AddBankDetailsPass === "yes" && !isVerified ? (
                    /* 🛡️ পাসওয়ার্ড ভেরিফিকেশন বক্স */
                    <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-xs my-10 max-w-md mx-auto">
                        <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <i className="fa fa-lock text-xl" aria-hidden="true"></i>
                        </div>
                        <h2 className="text-lg font-black text-black uppercase tracking-wide">
                            Route Security Active
                        </h2>
                        <p className="text-xs text-black/50 font-bold mt-1 max-w-xs leading-relaxed">
                            This area is password protected. Enter your Route Password to access your profile data.
                        </p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                let RoutePass = e.target.RoutePass.value;
                                if (RoutePass === RoutePasswordDetails?.RoutePass) {
                                    setIsVerified(true); // পাসওয়ার্ড মিললে কনটেন্ট আনলক হবে
                                    Swal.fire({
                                        toast: true,
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Access Granted',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Wrong Password',
                                        text: 'The route password you entered is incorrect!',
                                        confirmButtonColor: '#000000'
                                    });
                                }
                            }}
                            className="w-full mt-6 space-y-4"
                        >
                            <input
                                type="password"
                                name="RoutePass"
                                required
                                placeholder="Enter Route Password"
                                className="w-full px-3 py-2.5 bg-black/[0.02] border border-black/10 rounded-xl text-xs font-bold text-black text-center focus:outline-none focus:border-black transition-all tracking-widest"
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-black/90 active:scale-98 transition-all cursor-pointer shadow-xs"
                            >
                                Unlock Profile
                            </button>
                        </form>
                    </div>
                ) :
                    status === "pending" ? (
                        /* ⏳ পেন্ডিং ভেরিফিকেশন নোটিশ (সুপার ক্লিন ও মডার্ন লুক) */
                        <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 p-12 rounded-2xl shadow-2xs my-10 max-w-xl mx-auto">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4 animate-pulse">
                                <i className="fa fa-clock-o text-3xl" aria-hidden="true"></i>
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-wide">
                                Account Verification Pending
                            </h2>
                            <p className="text-xs md:text-sm text-black/50 font-bold mt-2 max-w-sm leading-relaxed">
                                Please wait while our admin team reviews and approves your profile. You'll get full access once verified.
                            </p>
                        </div>
                    )
                        :
                        <div className='UserBankDetailsAdd bg-white mx-2 md:mx-6 p-8 my-4 rounded-[8px]'>
                            <h3 className='text-black font-[600] text-center text-[20px] mb-4'>Add Payment Information {name}{LastName}. ID: #{userId}</h3>
                            <div className='BankDetailsAdd w-[100%] md:w-[80%] mx-auto'>
                                <form onSubmit={handleBankInformationAddUser} className="text-black font-[600] px-2 md:flex justify-between gap-6">
                                    <div className="">
                                        <h3 className='mb-[14px] text-center'>Bank Account Information</h3>
                                        <div className="Bank">
                                            <h3>Bank Name</h3>
                                            <input defaultValue={BankDetailsAddUserData?.BankName ? BankDetailsAddUserData.BankName : ""} name='bankName' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                        <div className="Bank">
                                            <h3>Account Name</h3>
                                            <input defaultValue={BankDetailsAddUserData?.AccountName ? BankDetailsAddUserData.AccountName : ""} name='accountName' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                        <div className="Bank">
                                            <h3>Account Number</h3>
                                            <input defaultValue={BankDetailsAddUserData?.AccountNumber ? BankDetailsAddUserData.AccountNumber : ""} name='accountNumber' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                        <div className="Bank">
                                            <h3>Branch Name</h3>
                                            <input defaultValue={BankDetailsAddUserData?.BranchName ? BankDetailsAddUserData.BranchName : ""} name='branchName' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                        <div className="Bank">
                                            <h3>Routing No</h3>
                                            <input defaultValue={BankDetailsAddUserData?.RoutingNo ? BankDetailsAddUserData.RoutingNo : ""} name='routingNo' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                    </div>

                                    <div className="mt-[24px] md:mt-0">
                                        <h3 className='mb-[14px]'>Mobile Financial Account</h3>
                                        <div className="Bank">
                                            <h3>Bkash Number</h3>
                                            <input defaultValue={BankDetailsAddUserData?.BakashNo ? BankDetailsAddUserData.BakashNo : ""} name='bkashNum' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                        <div className="Bank">
                                            <h3>Rocket Number</h3>
                                            <input defaultValue={BankDetailsAddUserData?.RocketNo ? BankDetailsAddUserData.RocketNo : ""} name='rocketNum' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                        <div className="Bank">
                                            <h3>Nagad Number</h3>
                                            <input defaultValue={BankDetailsAddUserData?.NagadNo ? BankDetailsAddUserData.NagadNo : ""} name='nagadNum' className='text-black font-[600] px-2 w-[100%]' type="text" />
                                        </div>
                                        <button className='Submit' type='submit'>Add Bank Details</button>

                                    </div>

                                </form>
                            </div>
                        </div>
            }
        </div>
    );
};

export default UserBankDetailsAdd;