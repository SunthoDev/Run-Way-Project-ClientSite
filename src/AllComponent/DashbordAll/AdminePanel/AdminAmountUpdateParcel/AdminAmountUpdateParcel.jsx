import React, { useState } from 'react';
import "./AdminAmountUpdateParcel.css"
import { useQuery } from '@tanstack/react-query';
import AdminAmountUpdateParcelUnverifiedData from './AdminAmountUpdateParcelUnverifiedData/AdminAmountUpdateParcelUnverifiedData';
import AdminAmountUpdateParcelVerifiedData from './AdminAmountUpdateParcelVerifiedData/AdminAmountUpdateParcelVerifiedData';
import { Link } from 'react-router-dom';

const AdminAmountUpdateParcel = () => {

    // Admin all standard delivery data find 
    let { refetch, data: AmountChangeParcel = [] } = useQuery(["AdminAllStandardDeliveryDataFindAmountChange"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/AdminAllStandardDeliveryDataFindAmountChange")
        return res.json()

    })

    // console.log(AmountChangeParcel)

    // Amount change unverified All Data
    let AmountChangeParcelDataUnverified = AmountChangeParcel.filter(AmountChange => AmountChange.AmountChangeAdminStatus == "unverified")

    // console.log(AmountChangeParcelDataUnverified)

    // Amount change verified All Data
    let AmountChangeParcelDataVerified = AmountChangeParcel.filter(AmountChange => AmountChange.AmountChangeAdminStatus == "verified")

    // console.log(AmountChangeParcelDataVerified)



    // ================================================
    // Admin Search Email Id.  And find user Parcel amount change All Data
    let [UserAmountChange, setUserAmountChange] = useState("")

    // admin find user standard parcel id
    let handleAdminUserParcelAmountChangeSearchEmail = (event) => {
        setUserAmountChange(event.target.value)
    }




    return (
        <div className='AdminAmountUpdateParcel'>

            <div className="AmountUpdateParcel my-6 mx-6">

                <h2 className='text-black text-[22px] text-center font-[600]'>Unverified Amount Change Data</h2>

                < div className="Search relative w-[100%] md:w-[40%] mx-auto mt-[28px]" >
                    <input onBlur={handleAdminUserParcelAmountChangeSearchEmail} type="text" placeholder='Search User Email & See Parcel' className='w-[100%]' />

                    <Link to={`/dashboard/AdminDashboard/AdminAmountChangeUserDataFind/${UserAmountChange}`}>
                        <button disabled={UserAmountChange === ""}>
                            <i className="ParcelSearch fa fa-search absolute" aria-hidden="true"></i>
                        </button>

                    </Link>

                </div >

                <div className="flex items-center justify-between">

                    <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {AmountChangeParcelDataUnverified.length}</h3>

                    <button className='AllApprovedData'>All Verified</button>

                </div>

                <div className="unverifiedData">

                    {
                        AmountChangeParcelDataUnverified.map(AmountUnverifiedData => <AdminAmountUpdateParcelUnverifiedData key={AmountUnverifiedData._id} AmountUnverifiedData={AmountUnverifiedData} refetch={refetch}></AdminAmountUpdateParcelUnverifiedData>)
                    }

                </div>


                <div className="unverifiedData">
                    <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Verified Amount Change Data</h2>
                    <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {AmountChangeParcelDataVerified.length}</h3>

                    <div className="overflow-x-auto bg-white mt-6">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>ADDRESS</th>
                                    <th>STATUS</th>
                                    <th>NUMBER</th>
                                    <th>COD AMOUNT</th>
                                    <th>DELIVERY CHARGE</th>
                                    <th>VIEW</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    AmountChangeParcelDataVerified.map(AmountVerifiedData => <AdminAmountUpdateParcelVerifiedData key={AmountVerifiedData._id} AmountVerifiedData={AmountVerifiedData} refetch={refetch}></AdminAmountUpdateParcelVerifiedData>)
                                }

                            </tbody>

                        </table>
                    </div>



                </div>





            </div>

        </div>
    );
};

export default AdminAmountUpdateParcel;