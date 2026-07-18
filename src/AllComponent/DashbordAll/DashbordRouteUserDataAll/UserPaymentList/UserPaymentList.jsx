import React, { useContext } from 'react';
import "./UserPaymentList.css"
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import UserPaymentListUnPaidData from './UserPaymentListUnPaidData/UserPaymentListUnPaidData';
import UserPaymentListPaidData from './UserPaymentListPaidData/UserPaymentListPaidData';
import useRole from '../../../../Hook/useRole';
import { useState } from 'react';

const UserPaymentList = () => {

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
    // 📦 De-structure ing of user data !!
    const {
        _id, status, name, LastName, BusinessName, Address, RoutePasswordDetails,
        Phone, email, photo, userId, role, Districts, PoliceStations, date
    } = roles || {};

    // Router password verify bellow !!
    // ===============================================
    const [isVerified, setIsVerified] = useState(false);

    // TODO: Data lode problems late 
    let { refetch, data: UserPaymentRequestDataAll = [] } = useQuery(["UseAllPaymentRequestDataGetAll"], async () => {
        let res = await fetch(`http://localhost:5000/UseAllPaymentRequestDataGetAll?email=${user?.email}`)
        return res.json()
    })
    // console.log(UserPaymentRequestDataAll)

    let PaidRequestPayment = UserPaymentRequestDataAll.filter(PaidPayment => PaidPayment.Payment == "Paid")
    // console.log(PaidRequestPayment)
    let UnPaidRequestPayment = UserPaymentRequestDataAll.filter(PaidPayment => PaidPayment.Payment == "UnPaid")
    // console.log(UnPaidRequestPayment)


    return (
        <div className='UserPaymentList bg-[#F6F6F6]'>
            {
                RoutePasswordDetails?.PaymentListPass === "yes" && !isVerified ? (
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
                    ) :
                        <div className="PaymentRequest px-[12px] md:px-4 my-4">

                            <h2 className='text-black text-[22px] text-center font-[600]'>All Payment Request Data</h2>

                            <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                            {/* ============================================= */}
                            {/* Tap panel select to approved to pending */}
                            {/* ============================================= */}
                            <div className="md:flex items-center justify-center gap-4">
                                <button onClick={() => updateToggle(1)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Unpaid Payment</button>
                                <button onClick={() => updateToggle(2)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Paid Payment</button>
                            </div>
                            {/* ============================================= */}
                            {/* Paid Data */}
                            {/* ============================================= */}
                            <div className={toggle === 1 ? "show-Tab unverifiedData" : "hidden-tab"}>
                                <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Unpaid Payment Request Data</h2>
                                <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {UnPaidRequestPayment.length}</h3>
                                {
                                    UnPaidRequestPayment.map(UnPaidPaymentData => <UserPaymentListUnPaidData key={UnPaidPaymentData._id} UnPaidPaymentData={UnPaidPaymentData} refetch={refetch}></UserPaymentListUnPaidData>)
                                }
                            </div>

                            {/* ============================================= */}
                            {/* Unpaid Data */}
                            {/* ============================================= */}
                            <div className={toggle === 2 ? "show-Tab unverifiedData" : "hidden-tab"}>
                                <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Paid Payment Request Data</h2>
                                <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {PaidRequestPayment.length}</h3>
                                {
                                    PaidRequestPayment.map(PaidPaymentData => <UserPaymentListPaidData key={PaidPaymentData._id} PaidPaymentData={PaidPaymentData} refetch={refetch}></UserPaymentListPaidData>)
                                }

                            </div>

                        </div>
            }
        </div>
    );
};

export default UserPaymentList;