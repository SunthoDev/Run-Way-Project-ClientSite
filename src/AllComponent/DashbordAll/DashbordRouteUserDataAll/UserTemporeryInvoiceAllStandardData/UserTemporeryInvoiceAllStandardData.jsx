import React, { useRef, useState, useEffect } from 'react';
import "./UserTemporeryInvoiceAllStandardData.css"
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdminSendAllTrackingMessageTemporery from './AdminSendAllTrackingMessageTemporery/AdminSendAllTrackingMessageTemporery';
import logo from "../../../../assets/logo/LogoTwo.png"
import IconLogo from "../../../../assets/logo/IconLogo.png"
import moment from 'moment';
// ==========================================
// import ReactToPrint from 'react-to-print';
import { useReactToPrint } from "react-to-print";
import QRCodeStyling from "qr-code-styling";
import Barcode from 'react-barcode';
// import useScanDetection from 'use-scan-detection';


const UserTemporeryInvoiceAllStandardData = () => {

    let InVoiceData = useLoaderData()
    // console.log(InVoiceData)

    let { AlternativePhone, CodAmount, DeliveryCharge, District, Invoice, ItemDescription, ParcelCategory, Payment, RecipientEmail, StandardEmailUser, StandardParcelId, address, date, deliveryType, name, note, number, policeStation, status, weight, _id } = InVoiceData


    // =============================================
    // Tracking Work
    // =============================================
    // Admin is get all tracking data 
    let { refetch, data: AllTrackingData = [] } = useQuery(["AllTrackingData"], async () => {
        let res = await fetch("http://localhost:5000/AllTrackingData")
        return res.json()

    })
    // console.log(AllTrackingData)

    let adminSendTrackingAllMessage = AllTrackingData.filter(TrackingMes => TrackingMes.userOrderIdTracking == StandardParcelId)
    // console.log(adminSendTrackingAllMessage)

    // ==========================================================


    // =========================================================================================================
    // Print (Invoice) Options Start
    // ==========================================================
    const InvoiceRef = useRef();

    const handleInvoicePrint = useReactToPrint({
        content: () => InvoiceRef.current,
    });

    // =========================================================================================================
    // Print (Label) Options Start
    // ==========================================================
    const LabelRef = useRef();

    const handleLabelPrint = useReactToPrint({
        content: () => LabelRef.current,
    });

    // =========================================================================================================
    // Making Qe code Here
    // ==========================================================
    const qrCode = new QRCodeStyling({
        width: 120,
        height: 120,
        data: `http://localhost:5173/dashboard/UserTemporeryInvoiceAllStandardData/{InVoiceData?.StandardParcelId}`,
        image: IconLogo,
        dotsOptions: {
            gradient: {
                type: "linear",
                rotation: 0,
                colorStops: [
                    { offset: 0, color: "#FE0000" },   // গাঢ় লাল (আগের #D32F2F ছিল)
                    { offset: 1, color: "#000000" }
                ]
            },
            type: "square"
        },
        cornersSquareOptions: {
            type: "extra-rounded",
            color: "#FE0000"
        },
        cornersDotOptions: {
            type: "dot",
            color: "#000000"        // কালো রঙ
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 0,
            imageSize: 0.3,
            hideBackgroundDots: true  // ✅ লোগোর নিচে ডট না থাকে
        }
    });

    const refQR = useRef(null);
    useEffect(() => {
        if (refQR.current) {
            qrCode.append(refQR.current);
        }
    }, []);

    // =========================================================================================================
    // Detected bar code scan data
    // ==========================================================
    // const [value, setValue] = useState("no scane your bar code");
    // useScanDetection({
    //     onComplete: setValue,
    //     minLength: 13 // EAN13
    // });




    // =========================================================================================================
    // Parcel Assign Rider Information
    // =======================================================================
    // Assign Parcel All Data Find Here !!  (PARCEL) (PICKUP) (RETURN)
    // =======================================================================
    let { data: RiderAssignDataAll = [] } = useQuery(["AdminAllAssignParcelHere_AllAssignParcelFindToHere"], async () => {
        let res = await fetch(`http://localhost:5000/AdminAllAssignParcelHere/AllAssignParcelFindToHere`)
        return res.json()

    })
    // console.log(RiderAssignDataAll)

    // ===============================================================
    // This Parcel Rider Find
    // ===============================================================
    let ParcelRiderFind = RiderAssignDataAll?.find(parcel => parcel?.CategoryAssign === "Parcel" && parcel?.ParcelIdForRider === StandardParcelId)
    console.log(ParcelRiderFind)










    return (
        <div className='UserTemporeryInvoiceAllStandardData bg-white min-h-screen px-4 md:px-10 py-6'>

            {/* ============================================================================ */}
            {/* Print (Invoice) Options Start */}
            {/* ============================================================================ */}

            <div className="InvoiceALl hidden print:block w-[600px] mx-auto rounded-[4px] p-4 bg-white text-black font-sans border border-gray-200 shadow-md" ref={InvoiceRef}>

                <div className="border-b border-purple-700 pb-[12px]">
                    <div className="flex justify-between items-center">
                        <div className="w-[28%]">
                            <img src={logo} alt="img" />
                        </div>
                        <div className="text-purple-700 text-[24px] font-bold">Invoice</div>
                    </div>
                    <div className="flex justify-end text-sm mt-2">
                        <div>
                            <p className="font-semibold text-right">Invoice # 1001</p>
                            <p className="text-right">{moment().format("P: DD/MM/YY hh:mm A")}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="">
                        <div className="text-sm">
                            <p className="font-semibold text-[16px] pb-[2px]">Bill to</p>
                            <p>Billionaire Gold</p>
                            <p>UY48350681</p>
                            <p>Rangpur kat ft.rood</p>
                        </div>

                        <div className="text-sm mt-2">
                            <p className="font-semibold text-[16px] pb-[2px]">Ship to</p>
                            <p className="font-semibold">SharouZ</p>
                        </div>
                    </div>

                    <div className="text-sm">
                        <p className="font-semibold mt-4 text-[16px] pb-[2px]">Ship to</p>
                        <p className="font-semibold">SharouZ</p>
                        <p>+88042465265</p>
                        <p>Pessan bag dadu majtir malik</p>
                        <p>bagamat sador</p>
                    </div>
                </div>

                <div className="mt-4 ">
                    <table className="w-full text-sm text-left mt-2 border-collapse">
                        <thead className="bg-purple-700 text-white">
                            <tr>
                                <th className="py-2 px-3 border border-white">Description</th>
                                <th className="py-2 px-3 border border-white">Parcel ID</th>
                                <th className="py-2 px-3 border border-white">Amount</th>
                                <th className="py-2 px-3 border border-white">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="py-2 px-3 border">Parcel</td>
                                <td className="py-2 px-3 border">
                                    {/* #50623829 */}
                                    <div className="flex justify-center mx-auto">
                                        <Barcode value={StandardParcelId} width={2} height={30} fontSize={10} />
                                    </div>
                                </td>
                                <td className="py-2 px-3 border">COD:</td>
                                <td className="py-2 px-3 border">0 BDT</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="py-2 px-3 font-bold text-right border">Total</td>
                                <td className="py-2 px-3 font-bold border">0 BDT</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="text-sm mt-4">Note: BANBAR IP OFFICE SC SHORAU IT</p>

                <p className="text-sm text-right mt-2">Prepared by Fazle Eliar</p>

            </div>

            {/* ============================================================================ */}
            {/* Print (Label) Options Start */}
            {/* ============================================================================ */}

            <div className="PrintAll hidden print:block text-black mb-10" ref={LabelRef}>
                <div className="Prints">
                    <div className="text-[10px] text-right font-medium">
                        {moment().format("P: DD/MM/YY hh:mm A")}
                    </div>

                    <div className="w-[60px] mx-auto">
                        <img className="w-full" src={logo} alt="logo" />
                    </div>

                    <h3 className="text-center text-[14px] font-semibold mt-1">
                        Billionaire Gold<br />ID: 101072
                    </h3>

                    <div className="flex justify-center mx-auto">
                        <Barcode value={StandardParcelId} width={2} height={30} fontSize={10} />
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                        <div ref={refQR} className="" />

                        <div className="text-center text-[12px] mtt-2">
                            <p>Invoice: N/A</p>
                            <p>TC-ID: {StandardParcelId}</p>
                            <p>D. Type: Home</p>
                            <p>WGT : {CodAmount} KG</p>
                        </div>
                    </div>

                    <div className="border border-black rounded-md px-2 py-1 text-[12px] leading-tight">
                        <p><strong>Name :</strong> {name}</p>
                        <p><strong>Phone :</strong> {number}</p>
                        <p><strong>Address :</strong> {address}</p>
                    </div>

                    <div className="Cod border border-black rounded-md px-10 py-1 mt-2 text-center text-[14px] font-bold">
                        <span>COD</span>
                        <span className="ml-2">{CodAmount}</span>
                    </div>

                    <div className="mt-2 text-center text-[10px]">
                        <p>trustereo-courire.bd</p>
                    </div>
                </div>
            </div>

            {/* ============================================================================ */}

            <div className="">

                {/* Top Action Bar */}
                <div className="flex flex-wrap justify-end gap-3 mb-6">
                    {/* <button className="bg-[#00b87c] text-white font-semibold px-4 py-2 rounded">Open Support Ticket</button> */}
                    <button onClick={handleInvoicePrint} className="bg-[#0abef2] text-white font-semibold px-4 py-2 rounded">Invoice</button>

                    {/* <ReactToPrint trigger={() => <button className="bg-[#22A197] text-white font-semibold px-4 py-2 rounded">Label</button>} content={() => ref.current} /> */}

                    <button onClick={handleLabelPrint} className="bg-[#22A197] text-white font-semibold px-4 py-2 rounded">Label</button>
                    {/* <button className="bg-gray-500 text-white font-semibold px-4 py-2 rounded">Edit</button> */}

                </div>

                {/* Main Box */}
                <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between flex-wrap gap-4">
                        {/* Left Side Info */}
                        <div className="text-gray-800 space-y-1">
                            <p><strong>Created at:</strong> {date}</p>
                            <p><strong>Id:</strong> {StandardParcelId}</p>
                            <p><strong>Invoice:</strong> {Invoice === "" ? "N/A" : Invoice}</p>
                            {/* <p><strong>Tracking Code:</strong> 3C7ADD84D</p> */}
                            {/* <p><strong>Tracking Link:</strong> <a href="https://trustereo-courire.com.bd/t/3C7ADD84D" className="text-blue-600 underline">https://trustereo-courire.bd/t/3C7ADD84D</a></p> */}
                        </div>

                        {/* Right Side Info */}
                        <div className="text-right text-gray-800 space-y-1">
                            <p><strong>Approved at:</strong> {InVoiceData?.ApprovedDate ? InVoiceData?.ApprovedDate : "N/A"}</p>
                            <p><strong>Weight:</strong> {weight}KG</p>
                            {/* <p><strong>Total Lot:</strong> 1</p> */}
                            <p><strong className="text-xl font-bold">COD: ৳ {CodAmount}</strong></p>
                            <p><span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm">{status}</span></p>
                            <p><strong>Delivery Charge:</strong> ৳ {DeliveryCharge}</p>
                            {/* <button className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded mt-2">Pay with bKash</button> */}
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
                            InVoiceData?.status === "Pending" && InVoiceData?.AssignRider === "No" ?
                                <h2 className="text-center text-base font-medium text-orange-500">
                                    Your parcel is currently pending assignment to a rider. Please wait.
                                </h2> :
                                InVoiceData?.status === "Pending" && InVoiceData?.AssignRider === "Yes" ?

                                    <div className="py-4 px-4">
                                        <h4 className="font-semibold text-gray-800 text-base text-center md:text-left">Assigned to - {ParcelRiderFind?.RiderName}</h4>
                                        <div className="flex flex-col md:flex-row items-center gap-4 mt-3 md:justify-start justify-center">
                                            <img src="https://i.ibb.co/kX7XnCQ/avatar.png" alt="staff" className="w-12 h-12 rounded-full border border-gray-300 shadow-sm" />
                                            <div className="text-center md:text-left">
                                                <p className="text-black font-semibold text-sm">Rider Name: {ParcelRiderFind?.RiderName}</p>
                                                <p className="text-gray-800 font-bold text-sm">📞 {ParcelRiderFind?.RiderPhone}</p>
                                                {/* <p className="text-gray-600 text-sm">Hub: Bagerhat</p>
                                    <p className="text-gray-600 text-sm">Hub Contact: 01321-230753</p> */}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <h2 className="text-center text-lg font-semibold text-green-600">
                                        Your parcel has already been delivered successfully!
                                    </h2>
                        }

                    </div>
                </div>

            </div>

            {/* ============================================================================ */}

            <h2 className='mt-[64px] mb-[12px] text-[#17838C] text-center text-[20px] font-[500] '>Tracking Updates</h2>
            <div className="Horijontal bg-[#17838C] my-[12px] w-[full] h-[1px] mb-[24px]"></div>

            <div className="border border-gray-200 rounded-lg p-6 shadow-sm">

                <div className="trackingMessageShow w-[100%] md:w-[60%]">

                    {
                        adminSendTrackingAllMessage.map(messageAll => <AdminSendAllTrackingMessageTemporery key={messageAll._id} messageAllData={messageAll}></AdminSendAllTrackingMessageTemporery>)
                    }

                </div>

            </div>

        </div>
    );
};

export default UserTemporeryInvoiceAllStandardData;