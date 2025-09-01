import { useState } from 'react';
import "./MyParcelRider.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';

const MyParcelRider = () => {

    const [tabState, setTabState] = useState(1);
    const [IsLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [roles] = useRole()
    const ad = roles?.role === "admin"

    // ===========================================================================================================
    // Assign Parcel All Data Find Here !!  (PARCEL) (PICKUP) (RETURN)
    // =======================================================================
    let { refetch, data: RiderAssignDataAll = [] } = useQuery(["AdminAllAssignParcelHere_AllAssignParcelFindToHere"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/AllAssignParcelFindToHere`)
        return res.json()

    })
    // console.log(RiderAssignDataAll)

    // ===============================================================
    // (Rider) My Assign parcel all Data Filter Here !! (PARCEL)
    // ===============================================================
    let MyAssignParcel = RiderAssignDataAll?.filter(parcel => parcel?.RiderEmail === roles?.email && parcel?.CategoryAssign === "Parcel")
    // console.log(MyAssignParcel)

    // ===========================================================================
    // (Rider) My Assign Return parcel all Data Filter Here !! (RETURN-PARCEL)
    // ===========================================================================
    let MyAssignReturnParcel = RiderAssignDataAll?.filter(parcel => parcel?.RiderEmail === roles?.email && parcel?.CategoryAssign === "ReturnParcel")
    // console.log(MyAssignReturnParcel)

    // ===========================================================================
    // (Rider) My Assign Return parcel all Data Filter Here !! (RETURN-PARCEL)
    // ===========================================================================
    let MyAssignPickupRequest = RiderAssignDataAll?.filter(PickupRequest => PickupRequest?.RiderEmail === roles?.email && PickupRequest?.CategoryAssign === "PickupRequest")
    // console.log(MyAssignReturnParcel)


    // ===========================================================================================================
    // User All Category Parcel Data Find Here !! (PARCEL)
    // =======================================================================
    let { data: UserAllParcelDataFind = [] } = useQuery(["AdminAllStandardDeliveryDataFindAmountChange"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/AdminAllStandardDeliveryDataFindAmountChange`)
        return res.json()

    })
    // console.log(UserAllParcelDataFind)


    // ========================================================================================================
    // Parcel Details Show on thi modal !! (PARCEL-MODAL)
    // ====================================================
    const [AssignParcelDetails, setAssignParcelDetails] = useState();
    const [AssignRequestIdFoDeleteRequest, setAssignRequestIdFoDeleteRequest] = useState("");
    // console.log(AssignParcelDetails)

    // Open the modal a set data on useState
    // =============================================
    let handleParcelDetails = (ParcelID, AssignRequestId) => {

        // Find Parcel Details by parcel id !!
        // ==============================================
        let ParcelDetails = UserAllParcelDataFind?.find(AssignPending => AssignPending?.StandardParcelId === ParcelID && AssignPending?.status === "Pending" && AssignPending?.AssignRider === "Yes")

        setAssignParcelDetails(ParcelDetails);
        setAssignRequestIdFoDeleteRequest(AssignRequestId)
        // console.log(ParcelDetails)

        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("MyAssignParcelDetailsShow").showModal();
        }, 50);
    };



    return (
        <div className='MyParcelRiderPArent bg-[#F6F6F6]'>

            <div className='md:px-4 my-4'>
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">
                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>My All Assign Parcel</h3>

                    {/* Tabs with Different type of category parcel*/}
                    {/* =============================================== */}
                    <div className="mb-6 gap-3">
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
                                Return Parcel
                            </button>
                            <button onClick={() => setTabState(3)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                PickUp Parcel
                            </button>

                        </div>

                    </div>

                    {/* Tab Content All types parcel data show */}
                    {/* ============================================ */}
                    <div className="">
                        {/* ============================================ */}
                        {/* Me Assign Parcel Request Show below !! */}
                        {/* ============================================ */}
                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Parcel for assign: {MyAssignParcel?.length}</h2>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider ID</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider Name</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider Phone</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider Email</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Parcel ID</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Parcel Details</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    MyAssignParcel?.map(ParcelRequest => (
                                                        <tr key={ParcelRequest?._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequest?.RiderUserId}</td>
                                                            <td className="px-6 py-4 text-gray-800">{ParcelRequest?.RiderName}</td>
                                                            <td className="px-6 py-4 text-gray-800">{ParcelRequest?.RiderPhone}</td>
                                                            <td className="px-6 py-4 text-gray-800">{ParcelRequest?.RiderEmail}</td>
                                                            <td className="px-6 py-4 text-gray-800">{ParcelRequest?.ParcelIdForRider}</td>
                                                            <td className="flex items-center gap-4 px-6 py-4">
                                                                <button
                                                                    onClick={() => handleParcelDetails(ParcelRequest?.ParcelIdForRider, ParcelRequest?._id)}
                                                                    className="btn btn-sm btn-outline btn-primary">
                                                                    Parcel Details
                                                                </button>
                                                                <button
                                                                    onClick={() => {

                                                                        let date = moment().format("MM/DD/YYYY")
                                                                        let time = moment().format("hh:mm A")
                                                                        let TrackingMessage = `Your parcel has been successfully assigned to a rider. The rider will collect your parcel shortly and begin the delivery process.`
                                                                        let TrackingMessagePost = {
                                                                            userOrderIdTracking: ParcelRequest?.ParcelIdForRider,
                                                                            TrackingMessage,
                                                                            TrackingDate: date,
                                                                            TrackingTime: time
                                                                        };

                                                                        // Parcel Assign Rider status up (No) For Rider Rejected Parcel
                                                                        // =================================================================
                                                                        fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/RiderRejectedParcelAssignStatusUpdateYes/${ParcelRequest?.ParcelIdForRider}`, {
                                                                            method: "PATCH",
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    // Parcel rejected rider Tracking Data Post 
                                                                                    // ===============================================
                                                                                    fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/RejectedParcelRiderTrackingMessageSend", {
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

                                                                                                // Assign Parcel Request Delete After, rejected parcel !!
                                                                                                // ==============================================================
                                                                                                fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/DeleteAssignParcelForRejectedRider/${ParcelRequest?._id}`, {
                                                                                                    method: "DELETE",
                                                                                                })
                                                                                                    .then(res => res.json())
                                                                                                    .then(data => {
                                                                                                        if (data.deletedCount > 0) {
                                                                                                            Swal.fire({
                                                                                                                position: 'top-end',
                                                                                                                icon: 'success',
                                                                                                                title: 'Parcel Rejected Successful',
                                                                                                                showConfirmButton: false,
                                                                                                                timer: 1500
                                                                                                            })
                                                                                                            refetch()
                                                                                                            setIsLoading(false)
                                                                                                        }
                                                                                                        // console.log(data)
                                                                                                    })
                                                                                            }
                                                                                        })
                                                                                }
                                                                            })

                                                                    }}
                                                                    className="btn btn-sm btn-outline btn-primary">
                                                                    Rejected Parcel
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        }
                        {/* ================================================ */}
                        {/* Me Assign (Return) Parcel Request Show below !! */}
                        {/* ================================================ */}
                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Return Parcel for assign: {MyAssignReturnParcel?.length}</h2>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider ID</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider Name</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider Phone</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Return All Parcel</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Return Parcel ID</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Parcel Details</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    MyAssignReturnParcel?.map(ParcelRequest => (
                                                        <tr key={ParcelRequest?._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{ParcelRequest?.RiderUserId}</td>
                                                            <td className="px-6 py-4 text-gray-800">{ParcelRequest?.RiderName}</td>
                                                            <td className="px-6 py-4 text-gray-800">{ParcelRequest?.RiderPhone}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                <div className="relative inline-block text-left z-20">
                                                                    <div className="dropdown dropdown-left">
                                                                        <button
                                                                            tabIndex={0}
                                                                            role="button"
                                                                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-sm rounded-md font-medium transition-all shadow-sm z-[40]"
                                                                        > Click </button>
                                                                        <ul
                                                                            tabIndex={0}
                                                                            className="dropdown-content menu absolute mt-2 right-0 bg-white rounded-md shadow-lg w-60 p-2 space-y-1 border border-gray-200 z-[100]"
                                                                        >
                                                                            {ParcelRequest?.ReturnParcelAllId?.map((id, index) => (
                                                                                <li key={index} className="">
                                                                                    <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                        <span className="text-sm text-gray-700">{id}</span>

                                                                                        <button onClick={() => {
                                                                                            navigate(`/dashboard/RiderDashboard/RiderSeeStandardParcelId/${id}`)
                                                                                        }} className="text-black text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">View</button>
                                                                                    </div>
                                                                                </li>
                                                                            ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-800">{ParcelRequest?.ReturnParcelIdForRider}</td>
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => {
                                                                        Swal.fire({
                                                                            title: "Are you sure?",
                                                                            text: "Do you want to approved parcel...?",
                                                                            icon: "success",
                                                                            showCancelButton: true,
                                                                            confirmButtonColor: "#3085d6",
                                                                            cancelButtonColor: "#d33",
                                                                            confirmButtonText: "Yes, I want!"
                                                                        }).then((result) => {
                                                                            if (result.isConfirmed) {
                                                                                setIsLoading(true)
                                                                                let date = moment().format("MM/DD/YYYY")
                                                                                let time = moment().format("hh:mm A")
                                                                                let TrackingMessage = "Your parcel return is success full !!";

                                                                                // Tracking message post of parcel in database 
                                                                                // ================================================
                                                                                let TrackingMessagePost = ParcelRequest?.ReturnParcelAllId?.map((id, index) => ({
                                                                                    userOrderIdTracking: id,
                                                                                    TrackingMessage,
                                                                                    TrackingDate: date,
                                                                                    TrackingTime: time
                                                                                }));
                                                                                // console.log(TrackingMessagePost)

                                                                                // Rider is approved return parcel status!!
                                                                                // ===================================================
                                                                                fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ReturnParcelApprovedToRiderAfterDelivery/${ParcelRequest?.ReturnParcelIdForRider}`, {
                                                                                    method: "PATCH",
                                                                                })
                                                                                    .then(res => res.json())
                                                                                    .then(data => {
                                                                                        if (data.modifiedCount > 0) {
                                                                                            // Return parcel tracking data post from rider panel !!
                                                                                            // ========================================================
                                                                                            fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/RiderTrackingRequestSentOfReturnParcelSuccessReturnMultiple", {
                                                                                                method: "POST",
                                                                                                headers: {
                                                                                                    "Content-Type": "application/json"
                                                                                                },
                                                                                                body: JSON.stringify(TrackingMessagePost)
                                                                                            })
                                                                                                .then(res => res.json())
                                                                                                .then(data => {
                                                                                                    if (data.insertedCount > 0) {
                                                                                                        // After return parcel delivery success, when delete will be rider assign data
                                                                                                        // ===============================================================================
                                                                                                        fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/DeleteReturnAssignParcel/${ParcelRequest?._id}`, {
                                                                                                            method: "DELETE",
                                                                                                        })
                                                                                                            .then(res => res.json())
                                                                                                            .then(data => {
                                                                                                                if (data.deletedCount > 0) {
                                                                                                                    refetch()
                                                                                                                    setIsLoading(false)
                                                                                                                    Swal.fire({
                                                                                                                        position: 'top-end',
                                                                                                                        icon: 'success',
                                                                                                                        title: 'Return parcel delivery Successful',
                                                                                                                        showConfirmButton: false,
                                                                                                                        timer: 1500
                                                                                                                    })
                                                                                                                }
                                                                                                                // console.log(data)
                                                                                                            })
                                                                                                    }
                                                                                                })
                                                                                        }
                                                                                    })
                                                                            }
                                                                        });
                                                                    }}
                                                                    className="btn btn-sm btn-outline btn-primary">
                                                                    {IsLoading ? "Loading..." : "Return Parcel Approved"}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        }
                        {/* ================================================ */}
                        {/* Me Assign (Pickup Request) Show below !! */}
                        {/* ================================================ */}
                        {tabState === 3 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="pb-4">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Pickup Request for assign: {MyAssignPickupRequest?.length}</h2>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider ID</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider Name</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Rider Phone</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Pickup RequestID</th>
                                                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {
                                                    MyAssignPickupRequest?.map(PickupRequestRequest => (
                                                        <tr key={PickupRequestRequest?._id} className="hover:bg-gray-50 transition-colors">
                                                            <td className="px-6 py-4 text-gray-800 font-medium">{PickupRequestRequest?.RiderUserId}</td>
                                                            <td className="px-6 py-4 text-gray-800">{PickupRequestRequest?.RiderName}</td>
                                                            <td className="px-6 py-4 text-gray-800">{PickupRequestRequest?.RiderPhone}</td>
                                                            <td className="px-6 py-4 text-gray-800">{PickupRequestRequest?.PickupReqIdForRider}</td>
                                                            <td className="px-6 py-4">
                                                                <div className="">
                                                                    <form
                                                                        onSubmit={(event) => {
                                                                            setIsLoading(true)
                                                                            event.preventDefault()
                                                                            let parcelNumbers = event.target.number.value
                                                                            let PickupRequestData = { parcelNum: parcelNumbers }
                                                                            // console.log(PickupRequestData)
                                                                            // Rider approved pickup request with update parcel number
                                                                            // ======================================================================
                                                                            fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/RiderApprovedUserPickupRequestData/${PickupRequestRequest?.PickupReqIdForRider}`, {
                                                                                method: "PUT",
                                                                                headers: {
                                                                                    "content-type": "application/json"
                                                                                },
                                                                                body: JSON.stringify(PickupRequestData)
                                                                            })
                                                                                .then(res => res.json())
                                                                                .then(data => {
                                                                                    if (data.modifiedCount > 0) {
                                                                                        // After pickup request delivery success, then delete will be rider assign data
                                                                                        // ==============================================================================
                                                                                        fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/DeletePickupRequestAssignParcel/${PickupRequestRequest?._id}`, {
                                                                                            method: "DELETE",
                                                                                        })
                                                                                            .then(res => res.json())
                                                                                            .then(data => {
                                                                                                if (data.deletedCount > 0) {
                                                                                                    refetch()
                                                                                                    setIsLoading(false)
                                                                                                    Swal.fire({
                                                                                                        position: 'top-end',
                                                                                                        icon: 'success',
                                                                                                        title: 'Pickup request approved success',
                                                                                                        showConfirmButton: false,
                                                                                                        timer: 1500
                                                                                                    })
                                                                                                }
                                                                                                // console.log(data)
                                                                                            })
                                                                                    }
                                                                                })
                                                                        }}>
                                                                        <input name="number" type="number" placeholder="Enter parcel number" className='px-2 my-2 text-black font-[600] text-[16px]' />
                                                                        <br />
                                                                        <button type="submit" className="btn btn-sm btn-outline btn-primary">{IsLoading ? "Loading..." : "Pickup Request Approved"}</button>
                                                                    </form>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
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

            {/* ========================================================== */}
            {/* (PARCEL-MODAL) Parcel Details Show Bellow Start */}
            {/* ========================================================== */}
            {AssignParcelDetails && (
                <dialog
                    id="MyAssignParcelDetailsShow"
                    className="modal absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div className="modal-box w-full md:max-w-5xl max-h-[90vh] bg-gray-900 text-white rounded-xl overflow-y-auto">
                        <h3 className="font-bold text-2xl mb-6 text-center bg-gray-900 py-4 z-10">
                            🔐 Parcel Details & Status Update To Rider
                        </h3>

                        {/* Parcel Details All Show Bellow !! */}
                        {/* ============================================== */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                            <div>
                                <p className="font-semibold text-gray-300">📦 Parcel ID:</p>
                                <p className="text-white">{AssignParcelDetails?.StandardParcelId}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">👤 Sender Name:</p>
                                <p className="text-white">{AssignParcelDetails?.name}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">📞 Phone Number:</p>
                                <p className="text-white">{AssignParcelDetails?.number}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">📅 Date:</p>
                                <p className="text-white">{AssignParcelDetails?.date}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">⏰ Time:</p>
                                <p className="text-white">{AssignParcelDetails?.time}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">📮 Delivery Type:</p>
                                <p className="text-white">{AssignParcelDetails?.deliveryType}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">🎯 Delivery Address:</p>
                                <p className="text-white">{AssignParcelDetails?.address}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">🏙️ District:</p>
                                <p className="text-white">{AssignParcelDetails?.District}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">🛡️ Police Station:</p>
                                <p className="text-white">{AssignParcelDetails?.policeStation}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">🏢 Hub:</p>
                                <p className="text-white">{AssignParcelDetails?.MyHub}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">📂 Category:</p>
                                <p className="text-white">{AssignParcelDetails?.ParcelCategory}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">⚖️ Weight:</p>
                                <p className="text-white">{AssignParcelDetails?.weight}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">💰 COD Amount:</p>
                                <p className="text-white">{AssignParcelDetails?.CodAmount} ৳</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">🚚 Delivery Charge:</p>
                                <p className="text-white">{AssignParcelDetails?.DeliveryCharge} ৳</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">💳 Payment:</p>
                                <p className="text-white">{AssignParcelDetails?.Payment}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">📧 Email:</p>
                                <p className="text-white">{AssignParcelDetails?.StandardEmailUser}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">🚴 Assigned Rider:</p>
                                <p className="text-white">{AssignParcelDetails?.AssignRider}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-300">📌 Status:</p>
                                <p className="text-white">{AssignParcelDetails?.status}</p>
                            </div>
                        </div>

                        {/* Rider send note of this parcel !! */}
                        {/* ============================================== */}
                        <div className="mt-10 border-t border-gray-700 pt-6">
                            <h2 className="text-lg font-bold text-white mb-4 text-center">📦 Rider send note of this parcel</h2>
                            <form
                                onSubmit={(event) => {
                                    setIsLoading(true)
                                    event.preventDefault()
                                    let ParcelNote = event.target.ParcelNote.value;
                                    let date = moment().format("MM/DD/YYYY")
                                    let time = moment().format("hh:mm A")
                                    let TrackingMessage = ParcelNote

                                    let allInfo = { ParcelNote }
                                    let TrackingMessagePost = {
                                        userOrderIdTracking: AssignParcelDetails?.StandardParcelId,
                                        TrackingMessage,
                                        TrackingDate: date,
                                        TrackingTime: time
                                    };
                                    // console.log(allInfo)
                                    // console.log(TrackingMessagePost)

                                    {/* Update Parcel Note*/ }
                                    {/* ==================================== */ }
                                    fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/UserWithRiderUpdateParcelNote/${AssignParcelDetails?._id}`, {
                                        method: "PATCH",
                                        headers: {
                                            "content-type": "application/json"
                                        },
                                        body: JSON.stringify(allInfo)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.modifiedCount > 0) {
                                                // Note Tracking Message Send Tracking Data Post 
                                                // =========================================================
                                                fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/NoteTrackingMessageSendOfUserAndRider", {
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
                                                            Swal.fire({
                                                                position: 'top-end',
                                                                icon: 'success',
                                                                title: 'Parcel note send successful',
                                                                showConfirmButton: false,
                                                                timer: 1500
                                                            })
                                                            refetch()
                                                            event.target.reset()
                                                            setIsLoading(false)
                                                            document.getElementById("MyAssignParcelDetailsShow").close()
                                                        }
                                                    })
                                            }
                                        })
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                                    <input
                                        type="text"
                                        name="ParcelNote"
                                        required
                                        placeholder="Give parcel note here !!"
                                        className="bg-white text-black select select-bordered w-full max-w-xs"
                                    />
                                    <button
                                        disabled={IsLoading}
                                        type="submit"
                                        className="bg-[#22A197] text-white text-[14px] font-semibold rounded-[8px] w-full py-[10px]"
                                    >
                                        {IsLoading ? "Loading ..." : "✅ Send Note"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Rider Update Parcel Status Here !! */}
                        {/* ============================================== */}
                        <div className="mt-10 border-t border-gray-700 pt-6">
                            <h2 className="text-lg font-bold text-white mb-4 text-center">📦 Update Parcel Delivery Status</h2>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    setIsLoading(true)
                                    let parcelStatus = event.target.statusUp.value
                                    let date = moment().format("MM/DD/YYYY")
                                    let time = moment().format("hh:mm A")
                                    let TrackingMessage = "";
                                    if (parcelStatus === "Delivered") {
                                        TrackingMessage = "🚚 Delivery complete. We hope you enjoy your package!";
                                    } else if (parcelStatus === "PartiallyDelivered") {
                                        TrackingMessage = "📦 Your parcel has been partially delivered. Please check your items.";
                                    } else if (parcelStatus === "Cancel") {
                                        TrackingMessage = "❌ Your parcel has been cancelled. Please contact support for more details.";
                                    } else {
                                        TrackingMessage = "ℹ️ Your parcel is being processed. Please wait for updates.";
                                    }
                                    // Parcel Delivery Tracking message send
                                    // ========================================
                                    let TrackingMessagePost = {
                                        userOrderIdTracking: AssignParcelDetails?.StandardParcelId,
                                        TrackingMessage,
                                        TrackingDate: date,
                                        TrackingTime: time
                                    };

                                    // Parcel Delivery Status Update
                                    // ======================================
                                    let ParcelStatusUpToRider = { parcelStatus }

                                    // Rider Parcel Delivery History Data
                                    // ======================================
                                    let RiderDeliveryHistoryDate = {
                                        RiderEmail: roles?.roles,
                                        RiderID: roles?.userId,
                                        RiderFirstName: roles?.name,
                                        RiderLastName: roles?.LastName,
                                        ParcelId: AssignParcelDetails?.StandardParcelId,
                                        ParcelDistrict: AssignParcelDetails?.District,
                                        ParcelPoliceStation: AssignParcelDetails?.policeStation,
                                        ParcelMyHub: AssignParcelDetails?.MyHub,
                                        ParcelWeight: AssignParcelDetails?.weight,
                                        ParcelCod: AssignParcelDetails?.CodAmount,
                                        date,
                                        time,
                                    }

                                    // Parcel COD Balance Increase Rider Balance
                                    // ===================================================
                                    let ParcelCodBalance = {
                                        ParcelCod: Math.floor(Number(AssignParcelDetails?.CodAmount) || 0)
                                    };

                                    // ===================================================
                                    // Parcel Status Update, When rider approved parcel
                                    // ===================================================
                                    fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/RiderParcelDeliveryStatusUpdate/${AssignParcelDetails?._id}`, {
                                        method: "PATCH",
                                        headers: {
                                            "content-type": "application/json"
                                        },
                                        body: JSON.stringify(ParcelStatusUpToRider)
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.modifiedCount > 0) {
                                                // ===============================================
                                                // Rider after Delivery Tracking Message Send 
                                                // ===============================================
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
                                                            // ===========================================
                                                            // Rider Delivery parcel (History) post
                                                            // ===========================================
                                                            fetch("https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ParcelDeliveryHistoryOfRider", {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                },
                                                                body: JSON.stringify(RiderDeliveryHistoryDate)
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    // console.log(data)
                                                                    if (data.insertedId) {

                                                                        // =============================================
                                                                        // Parcel (COD) Amount Will Be Pluse Rider Balance..
                                                                        // =============================================
                                                                        fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ParcelCODAmountIncreaseRiderBalance/${roles?.email}`, {
                                                                            method: "PUT",
                                                                            headers: {
                                                                                "content-type": "application/json"
                                                                            },
                                                                            body: JSON.stringify(ParcelCodBalance)
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    // Assign Parcel Request Delete After, change parcel status and others to rider..
                                                                                    // ===============================
                                                                                    fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/DeleteAssignParcel/${AssignRequestIdFoDeleteRequest}`, {
                                                                                        method: "DELETE",
                                                                                    })
                                                                                        .then(res => res.json())
                                                                                        .then(data => {
                                                                                            if (data.deletedCount > 0) {
                                                                                                Swal.fire({
                                                                                                    position: 'top-end',
                                                                                                    icon: 'success',
                                                                                                    title: 'Parcel delivery Successful',
                                                                                                    showConfirmButton: false,
                                                                                                    timer: 1500
                                                                                                })
                                                                                                refetch()
                                                                                                setIsLoading(false)
                                                                                                document.getElementById("MyAssignParcelDetailsShow").close()
                                                                                            }
                                                                                            // console.log(data)
                                                                                        })
                                                                                }
                                                                            })
                                                                    }
                                                                })
                                                        }
                                                    })
                                            }
                                        })
                                }}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                                    <select
                                        name="statusUp"
                                        className="bg-white text-black select select-bordered w-full max-w-xs"
                                        required
                                    >
                                        <option value="" hidden>
                                            {AssignParcelDetails?.status || "Select Status"}
                                        </option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="PartiallyDelivered">PartiallyDelivered</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>

                                    <button
                                        disabled={IsLoading}
                                        type="submit"
                                        className="bg-[#22A197] text-white text-[14px] font-semibold rounded-[8px] w-full py-[10px]"
                                    >
                                        {IsLoading ? "Loading ..." : "✅ Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Modal cancel bellow !! */}
                        {/* ============================================== */}
                        <div className="modal-action mt-8 flex justify-end">
                            <button
                                onClick={() => {
                                    document.getElementById("MyAssignParcelDetailsShow").close();
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

export default MyParcelRider;

