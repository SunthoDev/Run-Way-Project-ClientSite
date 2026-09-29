import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { Play, CreditCard, Truck } from 'lucide-react';
import { Ship, Plane, Train, ArrowRight, PackageCheck } from 'lucide-react';

const HeroSection = () => {

  const services = [
    {
      id: 1,
      title: 'Ocean Freight',
      description: 'Arki features minimal and stylish main theme is well crafted for logistics',
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80',
      icon: Ship,
      link: '/service-details',
    },
    {
      id: 2,
      title: 'Air Freight',
      description: 'Arki features minimal and stylish main theme is well crafted for logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      icon: Plane,
      link: '/service-details',
    },
    {
      id: 3,
      title: 'Land Freight',
      description: 'Arki features minimal and stylish main theme is well crafted for logistics',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      icon: Truck,
      link: '/service-details',
    },
    {
      id: 4,
      title: 'Railway Freight',
      description: 'Arki features minimal and stylish main theme is well crafted for logistics',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
      icon: Train,
      link: '/service-details',
    },
  ];

  return (
    <div className="">

      {/* About Our Company  ||  We Provide Full Range Global Trusted Transport Logistic Company */}
      <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans" id="about">

        {/* Dynamic Rotational Animation for Curved Text */}
        <style>{`
        @keyframes rotateText {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin-curved-text {
          animation: rotateText 20s linear infinite;
        }
      `}</style>

        {/* Decorative Background Shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#7136B0]/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Consistent Max-Width Container for All Screens (including XXL fixed limit) */}
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

            {/* ========================================================= */}
            {/* LEFT COLUMN: IMAGES, BADGE & CURVED VIDEO BUTTON          */}
            {/* ========================================================= */}
            <div className="relative flex justify-center lg:justify-start">

              {/* Main Primary Image */}
              <div className="relative z-10 w-full max-w-[420px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src="https://i.ibb.co.com/G3CqB2jt/Purple-Truck-and-Train-Journey.png"
                  alt="Logistic Warehouse Operations"
                  className="w-full h-[450px] object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Overlay Secondary Small Image (Bottom Right) */}
              <div className="absolute -bottom-8 -right-2 sm:right-4 z-20 w-48 sm:w-56 h-40 rounded-xl border-4 border-white overflow-hidden shadow-xl hidden sm:block">
                <img
                  src="https://i.ibb.co.com/0yd7G1Bw/Trust-cu.png"
                  alt="Logistics Delivery Service"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Circular Video Popup Button with Rotating Text */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-6 sm:-left-10 z-30 flex items-center justify-center">
                <a
                  href="#"
                  className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white border border-gray-100 shadow-2xl flex items-center justify-center group"
                  onClick={(e) => e.preventDefault()}
                >
                  {/* SVG Circular Animated Text */}
                  <svg className="absolute w-full h-full spin-curved-text p-1" viewBox="0 0 100 100">
                    <path
                      id="textPath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] font-extrabold uppercase fill-[#7136B0] tracking-[2px]">
                      <textPath href="#textPath" startOffset="0%">
                        25+ YEARS OF EXPERIENCE • 25+ YEARS OF EXPERIENCE •
                      </textPath>
                    </text>
                  </svg>

                  {/* Center Golden Play Button */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#e6be32] text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </a>
              </div>

            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: TEXT CONTENT, FEATURES & CLIENT SIGNATURE   */}
            {/* ========================================================= */}
            <div className="flex flex-col justify-center">

              {/* Section Tagline */}
              <span className="text-[#7136B0] font-bold text-xs sm:text-sm uppercase tracking-widest mb-3">
                About Our Company
              </span>

              {/* Main Section Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight uppercase mb-6">
                WE PROVIDE FAST & RELIABLE <span className="text-[#7136B0]">COURIER SERVICES ACROSS BANGLADESH</span>
              </h2>

              {/* Paragraph Description */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                Trustereo Courier is a customer-focused courier and logistics company based in Bangladesh.
                We provide fast, secure, and reliable parcel delivery solutions for individuals and businesses across the country.
                With a dedicated team and modern technology,
                we aim to make every delivery simple, convenient, and dependable.
              </p>

              {/* Features Bullet List Section */}
              <div className="space-y-6 mb-10">

                {/* Feature Item 1: Affordable Cost */}
                <div className="flex items-start gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#7136B0]/30 transition-all duration-300">
                  <div className="w-14 h-14 rounded-lg bg-[#7136B0]/10 text-[#7136B0] flex items-center justify-center shrink-0 shadow-sm border border-[#7136B0]/20">
                    <CreditCard className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Safe & Secure Delivery</h3>
                    <p className="text-gray-500 text-sm leading-snug">
                      Every parcel is handled with care<br />
                      from pickup to final delivery.
                    </p>
                  </div>
                </div>

                {/* Feature Item 2: On Time Delivery */}
                <div className="flex items-start gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#D4AF37]/40 transition-all duration-300">
                  <div className="w-14 h-14 rounded-lg bg-[#D4AF37]/10 text-[#b9982b] flex items-center justify-center shrink-0 shadow-sm border border-[#D4AF37]/20">
                    <Truck className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Easy Parcel Tracking</h3>
                    <p className="text-gray-500 text-sm leading-snug">
                      Track your parcel status conveniently<br />
                      throughout the delivery process.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Button & Client Profile Signature */}
              <div className="hidden flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">

                {/* CTA Explore Button */}
                <a
                  href="/"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#e6be32] hover:from-[#c29c29] hover:to-[#D4AF37] text-black font-extrabold text-xs sm:text-sm uppercase px-8 py-4 rounded-xl transition-all duration-300 shadow-md tracking-wider active:scale-95"
                >
                  Explore More
                </a>

                {/* Client Profile Image & Signature */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#7136B0] shadow-sm">
                    <img
                      src="https://i.ibb.co.com/pScqHqW/Screenshot-19.png"
                      alt="CEO Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-10 flex items-center">
                    <img
                      src="https://i.ibb.co.com/9mHQdDDs/sign.png"
                      alt="Signature"
                      className="h-full object-contain filter grayscale"
                    />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* OUR SERVICES    ||||    Logistics Special Services */}
      <section className="hidden relative bg-gray-50/50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans" id="services">

        {/* Decorative Background Shape */}
        <div className="absolute top-10 left-5 pointer-events-none opacity-40 animate-pulse">
          <img src="https://i.ibb.co.com/bjTmH3PQ/services-one-bg-shape-BTKiye-DQ.png" alt="Shape" className="w-24 md:w-36 filter hue-rotate-30" />
        </div>

        {/* OUR SERVICES || Logistics Special Services */}
        <div className="container mx-auto max-w-7xl relative z-10">

          {/* Section Header */}
          <div className="text-center mb-14">
            <span className="text-xs sm:text-sm font-extrabold text-[#7136B0] uppercase tracking-widest block mb-2">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Logistics Special Services
            </h2>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-100"
                >
                  {/* Image & Icon Box Header */}
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Image Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon Box Positioned Bottom Right */}
                    <div className="absolute bottom-[28px] right-4 z-[444] translate-y-1/2">
                      <div className="w-12 h-12 rounded-lg bg-white text-[#7136B0] group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-[#D4AF37]">
                        <IconComponent className="w-6 h-6 stroke-[1.8]" />
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 pt-8 z-10 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-[#7136B0] transition-colors duration-300 mb-3">
                        <a href={service.link}>{service.title}</a>
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Read More Footer Button */}
                  <div className="border-t border-gray-100">
                    <a
                      href="/"
                      className="flex items-center justify-between px-6 py-3.5 text-xs font-black uppercase text-gray-800 tracking-wider group-hover:bg-[#7136B0] group-hover:text-white transition-all duration-300"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Navigation Link */}
          <div className="text-center mt-12">
            <p className="text-gray-600 text-sm font-semibold">
              Please{' '}
              <a href="/" className="text-[#7136B0] underline font-bold hover:text-[#582688] transition-colors">
                click here
              </a>{' '}
              to see all services
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HeroSection; 