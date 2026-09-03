import React from 'react';
import "./Banner.css"
import bannerPhoto from "../../../assets/BannerImage/bannerPhoto.png"
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { FaPlay } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Static Data matching your provided HTML slider
const sliderData = [
    {
        id: 1,
        bgImage: "https://react-nextjs-flowtrack.mnsithub.com/assets/slider-1-3-B2bMxtk8.jpg",
        subTitle: "SAFETY, QUALITY, PROFESSIONALISM",
        title: <>LOGISTIC & CARGO <br />SOLUTION PROVIDERS</>,
        btnText: "DISCOVER MORE",
        btnLink: "/about",
        videoText: "Showreel",
        videoLink: "#"
    },
    {
        id: 2,
        bgImage: "https://react-nextjs-flowtrack.mnsithub.com/assets/slider-1-2-DUOBzSUm.jpg",
        subTitle: "SAFETY, QUALITY, PROFESSIONALISM",
        title: <>LOGISTIC & CARGO <br />SOLUTION PROVIDERS</>,
        btnText: "DISCOVER MORE",
        btnLink: "/about",
        videoText: "Showreel",
        videoLink: "#"
    },
    {
        id: 3,
        bgImage: "https://react-nextjs-flowtrack.mnsithub.com/assets/slider-1-1-CZlw59x4.jpg",
        subTitle: "SAFETY, QUALITY, PROFESSIONALISM",
        title: <>LOGISTIC & CARGO <br />SOLUTION PROVIDERS</>,
        btnText: "DISCOVER MORE",
        btnLink: "/about",
        videoText: "Showreel",
        videoLink: "#"
    }
];

const Banner = () => {

    return (
        <section className="relative w-full h-screen min-h-[650px] overflow-hidden bg-black font-sans" id="home">

            {/* Custom Ripple Animation Style for Video Icon */}
            <style>{`
                @keyframes customRipple {
                0% {
                    transform: scale(0.8);
                    opacity: 1;
                }
                100% {
                    transform: scale(2.2);
                    opacity: 0;
                }
                }
                .animate-ripple {
                animation: customRipple 1.8s infinite ease-out;
                }
                .hero-pagination .swiper-pagination-bullet {
                background: #ffffff;
                opacity: 0.5;
                width: 10px;
                height: 10px;
                margin: 8px 0 !important;
                transition: all 0.3s ease;
                display: block;
                }
                .hero-pagination .swiper-pagination-bullet-active {
                opacity: 1;
                background: #00A3FF;
                height: 24px;
                border-radius: 5px;
                }
            `}</style>

            {/* Swiper Container */}
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.hero-pagination',
                }}
                loop={true}
                className="w-full h-full"
            >
                {sliderData.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">

                        {/* Background Image with Dark Overlay */}
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-105"
                            style={{ backgroundImage: `url(${slide.bgImage})` }}
                        >
                            {/* Image Gradient Dark Overlay for exact look */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
                        </div>

                        {/* Main Content Area */}
                        <div className="relative z-10 container mx-auto h-full px-6 md:px-12 flex items-center">
                            <div className="max-w-2xl text-white pt-16">

                                {/* Subtitle */}
                                <p className="text-[#FFC107] font-bold text-xs sm:text-sm uppercase tracking-widest mb-3">
                                    {slide.subTitle}
                                </p>

                                {/* Title */}
                                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-tight tracking-wide mb-8">
                                    {slide.title}
                                </h1>

                                {/* Action Buttons & Video Play */}
                                <div className="flex flex-wrap items-center gap-6 sm:gap-8">

                                    {/* Yellow CTA Button */}
                                    <Link
                                        to={slide.btnLink}
                                        className="bg-[#FFC107] hover:bg-[#e0a800] text-black font-bold text-xs sm:text-sm uppercase px-8 py-4 rounded-sm transition-all duration-300 shadow-lg tracking-wider"
                                    >
                                        {slide.btnText}
                                    </Link>

                                    {/* Video Play Button with Ripple */}
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={slide.videoLink}
                                            className="relative w-12 h-12 rounded-full bg-[#E53935] flex items-center justify-center text-white hover:bg-red-700 transition-all duration-300 shadow-md group"
                                        >
                                            {/* Ripple Wave Effect */}
                                            <span className="absolute inset-0 rounded-full bg-[#E53935] opacity-75 animate-ripple pointer-events-none" />
                                            <FaPlay className="text-xs ml-0.5 relative z-10" />
                                        </a>

                                        <span className="text-white font-semibold text-sm sm:text-base">
                                            {slide.videoText}
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Left Vertical Pagination Dots (Matches Image Exactly) */}
            <div className="hero-pagination absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center"></div>

        </section>
    );
};

export default Banner