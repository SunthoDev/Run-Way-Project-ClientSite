import React from 'react';
import "./Pricing.css";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaBox, FaTruck } from 'react-icons/fa';

const Pricing = () => {

    const pricingData = [
        { from: "ঢাকা", destination: "ঢাকা", weight: "0.50 - 0.300 কেজি", charge: "50 TK", regular: false, book: false, document: true },
        { from: "ঢাকা", destination: "ঢাকা", weight: "0.50 কেজি - 1 কেজি", charge: "50 TK", regular: false, book: true, document: false },
        { from: "ঢাকা", destination: "ঢাকা", weight: "0.200 - 0.500 কেজি", charge: "60 TK", regular: true, book: false, document: true },
        { from: "ঢাকা", destination: "ঢাকা", weight: "0.50 - 1 কেজি", charge: "70 TK", regular: true, book: false, document: false },
        { from: "ঢাকা", destination: "সারাদেশ", weight: "0.50 - 1 কেজি", charge: "100 TK", regular: false, book: true, document: false },
        { from: "ঢাকা", destination: "সারাদেশ", weight: "0.50 - 1 কেজি", charge: "130 TK", regular: true, book: false, document: false },
        { from: "সারাদেশ", destination: "ঢাকা", weight: "0.50 - 1 কেজি", charge: "100 TK", regular: false, book: true, document: false },
        { from: "সারাদেশ", destination: "ঢাকা", weight: "0.50 - 1 কেজি", charge: "120 TK", regular: true, book: false, document: false },
    ];

    return (
        <section className="pb-16 pt-[120px] md:pt-[180px] bg-[#0c0519] text-white font-sans relative overflow-hidden">

            {/* Background Glow Accents */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-purple-400 font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase mb-2 block">
                        Transparent Rates
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                        Delivery Charge
                        <span className="text-purple-400">Pricing</span>
                    </h2>
                    <p className="text-purple-200/80 text-sm md:text-base">
                        Find out our flexible and affordable delivery rates across Dhaka and nationwide.
                    </p>
                </div>

                {/* Pricing Table Wrapper */}
                <div className="bg-[#15072a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-purple-950/60 border-b border-white/10 text-purple-300 text-xs sm:text-sm uppercase tracking-wider">
                                    <th className="py-4 px-4 sm:px-6 font-bold">From</th>
                                    <th className="py-4 px-4 sm:px-6 font-bold">Destination</th>
                                    <th className="py-4 px-4 sm:px-6 font-bold">Weight</th>
                                    <th className="py-4 px-4 sm:px-6 font-bold">Delivery Charge</th>
                                    <th className="py-4 px-4 sm:px-6 font-bold text-center">Regular</th>
                                    <th className="py-4 px-4 sm:px-6 font-bold text-center">Book</th>
                                    <th className="py-4 px-4 sm:px-6 font-bold text-center">Document</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {pricingData.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-white/5 transition-colors duration-200 group"
                                    >
                                        <td className="py-4 px-4 sm:px-6 font-semibold text-purple-100 flex items-center gap-2">
                                            <FaTruck className="text-purple-400 text-xs" /> {item.from}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-purple-200/90">{item.destination}</td>
                                        <td className="py-4 px-4 sm:px-6 text-purple-200/90">{item.weight}</td>
                                        <td className="py-4 px-4 sm:px-6 font-black text-purple-300">{item.charge}</td>
                                        <td className="py-4 px-4 sm:px-6 text-center">
                                            {item.regular ? (
                                                <span className="inline-flex items-center gap-1 text-green-400 font-semibold bg-green-500/10 px-2.5 py-1 rounded-full text-xs">
                                                    <FaCheckCircle /> Yes
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-1 rounded-full text-xs">
                                                    <FaTimesCircle /> No
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-center">
                                            {item.book ? (
                                                <span className="inline-flex items-center gap-1 text-green-400 font-semibold bg-green-500/10 px-2.5 py-1 rounded-full text-xs">
                                                    <FaCheckCircle /> Yes
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-1 rounded-full text-xs">
                                                    <FaTimesCircle /> No
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 sm:px-6 text-center">
                                            {item.document ? (
                                                <span className="inline-flex items-center gap-1 text-green-400 font-semibold bg-green-500/10 px-2.5 py-1 rounded-full text-xs">
                                                    <FaCheckCircle /> Yes
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-500/10 px-2.5 py-1 rounded-full text-xs">
                                                    <FaTimesCircle /> No
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Notice & Special Conditions Box */}
                <div className="mt-8 bg-[#15072a]/60 backdrop-blur-md border border-purple-500/20 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-4 text-purple-300 font-bold text-base">
                        <FaInfoCircle className="text-purple-400" />
                        <span>Special Conditions & Notes:</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-purple-200/90">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">***</span>
                            <span>১ কেজির পর পরবর্তী কেজির জন্য ২০ টাকা করে যুক্ত হবে।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">🔺</span>
                            <span>ঢাকা টু ঢাকা সেম ডে ডেলিভারি চার্জ ১০০ টাকা।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">🔺</span>
                            <span>পিক এন্ড ড্রপ ডেলিভারি চার্জ ১২০ টাকা ( সারাদেশে টু সারাদেশে )।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">🔺</span>
                            <span>রিস্ক ম্যানেজমেন্ট ও ক্যাশ অন ডেলিভারিতে সিওডি চার্জ ১% প্রযোজ্য।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">🔺</span>
                            <span>পার্সেলের সাইজের এর কারণে ডেলিভারি চার্জ পরিবর্তন হতে পারে।</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-400">🔺</span>
                            <span>অনাকাঙ্ক্ষিত কারণবশত ডেলিভারি সময় পরিবর্তন হতে পারে।</span>
                        </li>
                    </ul>
                </div>
            </div>

        </section>
    );
};

export default Pricing;