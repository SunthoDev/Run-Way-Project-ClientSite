import React from 'react';
import "./AdminPaymentRequestDetailsAll.css"
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import logo from "../../../../../../assets/logo/LogoTwo.png"
import UserPaymentRequestAllPaymentDataShow from '../UserPaymentRequestAllPaymentDataShow/UserPaymentRequestAllPaymentDataShow';


const AdminPaymentRequestDetailsAll = () => {

    let PaymentRequestUnkData = useLoaderData()
    // console.log(PaymentRequestUnkData)
    let { _id, ReqPaymentID, ReqPay, TotalCodAmount, TotalDeliveryCharge, subTotal, subTotalOnePercentCharge, totalBalanceUser, name, LastName, photo, userId, Address, BusinessName, Phone, ReqUserEmail, userStatus, UserPaymentReqDate, Payment } = PaymentRequestUnkData


    // find request user,, user Details Information User Collection
    let { refetch, data: requestUserUserInformationFind = [] } = useQuery(["AdminPaymentRequestSendUserInformationGet"], async () => {
        let res = await fetch(`http://localhost:5000/AdminPaymentRequestSendUserInformationGet?email=${ReqUserEmail}`)
        return res.json()

    })
    let UserInformation=requestUserUserInformationFind[0]

    // console.log(requestUserUserInformationFind[0])



    // find request user paid Delivery data all
    let { data: userALlDeliveryDataFind = [] } = useQuery(["AdminPaymentRequestSendUserEmailFindAllDeliveryData"], async () => {
        let res = await fetch(`http://localhost:5000/AdminPaymentRequestSendUserEmailFindAllDeliveryData?email=${ReqUserEmail}`)
        return res.json()

    })
    // console.log(userALlDeliveryDataFind)


    // User Request Payment Id get, Delivery all Paid Data User
    let userPaymentRequestDeliveryDataAll = userALlDeliveryDataFind.filter(PaidDeliveryDataAll => PaidDeliveryDataAll?.PaymentID == ReqPaymentID)

    // console.log(userPaymentRequestDeliveryDataAll)


    return (
        <div className='AdminPaymentRequestDetailsAll mx-2 md:mx-4 rounded-[6px] my-4 bg-white px-2 md:px-6 py-10'>

            <div className="PaymentRequestDetailsInvoice">

                <div className="DownloadBtn md:flex gap-5 w-[100%] md:w-[28%] ml-auto items-center justify-center">
                    <h3>{Payment}</h3>
                    <button>Edit</button>
                    <button className="ml-4 md:ml-0">Download Excel</button>
                </div>

                <div className="HeadInvoice w-[100%] md:w-[62%] md:flex justify-between mt-6">
                    <div className="img w-[42%] md:w-[22%] mx-auto md:mx-0">
                        <img className='w-[100%]' src={logo} alt="img" />
                    </div>
                    <div className="Invoice text-center mt-2 md:mt-0">
                        <h3>INVOICE</h3>
                        <h4>Date: {UserPaymentReqDate}</h4>
                        <h4>ID: #{ReqPaymentID}</h4>
                    </div>
                </div>

                <div class="Horijontal bg-[#d4d2d2] mt-[20px]  w-[full] h-[1px]"></div>

                <div className="AmountAndBankDetails grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

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
                            <h4 className='text-black font-[500] text-[14px] pt-2'>Created at: 2023-04-27 06:24:36 PM Created By: Rahmat ullah - 22</h4>
                            <h4 className='text-black font-[500] text-[14px] pt-2'>Last Updated at: 2023-05-07 06:11:56 PM</h4>
                            <h4 className='text-black font-[500] text-[14px] pt-2'>Ready at: 2023-04-29 10:55 AM</h4>
                            <h4 className='text-black font-[500] text-[14px] pt-2'>Paid at: 2023-05-07 06:11 PM Paid By: Rahmat ullah - 22</h4>
                        </div>




                    </div>

                    <div className="BankDetails ">

                        <h3 className='text-black font-[600] text-[16px]'>Requested Withdrawal Method: <span className='font-[700]'>{ReqPay}</span></h3>
                        <div className="">
                            <h3 className='text-black font-[700] text-[16px] pt-2'>Bank Details:</h3>
                            <div className="ml-6">
                                <h3 className='text-black font-[600] text-[16px] pt-2'>Bank Name: {UserInformation?.BankName ? UserInformation?.BankName : "User Not Add Bank Name"} </h3>
                                <h3 className='text-black font-[600] text-[16px] pt-2'>Branch: {UserInformation?.BranchName ? UserInformation?.BranchName : "User Not Add Branch Name"}</h3>
                                <h3 className='text-black font-[600] text-[16px] pt-2'>Routing No: {UserInformation?.RoutingNo ? UserInformation?.RoutingNo : "User Not Add Routing No"}</h3>
                                <h3 className='text-black font-[600] text-[16px] pt-2'>Account Holder: {UserInformation?.AccountName ? UserInformation?.AccountName : "User Not Add Account Holder"}</h3>
                     <h3 className='text-black font-[600] text-[16px] pt-2'>Bank Account Number: {UserInformation?.AccountNumber ? UserInformation?.AccountNumber : "User Not Add Bank Account Number"}</h3>
                            </div>
                        </div>
                        <h3 className='text-black font-[600] text-[16px] pt-2'>bKash: {UserInformation?.BakashNo ? UserInformation?.BakashNo : "User Not Add Bakash Number"}</h3>
                        <h3 className='text-black font-[600] text-[16px] pt-2'>Rocket: {UserInformation?.RocketNo ? UserInformation?.RocketNo : "User Not Add Rocket Number"}</h3>
                        <h3 className='text-black font-[600] text-[16px] pt-2'>Nagad: {UserInformation?.NagadNo ? UserInformation?.NagadNo : "User Not Add Nogod Number"}</h3>

                    </div>

                </div>

                <div className="PaymentRequestUserAllPaymentStandardOrderData mt-14">

                    <div className="text-center">
                        <h4 className='text-[22px] font-[600] text-black'>Cleared Consignments ({userPaymentRequestDeliveryDataAll.length})</h4>
                        <h4 className='text-[16px] pt-1 font-[600] text-black'>Cleared Amount: {TotalCodAmount} Tk</h4>

                    </div>

                    <div className="RequestUserAllPaymentStandardOrderData">

                        {
                            userPaymentRequestDeliveryDataAll.map(PaymentStandardDataAll=><UserPaymentRequestAllPaymentDataShow key={PaymentStandardDataAll} PaymentStandardDataAll={PaymentStandardDataAll}></UserPaymentRequestAllPaymentDataShow>)
                        }
                    </div>

                    <h4 className='mt-3 text-black font-[600]'>Printed at: {moment().format("MM/D/YY , hh:mm A")}</h4>

                </div>

            </div>

        </div >
    );
};

export default AdminPaymentRequestDetailsAll;