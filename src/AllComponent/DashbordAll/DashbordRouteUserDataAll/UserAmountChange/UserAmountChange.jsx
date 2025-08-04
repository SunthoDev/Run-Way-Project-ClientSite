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
    let { role, Address, BusinessName, name, userId, photo, status } = roles

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
            {status == "pending" ?

                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>
                :
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