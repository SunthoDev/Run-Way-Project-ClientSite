import React from "react";
import './AllMarchentConsignment.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import UserApprovedConsignment from './UserApprovedConsignment/UserApprovedConsignment';
import UserApprovedPendingConsignment from './UserApprovedPendingConsignment/UserApprovedPendingConsignment';
import UserDelivereConsignment from './UserDelivereConsignment/UserDelivereConsignment';
import UserPartiallyDeliveredConsignment from './UserPartiallyDeliveredConsignment/UserPartiallyDeliveredConsignment';
import UserReturnedConsignment from './UserReturnedConsignment/UserReturnedConsignment';
import UserPendingConsignment from './UserPendingConsignment/UserPendingConsignment';
import UserAllStatusConsignmentData from './UserAllStatusConsignmentData/UserAllStatusConsignmentData';
import useRole from '../../../../Hook/useRole';
import { useNavigate } from "react-router-dom";


const AllMarchentConsignment = () => {

    let { user } = useContext(AuthContext)
    let navigate = useNavigate()
    const [roles] = useRole()
    let { role, Address, BusinessName, name, userId, photo, status } = roles

    // ==============================================
    // All Parcel Data Load Here
    // ==============================================
    let { refetch, data: AllConsignmentData = [] } = useQuery(["UseAllConsignmentStandardData"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/UseAllConsignmentStandardData?email=${user?.email}`)
        return res.json()
    })
    // console.log(AllConsignmentData)

    // ===========================
    // All  data filter bellow
    // ===========================
    let ConsignmentAllData = AllConsignmentData.filter(approved => approved?.status == "Pending" || approved?.Payment == "Yes" && approved?.status == "Delivered" || approved?.Payment == "Yes" && approved?.status == "PartiallyDelivered" || approved?.Payment == "Yes" && approved?.status == "Cancel")

    // console.log(ConsignmentAllData)


    // pending data find 
    let ReviewData = AllConsignmentData.filter(Review => Review?.status === "Review")
    // console.log(PendingData)

    // approved data find 
    let PendingData = AllConsignmentData.filter(Pending => Pending?.status == "Pending")
    // console.log(ApprovedData)

    // Approved PendingData data find 
    let ApprovedPendingData = AllConsignmentData.filter(approved => approved?.Payment == "No" && approved?.status == "Delivered" || approved?.Payment == "No" && approved?.status == "PartiallyDelivered" || approved?.Payment == "No" && approved?.status == "Cancel")
    // console.log(ApprovedPendingData)

    // Delivered data find 
    let DeliveredData = AllConsignmentData.filter(approved => approved?.status == "Delivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let PartiallyDelivered = AllConsignmentData.filter(approved => approved?.status == "PartiallyDelivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let CancelData = AllConsignmentData.filter(Cancel => Cancel?.status == "Cancel" && Cancel?.Payment == "Yes")
    // console.log(ApprovedPendingData)


    return (
        <div className="bg-[#F6F6F6]">
            {status == "pending" ?
                <h2 className='text-black font-[700] text-center mt-[40px] text-[34px]'>Please Waite, For Admin Approved</h2>
                :
                <div className="AllMarchentConsignment p-6 mt-20 md:mt-8 mb-8 mx-8 bg-white rounded-[8px]">
                    {/* Merchant all parcel by number */}
                    {/* ============================================================== */}
                    <div className="w-full max-w-md mx-auto mb-4">
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            let number = event.target.ParcelSearchNumber.value
                             navigate(`/dashboard/UserSearchParcelByNumber/${number}`)

                        }}>
                            <div className="relative">
                                <input
                                    name="ParcelSearchNumber"
                                    type="text"
                                    placeholder="search your parcel by phone number"
                                    className="w-full rounded-2xl border border-gray-300 px-4 pr-12 py-3 text-base shadow-sm outline-none
                                        focus:border-blue-500 focus:ring-4 focus:ring-blue-200/60 transition"
                                />
                                {/* Right side search icon */}
                                <i type='submit' className="fa fa-search absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-500"
                                    aria-hidden="true" />
                            </div>
                        </form>
                    </div>

                    {/* All status parcel show bellow for see merchant */}
                    {/* ============================================================== */}
                    <Tabs>
                        <TabList>
                            <Tab> <span className="text-black font-[600] text-[16px]">All</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Pending</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Approved Pending</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Delivered</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Partially Delivered</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Cancel</span> </Tab>
                            <Tab> <span className="text-black font-[600] text-[16px]">Reviewed</span> </Tab>
                        </TabList>
                        <TabPanel>
                            <div className="AllDataConsignment">

                                <div className="overflow-x-auto p-4">
                                    <table className="table w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th>Merchant Name</th>
                                                <th>Parcel ID</th>
                                                <th>Amount</th>
                                                <th>Delivery Charge</th>
                                                <th>Request Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                ConsignmentAllData?.map(ConsignmentAll => <UserAllStatusConsignmentData key={ConsignmentAll._id} ConsignmentAll={ConsignmentAll}></UserAllStatusConsignmentData>)
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="AllDataConsignment">

                                <div className="overflow-x-auto p-4">
                                    <table className="table w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th>Merchant Name</th>
                                                <th>Parcel ID</th>
                                                <th>Amount</th>
                                                <th>Delivery Charge</th>
                                                <th>Request Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                PendingData?.map(ConsignmentPending => <UserApprovedConsignment key={ConsignmentPending._id} ConsignmentPending={ConsignmentPending}></UserApprovedConsignment>)
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="AllDataConsignment">

                                <div className="overflow-x-auto p-4">
                                    <table className="table w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th>Merchant Name</th>
                                                <th>Parcel ID</th>
                                                <th>Amount</th>
                                                <th>Delivery Charge</th>
                                                <th>Request Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                ApprovedPendingData?.map(ApprovedPending => <UserApprovedPendingConsignment key={ApprovedPending._id} ApprovedPending={ApprovedPending}></UserApprovedPendingConsignment>)
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="AllDataConsignment">
                                <div className="overflow-x-auto p-4">
                                    <table className="table w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th>Merchant Name</th>
                                                <th>Parcel ID</th>
                                                <th>Amount</th>
                                                <th>Delivery Charge</th>
                                                <th>Request Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                DeliveredData?.map(DeliveredData => <UserDelivereConsignment key={DeliveredData._id} DeliveredData={DeliveredData}></UserDelivereConsignment>)
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="AllDataConsignment">
                                <div className="overflow-x-auto p-4">
                                    <table className="table w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th>Merchant Name</th>
                                                <th>Parcel ID</th>
                                                <th>Amount</th>
                                                <th>Delivery Charge</th>
                                                <th>Request Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                PartiallyDelivered?.map(PartiallyDeliveredData => <UserPartiallyDeliveredConsignment key={PartiallyDeliveredData._id} PartiallyDeliveredData={PartiallyDeliveredData}></UserPartiallyDeliveredConsignment>)
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="AllDataConsignment">
                                <div className="overflow-x-auto p-4">
                                    <table className="table w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th>Merchant Name</th>
                                                <th>Parcel ID</th>
                                                <th>Amount</th>
                                                <th>Delivery Charge</th>
                                                <th>Request Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                CancelData?.map(CancelDelivered => <UserReturnedConsignment key={CancelDelivered._id} CancelDelivered={CancelDelivered}></UserReturnedConsignment>)
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="AllDataConsignment">
                                <div className="overflow-x-auto p-4">
                                    <table className="table  w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th>Merchant Name</th>
                                                <th>Parcel ID</th>
                                                <th>Amount</th>
                                                <th>Delivery Charge</th>
                                                <th>Request Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                ReviewData?.map(ReviewUserData => <UserPendingConsignment key={ReviewUserData._id} refetch={refetch} ReviewUserData={ReviewUserData}></UserPendingConsignment>)
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            }
        </div>
    );
};

export default AllMarchentConsignment;