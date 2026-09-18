import React, { useRef, useEffect } from 'react';
import "./ContactUs.css"
import moment from 'moment';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronsRight, Phone, MapPin, Mail, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { FaTiktok } from 'react-icons/fa';
import { Headphones, Plus, Zap, Shield } from 'lucide-react';

const ContactUs = () => {

    let navigate = useNavigate()

    // ========================================
    // Page show from top Start
    // ========================================
    const { pathname } = useLocation();
    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    // ========================================
    // Page show top End
    // ========================================

    // =======================================================
    // Find website contact us data !!
    // =======================================================
    // const { data: WebsiteContactUsDataGet } = useQuery({
    //     queryKey: ["AllAdminDashboardControlWorkHere-GetContactInfo"],
    //     queryFn: async () => {
    //         const res = await fetch("https://server.mussalliglobal.com/AllAdminDashboardControlWorkHere/GetContactInfo");
    //         const data = await res.json();
    //         return Array.isArray(data) ? data[0] : data;
    //     },
    // });
    // console.log(WebsiteContactUsDataGet)
    // const { address, email, number, SupportNumber, MapLink, facebook, tiktok, insta, youtube } = WebsiteContactUsDataGet


    return (
        <div className="ContactUsParent bg-white">

            {/* ========================================= */}
            {/* Page Heading Top !!  */}
            {/* ========================================= */}
            <section className="relative w-full bg-[#0d2218] text-white pt-[164px] pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden font-sans">
                {/* Ambient Background Glow */}
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">

                    {/* Left Content */}
                    <div className="space-y-4 max-w-2xl">
                        {/* Support Centre Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-emerald-100/90 text-sm font-medium">
                            <Headphones className="w-4 h-4 text-emerald-200" />
                            <span>Support Centre</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white">
                            How can we help?
                        </h1>

                        {/* Subheading Description */}
                        <p className="text-emerald-100/70 text-base sm:text-lg font-light leading-relaxed">
                            Open a ticket and chat with our team. We typically reply in a few hours.
                        </p>

                        {/* Feature Indicators */}
                        <div className="pt-2 flex flex-wrap items-center gap-6 text-sm text-emerald-100/80 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span>Live support active</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-emerald-400" />
                                <span>Avg. reply 2–4 hrs</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-emerald-400" />
                                <span>Secure & private</span>
                            </div>
                        </div>
                    </div>

                    {/* Right CTA Button */}
                    <div className="flex-shrink-0 pt-2 md:pt-0">
                        <button
                            onClick={() => { }}
                            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#eab308] to-[#ca8a04] hover:from-[#facc15] hover:to-[#eab308] text-neutral-950 font-semibold rounded-xl shadow-[0_4px_25px_rgba(234,179,8,0.25)] hover:shadow-[0_6px_30px_rgba(234,179,8,0.4)] transition-all duration-300 transform active:scale-95 cursor-pointer"
                        >
                            <Plus className="w-5 h-5 stroke-[2.5]" />
                            <span>New Ticket</span>
                        </button>
                    </div>

                </div>
            </section>

            <div className="bg-[#0b0f19] text-white py-16 px-4 md:px-12 transition-colors duration-500">
                {/* ========================================= */}
                {/* Contact Info Header & Dynamic Grid */}
                {/* ========================================= */}
                <div className="max-w-7xl mx-auto mb-20">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0E001]/10 border border-[#F0E001]/30 mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-[#F0E001]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#F0E001]">Visit Us</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Our Contact & Location
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Phone Card */}
                        <div className="group relative bg-[#151c2c] border border-slate-800 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#F0E001]/50 hover:shadow-2xl hover:shadow-[#F0E001]/10 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F0E001]/5 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                            <div>
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#1e293b] border border-slate-700/60 flex items-center justify-center text-[#F0E001] group-hover:bg-[#F0E001] group-hover:text-black transition-colors duration-300 shadow-lg">
                                    <Phone className="w-7 h-7" />
                                </div>
                                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">PHONE</p>
                                <p className="text-lg font-bold text-white whitespace-pre-line group-hover:text-[#F0E001] transition-colors">
                                    09611-049234
                                </p>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="group relative bg-[#151c2c] border border-slate-800 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#e25c38]/50 hover:shadow-2xl hover:shadow-[#e25c38]/10 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e25c38]/5 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                            <div>
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#1e293b] border border-slate-700/60 flex items-center justify-center text-[#e25c38] group-hover:bg-[#e25c38] group-hover:text-white transition-colors duration-300 shadow-lg">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">ADDRESS</p>
                                <p className="text-lg font-bold text-white whitespace-pre-line group-hover:text-[#e25c38] transition-colors">
                                    N/17,Mirpur Dhaka.
                                </p>
                            </div>
                        </div>

                        {/* Email Card */}
                        <div className="group relative bg-[#151c2c] border border-slate-800 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#3b82f6]/50 hover:shadow-2xl hover:shadow-[#3b82f6]/10 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#3b82f6]/5 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
                            <div>
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#1e293b] border border-slate-700/60 flex items-center justify-center text-[#3b82f6] group-hover:bg-[#3b82f6] group-hover:text-white transition-colors duration-300 shadow-lg">
                                    <Mail className="w-7 h-7" />
                                </div>
                                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Email</p>
                                <p className="text-lg font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                                    infotrustereocourier@gmail.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================= */}
                {/* Form & Support Visual Section */}
                {/* ========================================= */}
                <div id="From" className="max-w-7xl mx-auto">
                    <div className="text-center max-w-xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e25c38]/10 border border-[#e25c38]/30 mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-[#e25c38]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#e25c38]">Visit Us</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
                            WRITE TO US
                        </h3>
                    </div>

                    <div className="bg-[#141b2d] rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl backdrop-blur-xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 w-full">

                            {/* LEFT COLUMN: FORM SECTION (7 Cols) */}
                            <div className="lg:col-span-7 p-8 md:p-14 bg-[#141b2d] flex flex-col justify-center">

                                <div className="mb-10 text-center lg:text-left">
                                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                                        Ready to get started?<br />
                                        <span className="bg-gradient-to-r from-[#F0E001] to-[#e25c38] bg-clip-text text-transparent">
                                            Let's chat.
                                        </span>
                                    </h2>
                                    <p className="text-slate-400 text-sm md:text-base font-medium max-w-md mt-2">
                                        Please fill out the form below, and a member of our team will get back to you as soon as possible.
                                    </p>
                                </div>

                                <form className="contactAll space-y-6">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="w-full">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                                Your Full Name Here
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                name="from_name"
                                                placeholder="Type Your Name"
                                                className="w-full bg-[#1e293b]/70 border border-slate-700/70 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F0E001] focus:ring-1 focus:ring-[#F0E001] transition-all text-base font-medium shadow-inner"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                                Enter Your Email Address
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                name="from_email"
                                                placeholder="name@gmail.com"
                                                className="w-full bg-[#1e293b]/70 border border-slate-700/70 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F0E001] focus:ring-1 focus:ring-[#F0E001] transition-all text-base font-medium shadow-inner"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                            Your Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            name="from_number"
                                            required
                                            placeholder="+8618600466912"
                                            className="w-full bg-[#1e293b]/70 border border-slate-700/70 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F0E001] focus:ring-1 focus:ring-[#F0E001] transition-all text-base font-medium shadow-inner"
                                        />
                                    </div>

                                    <div className="w-full">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                                            Enter Your Message Here
                                        </label>
                                        <textarea
                                            name="from_details"
                                            required
                                            rows="4"
                                            placeholder="Write Your Message"
                                            className="w-full bg-[#1e293b]/70 border border-slate-700/70 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-[#F0E001] focus:ring-1 focus:ring-[#F0E001] transition-all text-base font-medium shadow-inner resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Custom Theme CTA Button with Slanted Icon Accent */}
                                    <div className="pt-4">
                                        <div className="shrink-0 w-full sm:w-auto">
                                            <button
                                                type="submit"
                                                className="group relative flex items-center justify-between sm:justify-start bg-gradient-to-r from-[#F0E001] to-[#d4c600] text-black font-black text-sm tracking-wider uppercase pl-8 pr-16 py-4 rounded-xl overflow-hidden w-full sm:w-auto transition-all duration-300 shadow-lg shadow-[#F0E001]/20 hover:shadow-[#F0E001]/40 active:scale-[0.98]"
                                            >
                                                <span>Submit</span>

                                                <div className="absolute right-0 top-0 bottom-0 w-12 bg-black text-[#F0E001] flex items-center justify-center transform skew-x-[-15deg] translate-x-2 border-l-2 border-[#F0E001]/40 transition-colors group-hover:bg-[#1a1a1a]">
                                                    <div className="transform skew-x-[15deg]">
                                                        <ChevronsRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>

                            {/* RIGHT COLUMN: PROFESSIONAL MEDIA DISPLAY (5 Cols) */}
                            <div className="lg:col-span-5 bg-gradient-to-b from-[#0f172a] via-[#090d16] to-[#05070c] p-8 lg:p-12 flex flex-col items-center text-center border-t lg:border-t-0 lg:border-l border-slate-800/80 min-h-[580px] justify-between relative overflow-hidden">

                                {/* Decorative Grid Lines Background */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

                                <div className="flex flex-col items-center w-full z-10">
                                    <h3 className="text-white text-xl font-extrabold tracking-widest uppercase mb-6 bg-slate-800/60 px-5 py-2 rounded-full border border-slate-700/50 backdrop-blur-md">
                                        Follow Us
                                    </h3>

                                    <ul className="flex items-center justify-center gap-4">
                                        {[
                                            {
                                                id: "facebook",
                                                url: ``,
                                                ariaLabel: "Facebook",
                                                svg: (
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
                                                    </svg>
                                                )
                                            },
                                            {
                                                id: "instagram",
                                                url: ``,
                                                ariaLabel: "Instagram",
                                                svg: (
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                                    </svg>
                                                )
                                            },
                                            {
                                                id: "tiktok",
                                                url: ``,
                                                ariaLabel: "TikTok",
                                                svg: <FaTiktok className="w-4 h-4" />
                                            },
                                            {
                                                id: "youtube",
                                                url: ``,
                                                ariaLabel: "YouTube",
                                                svg: (
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                    </svg>
                                                )
                                            }
                                        ].map((link) => (
                                            <li key={link.id} className="transition-transform duration-300 hover:scale-110">
                                                <a
                                                    href={link.url}
                                                    aria-label={link.ariaLabel}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center text-[#e25c38] bg-slate-800/40 hover:bg-[#e25c38] hover:text-white hover:border-[#e25c38] transition-all duration-300 shadow-md backdrop-blur-sm"
                                                >
                                                    {link.svg}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="w-full mt-8 flex justify-center items-end relative h-[340px] z-10">
                                    <div className="absolute w-56 h-56 bg-[#e25c38]/20 blur-[70px] rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                                    <img
                                        src="https://moongates.com.sa/wp-content/uploads/2024/06/contact-info-img.png"
                                        alt="Customer Service Representative"
                                        className="w-full max-w-[290px] h-auto object-contain select-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.03]"
                                        draggable="false"
                                        loading="lazy"
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================= */}
            {/* Map Sections */}
            {/* ========================================= */}
            <div className="mx-4 md:mx-32 mt-14">
                <div className="title px-4 md:px-0 w-full md:w-1/4 mx-auto mb-6">
                    <p>------Visit Us------</p>
                    <h3>Our Map</h3>
                </div>
            </div>

            <div className="Map mb-[302px]  mt-14">
                <div className=" h-[100px]">
                    <iframe className="Iframe w-[100%] h-[400px]"
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d58424.90090746428!2d90.41847214999999!3d23.763196599999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sDhaka%20Division-12!5e0!3m2!1sen!2sbd!4v1789764774659!5m2!1sen!2sbd"
                        frameborder="0" loading="lazy" allowfullscreen="" aria-hidden="false"
                        tabindex="0">
                    </iframe>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;