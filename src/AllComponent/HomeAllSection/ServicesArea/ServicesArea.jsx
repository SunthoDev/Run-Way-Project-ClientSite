import React from 'react';
import "./ServicesArea.css"

const ServicesArea = () => {
    return (
        <div className='ServicesAreaParent px-2 md:px-24 bg-white'>

            <div className="ServicesArea mt-[108px] md:mt-[150px]">
                {/* <h2 className='text-[34px] font-[600] text-black text-center'>Service Area</h2>
                <h3 className='text-[16px] pt-[18px] font-[500] text-[#22afa3] text-center'>VIEW FULL COVERAGE</h3> */}


                <h2 className='text-[34px] mt-[80px] font-[600] text-black text-center'>Calculate Charge</h2>

                {/* <div className="div grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 pt-[22px]">
                    <div className="div">
                        <h4 className="text-[16px] font-[500] pb-[8px] text-black">From</h4>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Dhaka City</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>
                    <div className="div">
                        <h4 className="text-[16px] font-[500] pb-[8px] text-black">Destination</h4>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Dhaka City</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>
                    <div className="div">
                        <h4 className="text-[16px] font-[500] pb-[8px] text-black">Category</h4>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Regular</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>
                    <div className="div">
                        <h4 className="text-[16px] font-[500] pb-[8px] text-black">Service</h4>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>Regular</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>
                    <div className="div">
                        <h4 className="text-[16px] font-[500] pb-[8px] text-black">Weight (KG)</h4>
                        <select className="select select-bordered w-full max-w-xs">
                            <option disabled selected>0.15</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </div>

                </div> */}

                {/* <h3 className='Tk50'>50Tk</h3> */}

                <div className="w-[100%] md:w-[40%] pt-8  mx-auto">

                    <h4 className='text-[16px] font-[400] pb-[10px] text-black '>* ১% ক্যাশ অন ডেলিভারি ও রিস্ক ম্যানেজমেন্ট চার্জ প্রযোজ্য</h4>
                    <h4 className='text-[16px] font-[400] pb-[10px] text-black '>* পার্সেল সাইজের কারণে ডেলিভারি মাশুল পরিবর্তিত হতে পারে</h4>
                    <h4 className='text-[16px] font-[400] pb-[10px] text-black '>* উক্ত চার্জসমূহ ভ্যাট ও ট্যাক্স ব্যাতিত</h4>
                    <h4 className='text-[16px] font-[400] pb-[10px] text-black '>* অনাকাঙ্ক্ষিত কারণবশত ডেলিভারি সময়ের পরিবর্তন হতে পারে</h4>

                </div>

            </div>

        </div>
    );
};

export default ServicesArea;