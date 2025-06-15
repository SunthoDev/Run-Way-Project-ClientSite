import { useState } from 'react';
import "./Dispatch.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import React from "react";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

const Dispatch = () => {

    const [tabState, setTabState] = useState(1);
    const navigate = useNavigate()

    // ============================================================================================================
    // Created All Hub Find
    // =====================================================
    let { refetch, data: AllHubFind = [] } = useQuery(["HubManageAdminCreateOrUpdatePs_CreatedHubFind"], async () => {
        let res = await fetch("http://localhost:5000/HubManageAdminCreateOrUpdatePs/CreatedHubFind")
        return res.json()
    })
    // console.log(AllHubFind)

    // ========================================================================================================
    // Dispatch All Data Find
    // =====================================================
    let { data: DispatchAllData = [] } = useQuery(["DispatchAllRequestWithTrackingMessage_AllDispatchRequestData"], async () => {
        let res = await fetch("http://localhost:5000/DispatchAllRequestWithTrackingMessage/AllDispatchRequestData")
        return res.json()
    })
    // console.log(AllStationOfHub)

    // Filter Sent data of Dispatch
    // =====================================================
    let DispatchSentData = DispatchAllData?.filter(sent => sent.DispatchType === "Sent")

    // Filter Received data of Dispatch
    // =====================================================
    let DispatchReceivedData = DispatchAllData?.filter(Received => Received.DispatchType === "Received")



    return (
        <div className='AdminViewPaymentRequestAll bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ====================================================================== */}
                {/* (Pending) All PickUp Request Data See */}
                {/* ====================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md ">
                    <h3 className='text-black text-[24px] font-[600] text-left pb-4'>Dispatch Working..</h3>

                    {/* Tabs of Dispatch */}
                    {/* ==================================== */}
                    <div className="flex border-b border-gray-200 space-x-4 mb-4">
                        <button onClick={() => setTabState(1)}
                            className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 1 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                }`}
                        >
                            Sent
                        </button>

                        <button onClick={() => setTabState(2)}
                            className={`px-4 py-2 font-medium text-sm rounded-t-md transition-all duration-200 ${tabState === 2 ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                                }`}
                        >
                            Received
                        </button>
                    </div>


                    {/* Tab Content (Dispatch)*/}
                    {/* ==================================== */}
                    <div className="">

                        {/* ==================================== */}
                        {/* Dispatch (Send) */}
                        {/* ==================================== */}
                        {tabState === 1 &&
                            <div className="">

                                <div className="flex justify-center">
                                    {/* Dispatch (Send) Data */}
                                    {/* ==================================== */}
                                    <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                            Send Dispatch
                                        </h2>
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            const DispatchHubName = e.target.HubName.value;
                                            const oneDispatchId = e.target.id1.value;
                                            const twoDispatchId = e.target.id2.value;
                                            const threeDispatchId = e.target.id3.value;
                                            const fourDispatchId = e.target.id4.value;
                                            const fiveDispatchId = e.target.id5.value;
                                            const sixDispatchId = e.target.id6.value;
                                            const sevenDispatchId = e.target.id7.value;
                                            const eightDispatchId = e.target.id8.value;
                                            const nineDispatchId = e.target.id9.value;
                                            const tenDispatchId = e.target.id10.value;
                                            const elevenDispatchId = e.target.id11.value;
                                            const twelveDispatchId = e.target.id12.value;
                                            const thirteenDispatchId = e.target.id13.value;
                                            const fourteenDispatchId = e.target.id14.value;
                                            const fifteenDispatchId = e.target.id15.value;
                                            const sixteenDispatchId = e.target.id16.value;
                                            const seventeenDispatchId = e.target.id17.value;
                                            const eighteenDispatchId = e.target.id18.value;
                                            const nineteenDispatchId = e.target.id19.value;
                                            const twentyDispatchId = e.target.id20.value;
                                            let date = moment().format("D/MM/YY")
                                            let time = moment().format("hh:mm A")
                                            let DispatchId = Math.round(Math.random() * 99999999).toString()
                                            let TrackingMessage = `Sent to ${DispatchHubName} hub. Dispatch id ${DispatchId}`

                                            // All not empty id push on DispatchParcelAllId array
                                            // ============================================================= 
                                            let DispatchParcelAllId = []
                                            for (let i = 1; i <= 20; i++) {
                                                let id = e.target[`id${i}`]?.value.trim();
                                                if (id) {
                                                    DispatchParcelAllId.push(id);
                                                }
                                            }
                                            // Dispatch data post 
                                            // =======================================================================
                                            let DispatchDataPost = { DispatchId, TrackingMessage, date, time, DispatchType: "Sent", DispatchHubName, DispatchParcelAllId }
                                            // console.log(DispatchDataPost)

                                            // Tracking message post of dispatch 
                                            // =============================================================
                                            let TrackingMessagePost = []

                                            let TrackingMessages = [
                                                { userOrderIdTracking: oneDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: twoDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: threeDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fourDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fiveDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: sixDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: sevenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: eightDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: nineDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: tenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: elevenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: twelveDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: thirteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fourteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fifteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: sixteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: seventeenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: eighteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: nineteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: twentyDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time }
                                            ]
                                            // All not empty data push  on TrackingMessagePost array
                                            // ====================================================== 
                                            for (let Msg of TrackingMessages) {
                                                if (Msg?.userOrderIdTracking !== "") {
                                                    TrackingMessagePost.push(Msg)
                                                }
                                            }
                                            // console.log(TrackingMessagePost)


                                            // Dispatch Send Data Post 
                                            // ===========================================
                                            fetch("http://localhost:5000/DispatchAllRequestWithTrackingMessage/AdminDispatchRequestSend", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify(DispatchDataPost)
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    if (data.insertedId) {
                                                        // Dispatch Tracking Data Post 
                                                        // ===========================================
                                                        fetch("http://localhost:5000/DispatchAllRequestWithTrackingMessage/AdminTrackingRequestSentOfDispatch", {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            },
                                                            body: JSON.stringify(TrackingMessagePost)
                                                        })
                                                            .then(res => res.json())
                                                            .then(data => {
                                                                // console.log(data)
                                                                if (data.insertedCount > 0) {
                                                                    e.target.reset()
                                                                    Swal.fire({
                                                                        position: 'top-end',
                                                                        icon: 'success',
                                                                        title: 'Dispatch Request Success',
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                    })
                                                                }
                                                            })
                                                    }
                                                })

                                        }} className="grid grid-cols-7 gap-6">
                                            {/* Left side - 20 inputs in grid 4 columns (span 4)*/}
                                            <div className="col-span-4 grid grid-cols-4 gap-4">
                                                <input name="id1" type="number" text-black placeholder="Id 1" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id2" type="number" text-black placeholder="Id 2" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id3" type="number" text-black placeholder="Id 3" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id4" type="number" text-black placeholder="Id 4" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id5" type="number" text-black placeholder="Id 5" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id6" type="number" text-black placeholder="Id 6" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id7" type="number" text-black placeholder="Id 7" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id8" type="number" text-black placeholder="Id 8" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id9" type="number" text-black placeholder="Id 9" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id10" type="number" text-black placeholder="Id 10" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id11" type="number" text-black placeholder="Id 11" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id12" type="number" text-black placeholder="Id 12" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id13" type="number" text-black placeholder="Id 13" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id14" type="number" text-black placeholder="Id 14" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id15" type="number" text-black placeholder="Id 15" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id16" type="number" text-black placeholder="Id 16" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id17" type="number" text-black placeholder="Id 17" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id18" type="number" text-black placeholder="Id 18" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id19" type="number" text-black placeholder="Id 19" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id20" type="number" text-black placeholder="Id 20" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

                                            </div>

                                            {/* Right side - select picker, submit button*/}
                                            <div className="col-span-3 space-y-4">
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
                                            </div>

                                        </form>
                                    </div>
                                </div>


                                {/* Show (Sent) all Dispatch Data */}
                                {/* ==================================== */}
                                <div className="w-full bg-white shadow-lg border border-gray-200 mt-[40px] rounded-xl p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sent Dispatch Data</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Parcel Id</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Hub Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tracking Message</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {DispatchSentData?.map((SentData) =>
                                                    <tr key={SentData?._id}>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.date},{SentData?.time}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.DispatchType} <br /> Dispatch Id: {SentData?.DispatchId} </td>

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
                                                                        {SentData?.DispatchParcelAllId.map((id, index) => (
                                                                            <li key={index} className="">
                                                                                <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                    <span className="text-sm text-gray-700">{id}</span>

                                                                                    <button onClick={() => {
                                                                                        navigate(`/dashboard/AdminDashboard/AdminSearchStandardParcelId/${id}`)
                                                                                        // console.log(id)
                                                                                    }} className="text-black text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">View</button>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.DispatchHubName}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{SentData?.TrackingMessage}</td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={async () => {
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
                                                                            let res = await fetch(`http://localhost:5000/DispatchAllRequestWithTrackingMessage/AdminDeleteDispatchData/${SentData?._id}`, {
                                                                                method: "DELETE",
                                                                            })
                                                                            let result = await res.json()

                                                                            if (res.ok) {
                                                                                Swal.fire({
                                                                                    icon: "success",
                                                                                    title: "Deleted!",
                                                                                    text: "The Dispatch deleted success.",
                                                                                    timer: 1500,
                                                                                    showConfirmButton: false,
                                                                                });
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

                                                            }} className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                            > Delete </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </div>
                        }

                        {/* ==================================== */}
                        {/*  Dispatch (Received) */}
                        {/* ==================================== */}

                        {tabState === 2 &&
                            <div className="">
                                
                                <div className="flex justify-center">
                                    {/* Dispatch (Received) Data */}
                                    {/* ==================================== */}
                                    <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Received Dispatch</h2>
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            const DispatchHubName = e.target.HubName.value;
                                            const oneDispatchId = e.target.id1.value;
                                            const twoDispatchId = e.target.id2.value;
                                            const threeDispatchId = e.target.id3.value;
                                            const fourDispatchId = e.target.id4.value;
                                            const fiveDispatchId = e.target.id5.value;
                                            const sixDispatchId = e.target.id6.value;
                                            const sevenDispatchId = e.target.id7.value;
                                            const eightDispatchId = e.target.id8.value;
                                            const nineDispatchId = e.target.id9.value;
                                            const tenDispatchId = e.target.id10.value;
                                            const elevenDispatchId = e.target.id11.value;
                                            const twelveDispatchId = e.target.id12.value;
                                            const thirteenDispatchId = e.target.id13.value;
                                            const fourteenDispatchId = e.target.id14.value;
                                            const fifteenDispatchId = e.target.id15.value;
                                            const sixteenDispatchId = e.target.id16.value;
                                            const seventeenDispatchId = e.target.id17.value;
                                            const eighteenDispatchId = e.target.id18.value;
                                            const nineteenDispatchId = e.target.id19.value;
                                            const twentyDispatchId = e.target.id20.value;
                                            let date = moment().format("D/MM/YY")
                                            let time = moment().format("hh:mm A")
                                            let DispatchId = Math.round(Math.random() * 99999999).toString()
                                            let TrackingMessage = `Received to ${DispatchHubName} hub.`

                                            // All not empty id push on DispatchParcelAllId array
                                            // ============================================================= 
                                            let DispatchParcelAllId = []
                                            for (let i = 1; i <= 20; i++) {
                                                let id = e.target[`id${i}`]?.value.trim();
                                                if (id) {
                                                    DispatchParcelAllId.push(id);
                                                }
                                            }
                                            // Dispatch data post 
                                            // =======================================================================
                                            let DispatchDataPost = { DispatchId, TrackingMessage, date, time, DispatchType: "Received", DispatchHubName, DispatchParcelAllId }
                                            // console.log(DispatchDataPost)

                                            // Tracking message post of dispatch 
                                            // =============================================================
                                            let TrackingMessagePost = []

                                            let TrackingMessages = [
                                                { userOrderIdTracking: oneDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: twoDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: threeDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fourDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fiveDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: sixDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: sevenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: eightDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: nineDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: tenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: elevenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: twelveDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: thirteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fourteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: fifteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: sixteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: seventeenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: eighteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: nineteenDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time },
                                                { userOrderIdTracking: twentyDispatchId, TrackingMessage, TrackingDate: date, TrackingTime: time }
                                            ]
                                            // All not empty data push  on TrackingMessagePost array
                                            // ====================================================== 
                                            for (let Msg of TrackingMessages) {
                                                if (Msg?.userOrderIdTracking !== "") {
                                                    TrackingMessagePost.push(Msg)
                                                }
                                            }
                                            // console.log(TrackingMessagePost)


                                            // Dispatch Send Data Post 
                                            // ===========================================
                                            fetch("http://localhost:5000/DispatchAllRequestWithTrackingMessage/AdminDispatchRequestSend", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify(DispatchDataPost)
                                            })
                                                .then(res => res.json())
                                                .then(data => {
                                                    if (data.insertedId) {
                                                        // Dispatch Tracking Data Post 
                                                        // ===========================================
                                                        fetch("http://localhost:5000/DispatchAllRequestWithTrackingMessage/AdminTrackingRequestSentOfDispatch", {
                                                            method: "POST",
                                                            headers: {
                                                                "Content-Type": "application/json"
                                                            },
                                                            body: JSON.stringify(TrackingMessagePost)
                                                        })
                                                            .then(res => res.json())
                                                            .then(data => {
                                                                // console.log(data)
                                                                e.target.reset()
                                                                if (data.insertedCount > 0) {
                                                                    Swal.fire({
                                                                        position: 'top-end',
                                                                        icon: 'success',
                                                                        title: 'Dispatch Request Success',
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                    })
                                                                }
                                                            })
                                                    }
                                                })

                                        }} className="grid grid-cols-7 gap-6">
                                            {/* Left side - 20 inputs in grid 4 columns (span 4)*/}
                                            <div className="col-span-4 grid grid-cols-4 gap-4">
                                                <input name="id1" type="number" text-black placeholder="Id 1" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id2" type="number" text-black placeholder="Id 2" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id3" type="number" text-black placeholder="Id 3" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id4" type="number" text-black placeholder="Id 4" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id5" type="number" text-black placeholder="Id 5" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id6" type="number" text-black placeholder="Id 6" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id7" type="number" text-black placeholder="Id 7" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id8" type="number" text-black placeholder="Id 8" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id9" type="number" text-black placeholder="Id 9" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id10" type="number" text-black placeholder="Id 10" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id11" type="number" text-black placeholder="Id 11" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id12" type="number" text-black placeholder="Id 12" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id13" type="number" text-black placeholder="Id 13" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id14" type="number" text-black placeholder="Id 14" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id15" type="number" text-black placeholder="Id 15" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id16" type="number" text-black placeholder="Id 16" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id17" type="number" text-black placeholder="Id 17" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id18" type="number" text-black placeholder="Id 18" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id19" type="number" text-black placeholder="Id 19" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                <input name="id20" type="number" text-black placeholder="Id 20" className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />

                                            </div>

                                            {/* Right side - select picker, submit button*/}
                                            <div className="col-span-3 space-y-4">
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
                                            </div>

                                        </form>
                                    </div>
                                </div>


                                {/* Show (Received) all Dispatch Data */}
                                {/* ==================================== */}
                                <div className="w-full bg-white shadow-lg border border-gray-200 mt-[40px] rounded-xl p-6">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Received Dispatch Data</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Type</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Parcel Id</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Dispatch Hub Name</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Tracking Message</th>
                                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {DispatchReceivedData?.map((ReceivedData) =>
                                                    <tr key={ReceivedData?._id}>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.date},{ReceivedData?.time}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.DispatchType} <br /> Dispatch Id: {ReceivedData?.DispatchId} </td>

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
                                                                        {ReceivedData?.DispatchParcelAllId.map((id, index) => (
                                                                            <li key={index} className="">
                                                                                <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100 transition">
                                                                                    <span className="text-sm text-gray-700">{id}</span>

                                                                                    <button onClick={() => {
                                                                                        navigate(`/dashboard/AdminDashboard/AdminSearchStandardParcelId/${id}`)
                                                                                        // console.log(id)
                                                                                    }} className="text-black text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-[400]">View</button>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.DispatchHubName}</td>
                                                        <td className="px-6 py-4 text-sm text-gray-800">{ReceivedData?.TrackingMessage}</td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={async () => {
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
                                                                            let res = await fetch(`http://localhost:5000/DispatchAllRequestWithTrackingMessage/AdminDeleteDispatchData/${ReceivedData?._id}`, {
                                                                                method: "DELETE",
                                                                            })
                                                                            let result = await res.json()

                                                                            if (res.ok) {
                                                                                Swal.fire({
                                                                                    icon: "success",
                                                                                    title: "Deleted!",
                                                                                    text: "The Dispatch deleted success.",
                                                                                    timer: 1500,
                                                                                    showConfirmButton: false,
                                                                                });
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

                                                            }} className="!bg-red-500 !hover:bg-red-600 !text-white text-sm px-4 py-1.5 rounded-md transition"
                                                            > Delete </button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>


                            </div>
                        }

                    </div>

                </div>
            </div>
        </div >
    );
};

export default Dispatch;