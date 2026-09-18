import React, { useState } from 'react';
import "./ParcelTracking.css";
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const ParcelTracking = () => {

    let navigate = useNavigate();

    return (
        <div
            id="searchConsignment"
            className="relative overflow-hidden flex flex-col items-center justify-center py-24 px-4 bg-gradient-to-b from-[#1c0830] via-[#2a0b49] to-[#120420] text-white font-sans"
        >
            {/* Background Glowing Orbs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7136B0]/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 text-center tracking-tight uppercase">
                    Track Your <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent drop-shadow-md">Consignment</span>
                </h2>

                <p className="text-purple-200/80 mb-10 text-center text-sm sm:text-base max-w-md font-light">
                    Where is your parcel? Find out with just one click!
                </p>

                {/* Search Box Form */}
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        let id = event.target.trackingCode.value;
                        navigate(`/ParcelTrackingDataShow/${id}`);
                    }}
                    className="flex w-full max-w-xl bg-[#2a0c47]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-[#7136B0]/50 shadow-2xl shadow-[#7136B0]/20 focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/40 transition-all duration-300 p-2"
                >
                    <input
                        name="trackingCode"
                        type="number"
                        required
                        placeholder="Search Tracking Code here..."
                        className="flex-1 px-5 py-3.5 focus:outline-none text-white placeholder-purple-300/50 bg-transparent text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#7136B0] via-[#8B31B0] to-[#7136B0] hover:from-[#D4AF37] hover:to-[#FFD700] hover:text-black text-white font-extrabold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 uppercase text-xs sm:text-sm tracking-wider shadow-lg shadow-[#7136B0]/40 hover:shadow-[#D4AF37]/40 active:scale-95 whitespace-nowrap"
                    >
                        <i className="fa fa-search"></i> Search
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ParcelTracking;