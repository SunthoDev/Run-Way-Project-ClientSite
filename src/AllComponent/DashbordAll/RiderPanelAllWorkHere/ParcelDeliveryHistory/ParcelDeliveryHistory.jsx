import { useState } from 'react';
import "./ParcelDeliveryHistory.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';

const ParcelDeliveryHistory = () => {

    const [roles] = useRole()
    const ad = roles?.role === "admin"

    // ===========================================================================================================
    // Rider Parcel Delivery History !!
    // =======================================================================
    let { refetch, data: RiderParcelDeliveryHistoryAll = [] } = useQuery(["AdminAllAssignParcelHere_ParcelDeliveryHistoryAllDataFind"], async () => {
        let res = await fetch(`https://server.trustereocourier.com.bd/AdminAllAssignParcelHere/ParcelDeliveryHistoryAllDataFind`)
        return res.json()

    })
    // console.log(RiderParcelDeliveryHistoryAll)

    // My Delivery history All Filter Here !!
    // =======================================================================
    let MyDeliveryHistory = RiderParcelDeliveryHistoryAll?.filter(History => History?.RiderID === roles?.userId)
    // console.log(MyDeliveryHistory)





    return (
        <div className='MyParcelRiderPArent bg-[#F6F6F6]'>
            <div className='md:px-4 my-4'>

                {/* ==================================================================== */}
                {/* Rider Delivery Parcel COD History */}
                {/* ==================================================================== */}
                <div className="bg-white p-6 rounded-xl shadow-md  mt-10">

                    <div className="flex justify-center">
                        <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">

                            <div className="pb-4">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Parcel History : {MyDeliveryHistory?.length}</h2>
                            </div>

                            <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-blue-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Parcel Id</th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Parcel Hub</th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Parcel COD</th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Parcel Weight</th>
                                            <th className="px-6 py-3 text-left font-semibold text-gray-700">Delivery Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {
                                            MyDeliveryHistory?.slice().reverse().map(HistoryOfParcel => (
                                                <tr key={HistoryOfParcel?._id} className="hover:bg-indigo-50 transition-all duration-200 ease-in-out">
                                                    <td className="px-6 py-4 text-gray-700 font-semibold">{HistoryOfParcel?.RiderFirstName} {HistoryOfParcel?.RiderLastName}</td>
                                                    <td className="px-6 py-4 text-gray-700">{HistoryOfParcel?.ParcelId}</td>
                                                    <td className="px-6 py-4 text-gray-700">{HistoryOfParcel?.ParcelMyHub}</td>
                                                    <td className="px-6 py-4 text-green-600 font-semibold">{HistoryOfParcel?.ParcelCod} TK</td>
                                                    <td className="px-6 py-4 text-gray-700">{HistoryOfParcel?.ParcelWeight} kg</td>
                                                    <td className="px-6 py-4 text-gray-500">{HistoryOfParcel?.date}, {HistoryOfParcel?.time}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default ParcelDeliveryHistory;