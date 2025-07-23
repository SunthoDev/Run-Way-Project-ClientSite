import { useState } from 'react';
import "./DeliveryMonitoring.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const DeliveryMonitoring = () => {

    const [tabState, setTabState] = useState(1);

    // =======================================================================
    // User All Category Parcel Data Find
    // =======================================================================
    let { refetch, data: UserAllParcelDataFind = [] } = useQuery(["AdminAllStandardDeliveryDataFindAmountChange"], async () => {
        let res = await fetch(`http://localhost:5000/AdminAllStandardDeliveryDataFindAmountChange`)
        return res.json()

    })
    // console.log(UserAllParcelDataFind)

    // Parcel Pending Status Data
    // ============================
    let PendingParcelAll = UserAllParcelDataFind?.filter(Pending => Pending?.status == "Pending")
    // console.log(PendingParcelAll)

    // Parcel Delivered Status Data
    // ==============================
    let DeliveredParcelAll = UserAllParcelDataFind?.filter(approved => approved?.status == "Delivered" && approved?.Payment == "Yes")
    // console.log(DeliveredParcelAll)

    // Parcel Partially Status Data
    // ================================
    let PartiallyDeliveredParcelAll = UserAllParcelDataFind?.filter(approved => approved?.status == "PartiallyDelivered" && approved?.Payment == "Yes")
    // console.log(PartiallyDeliveredParcelAll)

    // Parcel Cancel Status Data
    // ================================
    let CancelParcelAll = UserAllParcelDataFind?.filter(Cancel => Cancel?.status == "Cancel" && Cancel?.Payment == "Yes")
    // console.log(CancelParcelAll)



    // Search Parcel Show (Pending)
    // =======================================
    let [SearchPendingData, setSearchPendingData] = useState([])
    // Search Parcel Show (Delivered)
    // =======================================
    let [SearchDeliveredData, setSearchDeliveredData] = useState([])
    // Search Parcel Show (Partially)
    // =======================================
    let [SearchPartiallyData, setSearchPartiallyData] = useState([])
    // Search Parcel Show (Cancel)
    // =======================================
    let [SearchCancelData, setSearchCancelData] = useState([])





    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* Delivery monitoring | all dat show here
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Delivery Monitoring</h3>

                    {/* Tabs with Different type of category parcel*/}
                    {/* =============================================== */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 space-x-4 mb-4">

                            <button onClick={() => setTabState(1)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Pending Parcel
                            </button>

                            <button onClick={() => setTabState(2)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Delivered Parcel
                            </button>
                            <button onClick={() => setTabState(3)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Partially Parcel
                            </button>
                            <button onClick={() => setTabState(4)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 4 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Cancel Parcel
                            </button>
                        </div>
                    </div>

                    {/* Tab Content All types parcel data show */}
                    {/* ============================================ */}
                    <div className="">

                        {/* ============================================ */}
                        {/* Parcel (Pending) Type category data show */}
                        {/* ============================================ */}
                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Parcel</h2>
                                        {/* Search Section (Pending)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                onBlur={(e) => {
                                                    let date = e.target.value
                                                    // console.log(date)
                                                    let splitDate = date.split("-")
                                                    let SearchDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
                                                    // console.log(SearchDate)

                                                    setSearchPendingData(UserAllParcelDataFind?.filter(Date => Date?.date === SearchDate && Date?.status == "Pending"))
                                                }}
                                                type="date" className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Merchant Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Parcel ID</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address / P.s</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount / Delivery Charge</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    (SearchPendingData.length > 0
                                                        ? SearchPendingData
                                                        : PendingParcelAll
                                                    ).slice().reverse().map((ParcelAll) => (
                                                        <tr key={ParcelAll?._id}>
                                                            <td>
                                                                <p className="font-medium text-base text-gray-800">{ParcelAll?.name}</p>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.number}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">Parcel Category: {ParcelAll?.ParcelCategory}</p>
                                                                <p className="text-sm text-gray-800 font-medium">Parcel Id: {ParcelAll?.StandardParcelId}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.address}</p>
                                                                <p className="text-sm text-gray-800 font-medium">P.s: {ParcelAll?.policeStation}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm font-semibold text-green-600">Amount: {ParcelAll?.CodAmount} ৳</p>
                                                                <p className="text-sm text-blue-600">Delivery Charge: {ParcelAll?.DeliveryCharge} ৳</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{ParcelAll?.date}, {ParcelAll?.time} </p>
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={`badge badge-sm ${ParcelAll?.status === "Pending" && "badge-success"}`}
                                                                >
                                                                    {ParcelAll?.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/dashboard/UserTemporeryInvoiceAllStandardData/${ParcelAll?.StandardParcelId}`}
                                                                >
                                                                    <button className="btn btn-sm btn-outline btn-primary">
                                                                        View
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        </tr>))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* ============================================ */}
                        {/* Parcel (Delivered) Type category data show */}
                        {/* ============================================ */}
                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivered Parcel</h2>
                                        {/* Search Section (Delivered)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                onBlur={(e) => {
                                                    let date = e.target.value
                                                    let splitDate = date.split("-")
                                                    let SearchDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
                                                    // console.log(SearchDate)

                                                    setSearchDeliveredData(UserAllParcelDataFind?.filter(Date => Date?.date === SearchDate && Date?.status == "Delivered" && Date?.Payment == "Yes"))
                                                }}
                                                type="date" className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Email</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    (SearchDeliveredData.length > 0
                                                        ? SearchDeliveredData
                                                        : DeliveredParcelAll
                                                    ).slice().reverse().map((ParcelAll) =>

                                                        <tr key={ParcelAll?._id}>
                                                            <td>
                                                                <p className="font-medium text-base text-gray-800">{ParcelAll?.name}</p>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.number}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">Parcel Category: {ParcelAll?.ParcelCategory}</p>
                                                                <p className="text-sm text-gray-800 font-medium">Parcel Id: {ParcelAll?.StandardParcelId}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.address}</p>
                                                                <p className="text-sm text-gray-800 font-medium">P.s: {ParcelAll?.policeStation}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm font-semibold text-green-600">Amount: {ParcelAll?.CodAmount} ৳</p>
                                                                <p className="text-sm text-blue-600">Delivery Charge: {ParcelAll?.DeliveryCharge} ৳</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{ParcelAll?.date}, {ParcelAll?.time} </p>
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={`badge badge-sm ${ParcelAll?.status === "Pending" && "badge-success"}`}
                                                                >
                                                                    {ParcelAll?.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/dashboard/UserTemporeryInvoiceAllStandardData/${ParcelAll?.StandardParcelId}`}
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
                        }
                        {/* ======================================================= */}
                        {/* Parcel (Partially Delivered) Type category data show */}
                        {/* ======================================================= */}
                        {tabState === 3 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Partially Parcel</h2>
                                        {/* Search Section (Partially)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                onBlur={(e) => {
                                                    let date = e.target.value
                                                    let splitDate = date.split("-")
                                                    let SearchDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
                                                    // console.log(SearchDate)

                                                    setSearchPartiallyData(UserAllParcelDataFind?.filter(Date => Date?.date === SearchDate && Date?.status == "PartiallyDelivered" && Date?.Payment == "Yes"))
                                                }}
                                                type="date" className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Email</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    (SearchPartiallyData.length > 0
                                                        ? SearchPartiallyData
                                                        : PartiallyDeliveredParcelAll
                                                    ).slice().reverse().map((ParcelAll) =>

                                                        <tr key={ParcelAll?._id}>
                                                            <td>
                                                                <p className="font-medium text-base text-gray-800">{ParcelAll?.name}</p>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.number}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">Parcel Category: {ParcelAll?.ParcelCategory}</p>
                                                                <p className="text-sm text-gray-800 font-medium">Parcel Id: {ParcelAll?.StandardParcelId}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.address}</p>
                                                                <p className="text-sm text-gray-800 font-medium">P.s: {ParcelAll?.policeStation}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm font-semibold text-green-600">Amount: {ParcelAll?.CodAmount} ৳</p>
                                                                <p className="text-sm text-blue-600">Delivery Charge: {ParcelAll?.DeliveryCharge} ৳</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{ParcelAll?.date}, {ParcelAll?.time} </p>
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={`badge badge-sm ${ParcelAll?.status === "Pending" && "badge-success"}`}
                                                                >
                                                                    {ParcelAll?.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/dashboard/UserTemporeryInvoiceAllStandardData/${ParcelAll?.StandardParcelId}`}
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
                        }
                        {/* ============================================ */}
                        {/* Parcel (cancel) Type category data show */}
                        {/* ============================================ */}
                        {tabState === 4 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cancel Parcel</h2>
                                        {/* Search Section (cancel)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <input
                                                onBlur={(e) => {
                                                    let date = e.target.value
                                                     let splitDate = date.split("-")
                                                    let SearchDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
                                                    // console.log(SearchDate)

                                                    setSearchCancelData(UserAllParcelDataFind?.filter(Date => Date?.date === SearchDate && Date?.status == "Cancel" && Date?.Payment == "Yes"))
                                                }}
                                                type="date" className="border border-gray-300 rounded-md px-6 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <button
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Email</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    (SearchCancelData.length > 0
                                                        ? SearchCancelData
                                                        : CancelParcelAll
                                                    ).slice().reverse().map((ParcelAll) =>

                                                        <tr key={ParcelAll?._id}>
                                                            <td>
                                                                <p className="font-medium text-base text-gray-800">{ParcelAll?.name}</p>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.number}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">Parcel Category: {ParcelAll?.ParcelCategory}</p>
                                                                <p className="text-sm text-gray-800 font-medium">Parcel Id: {ParcelAll?.StandardParcelId}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.address}</p>
                                                                <p className="text-sm text-gray-800 font-medium">P.s: {ParcelAll?.policeStation}</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm font-semibold text-green-600">Amount: {ParcelAll?.CodAmount} ৳</p>
                                                                <p className="text-sm text-blue-600">Delivery Charge: {ParcelAll?.DeliveryCharge} ৳</p>
                                                            </td>
                                                            <td>
                                                                <p className="text-sm text-gray-500">{ParcelAll?.date}, {ParcelAll?.time} </p>
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={`badge badge-sm ${ParcelAll?.status === "Pending" && "badge-success"}`}
                                                                >
                                                                    {ParcelAll?.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/dashboard/UserTemporeryInvoiceAllStandardData/${ParcelAll?.StandardParcelId}`}
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
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryMonitoring;