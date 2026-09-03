import React, { useState } from 'react';
import "./ParcelTracking.css";
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const ParcelTracking = () => {

    let navigate = useNavigate();

    return (
        <div 
            id="searchConsignment" 
            className="relative overflow-hidden flex flex-col items-center justify-center py-20 px-4 bg-[#0a1118] text-white font-sans"
        >
            
            {/* Background Decorative Glowing Elements (Fancy Look) */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00A3FF]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFC107]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Background Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
                
                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 text-center tracking-tight uppercase">
                  Track Your <span className="text-[#00A3FF]">Consignment</span>
                </h2>
                
                <p className="text-gray-300 mb-10 text-center text-sm sm:text-base max-w-md font-light">
                    Where is your parcel? Find out with just one click!
                </p>

                {/* Search Box Form */}
                <form 
                    onSubmit={(event) => {
                        event.preventDefault();
                        let id = event.target.trackingCode.value;
                        navigate(`/ParcelTrackingDataShow/${id}`);
                    }}
                    className="flex w-full max-w-xl bg-[#132238]/80 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/60 shadow-2xl shadow-[#00A3FF]/10 focus-within:border-[#00A3FF] transition-all duration-300 p-1.5"
                >
                    <input
                        name="trackingCode"
                        type="number"
                        required
                        placeholder="Search Tracking Code here..."
                        className="flex-1 px-4 py-3.5 focus:outline-none text-white placeholder-gray-400 bg-transparent text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                        type="submit"
                        className="bg-[#00A3FF] hover:bg-blue-600 active:scale-95 text-white font-bold px-8 py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 uppercase text-xs sm:text-sm tracking-wider shadow-lg shadow-[#00A3FF]/30 whitespace-nowrap"
                    >
                        <i className="fa fa-search"></i> Search
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ParcelTracking;