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
    let { role, Address, BusinessName, name, userId, photo, status } = roles

    // TODO: Data lode problems late 
    let { refetch, data: UserPaymentRequestDataAll = [] } = useQuery(["UseAllPaymentRequestDataGetAll"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/UseAllPaymentRequestDataGetAll?email=${user?.email}`)
        return res.json()
    })
    // console.log(UserPaymentRequestDataAll)

    let PaidRequestPayment = UserPaymentRequestDataAll.filter(PaidPayment => PaidPayment.Payment == "Paid")
    // console.log(PaidRequestPayment)
    let UnPaidRequestPayment = UserPaymentRequestDataAll.filter(PaidPayment => PaidPayment.Payment == "UnPaid")
    // console.log(UnPaidRequestPayment)


    return (
        <div className='UserPaymentList bg-[#F6F6F6]'>
            {status == "pending" ?

                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>
                :
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