import React, { useRef, useState, useEffect } from 'react';
import "./ParcelTrackingDataShow.css"
import { Link, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from "moment";
import Swal from 'sweetalert2';
import AdminSendAllTrackingMessageTemporery from '../UserTemporeryInvoiceAllStandardData/AdminSendAllTrackingMessageTemporery/AdminSendAllTrackingMessageTemporery';

const ParcelTrackingDataShow = () => {

    let InVoiceData = useLoaderData()
    let [isLoading, setIsLoading] = useState(false)
    // console.log(InVoiceData)
    let {
        ParcelEntryFirstName, ParcelEntryLastName, ParcelEntryAddress, ParcelEntryPhone,
        AlternativePhone, CodAmount, DeliveryCharge, District, Invoice, ItemDescription, ParcelCategory, Payment, RecipientEmail, StandardEmailUser, StandardParcelId, address, date, deliveryType, name, note, number, policeStation, status, weight, _id } = InVoiceData

    // =============================================
    // Tracking Work
    // =============================================
    // Admin is get all tracking data 
    let { refetch, data: AllTrackingData = [] } = useQuery(["AllTrackingData"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/AllTrackingData")
        return res.json()

    })
    // console.log(AllTrackingData)

    let adminSendTrackingAllMessage = AllTrackingData.filter(TrackingMes => TrackingMes.userOrderIdTracking == StandardParcelId)
    // console.log(adminSendTrackingAllMessage)




    return (
        <div className='UserTemporeryInvoiceAllStandardData bg-white min-h-screen px-4 md:px-10 py-6'>

            {!InVoiceData ?
                <div className="flex items-center justify-center min-h-screen">
                    <div className="flex items-center gap-3 border border-red-300 bg-red-50 rounded-lg p-4 shadow-sm">
                        <i className="fa fa-exclamation-triangle text-red-500 text-xl"></i>
                        <h2 className="text-red-700 font-medium">
                            Your parcel data is not found
                        </h2>
                    </div>
                </div>
                :
                //  ============================================================================ 
                //  Parcel Invoice Details All Here  
                //  ============================================================================ 
                <div className=''>
                    {/* ==================== */}
                    {/* Main Box */}
                    {/* ==================== */}
                    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between flex-wrap gap-4">
                            {/* Left Side Info */}
                            <div className="text-gray-800 space-y-1">
                                <p><strong>Created at:</strong> {date}</p>
                                <p><strong>Id:</strong> {StandardParcelId}</p>
                                <p><strong>Invoice:</strong> {Invoice === "" ? "N/A" : Invoice}</p>
                            </div>

                            {/* Right Side Info */}
                            <div className="text-right text-gray-800 space-y-1">
                                <p><strong>Approved at:</strong> {InVoiceData?.ApprovedDate ? InVoiceData?.ApprovedDate : "N/A"}</p>
                                {/* <p><strong>Weight:</strong> {weight}KG</p> */}
                                {/* <p><strong>Total Lot:</strong> 1</p> */}
                                <p><strong className="text-xl font-bold">COD: ৳ {CodAmount}</strong></p>
                                <p><span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">{status}</span></p>
                                {/* <p><strong>Delivery Charge:</strong> ৳ {DeliveryCharge}</p> */}
                            </div>
                        </div>

                        {/* Receiver Info */}
                        <div className="border-t border-gray-200 mt-6 pt-4 space-y-1 text-gray-800">
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Address:</strong> {address}</p>
                            <p><strong>Policestation:</strong> {policeStation}</p>
                            <p><strong>Phone Number:</strong> <a href={`tel:${number}`} className="text-blue-600 underline">{number}</a></p>
                            <p><strong>Alternative Number:</strong> {AlternativePhone}</p>
                            <p><strong>Recipient Email:</strong> {RecipientEmail}</p>
                            <p><strong>Entry By:</strong> Own </p>
                        </div>

                        {/* Item & Note */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 items-center gap-4 text-sm text-gray-700 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                            <div className="py-4 px-4 text-center">
                                <h4 className="font-semibold text-gray-800 text-base mb-2">Note</h4>
                                <p className="text-gray-700">{note}</p>
                            </div>

                            {/* ========================================== */}
                            {/* Assign Rider Information Show */}
                            {/* ========================================== */}
                            {
                                InVoiceData?.status === "Pending" && InVoiceData?.AssignRider === "No" ||
                                    InVoiceData?.status === "Review" && InVoiceData?.AssignRider === "No" ?
                                    <h2 className="text-center text-base font-medium text-orange-500">
                                        Your parcel is currently pending assignment to a rider. Please wait.
                                    </h2>
                                    :
                                    // InVoiceData?.status === "Pending" && InVoiceData?.AssignRider === "Yes" ?

                                    <div className="py-4 px-4">
                                        <h4 className="font-semibold text-gray-800 text-base text-center md:text-left">Assigned to - {InVoiceData?.RiderName}</h4>
                                        <div className="flex flex-col md:flex-row items-center gap-4 mt-3 md:justify-start justify-center">
                                            <img src="https://i.ibb.co/kX7XnCQ/avatar.png" alt="staff" className="w-12 h-12 rounded-full border border-gray-300 shadow-sm" />
                                            <div className="text-center md:text-left">
                                                <p className="text-black font-semibold text-sm">Rider Name: {InVoiceData?.RiderName}</p>
                                                <p className="text-gray-800 font-bold text-sm">📞 {InVoiceData?.RiderPhone}</p>
                                            </div>
                                        </div>
                                    </div>
                                // :
                                // <h2 className="text-center text-lg font-semibold text-green-600">
                                //     Your parcel has already been delivered successfully!
                                // </h2>
                            }

                        </div>
                    </div>
                    {/* ============================================================================ */}
                    {/* All Tracking Information Here !! */}
                    {/* ============================================================================ */}
                    <h2 className='mt-[64px] mb-[12px] text-[#17838C] text-center text-[20px] font-[500] '>Tracking Updates</h2>
                    <div className="Horijontal bg-[#17838C] my-[12px] w-[full] h-[1px] mb-[24px]"></div>

                    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">

                        <div className="trackingMessageShow w-[100%] md:w-[60%]">

                            {/* parcel tracking import here from another component for easy method */}
                            {/* ======================================================================== */}
                            {
                                adminSendTrackingAllMessage?.slice().reverse().map(messageAll => <AdminSendAllTrackingMessageTemporery key={messageAll._id} messageAllData={messageAll}></AdminSendAllTrackingMessageTemporery>)
                            }

                        </div>

                    </div>
                </div>
            }

        </div>
    );
};

export default ParcelTrackingDataShow;