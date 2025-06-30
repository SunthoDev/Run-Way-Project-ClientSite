import React from 'react';
import "./AllReportEverything.css";
import { FaBox, FaMoneyBill, FaTruckLoading, FaUndo, FaShippingFast, FaBan, FaCheckDouble, FaBalanceScale, FaMoneyCheckAlt } from "react-icons/fa";

const AllReportEverything = () => {
  const reportData = {
    totalParcel: 120,
    totalCod: 54000,
    deliveryCharge: 7200,
    pickupPending: 12,
    pickupApproved: 108,
    returnPending: 3,
    returnApproved: 15,
    todayEntry: 20,
    dispatchPending: 6,
    dispatchApproved: 25,
    deliveryDone: 95,
    partialParcel: 4,
    cancelParcel: 5,
    balancePending: 2,
    balanceApproved: 7,
    paymentPending: 3,
    paymentApproved: 5,
  };

  const subTotal = reportData.totalCod - reportData.deliveryCharge;
  const cashRiskCharge = subTotal * 0.01;
  const grandTotal = subTotal - cashRiskCharge;

  const cardClass =
    "backdrop-blur-md bg-white/10 text-white p-6 rounded-2xl shadow-lg border border-white/20 hover:scale-[1.02] transition-all duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-10 px-4 md:px-20">
      <h1 className="text-4xl font-bold mb-10 text-center">🚀 Courier Daily Report Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{ title: "Total Parcel", value: reportData.totalParcel, icon: <FaBox className="text-2xl text-cyan-400" /> },
          { title: "Total COD", value: `৳ ${reportData.totalCod}`, icon: <FaMoneyBill className="text-2xl text-green-400" /> },
          { title: "Today’s Entry", value: reportData.todayEntry, icon: <FaTruckLoading className="text-2xl text-orange-400" /> },
        ].map((item, i) => (
          <div key={i} className={cardClass}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">{item.title}</span>
              {item.icon}
            </div>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h3 className="text-xl font-bold mb-4 text-cyan-300 flex items-center gap-2">
            <FaTruckLoading /> Pickup Request
          </h3>
          <div className="flex justify-between mb-2"><span>Pending:</span><span>{reportData.pickupPending}</span></div>
          <div className="flex justify-between"><span>Approved:</span><span>{reportData.pickupApproved}</span></div>
        </div>

        <div className={cardClass}>
          <h3 className="text-xl font-bold mb-4 text-pink-400 flex items-center gap-2">
            <FaUndo /> Return Parcel
          </h3>
          <div className="flex justify-between mb-2"><span>Pending:</span><span>{reportData.returnPending}</span></div>
          <div className="flex justify-between"><span>Approved:</span><span>{reportData.returnApproved}</span></div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h3 className="text-xl font-bold mb-4 text-yellow-300 flex items-center gap-2">
            <FaShippingFast /> Dispatch Request
          </h3>
          <div className="flex justify-between mb-2"><span>Pending:</span><span>{reportData.dispatchPending}</span></div>
          <div className="flex justify-between"><span>Approved:</span><span>{reportData.dispatchApproved}</span></div>
        </div>

        <div className={cardClass}>
          <h3 className="text-xl font-bold mb-4 text-lime-300 flex items-center gap-2">
            <FaCheckDouble /> Delivery Summary
          </h3>
          <div className="flex justify-between mb-1"><span>Delivered:</span><span>{reportData.deliveryDone}</span></div>
          <div className="flex justify-between mb-1"><span>Partially:</span><span>{reportData.partialParcel}</span></div>
          <div className="flex justify-between"><span>Cancelled:</span><span>{reportData.cancelParcel}</span></div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={cardClass}>
          <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
            <FaBalanceScale /> Balance Request
          </h3>
          <div className="flex justify-between mb-2"><span>Pending:</span><span>{reportData.balancePending}</span></div>
          <div className="flex justify-between"><span>Approved:</span><span>{reportData.balanceApproved}</span></div>
        </div>

        <div className={cardClass}>
          <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
            <FaMoneyCheckAlt /> Payment Request
          </h3>
          <div className="flex justify-between mb-2"><span>Pending:</span><span>{reportData.paymentPending}</span></div>
          <div className="flex justify-between"><span>Approved:</span><span>{reportData.paymentApproved}</span></div>
        </div>
      </div>

      <div className="mt-12 bg-white/10 p-6 rounded-xl shadow-lg border border-white/20">
        <h3 className="text-2xl font-bold mb-4">💰 COD Breakdown</h3>
        <div className="space-y-2 text-white/90">
          <div className="flex justify-between"><span>Total COD:</span><span>৳ {reportData.totalCod}</span></div>
          <div className="flex justify-between"><span>Delivery Charge:</span><span className="text-red-400">– ৳ {reportData.deliveryCharge}</span></div>
          <div className="flex justify-between"><span>Subtotal:</span><span>৳ {subTotal}</span></div>
          <div className="flex justify-between"><span>Cash & Risk Charge (1%):</span><span className="text-red-400">– ৳ {cashRiskCharge.toFixed(2)}</span></div>
          <div className="flex justify-between font-bold text-green-300 text-lg pt-2 border-t border-white/20"><span>Grand Total:</span><span>৳ {grandTotal.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-400 text-sm italic">
        🔧 More modules like delivery report, hub status, invoice print, and chart analytics coming soon...
      </div>
    </div>
  );
};

export default AllReportEverything;
