import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';
import useRole from "../../../../Hook/useRole";
// import courierLogo from "../assets/courier-king.png";

const RiderDashboard = () => {

    const [tabState, setTabState] = useState(1);
    const [IsLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const [roles] = useRole()
    const ad = roles?.role === "admin"

    // ===========================================================================================================
    // Assign Parcel All Data Find Here !!  (PARCEL) (PICKUP) (RETURN)
    // =======================================================================
    let { refetch, data: RiderAssignDataAll = [] } = useQuery(["AdminAllAssignParcelHere_AllAssignParcelFindToHere"], async () => {
        let res = await fetch(`http://localhost:5000/AdminAllAssignParcelHere/AllAssignParcelFindToHere`)
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




    return (
        <div className="min-h-screen bg-gray-50">
            {/* ================================== */}
            {/* Header Rider Dashboard*/}
            {/* ================================== */}
            <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Courier King" className="h-10 w-10 object-contain" />
                    <h1 className="text-xl font-bold text-gray-800">Courier King Rider Dashboard</h1>
                </div>
                <div className="text-gray-600 font-medium">Welcome back, {roles?.name} {roles?.LastName} 🚴</div>
            </header>
            
            {/* ================================== */}
            {/* Content */}
            {/* ================================== */}
            <main className="p-6">
                {/* ================================== */}
                {/* Rider Information */}
                {/* ================================== */}
                <section className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center gap-6">
                    <img
                        src="https://i.pravatar.cc/100?img=12"
                        alt="Rider Avatar"
                        className="w-20 h-20 rounded-full object-cover shadow"
                    />
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">Rider Name: {roles?.name} {roles?.LastName}</h2>
                        <p className="text-sm text-gray-500">ID: {roles?.userId}</p>
                        <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                            Active
                        </span>
                    </div>
                </section>

                {/* ================================== */}
                {/* Rider assign details information */}
                {/* ================================== */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <div className="text-2xl font-bold text-blue-600">{MyAssignParcel?.length}</div>
                        <div className="text-sm text-gray-500">Pending Parcel</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <div className="text-2xl font-bold text-blue-600">{MyAssignReturnParcel?.length}</div>
                        <div className="text-sm text-gray-500">Return Parcel</div>
                    </div>
                    <div className="bg-white rounded-2xl shadow p-6 text-center">
                        <div className="text-2xl font-bold text-blue-600">{MyAssignPickupRequest?.length}</div>
                        <div className="text-sm text-gray-500">Pickup Request</div>
                    </div>
                </section>

                {/* ============================================================================= */}
                {/* Rider recent get some of parcels information show bellow under the table  */}
                {/* ============================================================================= */}
                {/* <section className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Parcels</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Parcel ID</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Customer</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Status</th>
                                    <th className="px-4 py-2 text-left text-gray-600 font-medium">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { id: "PCL001", customer: "Rahim", status: "Delivered", amount: "৳500" },
                                    { id: "PCL002", customer: "Karim", status: "Pending", amount: "৳750" },
                                    { id: "PCL003", customer: "Selim", status: "Delivered", amount: "৳300" },
                                ].map((parcel) => (
                                    <tr key={parcel.id}>
                                        <td className="px-4 py-2">{parcel.id}</td>
                                        <td className="px-4 py-2">{parcel.customer}</td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${parcel.status === "Delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {parcel.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 font-semibold">{parcel.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section> */}
            </main>
        </div>
    );
};

export default RiderDashboard;
