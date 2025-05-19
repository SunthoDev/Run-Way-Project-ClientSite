import React from 'react';
import "./AdminSearchAmountChangeUserDataAllFindEmail.css"
import { useLoaderData } from 'react-router-dom';
import AdminSearchUserAllUnverifiedData from './AdminSearchUserAllUnverifiedData/AdminSearchUserAllUnverifiedData';
import AdminSearchUserAllVerifiedData from './AdminSearchUserAllVerifiedData/AdminSearchUserAllVerifiedData';

const AdminSearchAmountChangeUserDataAllFindEmail = () => {

    let UserParcelAllData = useLoaderData()
    // console.log(data)

    // Amount change unverified All Data
    let AmountChangeParcelDataUnverified = UserParcelAllData.filter(AmountChange => AmountChange.AmountChangeAdminStatus == "unverified")

    // console.log(AmountChangeParcelDataUnverified)

    // Amount change verified All Data
    let AmountChangeParcelDataVerified = UserParcelAllData.filter(AmountChange => AmountChange.AmountChangeAdminStatus == "verified")

    // console.log(AmountChangeParcelDataVerified)

    return (
        <div className='AdminSearchAmountChangeUserDataAllFindEmail'>

            <div className="SearchAmountChangeUserDataAllFindEmail my-6 mx-6">

                <h2 className='text-black text-[22px] text-center font-[600]'>Unverified Amount Change Data</h2>

                <div className="unverifiedData">

                    {
                        AmountChangeParcelDataUnverified.map(AmountUnverifiedData => <AdminSearchUserAllUnverifiedData key={AmountUnverifiedData._id} AmountUnverifiedData={AmountUnverifiedData}></AdminSearchUserAllUnverifiedData>)
                    }

                </div>

                <div className="verifiedData">
                    <h2 className='text-black text-[22px] text-center font-[600] mt-14'>Verified Amount Change Data</h2>


                    {
                        AmountChangeParcelDataVerified.map(AmountVerifiedData => <AdminSearchUserAllVerifiedData key={AmountVerifiedData._id} AmountVerifiedData={AmountVerifiedData}></AdminSearchUserAllVerifiedData>)
                    }

                </div>









            </div>
        </div>
    );
};

export default AdminSearchAmountChangeUserDataAllFindEmail;