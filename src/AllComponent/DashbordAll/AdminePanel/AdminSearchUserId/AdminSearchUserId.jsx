import React, { useContext } from 'react';
import "./AdminSearchUserId.css"
import { Link, useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import AdminConsignmentPendingData from './AdminConsignmentData/AdminConsignmentPendingData/AdminConsignmentPendingData';
import AdminConsignmentApprovedPendingData from './AdminConsignmentData/AdminConsignmentApprovedPendingData/AdminConsignmentApprovedPendingData';
import AdminConsignmentDeliveredData from './AdminConsignmentData/AdminConsignmentDeliveredData/AdminConsignmentDeliveredData';
import AdminConsignmentPartiallyDeliveredData from './AdminConsignmentData/AdminConsignmentPartiallyDeliveredData/AdminConsignmentPartiallyDeliveredData';
import AdminConsignmentReturnedCanceleData from './AdminConsignmentData/AdminConsignmentReturnedCanceleData/AdminConsignmentReturnedCanceleData';
import AdminConsignmentPendingReviewData from './AdminConsignmentData/AdminConsignmentPendingReviewData/AdminConsignmentPendingReviewData';
import AdminConsignmentAllstatusData from './AdminConsignmentData/AdminConsignmentAllstatusData/AdminConsignmentAllstatusData';
import AdminPaymentRequesrWork from './AdminPaymentRequesrWork/AdminPaymentRequesrWork';
import AdminUserConsignmentPickupRequestApproved from './AdminUserConsignmentPickupRequestApproved/AdminUserConsignmentPickupRequestApproved';

const AdminSearchUserId = () => {

    let { user, setAdminUserEmailSendDataEntry } = useContext(AuthContext)

    let AdminFineUserProfileId = useLoaderData()
    let { _id, Address, BusinessName, LastName, Password, Phone, email, name, photo, role, status, userId, Districts, PoliceStations,date} = AdminFineUserProfileId


    // =======================================================================
    // Consignment Standard Delivery Data Wok Start
    // =======================================================================

    let { refetch, data: userOrderStandardParcelData = [] } = useQuery(["AdminConsignmentUserStandardDataFind"], async () => {
        let res = await fetch(`http://localhost:5000/AdminConsignmentUserStandardDataFind?email=${email}`)
        return res.json()

    })

    // console.log(userOrderStandardParcelData)

    // All  data find 
    let ConsignmentAllData = userOrderStandardParcelData.filter(approved => approved?.status == "Pending" || approved?.Payment == "Yes" && approved?.status == "Delivered" || approved?.Payment == "Yes" && approved?.status == "PartiallyDelivered" || approved?.Payment == "Yes" && approved?.status == "Cancel")

    // console.log(ConsignmentAllData)


    // Review data find 
    let ReviewData = userOrderStandardParcelData.filter(Review => Review?.status === "Review")
    // console.log(PendingData)

    // Pending data find 
    let PendingData = userOrderStandardParcelData.filter(Pending => Pending?.status == "Pending")
    // console.log(ApprovedData)


    // Approved PendingData data find 
    let ApprovedPendingData = userOrderStandardParcelData.filter(approved => approved?.Payment == "No" && approved?.status == "Delivered" || approved?.Payment == "No" && approved?.status == "PartiallyDelivered" || approved?.Payment == "No" && approved?.status == "Cancel")
    // console.log(ApprovedPendingData)

    // Delivered data find 
    let DeliveredData = userOrderStandardParcelData.filter(approved => approved?.status == "Delivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let PartiallyDelivered = userOrderStandardParcelData.filter(approved => approved?.status == "PartiallyDelivered" && approved?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // Partially Delivered data find 
    let CancelData = userOrderStandardParcelData.filter(Cancel => Cancel?.status == "Cancel" && Cancel?.Payment == "Yes")
    // console.log(ApprovedPendingData)

    // =======================================================================
    // Consignment Standard Delivery Data Wok End
    // =======================================================================

    // =======================================================================
    // Payment Request Wok User Start
    // =======================================================================

    let { data: UserPaymentRequestDataAll = [] } = useQuery(["AdminPaymentRequestAllDataFind"], async () => {
        let res = await fetch(`http://localhost:5000/AdminPaymentRequestAllDataFind?email=${email}`)
        return res.json()

    })
    // console.log(UserPaymentRequestDataAll)

    let PaymentAdminPaidData = UserPaymentRequestDataAll.filter(PaymentAll => PaymentAll?.Payment == "Paid")

    // console.log(PaymentAdminPaidData)

    // =======================================================================
    // Payment Request Wok User End
    // =======================================================================

    // =======================================================================
    // Pickup Request Wok User Start
    // =======================================================================
    let { data: UserPickUpRequestDataAll = [] } = useQuery(["AdminPickupRequestAllDataFindUser"], async () => {
        let res = await fetch(`http://localhost:5000/AdminPickupRequestAllDataFindUser?email=${email}`)
        return res.json()

    })
    // console.log(UserPickUpRequestDataAll)

    let PickUpAdminApproved = UserPickUpRequestDataAll.filter(PickUpAll => PickUpAll?.status == "Approved")

    // console.log(PickUpAdminApproved)



    // =======================================================================
    // Pickup Request Wok User End
    // =======================================================================
    // =======================================================================
    // User Hub Selected Start
    // =======================================================================

    // user data all find use tenStack query 
    let { data: AllCoveragesPoliceStation = [] } = useQuery(["CoveragesPoliceStationAll"], async () => {
        let res = await fetch("http://localhost:5000/CoveragesPoliceStationAll")
        return res.json()

    })

    let CurrentPoliceStation = AllCoveragesPoliceStation.find(PoliceStationAll => PoliceStationAll?.AddPoliceStation == PoliceStations)

    // console.log(CurrentPoliceStation.MyHub)


    // =======================================================================
    // User Hub Selected End
    // =======================================================================


    return (
        <div className='AdminSearchUserIdParent py-8 px-2 md:px-4'>
            <div className='UserIdParent grid grid-cols-1 md:grid-cols-7 gap-5'>

                <div className="left py-6 px-4 col-span-1 md:col-span-2 bg-white rounded-[8px]">

                    <div className="img ">
                        <img className="w-full h-[100%]" src={photo} alt="img" />
                    </div>
                    <h3 className='text-[#1cae42] font-[600px] text-[18px] pt-[18px] text-center'>{BusinessName}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Owner: {name}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>ID: {userId}</h3>

                    <h3 className='text-black font-[500] text-[18px] pt-[18px] text-center'>Created at: {date}</h3>

                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Primary Phone: {Phone}</h3>

                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Contact no: {Phone}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>{email}</h3>
                    <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>{Address}</h3>
                    <h3 className='text-red-600 font-[500] text-[16px] pt-[4px] text-center'>{PoliceStations}</h3>

                    <button className='font-[600] bg-[#22AFA3] py-2 px-2 text-[14px] text-white  rounded-[8px] w-[100%] mt-4 md:mt-6'>Update Address</button>

                </div>


                <div className="right p-6 col-span-1 md:col-span-5 bg-white rounded-[8px]">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        <Link to={`/dashboard/AdminDashboard/AdminCurrentBalanceDetails/${email}`} className="CurrentBalance bg-[#1f7f0e]">
                            <h2 className='text-left text-[18px] font-[500] text-white'>Curren Balance</h2>
                            <button>Check Balance</button>

                        </Link>
                        <div className="CurrentBalance bg-[#cb8931]">
                            <h2 className="text-right text-[18px] font-[500] text-white">Cancel Parcel</h2>
                            <h2 className="text-right text-[18px] pt-[16px] font-[500] text-white">50000</h2>

                        </div>
                        <div className="CurrentBalance bg-[#0862af]">
                            <h2 className="text-right text-[18px] font-[500] text-white">Return Parcel</h2>
                            <h2 className="text-right text-[18px] pt-[16px] font-[500] text-white">Return List</h2>

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mt-6">

                        <Link onClick={() => (setAdminUserEmailSendDataEntry(email))} to={`/dashboard/AdminDashboard/AdminSearchUserIdDataEntry`} className='font-[600] py-[4px] text-[16px] bg-[#22AFA3] text-white text-center px-4 rounded-[8px]'>Add Parcel</Link>

                        <div className="div">
                            <h3 className='text-black font-[500] text-[16px] text-center'>Hub: {CurrentPoliceStation?.MyHub ? CurrentPoliceStation.MyHub : "Admin Not Add Any Hub"}</h3>
                            <h3 className='text-black font-[500] text-[16px] pt-[4px] text-center'>Hub Phone: No HUB</h3>
                        </div>

                        <h3 className='font-[600] text-[16px] text-center text-[#14BF7D]'>COD Charge  <span className='text-black'>1%</span></h3>

                    </div>


                    <div className="md:flex items-center justify-between mt-6 ">

                        <div>

                            <button className='font-[600] bg-[#22AFA3] py-2 px-3 text-[14px] text-white  rounded-[8px]'>Change owner name</button>
                            <h3 className='font-[600] my-2 text-[17px] text-black'>PickUp Request</h3>
                            <button className='font-[600] bg-[#22AFA3] text-[14px] text-white  rounded-[8px] px-16 py-2'>Send</button>
                        </div>

                        <select className="select select-success w-full md:w-[30%] my-[24px] first-line:max-w-xs">
                            <option disabled selected>{status}</option>
                            <option className='text-black font-[500] text-[16px]'>Approved</option>
                            <option className='text-black font-[500] text-[16px]'>Denite</option>
                        </select>

                    </div>


                    <div className="md:flex justify-between items-center mt-8 gap-5">

                        <button className='font-[600] bg-[#22AFA3] py-2 px-2 text-[14px] text-white  rounded-[8px] w-[100%]'>Auto Change Password</button>

                        <button className='font-[600] bg-[#22AFA3] py-2 px-2 text-[14px] text-white  rounded-[8px] w-[100%] mt-4 md:mt-0'>Amount change parcels</button>

                        {/* <button className='font-[600] bg-[#22AFA3] py-2 px-1 text-[14px] text-white  rounded-[8px]'>Parcels By date</button> */}

                    </div>

                </div>

            </div>



            <div className="ConsignmentAllData p-6 mt-8 bg-white rounded-[8px]">

                <Tabs>
                    <TabList>
                        <Tab> <span className="text-black font-[600] text-[16px]">Consignment</span> </Tab>
                        <Tab> <span className="text-black font-[600] text-[16px]">Payments</span> </Tab>
                        <Tab> <span className="text-black font-[600] text-[16px]">Pick Up Requests</span> </Tab>
                    </TabList>

                    <TabPanel>
                        <div className="ConsignmentData pt-[40px]">
                            <Tabs>
                                <TabList>
                                    <Tab> <span className="text-black font-[600] text-[16px]">All</span> </Tab>
                                    <Tab> <span className="text-black font-[600] text-[16px]">Pending</span> </Tab>
                                    <Tab> <span className="text-black font-[600] text-[16px]">Approval Pending</span> </Tab>
                                    <Tab> <span className="text-black font-[600] text-[16px]">Delivered</span> </Tab>
                                    <Tab> <span className="text-black font-[600] text-[16px]">Partially Delivery</span> </Tab>
                                    <Tab> <span className="text-black font-[600] text-[16px]">Cancel</span> </Tab>
                                    <Tab> <span className="text-black font-[600] text-[16px]">In Reviewed</span> </Tab>
                                </TabList>

                                <TabPanel>
                                    <div className="ConsignmentAllStatusData">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {ConsignmentAllData.length}</h3>
                                        {
                                            ConsignmentAllData.map(ConsignmentAll => <AdminConsignmentAllstatusData key={ConsignmentAll._id} ConsignmentAll={ConsignmentAll}></AdminConsignmentAllstatusData>)
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentPendingDataApproved">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {PendingData.length}</h3>
                                        {
                                            PendingData.map(ConsignmentPending => <AdminConsignmentPendingData key={ConsignmentPending._id} ConsignmentPending={ConsignmentPending}></AdminConsignmentPendingData>)
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentApprovedPendingData">
                                        <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {ApprovedPendingData.length}</h3>
                                        {
                                            ApprovedPendingData.map(ConsignmentApprovedPending => <AdminConsignmentApprovedPendingData key={ConsignmentApprovedPending._id} ConsignmentApprovedPending={ConsignmentApprovedPending} refetch={refetch}></AdminConsignmentApprovedPendingData>)
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentDeliveredData">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {DeliveredData.length}</h3>
                                        {
                                            DeliveredData.map(ConsignmentDeliveredData => <AdminConsignmentDeliveredData key={ConsignmentDeliveredData._id} ConsignmentDeliveredData={ConsignmentDeliveredData}></AdminConsignmentDeliveredData>)
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentPartiallyDelivered">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {PartiallyDelivered.length}</h3>
                                        {
                                            PartiallyDelivered.map(ConsignmentPartiallyDeliveredData => <AdminConsignmentPartiallyDeliveredData key={ConsignmentPartiallyDeliveredData._id} ConsignmentPartiallyDeliveredData={ConsignmentPartiallyDeliveredData}></AdminConsignmentPartiallyDeliveredData>)
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentCancel">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {CancelData.length}</h3>
                                        {
                                            CancelData.map(ConsignmentCancelData => <AdminConsignmentReturnedCanceleData key={ConsignmentCancelData._id} ConsignmentCancelData={ConsignmentCancelData}></AdminConsignmentReturnedCanceleData>)
                                        }
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentReview">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {ReviewData.length}</h3>
                                        {
                                            ReviewData.map(ConsignmentPendingData => <AdminConsignmentPendingReviewData key={ConsignmentPendingData._id} ConsignmentPendingData={ConsignmentPendingData}></AdminConsignmentPendingReviewData>)
                                        }
                                    </div>
                                </TabPanel>



                            </Tabs>
                        </div>
                    </TabPanel>


                    <TabPanel>
                        <div className="UserAllPaidPaymentRequest">
                            <h3 class="DataList w-[100%] md:w-[18%]">Total Data {PaymentAdminPaidData.length}</h3>
                            {
                                PaymentAdminPaidData.map(PaymentAll => <AdminPaymentRequesrWork key={PaymentAll._id} PaymentAll={PaymentAll}></AdminPaymentRequesrWork>)
                            }
                        </div>
                    </TabPanel>


                    <TabPanel>

                        <div className="UserAllPickupRequest">
                            <h3 class="DataList w-[100%] md:w-[18%]">Total Data {PickUpAdminApproved.length}</h3>
                            {
                                PickUpAdminApproved.map(PickUpAll => <AdminUserConsignmentPickupRequestApproved key={PickUpAll._id} PickUpAll={PickUpAll}></AdminUserConsignmentPickupRequestApproved>)
                            }
                        </div>
                    </TabPanel>






                </Tabs>


            </div>




        </div>
    );
};

export default AdminSearchUserId;