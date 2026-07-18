import React, { useRef, useState } from 'react';
import "./AdminPaymentRequestDetailsAll.css"
import { useLoaderData, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import logo from "../../../../../../assets/logo/Logo.png"
import UserPaymentRequestAllPaymentDataShow from '../UserPaymentRequestAllPaymentDataShow/UserPaymentRequestAllPaymentDataShow';
import Swal from 'sweetalert2';
import { useReactToPrint } from "react-to-print";

{/* <Link to={`/dashboard/AdminDashboard/AdminPaymentRequestDetailsAll/${ReqPaymentID}`} className='Pending ml-3'>View</Link> */ }

const AdminPaymentRequestDetailsAll = () => {

    let PaymentRequestUnkData = useLoaderData()
    // console.log(PaymentRequestUnkData)

    let { ReqPaymentID, ReqPay, _id,
        TotalCodAmount, TotalDeliveryCharge, subTotal, subTotalOnePercentCharge, totalBalanceUser,
        name, LastName, photo, userId, Address, BusinessName, PoliceStations, Phone, ReqUserEmail, userStatus, date, time, Payment, MyHub } = PaymentRequestUnkData


    // Find User Information , who is send payment request
    // ===================================================================
    let { refetch, data: requestUserUserInformationFind = [] } = useQuery(["AdminPaymentRequestSendUserInformationGet"], async () => {
        let res = await fetch(`http://localhost:5000/AdminPaymentRequestSendUserInformationGet?email=${ReqUserEmail}`)
        return res.json()
    })
    let UserInformation = requestUserUserInformationFind[0]
    // console.log(requestUserUserInformationFind[0])


    // Find All Parcel Data For Which, is payment request
    // =====================================================
    let { data: userALlDeliveryDataFind = [] } = useQuery(["AdminPaymentRequestSendUserEmailFindAllDeliveryData"], async () => {
        let res = await fetch(`http://localhost:5000/AdminPaymentRequestSendUserEmailFindAllDeliveryData?email=${ReqUserEmail}`)
        return res.json()
    })
    // console.log(userALlDeliveryDataFind)

    // Filter all parcel , user send a payment request take off all parcel !! 
    // =====================================================================================
    let userPaymentRequestDeliveryDataAll = userALlDeliveryDataFind.filter(PaidDeliveryDataAll => PaidDeliveryDataAll?.PaymentID == ReqPaymentID)
    // console.log(userPaymentRequestDeliveryDataAll)


    // ========================================================================================================
    // Payment Edit for show (PAYMENT-MODAL)
    // ====================================================
    const [PaymentDetailsForModal, setPaymentDetailsForModal] = useState();
    // console.log(AssignParcelDetails)

    // Open the modal a set data on useState
    // =============================================
    let handleEditPaymentDetails = (PaymentRequestUnkData) => {

        setPaymentDetailsForModal(PaymentRequestUnkData);

        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("PaymentDetailsEditToAdmin").showModal();
        }, 50);
    };

    // ==========================================================
    // Print (Payment Report) Options Start
    // ==========================================================
    const PaymentRef = useRef();
    const handlePaymentDetailsPrint = useReactToPrint({
        content: () => PaymentRef.current,
    });


    
    return (
        <div className=''>

            <div className='flex items-center justify-between mx-4 my-4'>
                <button
                    onClick={handlePaymentDetailsPrint}
                    className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                >📥 Download Excel</button>
                <button
                    onClick={() => handleEditPaymentDetails(PaymentRequestUnkData)}
                    className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
                >Edit</button>
            </div>
            
            {/* ============================================ */}
            {/* Payment Details All Here!! */}
            {/* ============================================ */}
            <div ref={PaymentRef} className='AdminPaymentRequestDetailsAll mx-2 md:mx-4 rounded-[6px] my-4 bg-white px-2 md:px-6 py-10 relative overflow-hidden'>

                <div className="PaymentRequestDetailsInvoice ">

                    {/* Paid Badge  */}
                    {/* ============================ */}
                    <div className="paid-badge">
                        <span className="text-black font-bold text-sm tracking-widest">
                            {Payment}
                        </span>
                    </div>

                    {/* Invoice Details  */}
                    {/* ============================ */}
                    <div className="HeadInvoice w-[100%] md:w-[54%] md:flex justify-between mt-6">
                        <div className="img w-[42%] md:w-[28%] mx-auto md:mx-0">
                            <img className='w-[100%]' src={logo} alt="img" />
                        </div>
                        <div className="Invoice text-center mt-2 md:mt-0">
                            <h3>INVOICE</h3>
                            <h4>Date: {date}</h4>
                            <h4>ID: #{ReqPaymentID}</h4>
                        </div>
                    </div>

                    <div class="Horijontal bg-[#d4d2d2] mt-[20px]  w-[full] h-[1px]"></div>

                    {/* Payment Details  */}
                    {/* ============================ */}
                    <div className="AmountAndBankDetails grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        {/* Left Details  */}
                        {/* ============================ */}
                        <div className="AmountDetails ">
                            <div className="Amount flex justify-between items-center">
                                <h3 className='text-black font-[600] text-[16px]'>Total Amount Delivered</h3>
                                <h3 className='text-black font-[600] text-[16px]'>{TotalCodAmount}</h3>
                            </div>
                            <div className="Amount flex justify-between items-center">
                                <h3 className='text-black font-[600] text-[16px]'>Due Bills</h3>
                                <h3 className='text-black font-[600] text-[16px]'>{TotalDeliveryCharge}</h3>
                            </div>
                            <div className="Amount flex justify-between items-center">
                                <h3 className='text-black font-[600] text-[16px]'>Sub-Total</h3>
                                <h3 className='text-black font-[600] text-[16px]'>{subTotal}</h3>
                            </div>
                            <div className="Amount flex justify-between items-center">
                                <h3 className='text-black font-[600] text-[16px]'>Cash & Risk Handling Charge(1%)</h3>
                                <h3 className='text-black font-[600] text-[16px]'>{subTotalOnePercentCharge}</h3>
                            </div>
                            <div className="Amount flex justify-between items-center">
                                <h3 className='text-black font-[600] text-[16px]'>Total</h3>
                                <h3 className='text-black font-[600] text-[16px]'>{totalBalanceUser}</h3>
                            </div>

                            <div className="">
                                <h4 className='text-black font-[500] text-[14px] pt-2'>Created at:{date},{time}. Created By: {name} {LastName}</h4>
                                <h4 className='text-black font-[500] text-[14px] pt-2'>Paid at:{PaymentRequestUnkData?.PaidDate},{PaymentRequestUnkData?.PaidTime}. Paid By: {PaymentRequestUnkData?.PaidPersonName}</h4>
                            </div>
                        </div>
                        {/* Right Details  */}
                        {/* ============================ */}
                        <div className="BankDetails ">
                            <h3 className="text-gray-800 font-semibold text-lg mb-4">
                                Requested Withdrawal Method:{" "}
                                <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                    {ReqPay}
                                </span>
                            </h3>
                            <div>
                                <h3 className="text-black font-[700] text-[16px] pt-2">Bank Details:</h3>
                                <div className="ml-6">
                                    <h3 className="text-black font-[600] text-[16px] pt-2">
                                        Bank Name: {UserInformation?.BankName ? UserInformation?.BankName : "Bank name not provided"}
                                    </h3>
                                    <h3 className="text-black font-[600] text-[16px] pt-2">
                                        Branch: {UserInformation?.BranchName ? UserInformation?.BranchName : "Branch name not provided"}
                                    </h3>
                                    <h3 className="text-black font-[600] text-[16px] pt-2">
                                        Routing No: {UserInformation?.RoutingNo ? UserInformation?.RoutingNo : "Routing number not provided"}
                                    </h3>
                                    <h3 className="text-black font-[600] text-[16px] pt-2">
                                        Account Holder: {UserInformation?.AccountName ? UserInformation?.AccountName : "Account holder name not provided"}
                                    </h3>
                                    <h3 className="text-black font-[600] text-[16px] pt-2">
                                        Bank Account No: {UserInformation?.AccountNumber ? UserInformation?.AccountNumber : "Bank account number not provided"}
                                    </h3>
                                </div>
                            </div>

                            <h3 className="text-black font-[600] text-[16px] pt-2">
                                bKash: {UserInformation?.BakashNo ? UserInformation?.BakashNo : "bKash number not provided"}
                            </h3>
                            <h3 className="text-black font-[600] text-[16px] pt-2">
                                Rocket: {UserInformation?.RocketNo ? UserInformation?.RocketNo : "Rocket number not provided"}
                            </h3>
                            <h3 className="text-black font-[600] text-[16px] pt-2">
                                Nagad: {UserInformation?.NagadNo ? UserInformation?.NagadNo : "Nagad number not provided"}
                            </h3>

                        </div>
                    </div>

                    {/* Parcel Information of Payments */}
                    {/* ======================================== */}
                    <div className="PaymentRequestUserAllPaymentStandardOrderData mt-14">

                        <div className="text-center">
                            <h4 className='text-[22px] font-[600] text-black'>Cleared Consignments Parcel({userPaymentRequestDeliveryDataAll.length})</h4>
                            <h4 className='text-[16px] pt-1 font-[600] text-black'>Cleared Amount: {TotalCodAmount} Tk</h4>
                        </div>

                        <div className="RequestUserAllPaymentStandardOrderData">
                            {
                                userPaymentRequestDeliveryDataAll.map(PaymentStandardDataAll => <UserPaymentRequestAllPaymentDataShow key={PaymentStandardDataAll} PaymentStandardDataAll={PaymentStandardDataAll}></UserPaymentRequestAllPaymentDataShow>)
                            }
                        </div>

                        <h4 className='mt-3 text-black font-[600]'>Printed at: {moment().format("MM/DD/YY , hh:mm A")}</h4>

                    </div>
                </div>

            </div>

            {/* ========================================================== */}
            {/* Payment Request Status Update to Admin (Modal)  */}
            {/* ========================================================== */}
            {PaymentDetailsForModal && (
                <dialog
                    id="PaymentDetailsEditToAdmin"
                    className="modal absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div className="modal-box w-full md:max-[40%] max-h-[90vh] bg-gray-900 text-white rounded-xl overflow-y-auto">
                        <h3 className="font-bold text-2xl mb-6 text-center bg-gray-900 py-4 z-10">
                            🔐 Edit Payment Information
                        </h3>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            let PayUp = event.target.payUP.value
                            let allInfo = { PayUp }

                            fetch(`http://localhost:5000/AdminUpdateUserSendPaymentInvoiceData/${PaymentDetailsForModal?._id}`, {
                                method: "PATCH",
                                headers: {
                                    "content-type": "application/json"
                                },
                                body: JSON.stringify(allInfo)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.modifiedCount > 0) {
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Your Update User has been Success",
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        refetch()
                                    }
                                })
                        }}>
                            <div>
                                <p className="font-semibold text-gray-300">Selected Payment Method: {PaymentDetailsForModal?.ReqPay}</p>
                                <select required name='payUP' className="select select-bordered w-full mt-4">
                                    <option disabled selected>Selected Payment Request</option>
                                    <option>Cash</option>
                                    <option>Bank</option>
                                    <option>Nogod</option>
                                    <option>Bkash</option>
                                    <option>Rocket</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#22A197] text-white mt-4 text-[14px] font-semibold rounded-[8px] w-full py-[10px]"
                            >✅ Submit</button>
                        </form>

                        <div className="modal-action mt-8 flex justify-end">
                            <button
                                onClick={() => {
                                    document.getElementById("PaymentDetailsEditToAdmin").close();
                                }}
                                className="btn bg-gray-300 text-black"
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
            {/* ========================================================== */}
            {/* (PARCEL-MODAL) Parcel Details Show Bellow End  */}
            {/* ========================================================== */}

        </div>
    );
};

export default AdminPaymentRequestDetailsAll;