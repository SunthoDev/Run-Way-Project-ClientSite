import React, { useRef } from "react";
import "./UserStatementOfParcel.css"
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../../Hook/useRole';
import { useReactToPrint } from "react-to-print";


const UserStatementOfParcel = () => {

    let { user } = useContext(AuthContext)
    const [roles] = useRole()
    let { role, Address, name, email, userId, photo, status } = roles

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
        let res = await fetch(`https://server.trustereocourier.com.bd/UseAllConsignmentStandardData?email=${roles?.email}`)
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
        <div className="w-full p-4">

            {/* ================================================== */}
            {/* Search Parcel Statement And Download Bellow !! */}
            {/* ================================================== */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gray-50 shadow rounded">
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
                        <tr className="bg-gray-100 text-left text-black">
                            <th className="border border-gray-400 p-2">Number</th>
                            <th className="border border-gray-400 p-2">Date</th>
                            <th className="border border-gray-400 p-2">
                                Order ID / Tracking ID
                            </th>
                            <th className="border border-gray-400 p-2">Customer Name</th>
                            <th className="border border-gray-400 p-2">Customer Number</th>
                            <th className="border border-gray-400 p-2">Police station</th>
                            <th className="border border-gray-400 p-2">Parcel Category</th>
                            <th className="border border-gray-400 p-2">Weight</th>
                            <th className="border border-gray-400 p-2">COD Amount</th>
                            <th className="border border-gray-400 p-2">Delivery Charge</th>
                            <th className="border border-gray-400 p-2">Status</th>
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
                                    className={index % 2 === 0 ? "bg-white text-black" : "bg-gray-50 text-black"}
                                >
                                    <td className="border border-gray-400 p-2">{index + 1}</td>
                                    <td className="border border-gray-400 p-2">{item.date}</td>
                                    <td className="border border-gray-400 p-2">{item.StandardParcelId}</td>
                                    <td className="border border-gray-400 p-2">{item.name}</td>
                                    <td className="border border-gray-400 p-2">{item.number}</td>
                                    <td className="border border-gray-400 p-2">{item.policeStation}</td>
                                    <td className="border border-gray-400 p-2">{item.ParcelCategory}</td>
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
                            <td className="border border-gray-400 p-2" colSpan={10}>
                                Total Collection COD:
                            </td>
                            <td className="border border-gray-400 p-2">{totalCODAmount}</td>
                        </tr>
                        <tr className="bg-white font-bold text-black">
                            <td className="border border-gray-400 p-2" colSpan={10}>
                                Total Delivery Charge:
                            </td>
                            <td className="border border-gray-400 p-2">{totalDeliveryCharge}</td>
                        </tr>
                        <tr className="bg-white font-bold text-black">
                            <td className="border border-gray-400 p-2" colSpan={10}>
                                Total Cancel COD:
                            </td>
                            <td className="border border-gray-400 p-2">{totalCancelCODAmount}</td>
                        </tr>
                        {/* ============================================================ */}
                        {/* Parcel Summery Total End */}
                        {/* ============================================================ */}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserStatementOfParcel;
