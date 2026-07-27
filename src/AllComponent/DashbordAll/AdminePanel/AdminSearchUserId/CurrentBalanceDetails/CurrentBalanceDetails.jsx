import React, { useState } from 'react';
import "./CurrentBalanceDetails.css"
import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import CurrentBalanceDetailsAllData from './CurrentBalanceDetailsAllData/CurrentBalanceDetailsAllData';
import Swal from 'sweetalert2';
import moment from 'moment';

const CurrentBalanceDetails = () => {

    let { email } = useParams()
    let PaymentBalance = useLoaderData()
    let navigate =useNavigate()
    // console.log(email)

    // ===================================================
    // User Information find for payment Request !!
    // ===================================================
    let { refetch, data: userInformationForPayment = [] } = useQuery(["userRoleCheck"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/userRoleCheck/${email}`)
        return res.json()

    })
    // console.log(userInformationForPayment)
    let { _id, Address, BusinessName, LastName, Password, Phone, name, photo, role, status, userId, Districts, PoliceStations, date } = userInformationForPayment


    // ===================================================
    // Send Payment Request Pop-up Start
    // ===================================================
    let [poup, setPoup] = useState(false)
    const clseAlertButton = () => {
        setPoup(false)
    }
    const handlePaymentRequestUser = () => {
        setPoup(true)
    }


    // ==================================================================================================
    // User balance Information calculation !!
    // ===============================================================

    // All Delivered & PartiallyDelivered payment data find
    let CodAmountPaymentData = PaymentBalance.filter(PaymentAll => PaymentAll?.Payment == "Yes" && PaymentAll?.status == "Delivered" || PaymentAll?.Payment == "Yes" && PaymentAll?.status == "PartiallyDelivered")

    // console.log(CodAmountPaymentData)

    // total Cod Amount Balance
    const CodAmountResult = CodAmountPaymentData.reduce((prev, current) => prev + parseInt(current.CodAmount), 0);

    // console.log(CodAmountResult);

    // total Delivery Charge Balance
    const DeliveryChargeResult = CodAmountPaymentData.reduce((prev, current) => prev + parseInt(current.DeliveryCharge), 0);

    // console.log(DeliveryChargeResult);

    // Sub total balance
    let subTotal = CodAmountResult - DeliveryChargeResult
    // console.log(subTotal)

    // Cash Charge(1%) Balance
    let subTotalOnePercentCharge = subTotal * 1 / 100
    // console.log(subTotalOnePercentCharge)

    let totalBalanceUser = subTotal - subTotalOnePercentCharge
    // console.log(totalBalanceUser)


    // ============================================================================================================
    // All Police Station data. which is add Hub
    // =====================================================
    let { data: AllStationOfHub = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_PoliceStationWithOfHub"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/PoliceStationWithOfHub")
        return res.json()
    })
    // console.log(AllStationOfHub)

    // Find my hub to match my police station with hub police station !!
    // =======================================================================
    let MyHub = AllStationOfHub?.find(Hub => Hub?.PoliceStation === userInformationForPayment?.PoliceStations)
    // console.log(MyHub?.HubName)
    // MyHub:MyHub?.HubName


    // =========================================================================================================
    // Payment Request send to admin of user start
    // =================================================
    let handleUserPaymentRequest = (event) => {
        event.preventDefault()
        let pay = event.target.pay.value
        let PaymentIdUser = Math.round(Math.random() * 99999999).toString()
        let date = moment().format("MM/DD/YYYY")
        let time = moment().format("hh:mm A")
        let UpdatePaymentId = { PaymentID: PaymentIdUser }

        let paymentRequestAllDataPost = {
            ReqPaymentID: PaymentIdUser, ReqPay: pay,
            TotalCodAmount: CodAmountResult, TotalDeliveryCharge: DeliveryChargeResult, subTotal, subTotalOnePercentCharge, totalBalanceUser,
            name, LastName, photo, userId, Address, BusinessName, PoliceStations, Phone, ReqUserEmail: email, userStatus: status, date, time, Payment: "UnPaid", MyHub: MyHub?.HubName
        }
        // Check user bank information add or not 
        if (pay === "Bkash") {
            if (!userInformationForPayment?.BakashNo) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your ${pay} number first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${userInformationForPayment?.userId}`);
                });
                return;
            }
        }
        // Check user bank information add or not 
        if (pay === "Nogod") {
            if (!userInformationForPayment?.NagadNo) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your ${pay} number first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${userInformationForPayment?.userId}`);
                });
                return;
            }
        }
        // Check user bank information add or not 
        if (pay === "Rocket") {
            if (!userInformationForPayment?.RocketNo) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your ${pay} number first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${userInformationForPayment?.userId}`);
                });
                return;
            }
        }
        // Check user bank information add or not 
        if (pay === "Cash" || pay === "Bank") {
            if (
                !userInformationForPayment?.BankName ||
                !userInformationForPayment?.AccountName ||
                !userInformationForPayment?.AccountNumber ||
                !userInformationForPayment?.BranchName ||
                !userInformationForPayment?.RoutingNo
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your bank details first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${userInformationForPayment?.userId}`);
                });
                return;
            }
        }


        fetch(`https://server.trustereocourier.com.bd/UserPaymentRequestUpdateAllData/${userInformationForPayment?.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(UpdatePaymentId)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    // Post Data  Start
                    fetch("https://server.trustereocourier.com.bd/UserPaymentRequest", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(paymentRequestAllDataPost)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your Payment Request Is Success',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                    // Post Data  End
                }
                refetch()
            })
    }



    return (
        <div className='AllCurrentBalanceDetails'>

            <div className='CurrentBalanceDetails bg-white my-8 mx-6 px-6 py-4 rounded-[7px]'>
                <div className='flex items-center justify-between pb-2'>
                    <h3>Balance Details</h3>
                    <button className="py-2 px-6 rounded-[8px] text-black font-[600]" onClick={handlePaymentRequestUser}>Send a payment request</button>
                </div>

                <div class="Horijontal bg-black mt-[4px] mb-[20px] w-[full] h-[1px]"></div>

                <div className='BalanceDetailsCalculations'>
                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Total Amount Delivered</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{CodAmountResult}</h4>
                    </div>
                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Due Bills</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{DeliveryChargeResult}</h4>
                    </div>
                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Sub-Total</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{subTotal}</h4>
                    </div>

                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Cash & Risk Handling Charge(1%)</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{subTotalOnePercentCharge}</h4>
                    </div>
                    <div className="BalanceItems flex justify-between items-center">
                        <h2 className='text-black text-[18px] font-[600] '>Total</h2>
                        <h4 className='text-black text-[18px] font-[600] '>{totalBalanceUser}</h4>
                    </div>
                </div>

                <div className="ThisAllPaymentData">
                    <h3>Consignment Going to Be Cleared ({CodAmountPaymentData.length})</h3>

                    <div className="overflow-x-auto mt-4">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>DATE</th>
                                    <th>ID</th>
                                    <th>WEIGHT</th>
                                    <th>CUSTOMER NAME</th>
                                    <th>COD AMOUNT</th>
                                    <th>DELIVERY CHARGE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CodAmountPaymentData?.map(AmountPaymentDataAll =>
                                        <CurrentBalanceDetailsAllData key={AmountPaymentDataAll._id} AmountPaymentDataAll={AmountPaymentDataAll}></CurrentBalanceDetailsAllData>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ============================================= */}
            {/* Payment Request Send Modal  */}
            {/* ============================================= */}
            <div className={`alertContainer rounded-[8px]  px-4  lg:px-0 w-full lg:w-[24%]  ${poup === true && "showAlertJs"}`} >

                <div className="poup ">
                    <div className="popInfo px-4 py-4 mt-3">

                        <h6>Payment Request</h6>

                        <form onSubmit={handleUserPaymentRequest}>

                            <select required name='pay' className="select select-bordered w-full max-w-xs mt-4">
                                <option disabled selected>Selected Payment Request</option>
                                <option>Cash</option>
                                <option>Bank</option>
                                <option>Nogod</option>
                                <option>Bkash</option>
                                <option>Rocket</option>
                            </select>

                            <button disabled={totalBalanceUser === 0} type='submit' className='UpdateButton' >Send Payment Request</button>

                        </form>

                    </div>
                    <button onClick={clseAlertButton} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>

            </div>

        </div>
    );
};

export default CurrentBalanceDetails;