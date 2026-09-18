import React, { useEffect, useState } from 'react';
import "./AboutUs.css"
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { ChevronsRight } from 'lucide-react';
import { FaArrowRight, FaShieldAlt, FaShippingFast } from 'react-icons/fa';

// Swiper React Components এবং Modules ইমপোর্ট করুন
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
// Swiper-এর প্রয়োজনীয় CSS ফাইলগুলো ইমপোর্ট করুন
import 'swiper/css';
import 'swiper/css/effect-fade';

const AboutUs = () => {

    const [expanded, setExpanded] = useState(false);
    // ========================================
    // Page top thake open hoy
    const { pathname } = useLocation();
    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    // ========================================

    // ========================================================================
    // All (COOPERATIVE PARTNER and BRAND HONOR) Data Find To Database !!
    // ========================================================================
    let { refetch, data: AllPartnerAndBrandHonorData = [] } = useQuery({
        queryKey: ["AllCooperativePartnerAndBrandHonorWorkHere_AllPartnerBrandHonor"],
        queryFn: async () => {
            let res = await fetch("https://server.mussalliglobal.com/AllCooperativePartnerAndBrandHonorWorkHere/AllPartnerBrandHonor");
            return res.json();
        }
    });
    // console.log(AllPartnerAndBrandHonorData)

    // Filter COOPERATIVE PARTNER data !!
    // ========================================================
    let CooperativePartnerData = AllPartnerAndBrandHonorData?.filter(Partner => Partner?.Category === "COOPERATIVE-PARTNER")

    // Filter BRAND HONOR data !!
    // ========================================================
    let BrandHonorData = AllPartnerAndBrandHonorData?.filter(Honor => Honor?.Category === "BRAND-HONOR")

    // =======================================================
    // Find website contact us data !!
    // =======================================================
    const { data: WebsiteContactUsDataGet } = useQuery({
        queryKey: ["AllAdminDashboardControlWorkHere-GetContactInfo"],
        queryFn: async () => {
            const res = await fetch("https://server.mussalliglobal.com/AllAdminDashboardControlWorkHere/GetContactInfo");
            const data = await res.json();
            return Array.isArray(data) ? data[0] : data;
        },
    });
    // console.log(WebsiteContactUsDataGet)
    // const { address, email, number, SupportNumber, MapLink, facebook, tiktok, insta, youtube } = WebsiteContactUsDataGet

    const ownersData = [
        {
            name: "Sourov Borman",
            designation: "Chairman & Founder",
            phone: "+880 1750 050088",
            email: "sourov.borman@flowtrack.com",
            imgUrl: "https://html.kodesolution.com/2026/realest-html/images/resource/about1-1.jpg"
        },
        {
            name: "Sourov Borman",
            designation: "Managing Director",
            phone: "+880 1750 050088",
            email: "chairman@flowtrack.com",
            imgUrl: "https://moongates.com.sa/wp-content/uploads/2024/06/about-us-img.png"
        }
    ];

    return (
        <div className="AboutUsParent bg-white">

            {/* ========================================= */}
            {/* Page Heading Top !!  */}
            {/* ========================================= */}
            <div className="Paralax font-sans relative w-full flex items-center justify-center">
                {/* DARK OVERLAY (ব্যাকগ্রাউন্ড ইমেজকে ডার্ক করার জন্য) */}
                {/* bg-black/60 দিয়ে ৬০% ডার্কনেস আনা হয়েছে, আপনি চাইলে ৫০% বা ৭০% করতে পারেন */}
                <div className="absolute inset-0 bg-black/60 z-0"></div>

                {/* TEXT CONTENT CONTAINER (একদম মাঝখানে সুন্দর টেক্সট) */}
                <div className="relative z-10 text-center px-4 pt-[68px] md:pt-[118px]">
                    {/* মেইন হেডিং */}
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-3 drop-shadow-md">
                        About Us
                    </h1>
                </div>
            </div>

            {/* ============================ */}
            {/* Company Details All!! */}
            {/* ============================ */}
            <section className="py-[40px] md:py-[80px] bg-[#0c0519] text-white font-sans overflow-hidden relative">

                {/* Background Subtle Glow Effects */}
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="mx-4 md:mx-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                        {/* LEFT SIDE: OVERLAPPING IMAGES BOX (Glassmorphism Frame) */}
                        <div className="lg:col-span-5 relative w-full flex flex-col items-center lg:items-start min-h-[480px] md:min-h-[550px]">

                            {/* MAIN TOP-LEFT IMAGE (Courier / Logistics Hub) */}
                            <div className="w-[80%] sm:w-[70%] lg:w-[380px] rounded-2xl overflow-hidden border-[6px] border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative z-10 transition-transform duration-500 hover:scale-[1.02] backdrop-blur-md bg-white/5">
                                <img
                                    src="https://i.ibb.co.com/XrbXD7cN/sourav.png"
                                    alt="Courier Logistics Operations"
                                    className="w-full h-[320px] md:h-[380px] object-cover opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>

                            {/* SECONDARY BOTTOM-RIGHT IMAGE (Fast Delivery / Express Service) */}
                            <div className="absolute right-[5%] bottom-[5%] sm:right-[10%] lg:right-0 lg:bottom-0 w-[55%] sm:w-[50%] lg:w-[260px] rounded-2xl overflow-hidden border-[6px] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] z-20 transition-transform duration-500 hover:scale-[1.03] backdrop-blur-md bg-white/5">
                                <img
                                    src="https://i.ibb.co.com/6kDzxyB/Courier-1.png"
                                    alt="Express Package Delivery"
                                    className="w-full h-[200px] md:h-[240px] object-cover opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>

                            {/* FLOATING INFO BOX (Trusted Team / Couriers Card) */}
                            <div className="absolute left-[40%] top-[45%] sm:left-[38%] lg:left-[210px] lg:top-[240px] bg-[#1a0b36]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-2xl p-4 border border-white/15 z-30 flex flex-col items-center gap-1.5 min-w-[160px]">
                                <span className="text-xs font-bold text-purple-200 tracking-tight uppercase">Trusted Couriers</span>
                                <div className="flex items-center gap-1 text-yellow-400 text-xs font-semibold">
                                    <span>⭐ 4.9</span> <span className="text-purple-300/60 font-normal">(2.5k+ Reviews)</span>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT SIDE: CONTENT COLUMN */}
                        <div className="lg:col-span-7 flex flex-col justify-center">

                            {/* SUB TITLE */}
                            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-purple-300 uppercase tracking-[0.2em] mb-3">
                                <span className="text-purple-400 text-lg">✦</span> About Our Courier Network
                            </div>

                            {/* MAIN TITLE */}
                            <h2 className="text-3xl md:text-[42px] lg:text-[46px] font-black text-white leading-[1.15] tracking-tight mb-6 max-w-2xl">
                                Fast, Secure & Reliable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Parcel Delivery</span> Across The Country
                            </h2>

                            {/* DESCRIPTION */}
                            <p className="text-purple-200/80 text-sm md:text-[15px] leading-relaxed max-w-2xl mb-8">
                                FlowTrack is your trusted logistics partner, offering end-to-end parcel delivery, real-time package tracking, secure warehousing, and express shipping services. With our commitment to speed, safety, and absolute customer satisfaction, we ensure your packages reach their destination safely and on time.
                            </p>

                            {/* BLOCKS SECTION (FEATURES) */}
                            <div className="space-y-6 mb-10 max-w-2xl">

                                {/* BLOCK 1: REAL-TIME TRACKING */}
                                <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors duration-300 text-purple-300 group-hover:text-white">
                                        <FaShippingFast className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Real-Time Tracking</h4>
                                        <p className="text-purple-200/70 text-sm leading-relaxed">Monitor your shipments live at every stage from dispatch to doorstep delivery with complete precision.</p>
                                    </div>
                                </div>

                                {/* BLOCK 2: SECURED & INSURED */}
                                <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors duration-300 text-purple-300 group-hover:text-white">
                                        <FaShieldAlt className="text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-1">Secure & Safe Delivery</h4>
                                        <p className="text-purple-200/70 text-sm leading-relaxed">We handle every fragile and valuable package with utmost care, ensuring zero damage and total safety.</p>
                                    </div>
                                </div>

                            </div>

                            {/* BOTTOM BOX: BUTTON & PHONE CALL */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-6 border-t border-white/10">

                                {/* PREMIUM READ MORE BUTTON */}
                                <div>
                                    <Link
                                        to="/contactus"
                                        className="group relative inline-flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm tracking-wide pl-7 pr-[60px] py-4 rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(126,34,206,0.4)] hover:shadow-[0_15px_30px_rgba(126,34,206,0.6)] transition-all duration-300"
                                    >
                                        <span>Explore Services</span>
                                        <div className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-white text-purple-900 rounded-xl flex items-center justify-center transition-transform duration-300 shadow-md">
                                            <FaArrowRight className="text-xs transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>

                                {/* PHONE INFO BOX */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl border border-white/20 bg-white/5 flex items-center justify-center text-purple-300 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300 cursor-pointer">
                                        <FaPhoneAlt className="text-sm" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-purple-300/70 font-medium uppercase tracking-wider">Call Anytime</span>
                                        <a href={`tel:09611-049234`} className="text-base font-bold text-white hover:text-purple-400 transition-colors">
                                            09611-049234
                                        </a>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================= */}
            {/* Chairman, FROM THE DESK OF THE!! */}
            {/* ============================================= */}
            <section
                className="relative w-full min-h-[550px] md:min-h-[600px] bg-fixed bg-cover bg-center flex items-center overflow-hidden font-sans bg-[#0c0519]"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop')` // Modern logistics & courier warehouse background
                }}
            >
                {/* FANCY PURPLE OVERLAY: Apnar demand moto deep purple / dark premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0519]/95 via-[#1a0b36]/90 to-[#0c0519]/95 backdrop-blur-[2px] z-0"></div>

                {/* Decorative Glow Elements */}
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

                {/* INNER CONTENT WRAPPER */}
                <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* LEFT SIDE: CHAIRMAN TEXT CONTENT & BUTTON */}
                        <div className="order-2 md:order-1 lg:col-span-7 text-white flex flex-col justify-center">

                            {/* TOP TAG */}
                            <span className="text-purple-400 font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase mb-1 block">
                                FROM THE DESK OF THE
                            </span>

                            {/* MAIN HEADING */}
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 drop-shadow-md relative">
                                Chairman
                                <span className="text-purple-400 absolute -bottom-1 ml-1 text-3xl md:text-4xl">.</span>
                            </h2>

                            {/* CHAIRMAN'S MESSAGE BODY */}
                            <div className="text-purple-200/90 text-sm md:text-base leading-relaxed space-y-4 max-w-2xl mb-8 font-medium">
                                <p className="italic text-white text-base md:text-lg font-semibold border-l-4 border-purple-400 pl-4 my-4 bg-purple-950/30 py-2 rounded-r-xl">
                                    “Building a fast, trustworthy, and tech-driven logistics network to connect every corner seamlessly.”
                                </p>
                                <p className="text-justify">
                                    Sourov Borman, the esteemed Chairman of our organization, is
                                    renowned for his strategic acumen and extensive
                                    industry experience in supply chain and digital transformation. With a distinguished background in strategic management, he has been
                                    instrumental in steering the company towards
                                    significant growth, reliability, and innovation.
                                </p>
                                <p className="text-justify">
                                    His leadership is marked by a commitment to
                                    fostering collaboration, empowering teams, and
                                    cultivating a forward-thinking vision. Under his
                                    guidance, we have achieved numerous
                                    milestones, establishing ourselves as a premier leader in the
                                    courier and delivery industry.
                                </p>
                            </div>

                            {/* BUTTON (Trapizium Accent Style with Theme Colors) */}
                            <div className="inline-block self-start">
                                <Link
                                    to="/contactus"
                                    className="group flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm tracking-wider uppercase pr-0 overflow-hidden shadow-[0_10px_25px_rgba(126,34,206,0.4)] transition-transform duration-300 hover:scale-[1.02] rounded-xl"
                                >
                                    <span className="pl-6 pr-8 py-4 block">Build a Project</span>
                                    <span
                                        className="bg-[#15072a] text-purple-300 py-4 px-5 block transition-colors duration-300 group-hover:bg-[#200b40]"
                                        style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                                    >
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </Link>
                            </div>

                        </div>

                        {/* RIGHT SIDE: SWIPER CARD CONTAINER */}
                        <div className="order-1 md:order-2 lg:col-span-5 relative w-full flex justify-center lg:justify-end items-center lg:mt-0 overflow-visible">

                            <div className="w-full max-w-[460px] hero-swiper-wrapper overflow-visible">

                                <Swiper
                                    modules={[Autoplay, EffectFade]}
                                    effect="fade"
                                    fadeEffect={{ crossFade: true }}
                                    loop={true}
                                    speed={1200}
                                    autoplay={{
                                        delay: 3500,
                                        disableOnInteraction: false,
                                    }}
                                    className="w-full overflow-visible"
                                >

                                    {ownersData.map((owner, index) => (

                                        <SwiperSlide
                                            key={index}
                                            className="overflow-visible"
                                        >

                                            {/* MAIN WRAPPER */}
                                            <div className="relative h-[540px] flex items-end overflow-visible">

                                                {/* GLASSMORPHISM CARD */}
                                                <div
                                                    className="absolute right-0 bottom-0 w-[100%] h-[360px] bg-[#16082c]/90 backdrop-blur-xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] px-6 pt-24 pb-8 text-white overflow-visible z-20"
                                                    style={{
                                                        clipPath:
                                                            "polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                                    }}
                                                >

                                                    {/* CONTENT */}
                                                    <div className="flex flex-col items-center text-center">

                                                        {/* NAME */}
                                                        <h3 className="text-[26px] leading-none font-black uppercase tracking-wide text-white">
                                                            {owner.name}
                                                        </h3>

                                                        {/* VIBRANT PURPLE/ORANGE ACCENT LINE */}
                                                        <div className="w-32 h-[4px] bg-gradient-to-r from-purple-400 to-indigo-400 mt-3 mb-2 rounded-full"></div>

                                                        {/* DESIGNATION */}
                                                        <p className="text-sm font-bold uppercase tracking-widest text-purple-300">
                                                            {owner.designation}
                                                        </p>

                                                    </div>

                                                    {/* CONTACT INFO */}
                                                    <div className="mt-8 space-y-4">

                                                        {/* PHONE */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-400/30 text-purple-300 flex items-center justify-center shadow-md flex-shrink-0">
                                                                <FaPhoneAlt size={15} />
                                                            </div>
                                                            <a
                                                                href={`tel:${owner.phone}`}
                                                                className="font-bold text-sm md:text-base tracking-wide hover:text-purple-300 transition-all duration-300"
                                                            >
                                                                {owner.phone}
                                                            </a>
                                                        </div>

                                                        {/* EMAIL */}
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-400/30 text-purple-300 flex items-center justify-center shadow-md flex-shrink-0">
                                                                <FaEnvelope size={15} />
                                                            </div>
                                                            <a
                                                                href={`mailto:${owner.email}`}
                                                                className="font-semibold text-xs md:text-sm hover:text-purple-300 transition-all duration-300 break-all"
                                                            >
                                                                {owner.email}
                                                            </a>
                                                        </div>

                                                    </div>

                                                </div>

                                                {/* PROFILE IMAGE WITH THEME BORDER */}
                                                <div className="absolute top-[14%] left-[56%] -translate-x-1/2 z-[99999] flex justify-center items-center overflow-visible">

                                                    {/* OUTER RING */}
                                                    <div className="w-44 h-44 rounded-full border-[5px] border-purple-500/40 bg-[#1e0c3a] flex items-center justify-center shadow-[0_15px_45px_rgba(0,0,0,0.6)]">

                                                        {/* IMAGE */}
                                                        <div className="w-[150px] h-[150px] rounded-full overflow-hidden border-[4px] border-purple-300/20 bg-white shadow-2xl">
                                                            <img
                                                                src={owner.imgUrl}
                                                                alt={owner.name}
                                                                className="w-full h-full object-cover object-top scale-[1.08]"
                                                            />
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </SwiperSlide>

                                    ))}

                                </Swiper>

                            </div>

                        </div>

                        {/* SWIPER FIXED CSS */}
                        <style jsx="true">{`
            .hero-swiper-wrapper,
            .hero-swiper-wrapper .swiper,
            .hero-swiper-wrapper .swiper-wrapper,
            .hero-swiper-wrapper .swiper-slide {
              overflow: visible !important;
            }

            .hero-swiper-wrapper .swiper {
              background: transparent !important;
            }

            .hero-swiper-wrapper .swiper-slide {
              height: auto !important;
            }

            .hero-swiper-wrapper .swiper-slide-active {
              z-index: 20 !important;
            }
          `}</style>

                    </div>
                </div>
            </section>

            {/* ============================================= */}
            {/* Our Mission, Vision, Accountability Values!! */}
            {/* ============================================= */}
            <section className="py-[40px] md:py-[80px] mx-2 md:mx-24 bg-white font-sans">

                {/* TOP HEADING SECTION */}
                <div className="text-center flex flex-col items-center mb-16 md:mb-20 px-4">
                    {/* থিম লোগো/আইকন (শীর্ষে থাকা হলুদ-কালো আইকনটি) */}
                    <figure className="mb-4 transition-transform duration-300 hover:rotate-6">
                        <img
                            src="https://builty-react.netlify.app/images/heading-icon.png"
                            alt="Heading Icon"
                            className="h-10 w-auto object-contain"
                        />
                    </figure>

                    {/* সাব-হেডিং */}
                    <span className="text-xs md:text-sm font-black text-neutral-500 uppercase tracking-[0.25em] mb-2 block">
                        MAKE A DIFFERENCE
                    </span>

                    {/* মেইন টাইটেল */}
                    <h2 className="text-3xl md:text-[42px] font-black text-neutral-950 tracking-tight relative pb-4">
                        Our Core Values
                    </h2>

                    {/* হেডিংয়ের নিচের নিখুঁত ডিভাইডার লাইন */}
                    <div className="w-16 h-[2px] bg-neutral-200 mt-2"></div>
                </div>

                {/* VALUES LIST CONTAINER */}
                <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-16 md:space-y-24">
                        {[
                            {
                                id: 1,
                                title: "Mission",
                                description: "At Blesslife Limited, our mission is to deliver tailored solutions that enhance growth, productivity, and efficiency, enabling businesses to achieve their full potential. We are committed to providing value-added services that help our clients meet and exceed their goals within the competitive business landscape.",
                                image: "https://i.ibb.co.com/Myf4SKzZ/Screenshot-16.png",
                            },
                            {
                                id: 2,
                                title: "Vision",
                                description: "TO be the global leader in providing integrated business solutions, setting the standard for excellence, innovation, and client satisfaction across all industries we serve",
                                image: "https://i.ibb.co.com/3wS45pJ/Screenshot-17.png",
                            },
                            {
                                id: 3,
                                title: "Accountability",
                                description: "We are caring—with a deep concern for and kindness to one another. We believe in the boundless potential of all people and feel a great responsibility to uplift one another and our families, and positively impact our communities.",
                                image: "https://i.ibb.co.com/Z66TsLqP/Courier-11.png",
                            },
                        ]?.map((value, index) => {
                            // index % 2 === 1 হলে জোড় সংখ্যার আইটেমগুলো (যেমন: Responsibility) ডেস্কটপে ফ্লিপ হয়ে যাবে
                            const isEven = index % 2 === 1;

                            return (
                                <div
                                    key={value.id}
                                    className={`flex flex-col lg:items-center gap-8 md:gap-12 lg:gap-16 ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                        }`}
                                >

                                    {/* TEXT CONTENT COLUMN */}
                                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                        {/* কার্ডের শিরোনাম */}
                                        <h3 className="text-2xl md:text-[32px] font-extrabold text-neutral-950 tracking-tight mb-4 relative before:content-[''] before:absolute before:left-0 before:-bottom-1 before:w-8 before:h-[3px] before:bg-[#ffeb00]">
                                            {value.title}
                                        </h3>

                                        {/* বর্ণনা */}
                                        <p className="text-neutral-500 text-sm md:text-[15px] leading-relaxed font-medium max-w-xl">
                                            {value.description}
                                        </p>
                                    </div>

                                    {/* IMAGE COLUMN */}
                                    <div className="w-full lg:w-1/2">
                                        <div className="relative group overflow-hidden rounded-xl bg-neutral-100 shadow-sm border border-neutral-100">
                                            {/* চমৎকার হোভার ইফেক্টসহ ইমেজ কন্টেইনার */}
                                            <img
                                                src={value.image}
                                                alt={value.title}
                                                className="w-full h-[260px] sm:h-[320px] md:h-[360px] object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:filter contrast-[1.02]"
                                                loading="lazy"
                                            />
                                            {/* হালকা ওভারলে যা হোভারে ক্লিয়ার হবে */}
                                            <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>

            </section>

            {/* ==================================== */}
            {/* OUR PORTFOLIO AND Our Work */}
            {/* ==================================== */}
            <section className="py-[40px] md:py-[80px] bg-white font-sans">

                {/* SECTION HEADING */}
                <div className="text-center flex flex-col items-center mb-12">
                    {/* থিম লোগো/আইকন (শীর্ষে থাকা হলুদ-কালো আইকনটি) */}
                    <figure className="mb-4 transition-transform duration-300 hover:rotate-6">
                        <img
                            src="https://builty-react.netlify.app/images/heading-icon.png"
                            alt="Heading Icon"
                            className="h-10 w-auto object-contain"
                        />
                    </figure>
                    <span className="text-xs md:text-sm font-black text-neutral-400 uppercase tracking-[0.25em] mb-2 block">
                        OUR PORTFOLIO
                    </span>
                    <h2 className="text-3xl md:text-[42px] font-black text-neutral-950 uppercase tracking-tight relative pb-3">
                        Our Work
                    </h2>
                    {/* থিম ম্যাচিং ছোট হলুদ ডিভাইডার */}
                    <div className="w-12 h-[3px] bg-[#ffeb00] mt-1"></div>
                </div>

                {/* GALLERY GRID (Bootstrap row g-0 এর মতো হুবহু গ্যাপলেস গ্রিড) */}
                <div className="w-full px-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-0">
                        {[
                            { id: 1, src: "https://i.ibb.co.com/9mRbry75/Purple-Truck-and-Train-Journey.png", alt: "Gallery 1" },
                            { id: 2, src: "https://i.ibb.co.com/XrbXD7cN/sourav.png", alt: "Gallery 2" },
                            { id: 3, src: "https://i.ibb.co.com/JjPWZ1XY/Courier-4.png", alt: "Gallery 3" },
                            { id: 4, src: "https://i.ibb.co.com/35j10FF4/landin-gpage.png", alt: "Gallery 4" },
                            { id: 5, src: "https://i.ibb.co.com/RpkyTTPS/Trustereo-Courier-Delivery-Scene.png", alt: "Gallery 5" },
                            { id: 6, src: "https://i.ibb.co.com/RpkyTTPS/Trustereo-Courier-Delivery-Scene.png", alt: "Gallery 6" },
                            { id: 7, src: "https://i.ibb.co.com/twSw3ykp/Courier-111.png", alt: "Gallery 7" },
                            { id: 8, src: "https://i.ibb.co.com/Z66TsLqP/Courier-11.png", alt: "Gallery 8" },
                        ]?.map((item) => (
                            <div
                                key={item.id}
                                className="relative overflow-hidden group aspect-[4/3] w-full bg-neutral-900 cursor-pointer"
                            >
                                {/* মেইন ইমেজ */}
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* LEFT TO RIGHT YELLOW OVERLAY EFFECT 
                  - শুরুতে `-translate-x-full` দিয়ে বামে লুকিয়ে রাখা হয়েছে।
                  - হোভার করলে `group-hover:translate-x-0` দিয়ে ডানপাশে স্লাইড হবে।
                  - bg-[#ffeb00]/80 ব্যবহার করে ৮০% অপাসিটি দেওয়া হয়েছে যাতে ভেতরের ইমেজও হালকা দেখা যায়।
              */}
                                <div className="absolute inset-0 bg-[#ffeb00]/80 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0 flex flex-col items-center justify-center p-4 z-10">

                                    {/* হোভার করার পর ভেতরে দেখানোর জন্য একটি সুন্দর প্লাস আইকন ও টেক্সট */}
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 text-center">
                                        <div className="w-10 h-10 border-2 border-neutral-950 flex items-center justify-center rounded-full mx-auto mb-2">
                                            <svg className="w-5 h-5 text-neutral-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <span className="text-neutral-950 font-black uppercase text-xs tracking-wider">
                                            View Project
                                        </span>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM BUTTON (SEE MORE) */}
                <div className="text-center mt-12 md:mt-16">
                    <div className="inline-block">
                        <Link
                            to="/ourWork"
                            className="group flex items-center bg-[#ffeb00] text-neutral-950 font-black text-sm tracking-wider uppercase pr-0 overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]"
                        >
                            {/* বাটনের বামদিকের টেক্সট পার্ট */}
                            <span className="pl-8 pr-10 py-4 block">See More</span>

                            {/* ডানদিকের ব্ল্যাক ট্রাপিজিয়াম/অ্যারো বক্স */}
                            <span
                                className="bg-neutral-950 text-[#ffeb00] py-4 px-6 block transition-colors duration-300 group-hover:bg-neutral-900"
                                style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                            >
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>

            </section>

            {/* ==================================== */}
            {/* COOPERATIVE PARTNER */}
            {/* ==================================== */}
            <div className="bg-slate-50/50 py-[40px] md:py-[80px] px-2 md:px-24">
                {/* Premium Styled Heading */}
                <div className="flex flex-col items-start md:items-center mb-10">
                    <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#0F5132] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-500/20 shadow-sm mb-2">
                        Trusted Allies
                    </span>
                    <h2 className="text-[22px] md:text-[28px] font-black text-gray-900 tracking-tight uppercase relative">
                        Cooperative Partners
                        <span className="block w-16 h-1 bg-gradient-to-r from-[#0F5132] to-[#eab308] rounded-full mt-2 md:mx-auto"></span>
                    </h2>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 items-center">
                    {[
                        {
                            src: "https://i.ibb.co/qLsZRXzb/Chat-GPT-Image-Jun-16-2025-06-06-28-PM.png",
                            alt: "Partner Logo 1",
                            title: "Certified Partner"
                        },
                        {
                            src: "https://i.ibb.co/rBL33s5/Sourav-Shopping-Zone-Logo.png",
                            alt: "Sourav Shopping Zone",
                            title: "Sourav Shopping Zone"
                        },
                        {
                            src: "https://i.ibb.co/B5qfzNrg/zone.png",
                            alt: "Zone Logo",
                            title: "Zone Express"
                        },
                    ].map((Partner, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center justify-center p-2.5 md:p-3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(15,81,50,0.12)] rounded-2xl border border-slate-100 hover:border-emerald-500/30 transform transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                        >
                            {/* Subtle Hover Glow Effect inside card */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <img
                                src={Partner?.src}
                                alt={Partner?.alt}
                                className="w-full h-20 md:h-24 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10 transform group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ======================================== */}
            {/* Ready to work together.  */}
            {/* ======================================== */}
            <section className="bg-[#081C15] font-sans overflow-hidden relative py-8 md:py-12">
                {/* Background Subtle Pattern Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#1B4332_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Grid Container */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[450px] md:min-h-[520px] lg:min-h-[580px]">

                        {/* LEFT SIDE: TEXT DATA & PREMIUM BUTTON */}
                        <div className="lg:col-span-7 z-10 text-center lg:text-left pt-6 pb-4 lg:py-12 pr-0 lg:pr-10">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332] border border-[#2D6A4F] mb-4 text-[#F0E001] text-xs font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 rounded-full bg-[#F0E001] animate-pulse" />
                                Build Your Dream With Us
                            </div>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-white tracking-tight leading-tight mb-4">
                                Ready to Get Started?
                            </h2>

                            <p className="text-emerald-100/80 text-sm md:text-base lg:text-[17px] leading-relaxed max-w-2xl mb-8 font-normal mx-auto lg:mx-0">
                                Create your account and submit your first project request in minutes. Our team of expert engineers is ready to turn your vision into reality.
                            </p>

                            {/* PREMIUM BUTTON */}
                            <div className="inline-block">
                                <Link
                                    to="/login"
                                    className="group relative flex items-center justify-center bg-[#F0E001] text-[#081C15] font-extrabold text-xs md:text-sm tracking-wider uppercase pl-6 md:pl-8 pr-[60px] md:pr-[70px] py-4 md:py-4.5 overflow-hidden transition-all duration-300 shadow-lg hover:bg-white rounded-md lg:rounded-none"
                                >
                                    <span>Create Account</span>
                                    <div
                                        className="absolute right-0 top-0 bottom-0 w-[45px] md:w-[50px] bg-[#081C15] flex items-center justify-center transition-transform duration-300 border-l-2 border-[#F0E001]"
                                        style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
                                    >
                                        <ChevronsRight className="w-5 h-5 text-[#F0E001] transform group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT SIDE: IMAGE AND YELLOW BAR CONTAINER */}
                        <div className="lg:col-span-5 relative lg:absolute lg:right-0 lg:bottom-0 lg:top-0 w-full lg:w-[48%] h-[320px] sm:h-[400px] md:h-[480px] lg:h-full z-0 flex items-end justify-end">

                            {/* BACKGROUND YELLOW ACCENT SHAPE */}
                            <div
                                className="absolute top-0 bottom-0 right-[4%] md:right-[8%] w-[65%] md:w-[55%] lg:w-[380px] xl:w-[420px] bg-[#F0E001] z-0 opacity-90 lg:opacity-100"
                                style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}
                            />

                            {/* FOREGROUND STRUCTURE / SERVICE IMAGE */}
                            <figure className="absolute z-10 bottom-0 right-0 w-full lg:w-[620px] xl:w-[680px] h-full flex justify-end items-end select-none pointer-events-none">
                                <img
                                    src="https://cdni.iconscout.com/illustration/premium/thumb/online-services-4268383-3561005.png"
                                    alt="Online Services & IT Solutions"
                                    className="w-full h-full object-cover object-bottom select-none mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 transform origin-bottom lg:translate-x-4 border-b-0"
                                    style={{
                                        maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                                        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
                                    }}
                                    draggable="false"
                                    loading="lazy"
                                />
                            </figure>

                            {/* Bottom Gradient Fade to smoothly merge with ground */}
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#081C15] to-transparent z-20 pointer-events-none" />

                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;