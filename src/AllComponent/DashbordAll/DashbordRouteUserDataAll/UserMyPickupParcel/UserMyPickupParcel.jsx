import React, { useContext } from 'react';
import "./UserMyPickupParcel.css"
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import UserApprovedPickupRequest from './UserApprovedPickupRequest/UserApprovedPickupRequest';
import UserPendingPickupRequest from './UserPendingPickupRequest/UserPendingPickupRequest';
import useRole from '../../../../Hook/useRole';
import { useState } from 'react';

const UserMyPickupParcel = () => {

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
    let { refetch, data: UserPickupRequestData = [] } = useQuery(["PickupRequestWithManegeAdminUsers_PickupRequestAllDataFindByEmail"], async () => {
        let res = await fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/PickupRequestAllDataFindByEmail?email=${user?.email}`)
        return res.json()
    })

    // console.log(UserPickupRequestData)

    let PendingPickupRequestData = UserPickupRequestData.filter(Pending => Pending.status == "Pending")
    // console.log(PendingPickupRequestData)
    let ApprovedPickupRequestData = UserPickupRequestData.filter(Approved => Approved.status == "Approved")
    // console.log(ApprovedPickupRequestData)


    return (
        <div className='UserMyPickupParcel bg-[#F6F6F6]'>

            {status == "pending" ?
                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>
                :

                <div className="PickupRequest px-[12px] md:px-4 my-4">

                    <h2 className='text-black text-[22px] text-center font-[600]'>All Pickup Request Data</h2>

                    <div className="Horijontal bg-[#d4d2d2] my-[12px] w-[full] h-[1px]"></div>

                    {/* ============================================= */}
                    {/* Tap panel select to approved to pending */}
                    {/* ============================================= */}
                    <div className="md:flex items-center justify-center gap-4">
                        <button onClick={() => updateToggle(1)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Pending Parcel</button>
                        <button onClick={() => updateToggle(2)} className='text-white bg-[#218838] mt-3 mt:pt-0  text-[16px] rounded-[6px] py-[8px] px-[16px]'>Approved Parcel</button>
                    </div>
                    {/* ============================================= */}
                    {/* Pending Data */}
                    {/* ============================================= */}
                    <div className={toggle === 1 ? "show-Tab unverifiedData" : "hidden-tab"}>
                        <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Pending Pickup Request Data</h2>
                        <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {PendingPickupRequestData.length}</h3>
                        {
                            PendingPickupRequestData.map(PendingData => <UserPendingPickupRequest key={PendingData._id} PendingData={PendingData} refetch={refetch}></UserPendingPickupRequest>)
                        }
                    </div>
                    {/* ============================================= */}
                    {/* Approved Data */}
                    {/* ============================================= */}
                    <div className={toggle === 2 ? "show-Tab unverifiedData" : "hidden-tab"}>
                        <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Approved Pickup Request Data</h2>
                        <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {ApprovedPickupRequestData.length}</h3>
                        {
                            ApprovedPickupRequestData.map(ApprovedData => <UserApprovedPickupRequest key={ApprovedData._id} ApprovedData={ApprovedData} refetch={refetch}></UserApprovedPickupRequest>)
                        }
                    </div>

                </div>
            }

        </div>
    );
};

export default UserMyPickupParcel;


