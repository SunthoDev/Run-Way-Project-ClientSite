import React, { useContext, useState } from 'react';
import "./API.css"
import { AuthContext } from '../../../AuthoncationAll/AuthProvider/AuthProvider';
import useRole from '../../../../Hook/useRole';
import Swal from 'sweetalert2';

const API = () => {

    let { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [roles, refetch] = useRole()
    const {
        _id, status, name, LastName, BusinessName, Address, RoutePasswordDetails,
        Phone, email, photo, userId, role, Districts, PoliceStations, date
    } = roles || {};

    // Check user key already add or not !!
    // ===============================================
    const hasApiKeys = roles?.Api?.ApiKey && roles?.Api?.SecretKey;

    // Router password verify bellow !!
    // ===============================================
    const [isVerified, setIsVerified] = useState(false);

    // Secret key and Api key copy function !!
    // ===============================================
    const [copiedKey, setCopiedKey] = useState(false);
    const [copiedSecret, setCopiedSecret] = useState(false);

    // 📋 Copy function !!
    // ===================
    const handleCopy = async (text, type) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);

            // 🎯 একদম ছোট করে সাকসেস সোয়াল (Toast)
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: type === 'key' ? 'API Key Copied!' : 'Secret Key Copied!',
                showConfirmButton: false,
                timer: 1500
            });

            if (type === 'key') {
                setCopiedKey(true);
                setTimeout(() => setCopiedKey(false), 2000);
            } else {
                setCopiedSecret(true);
                setTimeout(() => setCopiedSecret(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="APIParent min-h-screen bg-[#F6F6F6] flex items-center justify-center px-4 py-14">
            {
                RoutePasswordDetails?.ApiPass === "yes" && !isVerified ? (
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
                        <div className="w-full space-y-10"> {/* মেইন কন্টেইনার */}

                            {/* =================================== */}
                            {/* 🛡️ API Make Credentials Section */}
                            {/* =================================== */}
                            <div className="w-full max-w-3xl mx-auto">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Your API Credentials</h2>

                                <div className="bg-white rounded-xl shadow-md p-6 md:p-10 transition-all">
                                    {!hasApiKeys ? (
                                        /* ➕ যদি আগে থেকে কি তৈরি করা না থাকে */
                                        <div className="flex flex-col items-center justify-center text-center py-6">
                                            <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
                                                <i className="fa fa-key text-2xl" aria-hidden="true"></i>
                                            </div>
                                            <h4 className="text-base font-semibold text-gray-700 mb-2">No API Keys Generated Yet</h4>
                                            <p className="text-xs text-gray-400 max-w-sm mb-6">
                                                Generate your unique API and Secret keys to integrate our parcel delivery system directly into your website.
                                            </p>
                                            <button
                                                onClick={async () => {

                                                    setLoading(true);
                                                    try {
                                                        // আপনার মার্চেন্ট বা ইউজারের আইডি roles._id থেকে আসবে
                                                        const response = await fetch(`http://localhost:5000/api/create_key/${roles?._id}`, {
                                                            method: 'PUT', // যেহেতু প্রতিবার আপডেট বা ক্রিয়েট হচ্ছে, PUT/PATCH বেস্ট
                                                            headers: {
                                                                'Content-Type': 'application/json',
                                                            }
                                                        });
                                                        const data = await response.json();

                                                        if (data.success || data.modifiedCount > 0) {
                                                            Swal.fire({
                                                                toast: true,
                                                                position: 'top-end',
                                                                icon: 'success',
                                                                title: roles?.RoutePasswordDetails?.ApiPass ? 'API Keys Regenerated!' : 'API Keys Created!',
                                                                showConfirmButton: false,
                                                                timer: 2000
                                                            });
                                                            if (refetch) refetch(); // ডাটা রিফেশ করে নতুন কি স্ক্রিনে দেখানোর জন্য
                                                        }
                                                    } catch (error) {
                                                        console.error(error);
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Error',
                                                            text: 'Something went wrong! Please try again.',
                                                            confirmButtonColor: '#000000'
                                                        });
                                                    } finally {
                                                        setLoading(false);
                                                    }

                                                }}
                                                disabled={loading}
                                                className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-black/90 active:scale-95 transition-all shadow-xs disabled:bg-gray-400 cursor-pointer"
                                            >
                                                {loading ? 'Generating...' : 'Create Your API Key'}
                                            </button>
                                        </div>
                                    ) : (
                                        /* 🔑 যদি কি অলরেডি থাকে, তবে এই বক্সটি দেখাবে */
                                        <div className="space-y-6">
                                            {/* 🔑 API Key Row */}
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-700 mb-2">API Key</h4>
                                                {/* flex-row এবং items-stretch ব্যবহার করে মোবাইল ডিভাইসেও বাটন এবং ইনপুট হাইট সেম থাকবে */}
                                                <div className="flex items-stretch w-full bg-gray-100 rounded-lg border border-gray-200/50 overflow-hidden">
                                                    <div className="flex-1 p-3 font-mono break-all text-sm text-gray-800 self-center select-all">
                                                        {roles?.Api?.ApiKey || "Not Generated"}
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopy(roles?.Api?.ApiKey, 'key')}
                                                        type="button"
                                                        className="px-4 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-600 border-l border-gray-200 transition-colors flex items-center justify-center cursor-pointer min-w-[50px]"
                                                        title="Copy API Key"
                                                    >
                                                        {copiedKey ? (
                                                            <i className="fa fa-check text-green-600 text-base" aria-hidden="true"></i>
                                                        ) : (
                                                            <i className="fa fa-clone text-sm" aria-hidden="true"></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* 🔒 Secret Key Row */}
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Secret Key</h4>
                                                <div className="flex items-stretch w-full bg-gray-100 rounded-lg border border-gray-200/50 overflow-hidden">
                                                    <div className="flex-1 p-3 font-mono break-all text-sm text-gray-800 self-center select-all">
                                                        {roles?.Api?.SecretKey || "Not Generated"}
                                                    </div>
                                                    <button
                                                        onClick={() => handleCopy(roles?.Api?.SecretKey, 'secret')}
                                                        type="button"
                                                        className="px-4 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-600 border-l border-gray-200 transition-colors flex items-center justify-center cursor-pointer min-w-[50px]"
                                                        title="Copy Secret Key"
                                                    >
                                                        {copiedSecret ? (
                                                            <i className="fa fa-check text-green-600 text-base" aria-hidden="true"></i>
                                                        ) : (
                                                            <i className="fa fa-clone text-sm" aria-hidden="true"></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            {/* 🔄 রিজেনারেট বাটন */}
                                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                                <button
                                                    onClick={async () => {
                                                        setLoading(true);
                                                        try {
                                                            // আপনার মার্চেন্ট বা ইউজারের আইডি roles._id থেকে আসবে
                                                            const response = await fetch(`http://localhost:5000/api/create_key/${roles?._id}`, {
                                                                method: 'PUT', // যেহেতু প্রতিবার আপডেট বা ক্রিয়েট হচ্ছে, PUT/PATCH বেস্ট
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                }
                                                            });
                                                            const data = await response.json();

                                                            if (data.success || data.modifiedCount > 0) {
                                                                Swal.fire({
                                                                    toast: true,
                                                                    position: 'top-end',
                                                                    icon: 'success',
                                                                    title: roles?.RoutePasswordDetails?.ApiPass ? 'API Keys Regenerated!' : 'API Keys Created!',
                                                                    showConfirmButton: false,
                                                                    timer: 2000
                                                                });
                                                                if (refetch) refetch(); // ডাটা রিফেশ করে নতুন কি স্ক্রিনে দেখানোর জন্য
                                                            }
                                                        } catch (error) {
                                                            console.error(error);
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'Error',
                                                                text: 'Something went wrong! Please try again.',
                                                                confirmButtonColor: '#000000'
                                                            });
                                                        } finally {
                                                            setLoading(false);
                                                        }
                                                    }}
                                                    disabled={loading}
                                                    className="flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-700 active:scale-95 transition-all shadow-xs disabled:bg-gray-400 cursor-pointer w-full sm:w-auto justify-center"
                                                >
                                                    <i className={`fa fa-refresh ${loading ? 'animate-spin' : ''}`} aria-hidden="true"></i>
                                                    {loading ? 'Regenerating...' : 'Regenerate Keys'}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* =========================================================== */}
                            {/* 🛡️ API Documentation and Wordpress plugin bellow */}
                            {/* =========================================================== */}
                            <div className="w-full max-w-3xl mx-auto mt-10">
                                {/* হেডার সেকশন: টাইটেল এবং ডকুমেন্টেশন বাটন */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">Other Plugins & Tools</h3>

                                    {/* 📄 View Documentation বাটন */}
                                    <a
                                        href="/docs"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-xs transition-colors active:scale-95 duration-200"
                                    >
                                        <i className="fa fa-book text-xs" aria-hidden="true"></i>
                                        View Documentation
                                    </a>
                                </div>

                                {/* 🎴 প্লাগইন কার্ড গ্রিড (মোবাইলে ১টা, বড় স্ক্রিনে ২টি করে পাশাপাশি বসবে) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                    {/* 🌐 WordPress Card */}
                                    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between max-w-sm w-full mx-auto sm:mx-0">
                                        {/* লোগো কন্টেইনার (হালকা অ্যাশ ব্যাকগ্রাউন্ড) */}
                                        <div className="bg-gray-100/80 p-8 flex items-center justify-center h-32 border-b border-gray-100">
                                            <img
                                                src="https://steadfast.com.bd/assets/images/wp_logo.svg"
                                                alt="WordPress Logo"
                                                className="max-h-12 w-auto object-contain brightness-95"
                                            />
                                        </div>
                                        {/* টেক্সট এবং বাটন কন্টেইনার */}
                                        <div className="p-5 flex flex-col gap-3">
                                            <h4 className="text-lg font-bold text-gray-800">WordPress Plugin</h4>
                                            <div>
                                                <a
                                                    href="/docs"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-xs transition-colors active:scale-95 duration-200"
                                                >
                                                    <i className="fa fa-book text-xs" aria-hidden="true"></i>
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 🛍️ Shopify Card */}
                                    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden flex flex-col justify-between max-w-sm w-full mx-auto sm:mx-0">
                                        {/* লোগো কন্টেইনার (হালকা অ্যাশ ব্যাকগ্রাউন্ড) */}
                                        <div className="bg-gray-100/80 p-8 flex items-center justify-center h-32 border-b border-gray-100">
                                            <img
                                                src="https://steadfast.com.bd/assets/images/shopyfy.svg"
                                                alt="Shopify Logo"
                                                className="max-h-12 w-auto object-contain"
                                            />
                                        </div>
                                        {/* টেক্সট এবং বাটন কন্টেইনার */}
                                        <div className="p-5 flex flex-col gap-3">
                                            <h4 className="text-lg font-bold text-gray-800">Shopify App</h4>
                                            <div>
                                                <a
                                                    href="/docs"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-xs transition-colors active:scale-95 duration-200"
                                                >
                                                    <i className="fa fa-book text-xs" aria-hidden="true"></i>
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>





                        </div>
                    )}
        </div>
    );
};

export default API;