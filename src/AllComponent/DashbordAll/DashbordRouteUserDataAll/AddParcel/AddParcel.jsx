import React, { useState } from 'react';
import "./AddParcel.css"
import { Link } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';

const AddParcel = () => {

    const [roles] = useRole()
    const {
        _id, status, name, LastName, BusinessName, Address, RoutePasswordDetails,
        Phone, email, photo, userId, role, Districts, PoliceStations, date
    } = roles || {};

    // Router password verify bellow !!
    // ===============================================
    const [isVerified, setIsVerified] = useState(false);


    return (
        <div className='bg-[#F6F6F6]'>

            {
                RoutePasswordDetails?.AddParcelPass === "yes" && !isVerified ? (
                    /* 🛡️ পাসওয়ার্ড ভেরিফিকেশন বক্স */
                    <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-xs my-10 max-w-md mx-auto">
                        <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <i className="fa fa-lock text-xl" aria-hidden="true"></i>
                        </div>
                        <h2 className="text-lg font-black text-black uppercase tracking-wide">
                            Route Security Active
                        </h2>
                        <p className="text-xs text-black/50 font-bold mt-1 max-w-xs leading-relaxed">
                            This area is password protected. Enter your Route Password to access your profile data.
                        </p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                let RoutePass = e.target.RoutePass.value;
                                if (RoutePass === RoutePasswordDetails?.RoutePass) {
                                    setIsVerified(true); // পাসওয়ার্ড মিললে কনটেন্ট আনলক হবে
                                    Swal.fire({
                                        toast: true,
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Access Granted',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                } else {
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Wrong Password',
                                        text: 'The route password you entered is incorrect!',
                                        confirmButtonColor: '#000000'
                                    });
                                }
                            }}
                            className="w-full mt-6 space-y-4"
                        >
                            <input
                                type="password"
                                name="RoutePass"
                                required
                                placeholder="Enter Route Password"
                                className="w-full px-3 py-2.5 bg-black/[0.02] border border-black/10 rounded-xl text-xs font-bold text-black text-center focus:outline-none focus:border-black transition-all tracking-widest"
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-black/90 active:scale-98 transition-all cursor-pointer shadow-xs"
                            >
                                Unlock Profile
                            </button>
                        </form>
                    </div>
                ) :
                    status === "pending" ? (
                        /* ⏳ পেন্ডিং ভেরিফিকেশন নোটিশ (সুপার ক্লিন ও মডার্ন লুক) */
                        <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-100 p-12 rounded-2xl shadow-2xs my-10 max-w-xl mx-auto">
                            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-4 animate-pulse">
                                <i className="fa fa-clock-o text-3xl" aria-hidden="true"></i>
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-wide">
                                Account Verification Pending
                            </h2>
                            <p className="text-xs md:text-sm text-black/50 font-bold mt-2 max-w-sm leading-relaxed">
                                Please wait while our admin team reviews and approves your profile. You'll get full access once verified.
                            </p>
                        </div>
                    ) :
                        <div className='AddParcelParent px-[12px] md:px-4 my-4'>
                            <h2 className='text-black text-center text-[18px] pb-[18px] font-[600]'>Choose Service Type</h2>
                            <div className="AddParcel bg-white p-[28px] rounded-[8px]  grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Link to="/dashboard/StandardDelivery" className="ParcelOne bg-[#4E599A] relative rounded-[8px] py-[37px]">
                                    <div className='hours bg-[#5A6AC5] absolute'><h3 className='text-white text-[12px]'>24h</h3></div>
                                    <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>Standard</h4>
                                    <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
                                </Link>
                                <Link to="/dashboard/ExpressDelivery" className="ParcelOne bg-[#25A7B7] relative rounded-[8px] py-[37px]">
                                    <div className='hours absolute bg-[#09BFD6]'><h3 className='text-white text-[12px]'>8h</h3></div>
                                    <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>Express</h4>
                                    <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
                                </Link>
                                <Link to="/dashboard/ExpressDelivery" className="ParcelOne bg-[#9ad7ae] relative rounded-[8px] py-[37px]">
                                    <div className='hours absolute bg-[#B8D6C2]'><h3 className='text-white text-[12px]'>8h</h3></div>
                                    <h4 className='text-[white] text-center font-[500] text-[14px] pt-[0px]'>PickNDrop</h4>
                                    <h4 className='text-[white] text-center text-[12px]'>Delivery</h4>
                                </Link>

                            </div>

                        </div>
            }
        </div>
    );
};

export default AddParcel;