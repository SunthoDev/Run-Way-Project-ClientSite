import React, { useState, useEffect } from 'react';
import "./UserProfile.css";
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useRole from '../../../../Hook/useRole';

const UserProfile = () => {
    const ProfileDataLoad = useLoaderData();
    const [roles, refetch] = useRole();

    // 📦 De-structure ing of user data !!
    const {
        _id, status, name, LastName, BusinessName, Address, RoutePasswordDetails,
        Phone, email, photo, userId, role, Districts, PoliceStations, date
    } = roles || {};

    // Router password verify bellow !!
    // ===============================================
    const [isVerified, setIsVerified] = useState(false);

    // roles?.RoutePasswordDetails?.ProfilePass
    // 🔑 পাসওয়ার্ড ইনপুট স্টেট
    const [passwordInput, setPasswordInput] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // 🎛️ ১১টি রুট পারমিশনের স্টেট ম্যানেজমেন্ট
    const [permissions, setPermissions] = useState({
        ProfilePass: "no",
        AddBankDetailsPass: "no",
        AllConsignmentPass: "no",
        MyPickupParcelPass: "no",
        AmountChangePass: "no",
        CancelledParcelPass: "no",
        PaymentListPass: "no",
        ApiPass: "no",
        BalanceRequestPass: "no",
        ParcelStatementPass: "no",
        AddParcelPass: "no"
    });

    const [loading, setLoading] = useState(false);

    // ডেটাবেজ থেকে বর্তমান পারমিশনের স্ট্যাটাস স্টেটে সিঙ্ক করা
    useEffect(() => {
        if (RoutePasswordDetails) {
            setPermissions({
                ProfilePass: RoutePasswordDetails.ProfilePass || "no",
                AddBankDetailsPass: RoutePasswordDetails.AddBankDetailsPass || "no",
                AllConsignmentPass: RoutePasswordDetails.AllConsignmentPass || "no",
                MyPickupParcelPass: RoutePasswordDetails.MyPickupParcelPass || "no",
                AmountChangePass: RoutePasswordDetails.AmountChangePass || "no",
                CancelledParcelPass: RoutePasswordDetails.CancelledParcelPass || "no",
                PaymentListPass: RoutePasswordDetails.PaymentListPass || "no",
                ApiPass: RoutePasswordDetails.ApiPass || "no",
                BalanceRequestPass: RoutePasswordDetails.BalanceRequestPass || "no",
                ParcelStatementPass: RoutePasswordDetails.ParcelStatementPass || "no",
                AddParcelPass: RoutePasswordDetails.AddParcelPass || "no"
            });
        }
    }, [roles]);

    // ইনপুট চেঞ্জ হ্যান্ডলার
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordInput(prev => ({ ...prev, [name]: value }));
    };

    // পারমিশন Yes/No টগল হ্যান্ডলার
    const handlePermissionChange = (key, value) => {
        setPermissions(prev => ({ ...prev, [key]: value }));
    };


    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-6">
            {
                RoutePasswordDetails?.ProfilePass === "yes" && !isVerified ? (
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
                    ) : (
                        // ==========================================
                        /* 👤 মেইন প্রফেশনাল প্রোফাইল ড্যাশবোর্ড */
                        // ==========================================
                        <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">

                            {/* 🔹 টপ ব্যানার ও প্রোফাইল কার্ড */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                                    {/* ইউজার অবতার / ইমেজ */}
                                    <div className="relative w-24 h-24 bg-black/5 border border-black/5 rounded-2xl overflow-hidden shadow-2xs shrink-0 flex items-center justify-center">
                                        {photo ? (
                                            <img src={photo} alt={name} className="w-full h-full object-cover" />
                                        ) : (
                                            <i className="fa fa-user text-black/30 text-4xl" aria-hidden="true"></i>
                                        )}
                                    </div>

                                    {/* নাম এবং আইডি ইনফো */}
                                    <div className="space-y-1">
                                        <div className="flex items-center flex-wrap justify-center md:justify-start gap-2">
                                            <h1 className="text-xl font-black text-black">
                                                {name} {LastName}
                                            </h1>
                                            <span className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                                                {role || 'User'}
                                            </span>
                                        </div>
                                        <p className="text-xs font-bold text-black/40">ID: {userId || _id}</p>
                                        <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-center md:justify-start">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                                            Verified Account
                                        </p>
                                    </div>
                                </div>

                                {/* মেম্বারশিপ ডেট */}
                                <div className="text-center md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-black/5 w-full md:w-auto shrink-0">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Joined Since</p>
                                    <p className="text-sm font-black text-black mt-0.5">
                                        {date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* 🔹 ইনফরমেশন গ্রিড সেকশন */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* 🏢 বিজনেস ও একাউন্ট ডিটেইলস */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs space-y-4">
                                    <div className="flex items-center gap-2 border-b border-black/5 pb-2.5">
                                        <i className="fa fa-briefcase text-black/50 text-sm" aria-hidden="true"></i>
                                        <h3 className="text-xs font-black uppercase tracking-wider text-black">Business Info</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-[10px] font-black text-black/40 uppercase">Business / Company Name</p>
                                            <p className="text-xs font-bold text-black mt-0.5">{BusinessName || 'Not Provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-black/40 uppercase">Email Address</p>
                                            <p className="text-xs font-bold text-black mt-0.5">{email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-black/40 uppercase">Phone Number</p>
                                            <p className="text-xs font-bold text-black mt-0.5">{Phone || 'Not Provided'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 📍 ঠিকানা ও লোকেশন ডিটেইলস */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs space-y-4">
                                    <div className="flex items-center gap-2 border-b border-black/5 pb-2.5">
                                        <i className="fa fa-map-marker text-black/50 text-sm" aria-hidden="true"></i>
                                        <h3 className="text-xs font-black uppercase tracking-wider text-black">Location Details</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-[10px] font-black text-black/40 uppercase">District</p>
                                                <p className="text-xs font-bold text-black mt-0.5">{Districts || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-black/40 uppercase">Thana / Police Station</p>
                                                <p className="text-xs font-bold text-black mt-0.5">{PoliceStations || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-black/40 uppercase">Full Address</p>
                                            <p className="text-xs font-bold text-black mt-0.5 leading-relaxed">{Address || 'Not Provided'}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            {/* ================================================== */}
                            {/* Merchant router password set and update !! */}
                            {/* ================================================== */}
                            <div className="">
                                {/* ========================================== */}
                                {/* 🔐 SECTION 1: PASSWORD SET / UPDATE */}
                                {/* ========================================== */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs max-w-2xl">

                                    {/* Title password set or not !!  */}
                                    <div className="flex items-center justify-between border-b border-black/5 pb-3 mb-4">
                                        <div className="flex items-center gap-2">
                                            <i className="fa fa-key text-black/50 text-sm" aria-hidden="true"></i>
                                            <h3 className="text-xs font-black uppercase tracking-wider text-black">
                                                {RoutePasswordDetails?.RoutePass ? "Update Route Password" : "Setup Route Password"}
                                            </h3>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm ${RoutePasswordDetails?.RoutePass ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                            {RoutePasswordDetails?.RoutePass ? 'Active' : 'Not Set'}
                                        </span>
                                    </div>

                                    {/* Password set input bellow !! */}
                                    <form onSubmit={async (e) => {

                                        e.preventDefault();
                                        const hasExistingPass = RoutePasswordDetails?.RoutePass;

                                        // ওল্ড পাসওয়ার্ড ভেরিফিকেশন (যদি আগে থেকে সেট থাকে)
                                        if (hasExistingPass && passwordInput.oldPassword !== RoutePasswordDetails.RoutePass) {
                                            return Swal.fire({
                                                icon: 'error',
                                                title: 'Wrong Password',
                                                text: 'Previous route password does not match!',
                                                confirmButtonColor: '#000000'
                                            });
                                        }

                                        // নতুন পাসওয়ার্ড ম্যাচিং চেক
                                        if (passwordInput.newPassword !== passwordInput.confirmPassword) {
                                            return Swal.fire({
                                                icon: 'error',
                                                title: 'Mismatch',
                                                text: 'New password and Confirm password do not match!',
                                                confirmButtonColor: '#000000'
                                            });
                                        }

                                        setLoading(true);
                                        let updatedRoutePasswordDetails = {};

                                        if (hasExistingPass) {
                                            // পাসওয়ার্ড আপডেট হলে আগের পারমিশন ঠিক রেখে শুধু পাসওয়ার্ড চেঞ্জ হবে
                                            updatedRoutePasswordDetails = {
                                                ...RoutePasswordDetails,
                                                RoutePass: passwordInput.newPassword
                                            };
                                        } else {
                                            // 🆕 একদম প্রথমবার পাসওয়ার্ড সেট করলে পাসওয়ার্ড সহ সব পারমিশন ডিফল্ট "no" হবে
                                            updatedRoutePasswordDetails = {
                                                RoutePass: passwordInput.newPassword,
                                                ProfilePass: "no",
                                                AddBankDetailsPass: "no",
                                                AllConsignmentPass: "no",
                                                MyPickupParcelPass: "no",
                                                AmountChangePass: "no",
                                                CancelledParcelPass: "no",
                                                PaymentListPass: "no",
                                                ApiPass: "no",
                                                BalanceRequestPass: "no",
                                                ParcelStatementPass: "no",
                                                AddParcelPass: "no"
                                            };
                                        }

                                        try {
                                            // 🚀 Fetch API ব্যবহার করে PUT রিকোয়েস্ট পাঠানো হচ্ছে
                                            const response = await fetch(`https://server.trustereocourier.com.bd/MerchantProfileAllWorkHere/UserRoutePasswordUpdate/${_id}`, {
                                                method: 'PUT',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                    // আপনার যদি JWT টোকেন থাকে, তবে এখানে 'Authorization': `Bearer ${token}` যোগ করতে পারেন
                                                },
                                                body: JSON.stringify({
                                                    RoutePasswordDetails: updatedRoutePasswordDetails
                                                })
                                            });

                                            // রেসপন্স অবজেক্টকে JSON-এ কনভার্ট করা
                                            const data = await response.json();

                                            // মঙ্গোডিবির modifiedCount অথবা success ফ্ল্যাগ চেক
                                            if (data.modifiedCount > 0 || data.success) {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Success!',
                                                    text: hasExistingPass ? 'Route password updated successfully.' : 'Password created with default secure settings.',
                                                    confirmButtonColor: '#000000'
                                                });

                                                // ইনপুট ফিল্ড রিসেট এবং স্টেট রিফেচ
                                                setPasswordInput({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                                if (refetch) refetch();
                                            }
                                        } catch (error) {
                                            console.error(error);
                                            Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong.', confirmButtonColor: '#000000' });
                                        } finally {
                                            setLoading(false);
                                        }

                                    }} className="space-y-4">

                                        {/* If password has update password !! */}
                                        {RoutePasswordDetails?.RoutePass && (
                                            <div>
                                                <label className="text-[10px] font-black text-black/50 uppercase tracking-wide">Previous Password</label>
                                                <input
                                                    type="password" name="oldPassword" value={passwordInput.oldPassword} onChange={handleInputChange} required
                                                    placeholder="Enter current route password"
                                                    className="w-full mt-1 px-3 py-2 bg-black/[0.02] border border-black/10 rounded-xl text-xs font-bold text-black focus:outline-hidden focus:border-black transition-all"
                                                />
                                            </div>
                                        )}

                                        {/* If not set password add password !! */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-black text-black/50 uppercase tracking-wide">
                                                    {RoutePasswordDetails?.RoutePass ? 'New Password' : 'Create Password'}
                                                </label>
                                                <input
                                                    type="password" name="newPassword" value={passwordInput.newPassword} onChange={handleInputChange} required
                                                    placeholder="Enter password"
                                                    className="w-full mt-1 px-3 py-2 bg-black/[0.02] border border-black/10 rounded-xl text-xs font-bold text-black focus:outline-hidden focus:border-black transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-black/50 uppercase tracking-wide">Confirm Password</label>
                                                <input
                                                    type="password" name="confirmPassword" value={passwordInput.confirmPassword} onChange={handleInputChange} required
                                                    placeholder="Confirm password"
                                                    className="w-full mt-1 px-3 py-2 bg-black/[0.02] border border-black/10 rounded-xl text-xs font-bold text-black focus:outline-hidden focus:border-black transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit  button !! */}
                                        <div className="flex justify-end pt-2">
                                            <button
                                                type="submit" disabled={loading}
                                                className="bg-black text-white px-5 py-2 rounded-xl text-xs font-black tracking-wide hover:bg-black/90 active:scale-95 transition-all shadow-xs cursor-pointer disabled:bg-gray-400"
                                            >
                                                {loading ? 'Processing...' : RoutePasswordDetails?.RoutePass ? 'Update Password' : 'Set Password'}
                                            </button>
                                        </div>
                                    </form>
                                </div>


                                {/* ===================================================== */}
                                {/* 🛡️ SECTION 2: DYNAMIC ROUTE PERMISSIONS PANEL */}
                                {/* ===================================================== */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs">
                                    <div className="flex items-center gap-2 border-b border-black/5 pb-3 mb-5">
                                        <i className="fa fa-sliders text-black/50 text-sm" aria-hidden="true"></i>
                                        <h3 className="text-xs font-black uppercase tracking-wider text-black">Route Access Configuration</h3>
                                    </div>

                                    {!RoutePasswordDetails?.RoutePass ? (
                                        /* 🔒 পাসওয়ার্ড সেট না থাকলে এই নোটিশ লক অবস্থায় থাকবে */
                                        <div className="flex flex-col items-center justify-center py-8 text-center bg-amber-50/50 border border-amber-100 rounded-xl p-6">
                                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-2">
                                                <i className="fa fa-lock text-base" aria-hidden="true"></i>
                                            </div>
                                            <h4 className="text-xs font-black text-amber-900 uppercase">Permissions Locked</h4>
                                            <p className="text-[11px] font-bold text-amber-800/70 mt-1 max-w-xs">
                                                Please set up your Route Password first from the panel above to configure individual route guards.
                                            </p>
                                        </div>
                                    ) : (
                                        /* 🎛️ পাসওয়ার্ড অ্যাক্টিভ থাকলে পুরো পারমিশন ড্যাশবোর্ড দেখা যাবে */
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    { key: "ProfilePass", label: "Profile Update Security" },
                                                    { key: "AddBankDetailsPass", label: "Add Bank Details Verification" },
                                                    { key: "AllConsignmentPass", label: "All Consignment View Security" },
                                                    { key: "MyPickupParcelPass", label: "My Pickup Parcel Action" },
                                                    { key: "AmountChangePass", label: "Cod Amount Change Security" },
                                                    { key: "CancelledParcelPass", label: "Cancel Parcel Authorization" },
                                                    { key: "PaymentListPass", label: "Payment List Access" },
                                                    { key: "ApiPass", label: "Developer API Config Protection" },
                                                    { key: "BalanceRequestPass", label: "Balance Withdrawal Request" },
                                                    { key: "ParcelStatementPass", label: "Parcel Statement Download" },
                                                    { key: "AddParcelPass", label: "New Parcel Creation Guard" },
                                                ].map(({ key, label }) => (
                                                    <div key={key} className="flex items-center justify-between p-3.5 bg-black/[0.01] border border-black/[0.04] rounded-xl">
                                                        <span className="text-xs font-black text-black/70 tracking-wide">{label}</span>

                                                        <div className="flex bg-black/5 p-0.5 rounded-lg select-none">
                                                            <button
                                                                type="button"
                                                                onClick={() => handlePermissionChange(key, "yes")}
                                                                className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${permissions[key] === "yes" ? 'bg-black text-white shadow-xs' : 'text-black/40 hover:text-black'
                                                                    }`}
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handlePermissionChange(key, "no")}
                                                                className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${permissions[key] === "no" ? 'bg-black text-white shadow-xs' : 'text-black/40 hover:text-black'
                                                                    }`}
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex justify-end pt-2 border-t border-black/5">
                                                <button
                                                    type="button"
                                                    onClick={async () => {

                                                        setLoading(true);
                                                        const updatedRoutePasswordDetails = {
                                                            RoutePass: RoutePasswordDetails?.RoutePass, // পাসওয়ার্ড ফিক্সড থাকবে
                                                            ...permissions
                                                        };

                                                        try {
                                                            // 🚀 Axios এর পরিবর্তে নেটিভ fetch ব্যবহার করা হলো
                                                            const response = await fetch(`https://server.trustereocourier.com.bd/MerchantProfileAllWorkHere/UserRoutePasswordUpdate/${_id}`, {
                                                                method: 'PUT',
                                                                headers: {
                                                                    'Content-Type': 'application/json'
                                                                },
                                                                body: JSON.stringify({
                                                                    RoutePasswordDetails: updatedRoutePasswordDetails
                                                                })
                                                            });

                                                            // রেসপন্স ডাটা JSON এ কনভার্ট করা হলো
                                                            const data = await response.json();

                                                            // মঙ্গোডিবির modifiedCount অথবা success রেসপন্স চেক
                                                            if (data.modifiedCount > 0 || data.success) {
                                                                Swal.fire({
                                                                    icon: 'success',
                                                                    title: 'Updated',
                                                                    text: 'Route access permissions configuration updated.',
                                                                    confirmButtonColor: '#000000'
                                                                });
                                                                if (refetch) refetch();
                                                            }
                                                        } catch (error) {
                                                            console.error("Fetch Error:", error);
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'Error',
                                                                text: 'Failed to update permissions.',
                                                                confirmButtonColor: '#000000'
                                                            });
                                                        } finally {
                                                            setLoading(false);
                                                        }

                                                    }}
                                                    disabled={loading}
                                                    className="bg-black text-white px-6 py-2.5 rounded-xl text-xs font-black tracking-wide hover:bg-black/90 active:scale-95 transition-all cursor-pointer disabled:bg-gray-400"
                                                >
                                                    {loading ? 'Saving...' : 'Update Permissions'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>











                        </div>
                    )}
        </div>
    );
};

export default UserProfile;