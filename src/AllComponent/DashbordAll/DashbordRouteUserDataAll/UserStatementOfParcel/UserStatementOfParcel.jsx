import React, { useRef, useState } from "react";
import "./UserStatementOfParcel.css"
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../../Hook/useRole';
import { useReactToPrint } from "react-to-print";


const UserStatementOfParcel = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    // 📦 De-structure ing of user data !!
    const {
        _id, status, name, LastName, BusinessName, Address, RoutePasswordDetails,
        Phone, email, photo, userId, role, Districts, PoliceStations, date
    } = roles || {};

    // Router password verify bellow !!
    // ===============================================
    const [isVerified, setIsVerified] = useState(false);

    // ==========================================================
    // Print (Parcel Statement) Options Start
    // ==========================================================
    const ParcelStatementRef = useRef();
    const handleParcelStatementDetailsPrint = useReactToPrint({
        content: () => ParcelStatementRef.current,
    });

    // =============================================================================================================
    // All user parcel data load here !!
    // ==============================================
    let { refetch, data: AllConsignmentData = [] } = useQuery(["UseAllConsignmentStandardData"], async () => {
        let res = await fetch(`http://localhost:5000/UseAllConsignmentStandardData?email=${user?.email}`)
        return res.json()
    })
    // console.log(AllConsignmentData)

    // =============================================================================================================
    // All data filter bellow of delivery, partial delivery and cancel !!
    // =====================================================================
    let UserAllDeliveryStatusData = AllConsignmentData.filter(approved => approved?.Payment == "Yes" && approved?.status === "Delivered" || approved?.Payment == "Yes" && approved?.status == "PartiallyDelivered" || approved?.Payment == "Yes" && approved?.status == "Cancel")

    // =======================================
    // Total (Delivery Charge) Amount Find
    // =======================================
    let totalDeliveryCharge = UserAllDeliveryStatusData.reduce(
        (sum, item) => sum + (Number(item?.DeliveryCharge) || 0), 0);


    // =============================================================================================================
    // Filter (Delivery) and (partially delivery) data 
    // =========================================================
    let DeliveryAndPartiallyDeliveryData = AllConsignmentData.filter(approved => approved?.Payment == "Yes" && approved?.status === "Delivered" || approved?.Payment == "Yes" && approved?.status == "PartiallyDelivered")
    // Total COD Amount Find
    // ===================================
    let totalCODAmount = DeliveryAndPartiallyDeliveryData.reduce(
        (sum, item) => sum + (Number(item?.CodAmount) || 0), 0);

    // =============================================================================================================
    // Filter (Cancel) data 
    // =========================================================
    let CancelDeliveryData = AllConsignmentData.filter(approved => approved?.Payment == "Yes" && approved?.status === "Cancel")
    // Total COD Amount Find
    // ===================================
    let totalCancelCODAmount = CancelDeliveryData.reduce(
        (sum, item) => sum + (Number(item?.CodAmount) || 0), 0);


    return (
        <div className="w-full p-4 bg-[#F6F6F6] h-[100%] pt-20 md:pt-8 pb-8">

            {
                RoutePasswordDetails?.ParcelStatementPass === "yes" && !isVerified ? (
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
                    ) : (
                        // ==========================================
                        /* All Balance Statement Bellow !! */
                        // ==========================================
                        <div className="">
                            {/* ================================================== */}
                            {/* Search Parcel Statement And Download Bellow !! */}
                            {/* ================================================== */}
                            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white shadow rounded">
                                {/* Left Side: Download */}
                                {/* ================================= */}
                                <div>
                                    <button
                                        onClick={handleParcelStatementDetailsPrint}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
                                    >📥 Download Statement</button>
                                </div>

                                {/* Right Side: Date Range Search */}
                                {/* ================================= */}
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">From:</label>
                                    <input
                                        type="date"
                                        // value={fromDate}
                                        // onChange={(e) => setFromDate(e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    />
                                    <label className="text-sm font-medium">To:</label>
                                    <input
                                        type="date"
                                        // value={toDate}
                                        // onChange={(e) => setToDate(e.target.value)}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    />
                                    <button
                                        // onClick={handleSearch}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded shadow"
                                    >🔍 Search</button>
                                </div>
                            </div>

                            {/* ================================================== */}
                            {/* Title Of Statement */}
                            {/* ================================================== */}
                            <h2 className="text-2xl font-bold text-green-800 mb-4 mt-4">
                                Merchant Statement
                            </h2>

                            {/* ================================================== */}
                            {/* Parcel Statement Details All Bellow !! */}
                            {/* ================================================== */}
                            <div ref={ParcelStatementRef} className="ParcelStatementParent overflow-x-auto">
                                <table className="w-full border border-gray-400 border-collapse text-sm">
                                    {/* // AlternativePhone, CodAmount, DeliveryCharge, District, Invoice, ItemDescription, ParcelCategory, Payment, RecipientEmail, StandardEmailUser, StandardParcelId, address, date, deliveryType, name, note, number, policeStation, status, weight, _id  */}
                                    <thead>
                                        <tr className="bg-white text-left text-black">
                                            <th className="border border-gray-800 p-2">Number</th>
                                            <th className="border border-gray-800 p-2">Date</th>
                                            <th className="border border-gray-800 p-2">
                                                Order ID / Tracing ID
                                            </th>
                                            <th className="border border-gray-800 p-2">Customer Name</th>
                                            <th className="border border-gray-800 p-2">Customer Number</th>
                                            <th className="border border-gray-800 p-2">Police station</th>
                                            <th className="border border-gray-800 p-2">Weight</th>
                                            <th className="border border-gray-800 p-2">COD Amount</th>
                                            <th className="border border-gray-800 p-2">Delivery Charge</th>
                                            <th className="border border-gray-800 p-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* ============================================================ */}
                                        {/* Parcel Details All Start */}
                                        {/* ============================================================ */}
                                        {UserAllDeliveryStatusData?.map((item, index) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className={index % 2 === 0 ? "bg-gray-50 text-black" : "bg-white text-black"}
                                                >
                                                    <td className="border border-gray-400 p-2">{index + 1}</td>
                                                    <td className="border border-gray-400 p-2">{item.date}</td>
                                                    <td className="border border-gray-400 p-2">{item.StandardParcelId}</td>
                                                    <td className="border border-gray-400 p-2">{item.name}</td>
                                                    <td className="border border-gray-400 p-2">{item.number}</td>
                                                    <td className="border border-gray-400 p-2">{item.policeStation}</td>
                                                    <td className="border border-gray-400 p-2">{item.weight}</td>
                                                    <td className="border border-gray-400 p-2">{item.CodAmount}</td>
                                                    <td className="border border-gray-400 p-2">{item.DeliveryCharge}</td>
                                                    <td
                                                        className={`border border-gray-400 p-2 font-semibold ${item.status === "Delivered"
                                                            ? "text-green-600"
                                                            : item.status === "Cancelled"
                                                                ? "text-red-600"
                                                                : "text-orange-500"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {/* ============================================================ */}
                                        {/* Parcel Details All End */}
                                        {/* ============================================================ */}

                                        {/* ============================================================ */}
                                        {/* Parcel Summery Total Start */}
                                        {/* ============================================================ */}
                                        {/* Summary Rows */}
                                        <tr className="bg-white font-bold text-black">
                                            <td className="border border-gray-400 p-2" colSpan={8}>
                                                Total Collection COD:
                                            </td>
                                            <td className="border border-gray-400 p-2">Parcel: {DeliveryAndPartiallyDeliveryData?.length}</td>
                                            <td className="border border-gray-400 p-2">{totalCODAmount}Tk.</td>
                                        </tr>
                                        {/* <tr className="bg-white font-bold text-black">
                            <td className="border border-gray-400 p-2" colSpan={9}>
                                Total Delivery Charge:
                            </td>
                            <td className="border border-gray-400 p-2">{totalDeliveryCharge}</td>
                        </tr> */}
                                        <tr className="bg-white font-bold text-black">
                                            <td className="border border-gray-400 p-2" colSpan={8}>
                                                Total Cancel COD:
                                            </td>
                                            <td className="border border-gray-400 p-2">Parcel: {CancelDeliveryData?.length}</td>
                                            <td className="border border-gray-400 p-2">{totalCancelCODAmount}Tk.</td>
                                        </tr>
                                        {/* ============================================================ */}
                                        {/* Parcel Summery Total End */}
                                        {/* ============================================================ */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

        </div>
    );
};

export default UserStatementOfParcel;
