import React, { useState } from "react";
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
    // 📦 De-structure ing of user data !!
    const {
        _id, status, name, LastName, BusinessName, Address, RoutePasswordDetails,
        Phone, email, photo, userId, role, Districts, PoliceStations, date
    } = roles || {};

    // Router password verify bellow !!
    // ===============================================
    const [isVerified, setIsVerified] = useState(false);

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
    let ConsignmentAllData = AllConsignmentData?.filter(approved => approved?.status == "Pending" || approved?.Payment == "Yes" && approved?.status == "Delivered" || approved?.Payment == "Yes" && approved?.status == "PartiallyDelivered" || approved?.Payment == "Yes" && approved?.status == "Cancel")

    // console.log(ConsignmentAllData)


    // pending data find 
    let ReviewData = AllConsignmentData?.filter(Review => Review?.status === "Review")
    // console.log(PendingData)

    // approved data find 
    let PendingData = AllConsignmentData?.filter(Pending => Pending?.status == "Pending")
    // console.log(ApprovedData)

    // Approved PendingData data find 
    let ApprovedPendingData = AllConsignmentData?.filter(approved => approved?.Payment == "No" && approved?.status == "Delivered" || approved?.Payment == "No" && approved?.status == "PartiallyDelivered" || approved?.Payment == "No" && approved?.status == "Cancel")
    // console.log(ApprovedPendingData)

    // Delivered data find 
    let DeliveredData = AllConsignmentData?.filter(approved => approved?.status == "Delivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let PartiallyDelivered = AllConsignmentData?.filter(approved => approved?.status == "PartiallyDelivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let CancelData = AllConsignmentData?.filter(Cancel => Cancel?.status == "Cancel" && Cancel?.Payment == "Yes")
    // console.log(ApprovedPendingData)


    return (
        <div className="bg-[#F6F6F6]">
            {
                RoutePasswordDetails?.AllConsignmentPass === "yes" && !isVerified ? (
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
                    status === "pending" ? (
                        /* ⏳ পেন্ডিং ভেরিফিকেশন নোটিশ (সুপার ক্লিন ও মডার্ন লুক) */
                        <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 p-12 rounded-2xl shadow-2xs my-10 max-w-xl mx-auto">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4 animate-pulse">
                                <i className="fa fa-clock-o text-3xl" aria-hidden="true"></i>
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-wide">
                                Account Verification Pending
                            </h2>
                            <p className="text-xs md:text-sm text-black/50 font-bold mt-2 max-w-sm leading-relaxed">
                                Please wait while our admin team reviews and approves your profile. You'll get full access once verified.
                            </p>
                        </div>
                    ) :
                        <div className="AllMarchentConsignment p-6 mt-20 md:mt-8 mb-8 mx-8 bg-white rounded-[8px]">
                            {/* ============================================================== */}
                            {/* Merchant all parcel (Search) by number !! */}
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

                            {/* ============================================================== */}
                            {/* All status parcel show bellow for check merchant !! */}
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
                                        <h4 classname="text-[16px] font-[600] text-left text-black">Parcel total data: {ConsignmentAllData?.length}</h4>
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
                                        <h4 classname="text-[16px] font-[600] text-left text-black">Parcel total data: {PendingData?.length}</h4>
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
                                        <h4 classname="text-[16px] font-[600] text-left text-black">Parcel total data: {ApprovedPendingData?.length}</h4>
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
                                        <h4 classname="text-[16px] font-[600] text-left text-black">Parcel total data: {DeliveredData?.length}</h4>
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
                                        <h4 classname="text-[16px] font-[600] text-left text-black">Parcel total data: {PartiallyDelivered?.length}</h4>
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
                                        <h4 classname="text-[16px] font-[600] text-left text-black">Parcel total data: {CancelData?.length}</h4>
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
                                        <h4 classname="text-[16px] font-[600] text-left text-black">Parcel total data: {ReviewData?.length}</h4>
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