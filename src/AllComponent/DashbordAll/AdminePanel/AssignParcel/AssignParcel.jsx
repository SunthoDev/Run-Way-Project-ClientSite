import { useState } from 'react';
import "./AssignParcel.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';

const AssignParcel = () => {

    const [roles] = useRole()
    const [tabState, setTabState] = useState(1);

    // ========================================================================================================
    // User All Category Parcel Data Find
    // =======================================================================
    let { refetch, data: UserAllParcelDataFind = [] } = useQuery(["AdminAllStandardDeliveryDataFindAmountChange"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/AdminAllStandardDeliveryDataFindAmountChange`)
        return res.json()

    })
    // console.log(UserAllParcelDataFind)

    // Review data find 
    // =============================
    let ReviewData = UserAllParcelDataFind.filter(Review => Review?.status === "Review")

    // ========================================
    // Parcel Filter Pending Status Data
    // ========================================
    let PendingParcelAll = UserAllParcelDataFind?.filter(Pending => Pending?.status === "Pending" && Pending?.AssignRider === "No")
    // console.log(PendingParcelAll)

    // ========================================================================================================
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)

    // =======================================
    // Search Parcel by (Date) data
    // =======================================
    let [SearchPendingData, setSearchPendingData] = useState([])

    // =======================================
    // Search Parcel by (Hub) data
    // =======================================
    let [HubSearchPendingData, setHubSearchPendingData] = useState([])
    // console.log(HubSearchPendingData)


    // ========================================================================================================
    // All User Find for filter hub rider !!
    // =============================================
    // user data all find use tenStack query 
    let { data: adminAllUsers = [] } = useQuery(["users"], async () => {
        let res = await fetch("https://server.trustereocourier.com.bd/users")
        return res.json()
    })
    let [searchHubName, setSearchHubName] = useState("")

    // ========================================================================================================
    // (Single) Assign Parcel From Bellow !!
    // =============================================
    const [activeAllRider, setActiveAllRider] = useState([]);
    const [ParcelId, setParcelId] = useState("");

    // Open the modal a set data on useState
    // =============================================
    const handleAssignRider = (SelectHubName, ParcelID) => {
        // filter all user for found all hub rider 
        // ==============================================
        let ThisHubAllRider = adminAllUsers?.filter(AllRider => AllRider?.MyHubRider === SelectHubName)
        setActiveAllRider(ThisHubAllRider);
        setParcelId(ParcelID);

        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("ParcelAssignToRider").showModal();
        }, 50);
    };


    // =========================================================================================================
    // (Multiple) Assign Parcel From Bellow !!
    // =====================================================
    // ==============================================
    // Received All Ids together in json array start
    // ==============================================
    const [AllId, setIDAll] = useState([]);
    // Received input value
    // ========================
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = inputValue.trim();
            if (value && !AllId.includes(value)) {
                setIDAll([...AllId, value]);
            }
            setInputValue("");
        }
    };

    // Take id remove from json
    // =====================================================
    const removeTag = (index) => {
        setIDAll(AllId.filter((_, i) => i !== index));
    };

    // ==============================================
    // Received All Ids together in json array End
    // ==============================================

    // Multiple Parcel Assign to rider !!
    // ==============================================
    const [MultipleActiveAllRider, setMultipleActiveAllRider] = useState([]);
    const [ParcelIdAll, setParcelIdAll] = useState([]);

    // Open the modal a set data on useState
    // =============================================
    const handleMultipleAssignRider = (SelectHubName, ParcelIDAll) => {

        // filter all user for found all hub rider 
        // ==============================================
        let ThisHubAllRider = adminAllUsers?.filter(AllRider => AllRider?.MyHubRider === SelectHubName)
        setMultipleActiveAllRider(ThisHubAllRider);
        setParcelIdAll(ParcelIDAll);

        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("MultipleParcelAssignToRider").showModal();
        }, 50);
    };







    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>

            {/* ====================================================================== */}
            {/* Multiple Parcel Assign To here */}
            {/* ====================================================================== */}
            <div className="flex justify-center md:px-4 my-4">
                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Multiple Parcel Assign to Here
                    </h2>
                    {/* =============================================== */}
                    {/* Parcel Multiple Id add System same time Start */}
                    {/* =============================================== */}
                    <div className="grid grid-cols-7 gap-6">
                        {/* Left side - select add parcel Id*/}
                        <div className="flex flex-wrap border rounded-lg p-2 min-h-[50px] col-span-4">
                            {AllId?.map((tag, index) => (
                                <div key={index} className="flex items-center bg-black text-white text-sm rounded-full px-3 h-[24px] m-1">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(index)}
                                        className="ml-2 text-red-500 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                className="flex-grow items-center bg-black text-white text-sm rounded-full px-3 h-[24px] m-1 w-[20%]"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type and press enter..."
                            />
                        </div>

                        {/* Right side - select hub, submit button*/}
                        <div className="col-span-3 space-y-4">
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                let hubName = e.target.HubName.value
                                handleMultipleAssignRider(hubName, AllId)

                            }}>
                                <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    name="HubName"
                                >
                                    <option value="">-- Select Hub Name --</option>
                                    {AllHubFind?.map((hubName, i) => (
                                        <option key={i}>
                                            {hubName?.NameOfHub}
                                        </option>
                                    ))}
                                </select>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-gray-50 px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 w-full">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ====================================================================== */}
            {/* Assign Parcel (Pending) And (Review) Status data Show Here
            {/* ====================================================================== */}
            <div className='md:px-4 my-4'>
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">
                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Assign Parcel</h3>

                    {/* Tabs with Different type of category parcel*/}
                    {/* =============================================== */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                        {/* ================================= */}
                        {/* Tabs */}
                        {/* ================================= */}
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
                                In Review
                            </button>
                        </div>

                        {/* ======================================== */}
                        {/* Search a Parcel by a (Hub) name */}
                        {/* ======================================== */}
                        <div className="flex items-center gap-2">
                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="stationOfHub"
                                onBlur={(e) => {
                                    const HubName = e.target.value
                                    setHubSearchPendingData(PendingParcelAll?.filter(Pending => Pending?.MyHub === HubName))
                                    setSearchHubName(HubName)
                                }}
                            >
                                <option value="">-- Select Hub Name --</option>
                                {AllHubFind?.map((hubName, i) => (
                                    <option key={i}>
                                        {hubName?.NameOfHub}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1 text-sm"
                            >
                                Search
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
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Parcel: {PendingParcelAll?.length}</h2>
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

                                                    setSearchPendingData(PendingParcelAll?.filter(Date => Date?.date === SearchDate))
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
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Assign Rider</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    (
                                                        SearchPendingData.length > 0 ? SearchPendingData
                                                            : HubSearchPendingData.length > 0 ? HubSearchPendingData
                                                                : PendingParcelAll
                                                    ).slice().reverse().map((ParcelAll) => (
                                                        <tr key={ParcelAll?._id}>
                                                            <td>
                                                                <p className="font-medium text-base text-gray-800">{ParcelAll?.name}</p>
                                                                <p className="text-sm text-gray-600">{ParcelAll?.number}</p>
                                                                <p className="text-sm text-black">MyHub: {ParcelAll?.MyHub}</p>
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
                                                                <p className="text-sm text-gray-500">{ParcelAll?.date}, {ParcelAll?.time} </p>
                                                            </td>
                                                            {/* <td>
                                                                <p className="text-sm text-gray-500">{ParcelAll?.date}, {ParcelAll?.time} </p>
                                                            </td> */}
                                                            <td>
                                                                <span
                                                                    className={`badge badge-sm ${ParcelAll?.status === "Pending" && "badge-success"}`}
                                                                >
                                                                    {ParcelAll?.status}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {
                                                                    (() => {

                                                                        return (
                                                                            <div className="relative inline-block text-left z-20">
                                                                                <div className="dropdown dropdown-left">
                                                                                    <button
                                                                                        tabIndex={0}
                                                                                        role="button"
                                                                                        className="btn btn-sm btn-outline btn-primary">
                                                                                        Assign Rider
                                                                                    </button>
                                                                                    <ul
                                                                                        tabIndex={0}
                                                                                        className="dropdown-content menu absolute mt-2 right-0 bg-white rounded-md shadow-lg w-60 p-2 space-y-1 border border-gray-200 z-[100]"
                                                                                    >
                                                                                        {/* Hub show which is search to top from searchbar  */}
                                                                                        {/* ====================================================== */}
                                                                                        {/* searchHubName */}
                                                                                        <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                            <span className="text-sm text-gray-700">{searchHubName}</span>

                                                                                            <button onClick={() => handleAssignRider(searchHubName, ParcelAll?.StandardParcelId)} className="btn btn-sm btn-outline btn-primary">Rider</button>

                                                                                        </div>

                                                                                        {/* All hub show here to database  */}
                                                                                        {/* ============================================== */}
                                                                                        {/* {AllHubFind?.length > 0 ? (
                                    AllHubFind.map((hubName, i) => (
                                        <li key={i} className="">
                                            <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                <span className="text-sm text-gray-700">{hubName?.NameOfHub}</span>

                                                <button onClick={() => handleAssignRider(hubName?.NameOfHub, ParcelAll?.StandardParcelId)} className="btn btn-sm btn-outline btn-primary">Rider</button>

                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <div className="px-2 py-1 text-sm text-gray-400">No Hub found</div>
                                    </li>
                                )} */}
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })()
                                                                }
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
                        {/* Parcel (In Review) Type category data show */}
                        {/* ============================================ */}
                        {tabState === 2 &&
                            <div className="">
                                <div className="overflow-x-auto p-4">
                                    <table className="table  w-full rounded-xl shadow-md">
                                        <thead className="bg-base-200 text-base-content">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Merchant Name</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Parcel ID</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Address / P.s</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount / Delivery Charge</th>
                                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ReviewData?.slice().reverse().map(AllData => <tr className="">

                                                    <td>
                                                        <p className="font-medium text-base text-gray-800">{AllData?.name}</p>
                                                        <p className="text-sm text-gray-600">{AllData?.number}</p>
                                                        <p className="text-sm text-black">MyHub: {AllData?.MyHub}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-gray-600">Parcel Category: {AllData?.ParcelCategory}</p>
                                                        <p className="text-sm text-gray-800 font-medium">Parcel Id: {AllData?.StandardParcelId}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-gray-600">{AllData?.address}</p>
                                                        <p className="text-sm text-gray-800 font-medium">P.s: {AllData?.policeStation}</p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm font-semibold text-green-600">Amount: {AllData?.CodAmount} ৳</p>
                                                        <p className="text-sm text-blue-600">Delivery Charge: {AllData?.DeliveryCharge} ৳</p>
                                                        <p className="text-sm text-gray-500">{AllData?.date}, {AllData?.time} </p>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`badge badge-sm ${AllData?.status === "Pending" && "badge-success"}`}
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
                        }
                    </div>
                </div>
            </div>

            {/* ================================================================================================ */}
            {/* Rider single parcel assign of modal start **************   */}
            {/* ====================================================================== */}
            {activeAllRider && (
                <dialog id="ParcelAssignToRider" className="modal"
                    key={activeAllRider._id}
                >
                    <div className="modal-box w-full max-w-2xl text-white bg-gray-900">
                        <h3 className="font-bold text-xl mb-4">🔐 Single assign parcel to rider</h3>
                        <form
                            method="dialog">
                            <div className="gap-4">
                                {activeAllRider?.map(rider => (
                                    <div
                                        key={rider?._id}
                                        className="flex items-center justify-between border border-gray-200 rounded-xl shadow-md p-4 mb-4 bg-white backdrop-blur-md transition hover:shadow-lg"
                                    >
                                        <p className="text-lg font-semibold text-gray-800">{rider?.name} {rider?.LastName}</p>
                                        <p className="text-sm text-gray-600">{rider?.email}</p>
                                        <p className="text-sm text-gray-600">{rider?.Phone}</p>
                                        <button
                                            onClick={() => {
                                                let date = moment().format("MM/DD/YYYY")
                                                let time = moment().format("hh:mm A")
                                                let TrackingMessage = `Your parcel has been successfully assigned to a rider. The rider will collect your parcel shortly and begin the delivery process.`

                                                let TrackingMessagePost = {
                                                    userOrderIdTracking: ParcelId,
                                                    TrackingMessage,
                                                    TrackingDate: date,
                                                    TrackingTime: time
                                                };
                                                let AssignPArcelPostToRider = {
                                                    RiderEmail: rider?.email,
                                                    RiderPhone: rider?.Phone,
                                                    RiderName: rider?.name,
                                                    RiderUserId: rider?.userId,
                                                    ParcelIdForRider: ParcelId,
                                                    CategoryAssign: "Parcel",
                                                }
                                                // console.log(AssignPArcelPostToRider)
                                                fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/InsertAssignParcelToRider", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(AssignPArcelPostToRider)
                                                })
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        if (data.insertedId) {
                                                            // Return Tracking Data Post 
                                                            // ===========================================
                                                            fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/AdminTrackingRequestSentOfAssignRider", {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                },
                                                                body: JSON.stringify(TrackingMessagePost)
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    // console.log(data)
                                                                    if (data.insertedId) {
                                                                        // Parcel Assign Rider status up (Yes)
                                                                        // =======================================
                                                                        fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ParcelAssignStatusUpdateYes/${ParcelId}`, {
                                                                            method: "PATCH",
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    refetch()
                                                                                    Swal.fire({
                                                                                        position: 'top-end',
                                                                                        icon: 'success',
                                                                                        title: 'Parcel Assign Successful',
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                }
                                                                            })
                                                                    }
                                                                })
                                                        }
                                                    })
                                            }}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full shadow-md transition duration-150"
                                        >
                                            ✅ Assign Him
                                        </button>
                                    </div>

                                ))}
                            </div>
                        </form>

                        <div className="modal-action mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    document.getElementById("ParcelAssignToRider").close()
                                    setActiveAllRider(null)
                                }}
                                className="btn bg-gray-300 text-black"
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* ====================================================================== */}
            {/* Rider single parcel assign of modal End  */}
            {/* ====================================================================== */}
            {/* ================================================================================================ */}
            {/* Multiple parcel Rider Assign Modal Start **************  */}
            {/* ====================================================================== */}
            {MultipleActiveAllRider && (
                <dialog id="MultipleParcelAssignToRider" className="modal"
                    key={MultipleActiveAllRider._id}
                >
                    <div className="modal-box w-full max-w-2xl text-white bg-gray-900">
                        <h3 className="font-bold text-xl mb-4">🔐 Multiple assign parcel to rider</h3>
                        <form
                            method="dialog">
                            <div className="gap-4">
                                {MultipleActiveAllRider?.map(rider => (
                                    <div
                                        key={rider?._id}
                                        className="flex items-center justify-between border border-gray-200 rounded-xl shadow-md p-4 mb-4 bg-white backdrop-blur-md transition hover:shadow-lg"
                                    >
                                        <p className="text-lg font-semibold text-gray-800">{rider?.name} {rider?.LastName}</p>
                                        <p className="text-sm text-gray-600">{rider?.email}</p>
                                        <p className="text-sm text-gray-600">{rider?.Phone}</p>
                                        <button
                                            onClick={() => {
                                                let date = moment().format("MM/DD/YYYY")
                                                let time = moment().format("hh:mm A")
                                                let TrackingMessage = `Your parcel has been successfully assigned to a rider. The rider will collect your parcel shortly and begin the delivery process.`

                                                // Tracking message post of  
                                                // ========================================
                                                let TrackingMessagePost = AllId?.map((id, index) => ({
                                                    userOrderIdTracking: id,
                                                    TrackingMessage,
                                                    TrackingDate: date,
                                                    TrackingTime: time
                                                }));
                                                // console.log(TrackingMessagePost)

                                                // Assign Parcel Data
                                                // ========================================
                                                let AssignPArcelPostToRider = AllId?.map((id, index) => ({
                                                    RiderEmail: rider?.email,
                                                    RiderPhone: rider?.Phone,
                                                    RiderName: rider?.name,
                                                    RiderUserId: rider?.userId,
                                                    ParcelIdForRider: id,
                                                    CategoryAssign: "Parcel",
                                                }));
                                                // console.log(AssignPArcelPostToRider)

                                                fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/InsertAssignParcelToRiderMultiple", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(AssignPArcelPostToRider)
                                                })
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        //  console.log(data)

                                                        if (data.insertedCount > 0) {
                                                            console.log(data)
                                                            // Return Tracking Data Post 
                                                            // ===========================================
                                                            fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/AdminTrackingRequestSentOfAssignRiderMultiple", {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                },
                                                                body: JSON.stringify(TrackingMessagePost)
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    console.log(data)
                                                                    if (data.insertedCount > 0) {
                                                                        // Parcel Assign Rider status up (Yes)
                                                                        // =======================================
                                                                        fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ParcelAssignStatusUpdateYesMultiple", {
                                                                            method: "PATCH",
                                                                            headers: {
                                                                                "Content-Type": "application/json",
                                                                            },
                                                                            body: JSON.stringify({ ids: AllId })
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                console.log(data)
                                                                                if (data.modifiedCount > 0) {
                                                                                    Swal.fire({
                                                                                        position: 'top-end',
                                                                                        icon: 'success',
                                                                                        title: 'Parcel Assign Successful',
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                    refetch()
                                                                                    setIDAll([]);
                                                                                }
                                                                            })
                                                                    }
                                                                })
                                                        }

                                                    })
                                            }}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-full shadow-md transition duration-150"
                                        >
                                            ✅ Assign Him
                                        </button>
                                    </div>

                                ))}
                            </div>
                        </form>

                        <div className="modal-action mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    document.getElementById("MultipleParcelAssignToRider").close()
                                    setMultipleActiveAllRider(null)
                                }}
                                className="btn bg-gray-300 text-black"
                            >
                                ❌ Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* ====================================================================== */}
            {/* Multiple  parcel Rider Assign Modal End  */}
            {/* ====================================================================== */}

        </div>
    );
};

export default AssignParcel;