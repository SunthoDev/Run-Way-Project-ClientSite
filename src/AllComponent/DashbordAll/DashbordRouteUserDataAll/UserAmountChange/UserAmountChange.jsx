import React, { useContext } from 'react';
import "./UserAmountChange.css"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UserAmountUpdateUnverifiedData from './UserAmountUpdateUnverifiedData/UserAmountUpdateUnverifiedData';
import UserAmountUpdateVerifiedData from './UserAmountUpdateVerifiedData/UserAmountUpdateVerifiedData';
import useRole from '../../../../Hook/useRole';
import { useState } from 'react';

const UserAmountChange = () => {

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
    let { refetch, data: UserAmountChange = [] } = useQuery(["UseAllAmountChangeDataGet"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/UseAllAmountChangeDataGet?email=${user?.email}`)
        return res.json()
    })

    // console.log(UserAmountChange)

    // Amount change unverified All Data
    let AmountChangeParcelDataUnverified = UserAmountChange.filter(AmountChange => AmountChange.AmountChangeAdminStatus == "unverified")

    // console.log(AmountChangeParcelDataUnverified)

    // Amount change verified All Data
    let AmountChangeParcelDataVerified = UserAmountChange.filter(AmountChange => AmountChange.AmountChangeAdminStatus == "verified")

    // console.log(AmountChangeParcelDataVerified)


    return (
        <div className='UserAmountChange bg-[#F6F6F6]'>
            {
                RoutePasswordDetails?.AmountChangePass === "yes" && !isVerified ? (
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
                    <div className="AmountChange md:px-4 my-4">

                        <h2 className='text-black text-[22px] text-center font-[600]'>All Amount Change Data</h2>

                        <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                        {/* ============================================= */}
                        {/* Tap panel select to approved to pending */}
                        {/* ============================================= */}
                        <div className="md:flex items-center justify-center gap-4">
                            <button onClick={() => updateToggle(1)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Unverified Amount</button>
                            <button onClick={() => updateToggle(2)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Verified Amount</button>
                        </div>

                        {/* ============================================= */}
                        {/* unverified Data */}
                        {/* ============================================= */}
                        <div className={toggle === 1 ? "show-Tab unverifiedData" : "hidden-tab"}>
                            <h2 className='text-black text-[22px] text-center font-[600] mt-14'>unverified Amount Change Data</h2>
                            <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {AmountChangeParcelDataUnverified.length}</h3>
                            {
                                AmountChangeParcelDataUnverified.map(AmountUnverifiedData => <UserAmountUpdateUnverifiedData key={AmountUnverifiedData._id} AmountUnverifiedData={AmountUnverifiedData} refetch={refetch}></UserAmountUpdateUnverifiedData>)
                            }
                        </div>

                        {/* ============================================= */}
                        {/* verified Data */}
                        {/* ============================================= */}
                        <div className={toggle === 2 ? "show-Tab unverifiedData" : "hidden-tab"}>
                            <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Verified Amount Change Data</h2>
                            <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {AmountChangeParcelDataVerified.length}</h3>
                            {
                                AmountChangeParcelDataVerified.map(AmountVerifiedData => <UserAmountUpdateVerifiedData key={AmountVerifiedData._id} AmountVerifiedData={AmountVerifiedData} refetch={refetch}></UserAmountUpdateVerifiedData>)
                            }
                        </div>

                    </div>
            }
        </div>
    );
};

export default UserAmountChange;