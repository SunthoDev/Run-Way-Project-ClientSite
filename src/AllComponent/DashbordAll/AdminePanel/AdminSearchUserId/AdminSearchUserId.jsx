import React, { useContext } from 'react';
import "./AdminSearchUserId.css"
import { Link, useLoaderData } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import AdminPaymentRequesrWork from './AdminPaymentRequesrWork/AdminPaymentRequesrWork';
import AdminUserConsignmentPickupRequestApproved from './AdminUserConsignmentPickupRequestApproved/AdminUserConsignmentPickupRequestApproved';

const AdminSearchUserId = () => {

    let { user, setAdminUserEmailSendDataEntry } = useContext(AuthContext)

    let AdminFineUserProfileId = useLoaderData()
    let { _id, Address, BusinessName, LastName, Password, Phone, email, name, photo, role, status, userId, Districts, PoliceStations, date } = AdminFineUserProfileId

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

    // =======================================================================z
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
    // Pickup Request User Data All Find Start
    // =======================================================================
    let { data: UserPickUpRequestDataAll = [] } = useQuery(["PickupRequestWithManegeAdminUsers_PickupRequestAllDataFindByEmail"], async () => {
        let res = await fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/PickupRequestAllDataFindByEmail?email=${email}`)
        return res.json()

    })
    // console.log(UserPickUpRequestDataAll)

    let PickUpAdminApproved = UserPickUpRequestDataAll.filter(PickUpAll => PickUpAll?.status == "Approved")
    // console.log(PickUpAdminApproved)

    // =======================================================================
    // Pickup Request User Data All Find End
    // =======================================================================








    // ========================================================================================================
    // Created All Police Station find of Hub
    // =====================================================
    let { data: AllStationOfHub = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_PoliceStationWithOfHub"], async () => {
        let res = await fetch("http://localhost:5000/HubManageAdminCreateOrUpdatePs/PoliceStationWithOfHub")
        return res.json()
    })
    // console.log(AllStationOfHub)

    // User Hub Name Find Here
    // =====================================================
    let MyHubName = AllStationOfHub.find(hub => hub?.PoliceStation === PoliceStations)


    // console.log(MyHubName)
    // =======================================================================
    // User Hub Selected End
    // =======================================================================


{/* <Link to={`/dashboard/AdminDashboard/UserTemporeryInvoiceAllStandardData/${StandardParcelId}`} */}

    return (
        <div className='AdminSearchUserIdParent py-8 px-2 md:px-4'>

            {/* ======================================================== */}
            {/* There are user profile information here */}
            {/* ======================================================== */}
            <div className='UserIdParent grid grid-cols-1 md:grid-cols-7 gap-5'>

                {/* Left information Start*/}
                {/* ======================================================== */}
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
                    <h3 className='text-red-600 font-[500] text-[16px] pt-[4px] text-center'>{AdminFineUserProfileId?.PoliceStations}</h3>
                    {/* <button className='font-[600] bg-[#22AFA3] py-2 px-2 text-[14px] text-white  rounded-[8px] w-[100%] mt-4 md:mt-6'>Update Address</button> */}
                </div>

                {/* Right information start */}
                {/* ======================================================== */}
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

                    <div className="md:flex justify-between gap-8 items-center mt-6">
                        <Link onClick={() => (setAdminUserEmailSendDataEntry(email))} to={`/dashboard/AdminDashboard/AdminSearchUserIdDataEntry`} className='font-[600] py-[4px] text-[16px] bg-[#22AFA3] text-white text-center px-4 rounded-[8px]'>Add Parcel</Link>
                        <h3 className='font-[600] text-[16px] text-center text-[#14BF7D]'>Hub Name: <span className='text-black'>{MyHubName?.HubName ? MyHubName?.HubName : "No Hub "}</span></h3>
                    </div>

                    <div className="mt-6">
                        <Link onClick={() => (setAdminUserEmailSendDataEntry(email))} to={`/dashboard/AdminDashboard/AdminSearchUserIdDataEntry`} className='font-[600] py-[4px] text-[16px] bg-[#22AFA3] text-white text-center px-4 rounded-[8px]'>Pickup Request</Link>
                    </div>
                    <div className="md:flex justify-between gap-8 items-center mt-6">
                        <Link onClick={() => (setAdminUserEmailSendDataEntry(email))} to={`/dashboard/AdminDashboard/AdminSearchUserIdDataEntry`} className='font-[600] py-[4px] text-[16px] bg-[#22AFA3] text-white text-center px-4 rounded-[8px]'>Payment Request</Link>
                    </div>
                    <div className="md:flex justify-between gap-8 items-center mt-6">
                        <select className="select bg-white select-success w-full md:w-[30%] ">
                            <option disabled selected>{status}</option>
                            <option className='text-black font-[500] text-[16px]'>Approved</option>
                            <option className='text-black font-[500] text-[16px]'>Pending</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* ======================================================== */}
            {/* There are all parcel here of different status  */}
            {/* ======================================================== */}
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
                                        {/* {
                                            ConsignmentAllData.map(ConsignmentAll => <AdminConsignmentAllstatusData key={ConsignmentAll._id} ConsignmentAll={ConsignmentAll}></AdminConsignmentAllstatusData>)
                                        } */}
                                        <div className="">
                                            <div className="overflow-x-auto p-4">
                                                <table className="table  w-full rounded-xl shadow-md">
                                                    <thead className="bg-base-200 text-base-content">
                                                        <tr>
                                                            <th>Merchant Name</th>
                                                            <th>Parcel ID</th>
                                                            <th>Amount</th>
                                                            <th>Delivery Charge</th>
                                                            <th>Request Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ConsignmentAllData?.slice().reverse().map(AllData => <tr className="">
                                                                <td>
                                                                    <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-600">{AllData?.StandardParcelId}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm font-semibold text-green-600">{AllData?.CodAmount} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-blue-600">{AllData?.DeliveryCharge} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-500">{AllData?.date}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`badge badge-sm badge-success`}
                                                                    >
                                                                        {AllData?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/dashboard/UserTemporeryInvoiceAllStandardData/${AllData?.StandardParcelId}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentPendingDataApproved">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {PendingData.length}</h3>
                                        {/* {
                                            PendingData.map(ConsignmentPending => <AdminConsignmentPendingData key={ConsignmentPending._id} ConsignmentPending={ConsignmentPending}></AdminConsignmentPendingData>)
                                        } */}
                                        <div className="">
                                            <div className="overflow-x-auto p-4">
                                                <table className="table  w-full rounded-xl shadow-md">
                                                    <thead className="bg-base-200 text-base-content">
                                                        <tr>
                                                            <th>Merchant Name</th>
                                                            <th>Parcel ID</th>
                                                            <th>Amount</th>
                                                            <th>Delivery Charge</th>
                                                            <th>Request Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            PendingData?.slice().reverse().map(AllData => <tr className="">
                                                                <td>
                                                                    <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-600">{AllData?.StandardParcelId}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm font-semibold text-green-600">{AllData?.CodAmount} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-blue-600">{AllData?.DeliveryCharge} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-500">{AllData?.date}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`badge badge-sm badge-success`}
                                                                    >
                                                                        {AllData?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                       to={`/dashboard/AdminDashboard/AdminConsignmentPendingInvoice/${AllData?._id}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentApprovedPendingData">
                                        <h3 className='DataList w-[100%] md:w-[18%]'>Total Data {ApprovedPendingData.length}</h3>
                                        {/* {
                                            ApprovedPendingData.map(ConsignmentApprovedPending => <AdminConsignmentApprovedPendingData key={ConsignmentApprovedPending._id} ConsignmentApprovedPending={ConsignmentApprovedPending} refetch={refetch}></AdminConsignmentApprovedPendingData>)
                                        } */}
                                        <div className="">
                                            <div className="overflow-x-auto p-4">
                                                <table className="table  w-full rounded-xl shadow-md">
                                                    <thead className="bg-base-200 text-base-content">
                                                        <tr>
                                                            <th>Merchant Name</th>
                                                            <th>Parcel ID</th>
                                                            <th>Amount</th>
                                                            <th>Delivery Charge</th>
                                                            <th>Request Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ApprovedPendingData?.slice().reverse().map(AllData => <tr className="">
                                                                <td>
                                                                    <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-600">{AllData?.StandardParcelId}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm font-semibold text-green-600">{AllData?.CodAmount} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-blue-600">{AllData?.DeliveryCharge} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-500">{AllData?.date}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`badge badge-sm badge-success`}
                                                                    >
                                                                        {AllData?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/dashboard/UserTemporeryInvoiceAllStandardData/${AllData?.StandardParcelId}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentDeliveredData">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {DeliveredData.length}</h3>
                                        {/* {
                                            DeliveredData.map(ConsignmentDeliveredData => <AdminConsignmentDeliveredData key={ConsignmentDeliveredData._id} ConsignmentDeliveredData={ConsignmentDeliveredData}></AdminConsignmentDeliveredData>)
                                        } */}

                                        <div className="">
                                            <div className="overflow-x-auto p-4">
                                                <table className="table  w-full rounded-xl shadow-md">
                                                    <thead className="bg-base-200 text-base-content">
                                                        <tr>
                                                            <th>Merchant Name</th>
                                                            <th>Parcel ID</th>
                                                            <th>Amount</th>
                                                            <th>Delivery Charge</th>
                                                            <th>Request Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            DeliveredData?.slice().reverse().map(AllData => <tr className="">
                                                                <td>
                                                                    <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-600">{AllData?.StandardParcelId}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm font-semibold text-green-600">{AllData?.CodAmount} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-blue-600">{AllData?.DeliveryCharge} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-500">{AllData?.date}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`badge badge-sm badge-success`}
                                                                    >
                                                                        {AllData?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/dashboard/UserTemporeryInvoiceAllStandardData/${AllData?.StandardParcelId}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentPartiallyDelivered">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {PartiallyDelivered.length}</h3>
                                        {/* {
                                            PartiallyDelivered.map(ConsignmentPartiallyDeliveredData => <AdminConsignmentPartiallyDeliveredData key={ConsignmentPartiallyDeliveredData._id} ConsignmentPartiallyDeliveredData={ConsignmentPartiallyDeliveredData}></AdminConsignmentPartiallyDeliveredData>)
                                        } */}
                                        <div className="">
                                            <div className="overflow-x-auto p-4">
                                                <table className="table  w-full rounded-xl shadow-md">
                                                    <thead className="bg-base-200 text-base-content">
                                                        <tr>
                                                            <th>Merchant Name</th>
                                                            <th>Parcel ID</th>
                                                            <th>Amount</th>
                                                            <th>Delivery Charge</th>
                                                            <th>Request Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            PartiallyDelivered?.slice().reverse().map(AllData => <tr className="">
                                                                <td>
                                                                    <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-600">{AllData?.StandardParcelId}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm font-semibold text-green-600">{AllData?.CodAmount} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-blue-600">{AllData?.DeliveryCharge} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-500">{AllData?.date}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`badge badge-sm badge-success`}
                                                                    >
                                                                        {AllData?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/dashboard/UserTemporeryInvoiceAllStandardData/${AllData?.StandardParcelId}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentCancel">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {CancelData.length}</h3>
                                        {/* {
                                            CancelData.map(ConsignmentCancelData => <AdminConsignmentReturnedCanceleData key={ConsignmentCancelData._id} ConsignmentCancelData={ConsignmentCancelData}></AdminConsignmentReturnedCanceleData>)
                                        } */}
                                        <div className="">
                                            <div className="overflow-x-auto p-4">
                                                <table className="table  w-full rounded-xl shadow-md">
                                                    <thead className="bg-base-200 text-base-content">
                                                        <tr>
                                                            <th>Merchant Name</th>
                                                            <th>Parcel ID</th>
                                                            <th>Amount</th>
                                                            <th>Delivery Charge</th>
                                                            <th>Request Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            CancelData?.slice().reverse().map(AllData => <tr className="">
                                                                <td>
                                                                    <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-600">{AllData?.StandardParcelId}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm font-semibold text-green-600">{AllData?.CodAmount} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-blue-600">{AllData?.DeliveryCharge} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-500">{AllData?.date}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`badge badge-sm badge-success`}
                                                                    >
                                                                        {AllData?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/dashboard/UserTemporeryInvoiceAllStandardData/${AllData?.StandardParcelId}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="ConsignmentReview">
                                        <h3 class="DataList w-[100%] md:w-[18%]">Total Data {ReviewData.length}</h3>
                                        {/* {
                                            ReviewData.map(ConsignmentPendingData => <AdminConsignmentPendingReviewData key={ConsignmentPendingData._id} ConsignmentPendingData={ConsignmentPendingData}></AdminConsignmentPendingReviewData>)
                                        } */}
                                        <div className="">
                                            <div className="overflow-x-auto p-4">
                                                <table className="table  w-full rounded-xl shadow-md">
                                                    <thead className="bg-base-200 text-base-content">
                                                        <tr>
                                                            <th>Merchant Name</th>
                                                            <th>Parcel ID</th>
                                                            <th>Amount</th>
                                                            <th>Delivery Charge</th>
                                                            <th>Request Date</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ReviewData?.slice().reverse().map(AllData => <tr className="">
                                                                <td>
                                                                    <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-600">{AllData?.StandardParcelId}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm font-semibold text-green-600">{AllData?.CodAmount} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-blue-600">{AllData?.DeliveryCharge} ৳</p>
                                                                </td>
                                                                <td>
                                                                    <p className="text-sm text-gray-500">{AllData?.date}</p>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={`badge badge-sm badge-success`}
                                                                    >
                                                                        {AllData?.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/dashboard/UserTemporeryInvoiceAllStandardData/${AllData?.StandardParcelId}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-outline btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>)
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
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