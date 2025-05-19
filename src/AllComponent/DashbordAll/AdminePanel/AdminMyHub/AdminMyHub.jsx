import React from 'react';
import "./AdminMyHub.css"
import { useQuery } from '@tanstack/react-query';
import AdminMyHubAllPendingData from './AdminMyHubAllPendingData/AdminMyHubAllPendingData';
import AdminMyHubAllApprovedData from './AdminMyHubAllApprovedData/AdminMyHubAllApprovedData';

const AdminMyHub = () => {

    // user data all find use tenStack query 
    let { refetch, data: HubRequestDataAll = [] } = useQuery(["AdminAllPickupData"], async () => {
        let res = await fetch("http://localhost:5000/AdminAllPickupData")
        return res.json()

    })

    // console.log(HubRequestDataAll)

    // Approved User
    let UserPendingHub = HubRequestDataAll.filter(Pending => Pending.status == "Pending")
    // console.log(UserPendingHub)

    // UnApproved User
    let UserApprovedHub = HubRequestDataAll.filter(Approved => Approved.status == "Approved")
    // console.log(UserApprovedHub)



    return (
        <div className='AdminViewPaymentRequestAll mx-8 my-8'>

            <div className='UnPaid'>
                <h3 className='text-black text-[24px] font-[600] text-center'>Pickup Request All Pending Data</h3>
                <h3 className='TotalData text-left'>Total UnPaid Payment: {UserPendingHub.length}</h3>
                {
                    UserPendingHub.map(PendingAllData => <AdminMyHubAllPendingData key={PendingAllData._id} PendingAllData={PendingAllData} refetch={refetch}></AdminMyHubAllPendingData>)
                }

            </div>

            <div className='Paid mt-14'>
                <h3 className='text-black text-[24px] font-[600] text-center'>Pickup Request All Approved Data</h3>
                <h3 className='TotalData text-left'>Total Paid Payment: {UserApprovedHub.length}</h3>

                {
                    UserApprovedHub.map(ApprovedAllData => <AdminMyHubAllApprovedData key={ApprovedAllData._id} ApprovedAllData={ApprovedAllData} refetch={refetch}></AdminMyHubAllApprovedData>)
                }
            </div>

        </div>
    );
};

export default AdminMyHub;