import React, { useState } from 'react';
import "./ParcelTracking.css"
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const ParcelTracking = () => {

    let navigate = useNavigate()



    return (
        <div id="searchConsignment" className="flex flex-col items-center justify-center py-16 px-4 bg-white">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Track Your Consignment
            </h2>
            <p className="text-gray-500 mb-8 text-center">
                Where is your parcel? Find out with just one click!
            </p>

            {/* Search Box */}
            <form onSubmit={(event) => {
                event.preventDefault()
                let id = event.target.trackingCode.value
                navigate(`/ParcelTrackingDataShow/${id}`)

            }}
                className="flex w-full max-w-xl shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
                <input
                    name="trackingCode"
                    type="number"
                    placeholder="Search Tracking Code here..."
                    className="flex-1 px-3 py-3 focus:outline-none text-black bg-white"
                />
                <button
                    type='submit'
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 flex items-center gap-2 cursor-pointer transition"
                >
                    <i className="fa fa-search"></i> Search
                </button>
            </form>
        </div>
    );
};

export default ParcelTracking;