import React, {useRef} from 'react';
import "./UserPaymentRequestUnikDataAll.css"
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import logo from "../../../../../../assets/logo/LogoTwo.png"
import moment from 'moment';
import UserSeeAllPaymentRequestDelivaryData from '../UserSeeAllPaymentRequestDelivary/UserSeeAllPaymentRequestDelivaryData';
import { useReactToPrint } from "react-to-print";

const UserPaymentRequestUnikDataAll = () => {
    
    let userPaymentRequestData = useLoaderData()
    // console.log(userPaymentRequestData)

    let { _id, ReqPaymentID, ReqPay, TotalCodAmount, TotalDeliveryCharge, subTotal, subTotalOnePercentCharge, totalBalanceUser, name, LastName, photo, userId, Address, BusinessName, Phone, ReqUserEmail, userStatus, date, time, Payment } = userPaymentRequestData


    // find request user paid Delivery data all
    let { data: userALlPaidDeliveryDataFind = [] } = useQuery(["AdminPaymentRequestSendUserEmailFindAllDeliveryData"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/AdminPaymentRequestSendUserEmailFindAllDeliveryData?email=${ReqUserEmail}`)
        return res.json()

    })
    // console.log(userALlPaidDeliveryDataFind)

    // User Request Payment Id get, Delivery all Paid Data User
    let userPaidAllDeliveryData = userALlPaidDeliveryDataFind.filter(PaidDeliveryDataAll => PaidDeliveryDataAll?.PaymentID == ReqPaymentID)

    // console.log(userPaidAllDeliveryData)

    // ==========================================================
    // Print (Payment Report) Options Start
    // ==========================================================
    const PaymentRef = useRef();
    const handlePaymentDetailsPrint = useReactToPrint({
        content: () => PaymentRef.current,
    });



    return (
        <div className=''>

            <button
                onClick={handlePaymentDetailsPrint}
                className="mx-4 my-4 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
            >📥 Download Excel</button>

            {/* ============================================ */}
            {/* Payment Details All Here!! */}
            {/* ============================================ */}
            <div ref={PaymentRef} className='UserSeePaymentRequestDetailsAll mx-2 md:mx-4 rounded-[6px] my-4 bg-white px-2 md:px-6 py-10'>
                <div className="PaymentRequestDetailsUserInvoice">

                    {/* Paid Badge  */}
                    {/* ============================ */}
                    <div className="DownloadBtn md:flex gap-5 w-[100%] md:w-[28%] ml-auto items-center justify-center">
                        <button>{Payment}</button>
                    </div>

                    {/* Invoice Details  */}
                    {/* ============================ */}
                    <div className="HeadInvoice w-[100%] md:w-[54%] md:flex justify-between mt-6">
                        <div className="img w-[42%] md:w-[22%] mx-auto md:mx-0">
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
                    <div className="AmountAndBankDetails  mt-6">
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
                                <h4 className='text-black font-[500] text-[14px] pt-2'>Paid at:{userPaymentRequestData?.PaidDate},{userPaymentRequestData?.PaidTime}. Paid By: {userPaymentRequestData?.PaidPersonName}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Parcel Information of Payments */}
                    {/* ======================================== */}
                    <div className="PaymentRequestUserAllPaymentStandardOrderData mt-14">
                        <div className="text-center">
                            <h4 className='text-[22px] font-[600] text-black'>Cleared Consignments ({userPaidAllDeliveryData.length})</h4>
                            <h4 className='text-[16px] pt-1 font-[600] text-black'>Cleared Amount: {TotalCodAmount} Tk</h4>
                        </div>
                        <div className="RequestUserAllPaymentStandardOrderData">
                            {
                                userPaidAllDeliveryData.map(PaymentStandardDataAll => <UserSeeAllPaymentRequestDelivaryData key={PaymentStandardDataAll._id} PaymentStandardDataAll={PaymentStandardDataAll}></UserSeeAllPaymentRequestDelivaryData>)
                            }
                        </div>
                        <h4 className='mt-3 text-black font-[600]'>Printed at: {moment().format("MM/D/YY , hh:mm A")}</h4>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default UserPaymentRequestUnikDataAll;