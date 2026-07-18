import { useState } from 'react';
import "./AdminMyHub.css"
import { useQuery } from '@tanstack/react-query';
import moment from "moment";
import Swal from 'sweetalert2';

const AdminMyHub = () => {

    const [tabState, setTabState] = useState(1);

    // PickUp Request All Data Find
    // ============================================
    let { refetch, data: HubRequestDataAll = [] } = useQuery(["PickupRequestWithManegeAdminUsers_AllPickupRequestData"], async () => {
        let res = await fetch("http://localhost:5000/PickupRequestWithManegeAdminUsers/AllPickupRequestData")
        return res.json()
    })
    // console.log(HubRequestDataAll)

    // ==================================================================================================
    // PickUp Request (Approved) Data Filter
    // ============================================
    let UserApprovedHub = HubRequestDataAll?.filter(Approved => Approved.status === "Approved" && Approved?.AssignRider === "Yes")
    // console.log(UserApprovedHub)
    // =============================================

    // PickUp Request ((Regular Delivery) Approved) Data Filter
    // ==========================================================
    let RegularHubDataApproved = UserApprovedHub?.filter(Type => Type?.PickupRequestType === "Regular Delivery")
    // =======================================
    // Search (PICKUP) request search by hub
    // =======================================
    let [SearchApprovedRegularRequestData, setSearchApprovedRegularRequestData] = useState([])

    // PickUp Request ((Express Delivery) Approved) Data Filter
    // ==========================================================
    let ExpressHubDataApproved = UserApprovedHub?.filter(Type => Type?.PickupRequestType === "Express Delivery")
    // =======================================
    // Search (PICKUP) request search by hub
    // =======================================
    let [SearchApprovedExpressRequestData, setSearchApprovedExpressRequestData] = useState([])

    // PickUp Request ((Pink N Drop Delivery) Approved) Data Filter
    // ============================================================
    let PinkNDropHubDataApproved = UserApprovedHub?.filter(Type => Type?.PickupRequestType === "Pink N Drop Delivery")
    // =======================================
    // Search (PICKUP) request search by hub
    // =======================================
    let [SearchApprovedPinkNDropRequestData, setSearchApprovedPinkNDropRequestData] = useState([])




    // ==================================================================================================
    // PickUp Request (Pending) Data Filter
    // ============================================

    let UserPendingHub = HubRequestDataAll?.filter(Pending => Pending.status === "Pending" && Pending?.AssignRider === "No")
    // console.log(UserPendingHub)
    // =============================================

    // PickUp Request ((Regular Delivery) Pending) Data Filter
    // ==========================================================
    let RegularHubDataPending = UserPendingHub?.filter(Type => Type?.PickupRequestType === "Regular Delivery")
    // =======================================
    // Search (PICKUP) request search by hub
    // =======================================
    let [SearchPendingRegularRequestData, setSearchPendingRegularRequestData] = useState([])

    // PickUp Request ((Express Delivery) Pending) Data Filter
    // ==========================================================
    let ExpressHubDataPending = UserPendingHub?.filter(Type => Type?.PickupRequestType === "Express Delivery")
    // =======================================
    // Search (PICKUP) request search by hub
    // =======================================
    let [SearchPendingExpressRequestData, setSearchPendingExpressRequestData] = useState([])

    // PickUp Request ((Pink N Drop Delivery) Pending) Data Filter
    // ============================================================
    let PinkNDropHubDataPending = UserPendingHub?.filter(Type => Type?.PickupRequestType === "Pink N Drop Delivery")
    // =======================================
    // Search (PICKUP) request search by hub
    // =======================================
    let [SearchPendingPinkNDropRequestData, setSearchPendingPinkNDropRequestData] = useState([])


    // ========================================================================================================
    // Created All Police Station find of Hub
    // =====================================================
    let { data: AllStationOfHub = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_PoliceStationWithOfHub"], async () => {
        let res = await fetch("http://localhost:5000/HubManageAdminCreateOrUpdatePs/PoliceStationWithOfHub")
        return res.json()
    })
    // console.log(AllStationOfHub)

    // ============================================================================================================
    // Created All Hub Find
    // =====================================================
    let { data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("http://localhost:5000/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)


    // ========================================================================================================
    // All User Find for filter hub rider !!
    // =============================================
    // user data all find use tenStack query 
    let { data: adminAllUsers = [] } = useQuery(["users"], async () => {
        let res = await fetch("http://localhost:5000/users")
        return res.json()
    })
    // received hub name fo show assign hub
    // ===========================================================
    let [searchHubName, setSearchHubName] = useState("")


    // ========================================================================================================
    // (Single) Assign Pickup Request From Bellow !!
    // =============================================
    const [activeAllRider, setActiveAllRider] = useState([]);
    const [PickupReqId, setPickupReqId] = useState("");

    // Open the modal a set data on useState
    // =============================================
    const handleAssignRider = (SelectHubName, PickupRequestUserId) => {
        // filter all user for found all hub rider 
        // ==============================================
        let ThisHubAllRider = adminAllUsers?.filter(AllRider => AllRider?.MyHubRider === SelectHubName)
        setActiveAllRider(ThisHubAllRider);
        setPickupReqId(PickupRequestUserId);

        // setState complete হওয়ার পর modal open করো
        setTimeout(() => {
            document.getElementById("PickupRequestAssignToRider").showModal();
        }, 50);
    };





    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>

            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* (Pending) All PickUp Request Data See */}
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md">

                    <div className="md:flex items-center justify-between">
                        {/* Title of Pickup Request*/}
                        {/* ==================================== */}
                        <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Pickup Request All Pending Data</h3>

                        {/* Update Hub of Pickup Request*/}
                        {/* ==================================== */}
                        <div className="">
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const HubName = event.target.HubNameOfUpdatePickup.value;
                                const PickupId = event.target.PickupRequestId.value;
                                const allInfo = { HubName, PickupId }
                                fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminUpdatePickupRequestHubData/${PickupId}`, {
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
                                                position: 'top-end',
                                                icon: 'success',
                                                title: 'Pickup request hub name update is success',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        }
                                        refetch()
                                        event.target.reset()
                                    })
                            }}>
                                <h1 className="text-black text-left text-[18px] font-[600] pb-2">You can update hub of pickup request !!</h1>
                                <input
                                    type="number"
                                    name="PickupRequestId"
                                    required
                                    placeholder="Give a pickup request id"
                                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                <div className="flex items-center gap-2">
                                    <select
                                        required
                                        className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        name="HubNameOfUpdatePickup"
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
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Tabs with Search bar (Pending)*/}
                    {/* ==================================== */}
                    <div className="mb-6">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 space-x-4 mb-4">
                            <button onClick={() => setTabState(1)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Regular Delivery
                            </button>

                            <button onClick={() => setTabState(2)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Express Delivery
                            </button>

                            <button onClick={() => setTabState(3)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Pink N Drop Delivery
                            </button>
                        </div>
                    </div>

                    {/* Tab Content (Pending)*/}
                    {/* ==================================== */}
                    <div className="">

                        {/* ==================================== */}
                        {/* Regular Delivery Start */}
                        {/* ==================================== */}

                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Regular Delivery</h2>

                                        {/* Search Section (Pending)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                name="stationOfHub"
                                                onBlur={(e) => {
                                                    const HubName = e.target.value
                                                    setSearchHubName(HubName)
                                                    setSearchPendingRegularRequestData(RegularHubDataPending?.filter(Pending => Pending?.MyHub === HubName))
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

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {(SearchPendingRegularRequestData.length > 0 ? SearchPendingRegularRequestData :
                                                    RegularHubDataPending)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                Date: {item?.date}, {item?.time} <br />
                                                                <div className="">
                                                                    <form onSubmit={(e) => {
                                                                        e.preventDefault()
                                                                        let parcelNumbers = e.target.number.value
                                                                        let HubData = { parcelNum: parcelNumbers }
                                                                        // console.log(HubData)

                                                                        fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminApprovedUserPickupRequestData/${item?._id}`, {
                                                                            method: "PUT",
                                                                            headers: {
                                                                                "content-type": "application/json"
                                                                            },
                                                                            body: JSON.stringify(HubData)
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    Swal.fire({
                                                                                        position: 'top-end',
                                                                                        icon: 'success',
                                                                                        title: 'Pickup Request Approved Success',
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                    refetch()
                                                                                }
                                                                            })
                                                                    }}>
                                                                        <input name="number" type="number" className='px-2 my-2 text-black font-[600] text-[16px]' />
                                                                        <br />
                                                                        <button type="submit" className="bg-[#2BA1BE] py-2 px-4 rounded-[8px] text-[14px] font-[600]">Approved Now</button>
                                                                    </form>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.PickupRequestType}<br />
                                                                <h4 className="py-4 text-sm text-gray-800 font-bold"> PickupId: {item?.PickupIdUser}</h4>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.name} {item?.LastName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                {/* Show hub dynamicly */}
                                                                {/* {(() => {
                                                                let myHub = AllStationOfHub?.find(hub => hub?.PoliceStation === item?.PoliceStations)

                                                                console.log(myHub)
                                                                return <div>
                                                                    {myHub?.HubName ? myHub?.HubName : "No Hub "}
                                                                </div>
                                                            })()
                                                            }  */}
                                                                Hub: {item?.MyHub ? item?.MyHub : "No Hub "} <br />
                                                                {item?.PoliceStations ? item?.PoliceStations : "No Police Station"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => {
                                                                        Swal.fire({
                                                                            title: "Are you sure?",
                                                                            text: `Delete hub`,
                                                                            icon: "warning",
                                                                            showCancelButton: true,
                                                                            confirmButtonColor: "#d33",
                                                                            cancelButtonColor: "#3085d6",
                                                                            confirmButtonText: "Yes, delete it!"
                                                                        }).then(async (result) => {
                                                                            if (result.isConfirmed) {

                                                                                // Hub request data insert 
                                                                                // =================================
                                                                                try {
                                                                                    let res = await fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminDeletePickupRequestData/${item?._id}`, {
                                                                                        method: "DELETE",
                                                                                    })
                                                                                    let result = await res.json()

                                                                                    if (res.ok) {
                                                                                        Swal.fire({
                                                                                            icon: "success",
                                                                                            title: "Deleted!",
                                                                                            text: "The Pickup Request has been deleted.",
                                                                                            timer: 1500,
                                                                                            showConfirmButton: false,
                                                                                        });
                                                                                        await refetch();
                                                                                    }
                                                                                } catch (err) {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Error",
                                                                                        text: err.message || "Something went wrong",
                                                                                    });
                                                                                }
                                                                            }
                                                                        });
                                                                    }}
                                                                    className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                                >Delete</button>
                                                                <br />
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

                                                                                                <button onClick={() => handleAssignRider(searchHubName, item?.PickupIdUser)} className="btn btn-sm btn-outline btn-primary">Rider</button>
                                                                                            </div>
                                                                                        </ul>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })()
                                                                    }
                                                                </td>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* ==================================== */}
                        {/*  Express Delivery Start */}
                        {/* ==================================== */}

                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Express Delivery</h2>

                                        {/* Search Section (Pending)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                name="stationOfHub"
                                                onBlur={(e) => {
                                                    const HubName = e.target.value
                                                    setSearchHubName(HubName)
                                                    setSearchPendingExpressRequestData(ExpressHubDataPending?.filter(Pending => Pending?.MyHub === HubName))
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

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {(SearchPendingExpressRequestData.length > 0 ? SearchPendingExpressRequestData :
                                                    ExpressHubDataPending)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                Date: {item?.date}, {item?.time} <br />
                                                                <div className="">
                                                                    <form onSubmit={(e) => {
                                                                        e.preventDefault()
                                                                        let parcelNumbers = e.target.number.value
                                                                        let HubData = { parcelNum: parcelNumbers }
                                                                        // console.log(HubData)

                                                                        fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminApprovedUserPickupRequestData/${item?._id}`, {
                                                                            method: "PUT",
                                                                            headers: {
                                                                                "content-type": "application/json"
                                                                            },
                                                                            body: JSON.stringify(HubData)
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    Swal.fire({
                                                                                        position: 'top-end',
                                                                                        icon: 'success',
                                                                                        title: 'Pickup Request Approved Success',
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                }
                                                                                refetch()
                                                                            })

                                                                    }}>
                                                                        <input name="number" type="number" className='px-2 my-2 text-black font-[600] text-[16px]' />
                                                                        <br />
                                                                        <button type="submit" className="bg-[#2BA1BE] py-2 px-4 rounded-[8px] text-[14px] font-[600]">Approved Now</button>
                                                                    </form>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.PickupRequestType}<br />
                                                                <h4 className="py-4 text-sm text-gray-800 font-bold"> PickupId: {item?.PickupIdUser}</h4>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.name} {item?.LastName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                {/* {(() => {
                                                                let myHub = AllStationOfHub?.find(hub => hub?.PoliceStation === item?.PoliceStations)

                                                                console.log(myHub)
                                                                return <div>
                                                                    {myHub?.HubName ? myHub?.HubName : "No Hub "}
                                                                </div>
                                                            })()
                                                            } */}
                                                                Hub: {item?.MyHub ? item?.MyHub : "No Hub "} <br />
                                                                {item?.PoliceStations ? item?.PoliceStations : "No Police Station"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => {
                                                                        Swal.fire({
                                                                            title: "Are you sure?",
                                                                            text: `Delete hub`,
                                                                            icon: "warning",
                                                                            showCancelButton: true,
                                                                            confirmButtonColor: "#d33",
                                                                            cancelButtonColor: "#3085d6",
                                                                            confirmButtonText: "Yes, delete it!"
                                                                        }).then(async (result) => {
                                                                            if (result.isConfirmed) {

                                                                                // Hub request data insert 
                                                                                // =================================
                                                                                try {
                                                                                    let res = await fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminDeletePickupRequestData/${item?._id}`, {
                                                                                        method: "DELETE",
                                                                                    })
                                                                                    let result = await res.json()

                                                                                    if (res.ok) {
                                                                                        Swal.fire({
                                                                                            icon: "success",
                                                                                            title: "Deleted!",
                                                                                            text: "The Pickup Request has been deleted.",
                                                                                            timer: 1500,
                                                                                            showConfirmButton: false,
                                                                                        });
                                                                                        await refetch();
                                                                                    }
                                                                                } catch (err) {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Error",
                                                                                        text: err.message || "Something went wrong",
                                                                                    });
                                                                                }
                                                                            }
                                                                        });
                                                                    }}
                                                                    className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                                >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* ==================================== */}
                        {/* Pink N Drop Delivery Start */}
                        {/* ==================================== */}

                        {tabState === 3 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pink N Drop Delivery</h2>
                                        {/* Search Section (Pending)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                name="stationOfHub"
                                                onBlur={(e) => {
                                                    const HubName = e.target.value
                                                    setSearchHubName(HubName)
                                                    setSearchPendingPinkNDropRequestData(PinkNDropHubDataPending?.filter(Pending => Pending?.MyHub === HubName))
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

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {(SearchPendingPinkNDropRequestData.length > 0 ? SearchPendingPinkNDropRequestData :
                                                    PinkNDropHubDataPending)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                Date: {item?.date}, {item?.time} <br />
                                                                <div className="">
                                                                    <form onSubmit={(e) => {
                                                                        e.preventDefault()
                                                                        let parcelNumbers = e.target.number.value
                                                                        let HubData = { parcelNum: parcelNumbers }
                                                                        // console.log(HubData)

                                                                        fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminApprovedUserPickupRequestData/${item?._id}`, {
                                                                            method: "PUT",
                                                                            headers: {
                                                                                "content-type": "application/json"
                                                                            },
                                                                            body: JSON.stringify(HubData)
                                                                        })
                                                                            .then(res => res.json())
                                                                            .then(data => {
                                                                                if (data.modifiedCount > 0) {
                                                                                    Swal.fire({
                                                                                        position: 'top-end',
                                                                                        icon: 'success',
                                                                                        title: 'Pickup Request Approved Success',
                                                                                        showConfirmButton: false,
                                                                                        timer: 1500
                                                                                    })
                                                                                }
                                                                                refetch()
                                                                            })

                                                                    }}>
                                                                        <input name="number" type="number" className='px-2 my-2 text-black font-[600] text-[16px]' />
                                                                        <br />
                                                                        <button type="submit" className="bg-[#2BA1BE] py-2 px-4 rounded-[8px] text-[14px] font-[600]">Approved Now</button>
                                                                    </form>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.PickupRequestType}<br />
                                                                <h4 className="py-4 text-sm text-gray-800 font-bold"> PickupId: {item?.PickupIdUser}</h4>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.name} {item?.LastName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                {/* {(() => {
                                                                let myHub = AllStationOfHub?.find(hub => hub?.PoliceStation === item?.PoliceStations)

                                                                console.log(myHub)
                                                                return <div>
                                                                    {myHub?.HubName ? myHub?.HubName : "No Hub "}
                                                                </div>
                                                            })()
                                                            } */}
                                                                Hub: {item?.MyHub ? item?.MyHub : "No Hub "} <br />
                                                                {item?.PoliceStations ? item?.PoliceStations : "No Police Station"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <button
                                                                    onClick={() => {
                                                                        Swal.fire({
                                                                            title: "Are you sure?",
                                                                            text: `Delete hub`,
                                                                            icon: "warning",
                                                                            showCancelButton: true,
                                                                            confirmButtonColor: "#d33",
                                                                            cancelButtonColor: "#3085d6",
                                                                            confirmButtonText: "Yes, delete it!"
                                                                        }).then(async (result) => {
                                                                            if (result.isConfirmed) {

                                                                                // Hub request data insert 
                                                                                // =================================
                                                                                try {
                                                                                    let res = await fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminDeletePickupRequestData/${item?._id}`, {
                                                                                        method: "DELETE",
                                                                                    })
                                                                                    let result = await res.json()

                                                                                    if (res.ok) {
                                                                                        Swal.fire({
                                                                                            icon: "success",
                                                                                            title: "Deleted!",
                                                                                            text: "The Pickup Request has been deleted.",
                                                                                            timer: 1500,
                                                                                            showConfirmButton: false,
                                                                                        });
                                                                                        await refetch();
                                                                                    }
                                                                                } catch (err) {
                                                                                    Swal.fire({
                                                                                        icon: "error",
                                                                                        title: "Error",
                                                                                        text: err.message || "Something went wrong",
                                                                                    });
                                                                                }
                                                                            }
                                                                        });
                                                                    }}
                                                                    className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                                >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>

                {/* ====================================================================== */}
                {/* (Approved) All PickUp Request Data See */}
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    {/* Title of Pickup Request*/}
                    {/* ==================================== */}
                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Pickup Request All Approved Data</h3>

                    {/* Tabs with Search bar (Approved)*/}
                    {/* ==================================== */}
                    <div className="mb-6 ">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-200 space-x-4 mb-4">
                            <button onClick={() => setTabState(1)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Regular Delivery
                            </button>

                            <button onClick={() => setTabState(2)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Express Delivery
                            </button>

                            <button onClick={() => setTabState(3)}
                                className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 3 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                    }`}
                            >
                                Pink N Drop Delivery
                            </button>
                        </div>
                    </div>

                    {/* Tab Content (Approved)*/}
                    {/* ==================================== */}
                    <div className="">
                        {/* ==================================== */}
                        {/* Regular Delivery Start */}
                        {/* ==================================== */}

                        {tabState === 1 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Regular Delivery</h2>
                                        {/* Search Section (Approved)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                name="stationOfHub"
                                                onBlur={(e) => {
                                                    const HubName = e.target.value
                                                    setSearchApprovedRegularRequestData(RegularHubDataApproved?.filter(Pending => Pending?.MyHub === HubName))
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

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {(SearchApprovedRegularRequestData.length > 0 ? SearchApprovedRegularRequestData :
                                                    RegularHubDataApproved)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                Date: {item?.date}, {item?.time}<br />
                                                                <h4 className="py-4 text-sm text-gray-800">Total Parcel: {item?.parcelNum}</h4>

                                                                {/* <div className="">
                                                                    <button type="submit" className="bg-[#2BA1BE] py-2 px-4 rounded-[8px] text-[14px] font-[600]"
                                                                        onClick={() => {
                                                                            fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminPendingUserPickupRequestData/${item?._id}`, {
                                                                                method: "PATCH",
                                                                            })
                                                                                .then(res => res.json())
                                                                                .then(data => {
                                                                                    if (data.modifiedCount > 0) {
                                                                                        Swal.fire({
                                                                                            position: 'top-end',
                                                                                            icon: 'success',
                                                                                            title: 'Pickup Request Pending Success',
                                                                                            showConfirmButton: false,
                                                                                            timer: 1500
                                                                                        })
                                                                                    }
                                                                                    refetch()
                                                                                })

                                                                        }}
                                                                    >Pending Now</button>
                                                                </div> */}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.PickupRequestType}<br />
                                                                <h4 className="py-4 text-sm text-gray-800 font-bold"> PickupId: {item?.PickupIdUser}</h4>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.name} {item?.LastName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                {/* {(() => {
                                                                let myHub = AllStationOfHub?.find(hub => hub?.PoliceStation === item?.PoliceStations)

                                                                console.log(myHub)
                                                                return <div>
                                                                    {myHub?.HubName ? myHub?.HubName : "No Hub "}
                                                                </div>
                                                            })()
                                                            } */}
                                                                Hub: {item?.MyHub ? item?.MyHub : "No Hub "} <br />
                                                                {item?.PoliceStations ? item?.PoliceStations : "No Police Station "}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* ==================================== */}
                        {/*  Express Delivery Start */}
                        {/* ==================================== */}

                        {tabState === 2 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Express Delivery</h2>
                                        {/* Search Section (Approved)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                name="stationOfHub"
                                                onBlur={(e) => {
                                                    const HubName = e.target.value
                                                    setSearchApprovedExpressRequestData(ExpressHubDataApproved?.filter(Pending => Pending?.MyHub === HubName))
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
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {(SearchApprovedExpressRequestData.length > 0 ? SearchApprovedExpressRequestData :
                                                    ExpressHubDataApproved)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                Date: {item?.date}, {item?.time}<br />
                                                                <h4 className="py-4 text-sm text-gray-800">Total Parcel: {item?.parcelNum}</h4>
                                                                {/* <div className="">
                                                                    <button type="submit" className="bg-[#2BA1BE] py-2 px-4 rounded-[8px] text-[14px] font-[600]"
                                                                        onClick={() => {
                                                                            fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminPendingUserPickupRequestData/${item?._id}`, {
                                                                                method: "PATCH",
                                                                            })
                                                                                .then(res => res.json())
                                                                                .then(data => {
                                                                                    if (data.modifiedCount > 0) {
                                                                                        Swal.fire({
                                                                                            position: 'top-end',
                                                                                            icon: 'success',
                                                                                            title: 'Pickup Request Pending Success',
                                                                                            showConfirmButton: false,
                                                                                            timer: 1500
                                                                                        })
                                                                                    }
                                                                                    refetch()
                                                                                })

                                                                        }}
                                                                    >Pending Now</button>
                                                                </div> */}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.PickupRequestType}<br />
                                                                <h4 className="py-4 text-sm text-gray-800 font-bold"> PickupId: {item?.PickupIdUser}</h4>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.name} {item?.LastName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                {/* {(() => {
                                                                let myHub = AllStationOfHub?.find(hub => hub?.PoliceStation === item?.PoliceStations)

                                                                console.log(myHub)
                                                                return <div>
                                                                    {myHub?.HubName ? myHub?.HubName : "No Hub "}
                                                                </div>
                                                            })()
                                                            } */}
                                                                Hub: {item?.MyHub ? item?.MyHub : "No Hub "} <br />
                                                                {item?.PoliceStations ? item?.PoliceStations : "No Police Station "}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                        {/* ==================================== */}
                        {/* Pink N Drop Delivery Start */}
                        {/* ==================================== */}

                        {tabState === 3 &&
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pink N Drop Delivery</h2>
                                        {/* Search Section (Approved)*/}
                                        {/* ==================================== */}
                                        <div className="flex items-center gap-2">
                                            <select required className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                name="stationOfHub"
                                                onBlur={(e) => {
                                                    const HubName = e.target.value
                                                    setSearchApprovedPinkNDropRequestData(PinkNDropHubDataApproved?.filter(Pending => Pending?.MyHub === HubName))
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
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Request Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sender Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Hub</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {(SearchApprovedPinkNDropRequestData.length > 0 ? SearchApprovedPinkNDropRequestData :
                                                    PinkNDropHubDataApproved)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                Date: {item?.date}, {item?.time}<br />
                                                                <h4 className="py-4 text-sm text-gray-800">Total Parcel: {item?.parcelNum}</h4>

                                                                {/* <div className="">
                                                                    <button type="submit" className="bg-[#2BA1BE] py-2 px-4 rounded-[8px] text-[14px] font-[600]"
                                                                        onClick={() => {
                                                                            fetch(`http://localhost:5000/PickupRequestWithManegeAdminUsers/AdminPendingUserPickupRequestData/${item?._id}`, {
                                                                                method: "PATCH",
                                                                            })
                                                                                .then(res => res.json())
                                                                                .then(data => {
                                                                                    if (data.modifiedCount > 0) {
                                                                                        Swal.fire({
                                                                                            position: 'top-end',
                                                                                            icon: 'success',
                                                                                            title: 'Pickup Request Pending Success',
                                                                                            showConfirmButton: false,
                                                                                            timer: 1500
                                                                                        })
                                                                                    }
                                                                                    refetch()
                                                                                })

                                                                        }}
                                                                    >Pending Now</button>
                                                                </div> */}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.PickupRequestType}<br />
                                                                <h4 className="py-4 text-sm text-gray-800 font-bold"> PickupId: {item?.PickupIdUser}</h4>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.name} {item?.LastName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">{item?.status}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-800">
                                                                {/* {(() => {
                                                                let myHub = AllStationOfHub?.find(hub => hub?.PoliceStation === item?.PoliceStations)

                                                                console.log(myHub)
                                                                return <div>
                                                                    {myHub?.HubName ? myHub?.HubName : "No Hub "}
                                                                </div>
                                                            })()
                                                            } */}
                                                                Hub: {item?.MyHub ? item?.MyHub : "No Hub "} <br />
                                                                {item?.PoliceStations ? item?.PoliceStations : "No Police Station "}
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>

            {/* ================================================================================================ */}
            {/* Rider single pickup request assign of modal start **************   */}
            {/* ====================================================================== */}
            {activeAllRider && (
                <dialog id="PickupRequestAssignToRider" className="modal"
                    key={activeAllRider._id}
                >
                    <div className="modal-box w-full max-w-2xl text-white bg-gray-900">
                        <h3 className="font-bold text-xl mb-4">🔐 Pickup Request assign parcel to rider</h3>
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

                                                let AssignPickupRequestPostToRider = {
                                                    RiderEmail: rider?.email,
                                                    RiderPhone: rider?.Phone,
                                                    RiderName: rider?.name,
                                                    RiderUserId: rider?.userId,
                                                    PickupReqIdForRider: PickupReqId,
                                                    CategoryAssign: "PickupRequest",
                                                }
                                                // console.log(AssignPickupRequestPostToRider)

                                                // Pickup request assign ot rider !!
                                                // =======================================
                                                fetch("http://localhost:5000/AdminAllAssignParcelHere/InsertAssignPickupRequestToRider", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(AssignPickupRequestPostToRider)
                                                })
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        if (data.insertedId) {
                                                            // Pickup Request Assign Rider status up (Yes)
                                                            // ===============================================
                                                            fetch(`http://localhost:5000/AdminAllAssignParcelHere/PickupRequestAssignStatusUpdateYes/${PickupReqId}`, {
                                                                method: "PATCH",
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    if (data.modifiedCount > 0) {
                                                                        Swal.fire({
                                                                            position: 'top-end',
                                                                            icon: 'success',
                                                                            title: 'Pickup request assign successful',
                                                                            showConfirmButton: false,
                                                                            timer: 1500
                                                                        })
                                                                        refetch()
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
                                    document.getElementById("PickupRequestAssignToRider").close()
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
            {/* Rider single pickup request assign of modal End  */}
            {/* ====================================================================== */}
        </div>
    );
};

export default AdminMyHub;