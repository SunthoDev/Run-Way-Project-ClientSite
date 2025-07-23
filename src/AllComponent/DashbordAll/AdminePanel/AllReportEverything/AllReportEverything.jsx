import React, { useRef, useEffect, useContext } from 'react';
import "./AllReportEverything.css";
import { FaBox, FaMoneyBill, FaTruckLoading, FaUndo, FaShippingFast, FaBan, FaCheckDouble, FaBalanceScale, FaMoneyCheckAlt } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';

const AllReportEverything = () => {

  const { setReportSearchDate } = useContext(AuthContext);
  let navigate = useNavigate()

  const getTodayFormatted = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const yy = String(today.getFullYear()); // last 2 digits
    return `${mm}/${dd}/${yy}`; // output: 01/07/25
  };
  const todayDate = getTodayFormatted();
  // console.log(todayDate)


  // ============================================================================================================
  // All User Parcel Data Find Here
  // =================================================
  let { refetch, data: AllParcelData = [] } = useQuery(["AdminAllReportDataFindHere_AllUserParcelData"], async () => {
    let res = await fetch(`http://localhost:5000/AdminAllReportDataFindHere/AllUserParcelData`)
    return res.json()
  })
  // console.log(AllParcelData)

  // =================================================
  // (TODAY) All Parcel Data Find
  // =================================================
  const todayParcelData = AllParcelData?.filter(parcel => parcel.date === todayDate);
  // console.log(todayParcelData)

  // All Delivered & PartiallyDelivered data filter for payment data find
  // ===================================================================================
  let FilterPaymentData = todayParcelData?.filter(PaymentAll => PaymentAll?.Payment == "Yes" && PaymentAll?.status == "Delivered" || PaymentAll?.Payment == "Yes" && PaymentAll?.status == "PartiallyDelivered")
  // console.log(FilterPaymentData)

  // All Parcel total Cod Amount Balance
  // =======================================
  const CodAmountPaymentData = FilterPaymentData?.reduce((prev, current) => prev + parseInt(current?.CodAmount), 0);
  // console.log(CodAmountPaymentData)

  // All Parcel total Delivery Charge Amount Balance
  // =================================================
  const DeliveryChargeResult = FilterPaymentData?.reduce((prev, current) => prev + parseInt(current.DeliveryCharge), 0);

  // Sub total balance (CodAmountPaymentData - DeliveryChargeResult)
  // ===================================================================
  let subTotal = CodAmountPaymentData - DeliveryChargeResult
  // console.log(subTotal)

  // Cash Charge(1%) from subTotal Balance
  // =======================================
  let subTotalOnePercentCharge = subTotal * 1 / 100
  // console.log(subTotalOnePercentCharge)

  // Grand Total Balance
  // ==========================
  let GrandTotalBalance = subTotal - subTotalOnePercentCharge
  // console.log(GrandTotalBalance)


  // ============================================================================================================
  // All User Pickup Request Data Find Here
  // =================================================
  let { data: AllPickupRequest = [] } = useQuery(["AdminAllReportDataFindHere_AllUserPickupRequestData"], async () => {
    let res = await fetch(`http://localhost:5000/AdminAllReportDataFindHere/AllUserPickupRequestData`)
    return res.json()
  })
  // console.log(AllPickupRequest)

  // =================================================
  // (TODAY) All Pickup Request Data Find
  // =================================================
  const todayPickupRequestData = AllPickupRequest?.filter(Pickup => Pickup?.date === todayDate);
  // console.log(todayPickupRequestData)

  // =================================================
  // (TODAY) All Pickup (Pending) Request Data Find
  // =================================================
  const todayPickupRequestPendingData = todayPickupRequestData?.filter(Pickup => Pickup?.status === "Pending");
  // console.log(todayPickupRequestPendingData)

  // =================================================
  // (TODAY) All Pickup (Approved) Request Data Find
  // =================================================
  const todayPickupRequestApprovedData = todayPickupRequestData?.filter(Pickup => Pickup?.status === "Approved");
  // console.log(todayPickupRequestApprovedData)


  // ============================================================================================================
  // All User Return Parcel Data Find Here
  // =================================================
  let { data: AllReturnParcelData = [] } = useQuery(["AdminAllReportDataFindHere_AllUserReturnParcelData"], async () => {
    let res = await fetch(`http://localhost:5000/AdminAllReportDataFindHere/AllUserReturnParcelData`)
    return res.json()
  })
  // console.log(AllReturnParcelData)

  // =================================================
  // (TODAY) All Return Parcel Data Find
  // =================================================
  const todayReturnParcelData = AllReturnParcelData?.filter(Return => Return?.date === todayDate);
  // console.log(todayReturnParcelData)

  // =========================================================
  // (TODAY) All Return Parcel (Pending) Request Data Find
  // =========================================================
  const todayReturnParcelPendingData = todayReturnParcelData?.filter(Return => Return?.ReturnStatus === "Pending");
  // console.log(todayReturnParcelPendingData)

  // =========================================================
  // (TODAY) All Return Parcel (Approved) Request Data Find
  // =========================================================
  const todayReturnParcelApprovedData = todayReturnParcelData?.filter(Return => Return?.ReturnStatus === "Approved");
  // console.log(todayReturnParcelApprovedData)


  // ============================================================================================================
  // All Dispatch Parcel Data Find Here
  // =================================================
  let { data: AllDispatchParcelData = [] } = useQuery(["AdminAllReportDataFindHere_AllDispatchRequestData"], async () => {
    let res = await fetch(`http://localhost:5000/AdminAllReportDataFindHere/AllDispatchRequestData`)
    return res.json()
  })
  // console.log(AllDispatchParcelData)

  // =================================================
  // (TODAY) All Dispatch Parcel Data Find
  // =================================================
  const todayDispatchParcelData = AllDispatchParcelData?.filter(Dispatch => Dispatch?.date === todayDate);
  // console.log(todayDispatchParcelData)

  // =========================================================
  // (TODAY) All Dispatch Parcel (Sent) Request Data Find
  // =========================================================
  const todayDispatchParcelSentData = todayDispatchParcelData?.filter(Dispatch => Dispatch?.DispatchType === "Sent");
  // console.log(todayReturnParcelPendingData)

  // =========================================================
  // (TODAY) All Dispatch Parcel (Received) Request Data Find
  // =========================================================
  const todayDispatchParcelReceivedData = todayDispatchParcelData?.filter(Dispatch => Dispatch?.DispatchType === "Received");
  // console.log(todayReturnParcelApprovedData)


  // ===============================================================================================================
  // All Delivery Summary Parcel || (Delivered) (Partially) (Cancelled)
  // ============================================================================

  // All Delivery Parcel 
  // ===============================
  let DeliveredParcelAll = todayParcelData?.filter(Parcel => Parcel?.Payment == "Yes" && Parcel?.status == "Delivered")
  // console.log(DeliveredParcelAll)

  // All Delivery Parcel 
  // ===============================
  let PartiallyParcelAll = todayParcelData?.filter(Parcel => Parcel?.Payment == "Yes" && Parcel?.status == "PartiallyDelivered")

  // All Cancel Parcel 
  // ===============================
  let CancelParcelAll = todayParcelData?.filter(Cancel => Cancel?.status == "Cancel" && Cancel?.Payment == "Yes")
  // console.log(CancelParcelAll)


  // ============================================================================================================
  // All User Add Balance Request Data Find Here
  // =================================================
  let { data: AddBalanceRequestData = [] } = useQuery(["AdminAllReportDataFindHere_AllAddBalanceRequestData"], async () => {
    let res = await fetch(`http://localhost:5000/AdminAllReportDataFindHere/AllAddBalanceRequestData`)
    return res.json()
  })
  // console.log(AddBalanceRequestData)

  // =================================================
  // (TODAY) All User Add Balance Request Data Find
  // =================================================
  const todayAddBalanceRequestData = AddBalanceRequestData?.filter(AddBalance => AddBalance?.date === todayDate);
  // console.log(todayAddBalanceRequestData)

  // =================================================================
  // (TODAY) All User Add Balance Request (Pending) Request Data Find
  // =================================================================
  const todayAddBalancePendingData = todayAddBalanceRequestData?.filter(AddBalance => AddBalance?.status === "Pending");
  // console.log(todayAddBalancePendingData)

  // =============================================================
  // (TODAY) All User Balance Request (Approved) Request Data Find
  // =============================================================
  const todayAddBalanceApprovedData = todayAddBalanceRequestData?.filter(AddBalance => AddBalance?.status === "Approved");
  // console.log(todayAddBalanceApprovedData)


  // ============================================================================================================
  // All User Payment Request of Parcel Data Find Here
  // =========================================================
  let { data: AllBalanceRequestDataOfParcel = [] } = useQuery(["AdminAllReportDataFindHere_AllPaymentRequestDataOfParcel"], async () => {
    let res = await fetch(`http://localhost:5000/AdminAllReportDataFindHere/AllPaymentRequestDataOfParcel`)
    return res.json()
  })
  // console.log(AllBalanceRequestDataOfParcel)

  // =========================================================
  // (TODAY) All User Payment Request of Parcel Data Find
  // =========================================================
  const todayBalanceRequestData = AllBalanceRequestDataOfParcel?.filter(PaymentRequest => PaymentRequest?.date === todayDate);
  // console.log(todayBalanceRequestData)

  // =================================================================
  // (TODAY) All User Payment Request (UnPaid) Request Data Find
  // =================================================================
  const todayPaymentRequestUnPaidData = todayBalanceRequestData?.filter(PaymentRequest => PaymentRequest?.Payment === "UnPaid");
  // console.log(todayPaymentRequestUnPaidData)

  // =============================================================
  // (TODAY) All User Payment Request (Paid) Request Data Find
  // =============================================================
  const todayPaymentRequestPaidData = todayBalanceRequestData?.filter(PaymentRequest => PaymentRequest?.Payment === "Paid");
  // console.log(todayPaymentRequestPaidData)




  // ==========================================================
  // Print (Report) Options Start
  // ==========================================================
  const InvoiceRef = useRef();
  const handleInvoicePrint = useReactToPrint({
    content: () => InvoiceRef.current,
  });


  // Print (Report) Options Start
  // ==========================================================
  const cardClass =
    "backdrop-blur-md bg-white/10 text-white p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.02] transition-all duration-300";


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-10 px-4 md:px-20">
      
      {/* Parcel Search options and print options here */}
      {/* ================================================================================== */}
      <div className="flex items-center justify-between pb-2">
        <button onClick={handleInvoicePrint} className="bg-[#22A197] text-white font-semibold px-4 py-2 rounded">Print Today Report</button>

        <div className="flex items-center gap-2">
          <form onSubmit={(e) => {
            e.preventDefault()

            let date = e.target.date.value; // "2025-07-10"
            const split = date.split('-'); // ["2025", "07", "10"]
            const formattedDate = `${split[1]}/${split[2]}/${split[0]}`; // "07/10/2025"
            setReportSearchDate(formattedDate)
            navigate(`/dashboard/AdminDashboard/SearchAllReport`)

          }}>
            <input
              type="date"
              id="reportDate"
              className="border border-gray-300 bg-white text-black rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              name="date"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================================================== */}

      <div className="AllReportParent" ref={InvoiceRef}>
        <h1 className="text-4xl font-bold mb-10 text-center">🚀 Courier Daily Report Panel</h1>

        {/* Total Parcel | Today Total COD with Entry Parcel Show */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Total Parcel</span>
              <FaBox className="text-2xl text-cyan-400" />
            </div>
            <p className="text-3xl font-bold mt-2">{AllParcelData?.length}</p>
          </div>
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Total COD</span>
              <FaMoneyBill className="text-2xl text-green-400" />
            </div>
            <p className="text-3xl font-bold mt-2">{CodAmountPaymentData}</p>
          </div>
          <div className={cardClass}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Today’s Entry Parcel</span>
              <FaTruckLoading className="text-2xl text-orange-400" />
            </div>
            <p className="text-3xl font-bold mt-2">{todayParcelData?.length}</p>
          </div>
        </div>

        {/* Total, Pickup Request || Return Parcel -->> (Pending) or (Approved) data Show */}
        {/* ================================================================================== */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4 text-cyan-300 flex items-center gap-2">
              <FaTruckLoading /> Pickup Request
            </h3>
            <div className="flex justify-between mb-2"><span>Pending:</span><span>{todayPickupRequestPendingData?.length}</span></div>
            <div className="flex justify-between"><span>Approved:</span><span>{todayPickupRequestApprovedData?.length}</span></div>
          </div>
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4 text-pink-400 flex items-center gap-2">
              <FaUndo /> Return Parcel
            </h3>
            <div className="flex justify-between mb-2"><span>Pending:</span><span>{todayReturnParcelPendingData?.length}</span></div>
            <div className="flex justify-between"><span>Approved:</span><span>{todayReturnParcelApprovedData?.length}</span></div>
          </div>
        </div>

        {/* Total, Dispatch Request || Delivery Summary Parcel -->> (Pending) or (Approved) data Show */}
        {/* ================================================================================================ */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4 text-yellow-300 flex items-center gap-2">
              <FaShippingFast /> Dispatch Request
            </h3>
            <div className="flex justify-between mb-2"><span>Send:</span><span>{todayDispatchParcelSentData?.length}</span></div>
            <div className="flex justify-between"><span>Received:</span><span>{todayDispatchParcelReceivedData?.length}</span></div>
          </div>
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4 text-lime-300 flex items-center gap-2">
              <FaCheckDouble /> Delivery Summary Parcel
            </h3>
            <div className="flex justify-between mb-1"><span>Delivered:</span><span>{DeliveredParcelAll?.length}</span></div>
            <div className="flex justify-between mb-1"><span>Partially:</span><span>{PartiallyParcelAll?.length}</span></div>
            <div className="flex justify-between"><span>Cancelled:</span><span>{CancelParcelAll?.length}</span></div>
          </div>
        </div>

        {/* Total, User Balance Request || User Payment Request -->> (Pending) or (Approved) data Show */}
        {/* ================================================================================================ */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
              <FaBalanceScale />User Add Balance Request
            </h3>
            <div className="flex justify-between mb-2"><span>Pending:</span><span>{todayAddBalancePendingData?.length}</span></div>
            <div className="flex justify-between"><span>Approved:</span><span>{todayAddBalanceApprovedData?.length}</span></div>
          </div>
          <div className={cardClass}>
            <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
              <FaMoneyCheckAlt />User Payment Request Of Parcel
            </h3>
            <div className="flex justify-between mb-2"><span>Pending:</span><span>{todayPaymentRequestUnPaidData?.length}</span></div>
            <div className="flex justify-between"><span>Approved:</span><span>{todayPaymentRequestPaidData?.length}</span></div>
          </div>
        </div>

        {/* All Delivered & PartiallyDelivered Balance Details Show Today */}
        {/* =================================================================== */}
        <div className="mt-12 bg-white/10 p-6 rounded-xl shadow-lg border border-white/20">
          <h3 className="text-2xl font-bold mb-4">💰 COD Breakdown</h3>
          <div className="space-y-2 text-white/90">
            <div className="flex justify-between"><span>Total COD:</span><span>৳ {CodAmountPaymentData}</span></div>
            <div className="flex justify-between"><span>Delivery Charge:</span><span className="text-red-400">– ৳ {DeliveryChargeResult}</span></div>
            <div className="flex justify-between"><span>Subtotal:</span><span>৳ {subTotal}</span></div>
            <div className="flex justify-between"><span>Cash & Risk Charge (1%):</span><span className="text-red-400">– ৳ {subTotalOnePercentCharge.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-green-300 text-lg pt-2 border-t border-white/20"><span>Grand Total:</span><span>৳ {GrandTotalBalance.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Coming soon others fetures */}
        {/* ========================================== */}
        <div className="mt-16 text-center text-gray-400 text-sm italic">
          🔧 More modules like delivery report, hub status, invoice print, and chart analytics coming soon...
        </div>

      </div>
    </div>
  );
};

export default AllReportEverything;
