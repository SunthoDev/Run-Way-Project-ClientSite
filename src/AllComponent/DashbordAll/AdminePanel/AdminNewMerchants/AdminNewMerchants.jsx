import React from 'react';
import "./AdminNewMerchants.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import NewMerchantsApprovedUser from './NewMerchantsApprovedUser/NewMerchantsApprovedUser';
import NewMerchantsPendingUser from './NewMerchantsPendingUser/NewMerchantsPendingUser';

const AdminNewMerchants = () => {

    let { refetch, data: users = [] } = useQuery(["users"], async () => {
        let res = await fetch("http://localhost:5000/users")
        return res.json()

    })
    // console.log(users)

    // Approved User
    let ApprovedUser = users.filter(Approved => Approved.status == "approved")
    console.log(ApprovedUser)

    // UnApproved User
    let PendingUser = users.filter(Pending => Pending.status == "pending")
    console.log(PendingUser)


    return (
        <div className='AdminNewMerchants mx-8 my-8'>

            <div className='PendingUser'>
                <h3 className='text-black text-[24px] font-[600] text-center'>Merchant All Pending Data</h3>
                <h3 className='TotalData text-left'>Total Pending User: {PendingUser.length}</h3>
                {
                    PendingUser.map(pendingAllData => <NewMerchantsPendingUser key={pendingAllData._id} pendingAllData={pendingAllData} refetch={refetch}></NewMerchantsPendingUser>)
                }

            </div>

            <div className='ApprovedUser mt-14'>
                <h3 className='text-black text-[24px] font-[600] text-center'>Merchant All Approved Data</h3>
                <h3 className='TotalData text-left'>Total Pending User: {ApprovedUser.length}</h3>

                {
                    ApprovedUser.map(approvedAllData => <NewMerchantsApprovedUser key={approvedAllData._id} approvedAllData={approvedAllData} refetch={refetch}></NewMerchantsApprovedUser>)
                }
            </div>

        </div>
    );
};

export default AdminNewMerchants;