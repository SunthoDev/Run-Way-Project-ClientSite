import React, { useState } from 'react';
import "./DashboardItemsUser.css"
import useRole from '../../../../Hook/useRole';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from 'moment';
import done from '../../../../assets/IconAll/done.png';
import celebration from '../../../../assets/IconAll/celebration.gif';
import { ResponsiveBar } from '@nivo/bar';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

const DashboardItemsUser = () => {

    let [poup, setPoup] = useState(false)
    const clseAlertButton = () => {
        setPoup(false)
    }
    const handlePaymentRequestUser = () => {
        setPoup(true)
    }
    // ===================================================

    const [roles] = useRole()
    const navigate = useNavigate()
    // console.log(roles)
    let { Address, BusinessName, LastName, Phone, email, name, photo, status, userId, PoliceStations, Districts } = roles

    let { refetch, data: AllDeliveryDataUserBalance = [] } = useQuery(["UserTotalBalanceFindDeliveryAllData"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/UserTotalBalanceFindDeliveryAllData?email=${roles.email}`)
        return res.json()
    })

    // console.log(AllDeliveryDataUser  Balance)

    // All Delivered & PartiallyDelivered payment data find
    let CodAmountPaymentData = AllDeliveryDataUserBalance.filter(PaymentAll => PaymentAll?.Payment == "Yes" && PaymentAll?.status == "Delivered" || PaymentAll?.Payment == "Yes" && PaymentAll?.status == "PartiallyDelivered")
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
    let MyHub = AllStationOfHub?.find(Hub => Hub?.PoliceStation === roles?.PoliceStations)
    // console.log(MyHub?.HubName)
    // MyHub:MyHub?.HubName


    // =========================================================================================================
    // Payment Request user start
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
            if (!roles?.BakashNo) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your ${pay} number first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${roles?.userId}`);
                });
                return;
            }
        }
        // Check user bank information add or not 
        if (pay === "Nogod") {
            if (!roles?.NagadNo) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your ${pay} number first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${roles?.userId}`);
                });
                return;
            }
        }
        // Check user bank information add or not 
        if (pay === "Rocket") {
            if (!roles?.RocketNo) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your ${pay} number first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${roles?.userId}`);
                });
                return;
            }
        }
        // Check user bank information add or not 
        if (pay === "Cash" || pay === "Bank") {
            if (
                !roles?.BankName ||
                !roles?.AccountName ||
                !roles?.AccountNumber ||
                !roles?.BranchName ||
                !roles?.RoutingNo
            ) {
                Swal.fire({
                    icon: "warning",
                    title: "Missing Information",
                    text: `Please add your bank details first!`,
                }).then(() => {
                    navigate(`/dashboard/UserAddBankDetails/${roles?.userId}`);
                });
                return;
            }
        }







        fetch(`https://server.trustereocourier.com.bd/UserPaymentRequestUpdateAllData/${roles.email}`, {
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

    // =========================================================================================================
    // Chart all Data Here !!
    // =================================================

    const sampleData = [
        {
            country: 'Dhaka',
            'Parcel': 120,
            'Pickup': 150,
            'Delivery': 90,
            'Payment': 110,
            'AddPayment': 200,
            'Transction': 80,
        },
        {
            country: 'Sylhet',
            'Parcel': 80,
            'Pickup': 140,
            'Delivery': 60,
            'Payment': 100,
            'AddPayment': 170,
            'Transction': 60,
        },
        {
            country: 'Chatgram',
            'Parcel': 100,
            'Pickup': 120,
            'Delivery': 70,
            'Payment': 90,
            'AddPayment': 160,
            'Transction': 75,
        },
        {
            country: 'Rajshae',
            'Parcel': 130,
            'Pickup': 110,
            'Delivery': 85,
            'Payment': 95,
            'AddPayment': 180,
            'Transction': 85,
        },
    ];

    // ==================

    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
        { name: 'B1', value: 100 },
        { name: 'B2', value: 80 },
        { name: 'B3', value: 40 },
        { name: 'B4', value: 50 },
        { name: 'C1', value: 100 },
        { name: 'C2', value: 200 },
        { name: 'D1', value: 150 },
        { name: 'D2', value: 50 },
    ];
    const COLORS = ['#8884d8', '#8dd1e1', '#82ca9d', '#ffc658'];

    // (truncate) If i use it css class text will be ->(...)

    return (
        <div className='bg-[#F6F6F6]'>
            <div className='DashboardItems px-[12px] md:px-4 my-4'>

                {/* ============================================= */}
                {/* First Information All */}
                {/* ============================================= */}
                <div className="OneItemsParent grid md:grid-cols-7 gap-4 pb-[14px]">

                    <div className="AllRequestDetails md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                            <div className="Dh-[260px]">
                                <div onClick={handlePaymentRequestUser} className="h-[100px] mb-[8px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#F23F83] py-[2px] px-[4px] rounded-[6px]">
                                        <div className="svg">
                                            <svg xmlns="https://www.w3.org/2000/svg" width="35" height="33" viewBox="0 0 890.5 890.5"><path d="M208.1,180.56l355-96.9l-18.8-38c-12.3-24.7-42.3-34.9-67-22.6l-317.8,157.5H208.1z" fill="#FFFFFF"></path> <path d="M673.3,86.46c-4.399,0-8.8,0.6-13.2,1.8l-83.399,22.8L322,180.56h289.1h126l-15.6-57.2    C715.5,101.06,695.3,86.46,673.3,86.46z" fill="#FFFFFF"></path> <path d="M789.2,215.56h-11.4h-15.5h-15.5H628.5H193.8h-57h-48h-8.9H50.1c-15.8,0-29.9,7.3-39.1,18.8c-4.2,5.3-7.4,11.4-9.2,18.1    c-1.1,4.2-1.8,8.6-1.8,13.1v6v57v494.1c0,27.601,22.4,50,50,50h739.1c27.601,0,50-22.399,50-50v-139.5H542.4    c-46.9,0-85-38.1-85-85v-45.8v-15.5v-15.5v-34.4c0-23,9.199-43.899,24.1-59.199c13.2-13.601,30.9-22.801,50.7-25.101    c3.3-0.399,6.7-0.6,10.1-0.6h255.2H813h15.5h10.6v-136.5C839.2,237.96,816.8,215.56,789.2,215.56z" fill="#FFFFFF"></path> <path d="M874.2,449.86c-5-4.6-10.9-8.1-17.5-10.4c-5.101-1.699-10.5-2.699-16.2-2.699h-1.3h-1h-15.5h-55.9H542.4    c-27.601,0-50,22.399-50,50v24.899v15.5v15.5v55.4c0,27.6,22.399,50,50,50h296.8h1.3c5.7,0,11.1-1,16.2-2.7    c6.6-2.2,12.5-5.8,17.5-10.4c10-9.1,16.3-22.3,16.3-36.899v-111.3C890.5,472.16,884.2,458.959,874.2,449.86z M646.8,552.36    c0,13.8-11.2,25-25,25h-16.6c-13.8,0-25-11.2-25-25v-16.6c0-8,3.7-15.101,9.6-19.601c4.3-3.3,9.601-5.399,15.4-5.399h4.2H621.8    c13.8,0,25,11.199,25,25V552.36L646.8,552.36z" fill="#FFFFFF"></path></svg>
                                        </div>
                                    </div>
                                    <p className="py-[8px] text-[14px] font-[600] text-black">Payment Request</p>
                                </div>
                                <div onClick={() => document.getElementById("PickUpRequest").showModal()} className="h-[160px] p-4 bg-[#1898C7] shadow rounded-[24px]">
                                    <div className="items bg-[#F23F83] py-[2px] px-[4px] rounded-[6px]">
                                        <div className="svg">
                                            <svg xmlns="https://www.w3.org/2000/svg" width="56" height="34" viewBox="-25 85 665 436"><path d="M21.474,377.522V117.138c0-14.469,11.729-26.199,26.199-26.199h260.25c14.469,0,26.198,11.73,26.198,26.199v260.385   c0,4.823-3.909,8.733-8.733,8.733H30.207C25.383,386.256,21.474,382.346,21.474,377.522z M231.634,466.724   c0,30.01-24.329,54.338-54.338,54.338c-30.009,0-54.338-24.328-54.338-54.338c0-30.011,24.329-54.338,54.338-54.338   C207.305,412.386,231.634,436.713,231.634,466.724z M204.464,466.724c0-15.005-12.164-27.169-27.169-27.169   s-27.17,12.164-27.17,27.169s12.165,27.17,27.17,27.17S204.464,481.729,204.464,466.724z M130.495,412.385H8.733   c-4.823,0-8.733,3.91-8.733,8.733v26.495c0,4.823,3.91,8.733,8.733,8.733h97.598C108.879,438.862,117.704,423.418,130.495,412.385z    M515.938,466.724c0,30.01-24.329,54.338-54.338,54.338c-30.01,0-54.338-24.328-54.338-54.338   c0-30.011,24.328-54.338,54.338-54.338C491.609,412.385,515.938,436.713,515.938,466.724z M488.77,466.724   c0-15.005-12.165-27.169-27.17-27.169c-15.006,0-27.169,12.164-27.169,27.169s12.164,27.17,27.169,27.17   S488.77,481.729,488.77,466.724z M612,421.118v26.495c0,4.823-3.91,8.733-8.733,8.733h-70.704   c-5.057-34.683-34.906-61.427-70.961-61.427c-36.062,0-65.912,26.745-70.969,61.427H248.261   c-2.549-17.483-11.373-32.928-24.164-43.961h134.994V162.594c0-9.646,7.82-17.466,17.466-17.466h82.445   c23.214,0,44.911,11.531,57.9,30.77l53.15,78.721c7.796,11.547,11.962,25.161,11.962,39.094v118.672h21.253   C608.09,412.385,612,416.295,612,421.118z M523.408,256.635l-42.501-60.393c-1.636-2.324-4.3-3.707-7.142-3.707H407.47   c-4.822,0-8.733,3.91-8.733,8.733v60.393c0,4.824,3.91,8.733,8.733,8.733h108.798C523.342,270.394,527.48,262.421,523.408,256.635z   " fill="#FFFFFF"></path></svg>
                                        </div>
                                    </div>
                                    <h2 className='py-[8px] text-[14px] font-[600] text-white'>Pickup Request</h2>
                                </div>
                            </div>

                            <div className="Dh-[260px]">

                                <div className="h-[160px] mb-[8px] p-4 bg-[#FA6969] shadow rounded-[24px]">
                                    <div className="items bg-[#F23F83] py-[2px] px-[4px] rounded-[6px]">
                                        <svg xmlns="https://www.w3.org/2000/svg" width="36" height="33" viewBox="0 0 512 512"><path d="M488.399,492h-21.933V173.536c0-14.823-12.06-26.882-26.882-26.882H390.56c-14.823,0-26.882,12.06-26.882,26.882V492    h-55.692V317.825c0-14.823-12.059-26.882-26.882-26.882H232.08c-14.823,0-26.882,12.06-26.882,26.882V492h-55.692v-90.204    c0-14.823-12.06-26.882-26.882-26.882H73.599c-14.823,0-26.882,12.06-26.882,26.882V492H23.601c-5.523,0-10,4.477-10,10    s4.477,10,10,10h464.798c5.523,0,10-4.477,10-10S493.922,492,488.399,492z M129.504,492H66.716v-90.204    c0-3.795,3.087-6.882,6.882-6.882h49.024c3.795,0,6.882,3.087,6.882,6.882V492z M287.985,492h-62.788V317.825    c0-3.795,3.087-6.882,6.882-6.882h49.024c3.794,0,6.882,3.087,6.882,6.882V492z M446.466,492h-62.788V173.536    c0-3.795,3.087-6.882,6.882-6.882h49.024c3.795,0,6.882,3.087,6.882,6.882V492z" fill="#ffffff"></path> <path d="M466.442,10.516c0.14-2.729-0.82-5.504-2.904-7.588c-2.084-2.084-4.859-3.045-7.588-2.904    C455.789,0.017,455.63,0,455.466,0h-60.5c-5.523,0-10,4.477-10,10s4.477,10,10,10h37.357l-98.857,98.858l-37.28-37.28    c-1.875-1.875-4.419-2.929-7.071-2.929c-2.652,0-5.196,1.054-7.071,2.929l-179.769,179.77c-3.905,3.905-3.905,10.237,0,14.143    c1.953,1.951,4.512,2.927,7.071,2.927s5.119-0.976,7.071-2.929L289.115,102.79l37.28,37.28c3.905,3.905,10.237,3.905,14.143,0    L446.466,34.143v33.81c0,5.523,4.477,10,10,10s10-4.477,10-10V11C466.466,10.837,466.449,10.678,466.442,10.516z" fill="#ffffff"></path> <circle cx="75.64" cy="303.31" r="10" fill="#ffffff"></circle></svg>
                                    </div>
                                    <p className="py-[8px] text-[14px] font-[600] text-white">Balance Check</p>
                                    <h2 className="text-[18px] font-[600] text-white">{totalBalanceUser}</h2>
                                </div>
                                <div className="h-[100px] p-4 bg-white shadow rounded-[24px]">
                                    <h2 className='py-[8px] text-[14px] font-[600] text-black'>Pick N Drop</h2>
                                    <h2 className="text-[14px] font-[600] text-black">Service</h2>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="PickUpHistory md:col-span-3 bg-white h-[268px] w-full rounded-[24px]">
                        <ResponsiveBar
                            data={sampleData}
                            keys={['Parcel', 'Pickup', 'Delivery', 'Payment', 'AddPayment', 'Transction']}
                            indexBy="country"
                            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            borderColor={{
                                from: 'color',
                                modifiers: [['darker', 1.6]],
                            }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Country',
                                legendPosition: 'middle',
                                legendOffset: 32,
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'Sales',
                                legendPosition: 'middle',
                                legendOffset: -40,
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{
                                from: 'color',
                                modifiers: [['darker', 1.6]],
                            }}
                            legends={[
                                {
                                    dataFrom: 'keys',
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 120,
                                    translateY: 0,
                                    itemsSpacing: 2,
                                    itemWidth: 100,
                                    itemHeight: 20,
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 0.85,
                                    symbolSize: 20,
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemOpacity: 1,
                                            },
                                        },
                                    ],
                                },
                            ]}
                            role="application"
                            ariaLabel="Nivo bar chart example"
                            barAriaLabel={e =>
                                `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`
                            }
                        />
                    </div>

                    <div className="OrderHistory rounded-[24px] md:col-span-2 h-[268px] w-full overflow-hidden px-4 bg-white">
                        <h4 className="text-left pt-[8px] font-[600] sticky top-0 bg-white text-[16px] text-black">
                            Order Summary
                        </h4>

                        <div className="overflow-hidden relative h-[220px] mt-2">
                            <div className="animate-marquee-up space-y-2">
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>
                                <div className="h-[80px] mb-[8px] p-4 bg-[#B8D6C2] rounded-[14px]">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[12px] font-[600] text-black"> 📦#H54367890</p>
                                        <h2 className="text-[12px] font-[600] text-black">Delivered</h2>
                                    </div>
                                    <p className="text-[12px] text-justify font-[400] text-black">Your order was delivered on. Your order was delivered on!!</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* ============================================= */}
                {/* Second Information All */}
                {/* ============================================= */}
                <div className="TwoItemsParent grid md:grid-cols-7 gap-4">

                    <div className="PickUpHistory md:col-span-2 bg-white h-[304px] w-full | flex items-center justify-center rounded-[24px]">

                        <ResponsiveContainer width="100%" height={304}>
                            <PieChart>
                                <Tooltip />
                                <Pie
                                    data={data01}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={60}
                                    fill="#8884d8"
                                >
                                    {data01.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>

                                <Pie
                                    data={data02}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    fill="#82ca9d"
                                    label
                                >
                                    {data02.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>

                    </div>

                    <div className="AllRequestDetails md:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <Link to="/dashboard/addParcel">
                                <div className="hover:bg-[#EDEEC0] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#EDEEC0] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">Add Parcel</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/dashboard/AllMarchentConsignment">
                                <div className="hover:bg-[#D6D0F4] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#D6D0F4] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">All Consignments</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/dashboard/UserAllPickupRequestData">
                                <div className="hover:bg-[#F4AFE8] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#F4AFE8] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">My Pickup Parcel</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/dashboard/UserAmountChange">
                                <div className="hover:bg-[#BAC8F2] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#BAC8F2] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">Amount Change</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/dashboard/UserAllCancelParcel">
                                <div className="hover:bg-[#8DD1E1] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#8DD1E1] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">Cancelled Parcels</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/dashboard/UserAllPaymentRequestData">
                                <div className="hover:bg-[#EDEEC0] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#EDEEC0] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">Payments List</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#">
                                <div className="hover:bg-[#F3F4C6] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#F3F4C6] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">Unknown</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#">
                                <div className="hover:bg-[#DCD6FA] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#DCD6FA] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">Unknown</p>
                                    </div>
                                </div>
                            </Link>
                            <Link to="#">
                                <div className="hover:bg-[#C0CEF8] transition duration-200 h-[96px] p-4 bg-white shadow rounded-[24px]">
                                    <div className="items bg-[#C0CEF8] py-[2px] px-[4px] rounded-[6px]">
                                        {/* <h2 className="text-[14px] font-semibold text-black truncate">Go Another Page</h2> */}
                                        <p className="py-[8px] text-[14px] font-[600] text-black">Unknown</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="OrderHistory rounded-[24px] md:col-span-2 h-[304px] w-full overflow-hidden px-4 py-2 bg-white relative">
                        <div className=" bg-[#F6F6F6] w-[24px] h-[38px] top-[50%] left-0 absolute translate-y-[-50%] rounded-r-3xl "></div>
                        <div className=" bg-[#F6F6F6] w-[24px] h-[38px] top-[50%] right-0 absolute translate-y-[-50%] rounded-l-3xl "></div>
                        <div className="w-[74%] top-[50%] border-dashed border-slate-600 border left-[50%] absolute translate-y-[-50%] translate-x-[-50%]"></div>

                        <div className="img mx-auto">
                            <img className="mx-auto" src={done} alt="done" />
                        </div>
                        <p className="text-center text-black font-[400] text-[14px]">Thank You!</p>
                        <div className="flex items-center justify-center">
                            <p className="text-center text-[#147634] font-[600] text-[12px]">Your transaction was successful
                            </p>
                            <img className="w-[28px] pl-[4px]" src={celebration} alt="celebration" />
                        </div>

                        <div className="flex items-center justify-between pt-[30px]">
                            <div className="">
                                <p className="text-dark font-[400] text-[12px]">Transaction ID</p>
                                <h4 className="text-black font-[600] text-[14px]">568368657681</h4>
                            </div>
                            <div className="">
                                <p className="text-dark font-[400] text-[12px]">Amount</p>
                                <h4 className="text-black font-[600] text-[14px]">34,000 Tk</h4>
                            </div>
                        </div>

                        <div className="pt-[24px]">
                            <p className="text-dark font-[400] text-[12px]">Date & Time</p>
                            <h4 className="text-black font-[600] text-[14px]">15 Jun 2024 • 6:90PM</h4>
                        </div>

                    </div>
                </div>

                {/* ============================================= */}
                {/* Payment Request Send Modal Start */}
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

                {/* ====================================================================== */}
                {/* Pickup Request Send Modal Start */}
                {/* ====================================================================== */}
                <dialog id="PickUpRequest" className="modal">
                    <div className="modal-box bg-white">
                        <h3 className="font-bold text-lg mb-4">Send Pickup Request</h3>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const PickupRequest = e.target.PickupRequestType.value;
                                let PickupIdUser = Math.round(Math.random() * 99999999).toString()
                                let date = moment().format("MM/DD/YYYY")
                                let time = moment().format("hh:mm A")

                                let AllInfo = { PickupRequestType: PickupRequest, PickupIdUser, date, time, Address, BusinessName, LastName, Phone, PickReqUserEmail: email, name, photo, userId, status: "Pending", PoliceStations, Districts, MyHub: MyHub?.HubName, AssignRider:"No" }

                                try {
                                    const response = await fetch("https://server.trustereocourier.com.bd/PickupRequestWithManegeAdminUsers/UserPickupRequestSend", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(AllInfo),
                                    });

                                    if (!response.ok) {
                                        throw new Error("Failed to send request");
                                    }

                                    const result = await response.json();
                                    // console.log("Success:", result);

                                    Swal.fire({
                                        icon: "success",
                                        title: "Pickup Request Sent",
                                        text: `Your ${PickupRequest} has been submitted successfully!`,
                                        confirmButtonColor: "#2563eb", // Tailwind 'blue-600'
                                    });

                                    e.target.reset();
                                    document.getElementById("PickUpRequest").close();

                                } catch (er) {
                                    console.error(er);
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Something went wrong while sending request!",
                                        confirmButtonColor: "#dc2626", // Tailwind 'red-600'
                                    });
                                }
                            }}
                            className="space-y-4"
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Select Delivery Type</span>
                                </label>
                                <select name="PickupRequestType" className="select bg-white select-bordered w-full">
                                    <option>Regular Delivery</option>
                                    <option>Express Delivery</option>
                                    <option>Pink N Drop Delivery</option>
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary w-full">
                                Send Pickup Request
                            </button>
                        </form>

                        {/* Close Button */}
                        <form method="dialog" className="mt-4">
                            <button className="btn btn-sm btn-ghost absolute right-4 top-4 text-xl">✕</button>
                        </form>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default DashboardItemsUser;
