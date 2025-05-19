import React from 'react';
import "./ApprovedParcelRoute.css"
import { useQuery } from '@tanstack/react-query';
import ApprovedParcelAllData from './ApprovedParcelAllData/ApprovedParcelAllData';

const ApprovedParcelRoute = () => {

    // Admin all standard delivery data find 
    let { refetch, data: AllParcelData = [] } = useQuery(["AdminAllStandardDeliveryDataFind"], async () => {
        let res = await fetch("http://localhost:5000/AdminAllStandardDeliveryDataFind")
        return res.json()

    })

    // console.log(AllParcelData)

    // Approved PendingData data find 
    let ApprovedPendingData = AllParcelData.filter(approved => approved?.Payment == "No" && approved?.status == "Delivered" || approved?.Payment == "No" && approved?.status == "PartiallyDelivered" || approved?.Payment == "No" && approved?.status == "Cancel")


    console.log(ApprovedPendingData)



    return (
        <div className='AdminApprovedParcelRoute'>

            <div className="ApprovedParcelAl my-6 mx-6">

                <div className="flex items-center justify-between">

                    <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {ApprovedPendingData.length}</h3>

                    <button className='AllApprovedData'>All Approved</button>

                </div>

                {
                    ApprovedPendingData.map(ApprovedPendingData => <ApprovedParcelAllData key={ApprovedPendingData._id} ApprovedPendingData={ApprovedPendingData} refetch={refetch}></ApprovedParcelAllData>)
                }
            </div>

        </div>
    );
};

export default ApprovedParcelRoute;