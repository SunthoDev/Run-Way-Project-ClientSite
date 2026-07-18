import React, { useState, useRef } from 'react';
import "./HubInformation.css"
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';

const HubInformation = () => {

    // All Hub Information Data !!
    // =====================================================
    let { refetch, data: AllHubInformationData = [] } = useQuery(["HubInformationAll_AllHubInformationData"], async () => {
        let res = await fetch("http://localhost:5000/HubInformationAll/AllHubInformationData")
        return res.json()
    })

    return (
        <div className="HubCreateAdminParent bg-[#F6F6F6]">

            {/* ================================================== */}
            {/* Hub Information Data Save To Database !! */}
            {/* ================================================== */}
            <div className="w-full max-w-4xl bg-white border border-gray-200 shadow-md rounded-xl p-6 mx-auto my-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Add New Hub Information
                </h2>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const hubName = e.target.hubName.value;
                        const number = e.target.number.value;
                        const address = e.target.address.value;
                        const details = e.target.details.value;

                        const HubInformation = { hubName, number, address, details, date: moment().format("MM/DD/YYYY"), time: moment().format("hh:mm A") };
                        // console.log(newHub);

                        // Hub information request data insert 
                        // =================================
                        try {
                            let res = await fetch("http://localhost:5000/HubInformationAll/PostHubInformation", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(HubInformation)
                            })
                            let result = await res.json()

                            if (res.ok) {
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "🎉 Hub Information add successfully!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                refetch()
                                e.target.reset();
                            }

                        } catch (error) {
                            console.error("An error occurred:", error.message);
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: error.message || 'Something went wrong!'
                            });
                        } finally {
                            console.log("This will always run (finally block).");
                        }
                    }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Hub Name */}
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hub Name</label>
                        <input
                            required
                            type="text"
                            name="hubName"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter hub name"
                        />
                    </div>

                    {/* Number */}
                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            required
                            type="tel"
                            name="number"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* Address */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            required
                            type="text"
                            name="address"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter address"
                        />
                    </div>

                    {/* Details */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                        <textarea
                            required
                            name="details"
                            rows="4"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Write more information about the hub..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-1 md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition duration-150"
                        >
                            ➕ Save Hub Information
                        </button>
                    </div>
                </form>
            </div>

            {/* ================================================== */}
            {/* See ALl hub information data bellow !! */}
            {/* ================================================== */}
            <div className="bg-[#F6F6F6] px-[12px] md:px-4 my-4 flex justify-center">
                <div className="w-full bg-white shadow-lg border border-gray-200 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Hub List</h2>

                    <div className="px-4 py-8">
                        <div className="max-w-7xl mx-auto">
                            {/* Responsive Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {AllHubInformationData?.slice().reverse().map((HubInformation, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-gray-100 rounded-xl shadow-md p-6 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                                    >
                                        {/* Title */}
                                        <div className="mb-3">
                                            <div className="inline-block bg-emerald-500 text-white font-semibold text-sm px-4 py-2 rounded-full shadow">
                                                {HubInformation?.hubName}
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                            {HubInformation?.address}
                                        </p>

                                        {/* Phone */}
                                        <p className="text-gray-800 font-medium mb-2">{HubInformation?.number}</p>

                                        {/* Details */}
                                        <p className="text-gray-500 text-sm italic mb-2">
                                            {HubInformation?.details || "No extra details available"}
                                        </p>

                                        {/* Date + Delete Button */}
                                        <div className="flex items-center justify-between text-xs text-gray-400">
                                            <p>📅 {HubInformation?.date || "No date given"}</p>
                                            <button
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: "Are you sure?",
                                                        text: "You won't be able to revert this!",
                                                        icon: "warning",
                                                        showCancelButton: true,
                                                        confirmButtonColor: "#3085d6",
                                                        cancelButtonColor: "#d33",
                                                        confirmButtonText: "Yes, delete it!"
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {

                                                            fetch(`http://localhost:5000/HubInformationAll/DeleteHubInformation/${HubInformation?._id}`, {
                                                                method: "DELETE",
                                                            })
                                                                .then(res => res.json())
                                                                .then(data => {
                                                                    if (data.deletedCount > 0) {
                                                                        Swal.fire({
                                                                            position: "top-end",
                                                                            icon: "success",
                                                                            title: "Admin Delete hub name has been Success",
                                                                            showConfirmButton: false,
                                                                            timer: 1500
                                                                        })
                                                                    }
                                                                    console.log(data)
                                                                    refetch()
                                                                })
                                                        }
                                                    })
                                                }}
                                                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default HubInformation;