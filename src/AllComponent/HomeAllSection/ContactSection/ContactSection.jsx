import React from 'react';
import { Play, MapPin, Mail, Phone, Star, Box, PackageOpen, PackageCheck, Truck, ArrowRightLeft } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {



  return (
    <div className="font-sans">
      <section id="contact" className="relative min-h-screen bg-gray-900 py-20 overflow-hidden font-sans">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000")` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* ================= LEFT SIDE: Video Popup / Visual Scene ================= */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[450px] flex items-center justify-center group bg-gray-800">

                {/* Background Scene Illustration/Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-60"
                  style={{ backgroundImage: `url("https://i.ibb.co/dsqF7dMN/Trustereo-Courier-Delivery-Scene.png")` }}
                ></div>

                {/* Play Video Button with Ripple Effect */}
                <div className="relative z-10">
                  <a
                    href="#video"
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-[#5b1696] to-[#8c46d3] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform relative group/btn"
                  >
                    <Play className="w-8 h-8 fill-white ml-1" />
                    <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-75"></span>
                  </a>
                </div>

              </div>
            </div>

            {/* ================= RIGHT SIDE: Quote Form Box ================= */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl relative border border-gray-100">

                <div className="mb-6">
                  <span className="text-[#7136B0] text-xs font-black uppercase tracking-widest block mb-1">
                    GET FREE QUOTE
                  </span>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    Request a Quote
                  </h2>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm focus:outline-none focus:border-[#7136B0] transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm focus:outline-none focus:border-[#7136B0] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      name="phone"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm focus:outline-none focus:border-[#7136B0] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Property Types / City"
                      name="subject"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-800 text-sm focus:outline-none focus:border-[#7136B0] transition-colors"
                    />
                  </div>

                  {/* Progress Bar (DIST Miles) */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                      <span>DIST (Miles):</span>
                      <span className="text-[#7136B0]">70%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                      <div className="h-full bg-gradient-to-r from-[#5b1696] via-[#7136B0] to-[#8c46d3] rounded-full w-[70%]"></div>
                    </div>
                  </div>

                  {/* Submit Button & Reviews Footer */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#5b1696] via-[#7136B0] to-[#8c46d3] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:opacity-95 transition-all text-sm tracking-wider uppercase text-center"
                    >
                      GET YOUR QUOTE
                    </button>

                    <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="text-center sm:text-left">
                        <div className="flex items-center text-gray-900 font-black text-xl">
                          <span>212</span>
                          <span className="text-[#7136B0] ml-0.5">+</span>
                        </div>
                        <p className="text-xs text-gray-500 font-semibold">Reviews</p>
                      </div>
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>
      </section>

      <section className="work-steps-one relative py-24 bg-gray-50 overflow-hidden font-sans">
        {/* Background Shape */}
        <div className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-50" style={{ backgroundImage: `url("/assets/work-steps-one-bg-shape-DjS-DWbu.png")` }}></div>

        {/* Top Right Floating Shape 5 */}
        <div className="work-steps-one__shape-5 absolute top-8 right-0 float-bob-y pointer-events-none z-10 hidden lg:block">
          <img src="https://i.ibb.co.com/QjN744TY/work-steps-one-shape-4-B8-AGIrwm.png" alt="Shape" />
        </div>

        <div className="container mx-auto px-4 relative z-20">

          {/* Section Title */}
          <div className="section-title text-center sec-title-animation animation-style1 mb-16">
            <div className="section-title__tagline-box mb-3">
              <span className="section-title__tagline text-red-500 font-bold uppercase tracking-widest text-xs">
                OUR EASY WORKING STEPS
              </span>
            </div>
            <h2 className="section-title__title text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              We Aim to Contribute Well to Your Company
            </h2>
          </div>

          {/* Work Steps Inner Container */}
          <div className="work-steps-one__inner relative">
            {/* Middle Connecting Line Shape 4 */}
            <div className="work-steps-one__shape-4 hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl pointer-events-none z-0">
              <img src="https://react-nextjs-flowtrack.mnsithub.com/assets/work-steps-one-shape-3-zEE0iyXe.png" alt="Connecting Line" className="w-full" />
            </div>

            <ul className="work-steps-one__list grid grid-cols-1 lg:grid-cols-3 gap-10 list-none p-0 m-0 relative z-10">

              {/* Step 1 */}
              <li className="flex flex-col items-center text-center group">
                <div className="work-steps-one__icon relative w-36 h-36 flex items-center justify-center mb-6">
                  <div className="work-steps-one__count"></div>
                  <div className="work-steps-one__shape-1 absolute inset-0">
                    <img src="https://react-nextjs-flowtrack.mnsithub.com/assets/work-steps-one-shape-1-BnHNdWYC.png" alt="Shape 1" className="w-full h-full object-contain" />
                  </div>
                  <div className="work-steps-one__shape-2 absolute inset-0 flex items-center justify-center text-gray-800 group-hover:text-red-600 transition-colors">
                    <Box className="w-10 h-10" />
                  </div>
                  <span className="icon-box absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    01
                  </span>
                </div>
                <p className="work-steps-one__text text-lg font-bold text-gray-900">
                  <a href="/about" className="hover:text-red-600 transition-colors">Replenishment &amp; Picking</a>
                </p>
              </li>

              {/* Step 2 */}
              <li className="flex flex-col items-center text-center group">
                <div className="work-steps-one__icon relative w-36 h-36 flex items-center justify-center mb-6">
                  <div className="work-steps-one__count"></div>
                  <div className="work-steps-one__shape-1 absolute inset-0">
                    <img src="https://react-nextjs-flowtrack.mnsithub.com/assets/work-steps-one-shape-1-BnHNdWYC.png" alt="Shape 1" className="w-full h-full object-contain" />
                  </div>
                  <div className="work-steps-one__shape-2 absolute inset-0 flex items-center justify-center text-gray-800 group-hover:text-red-600 transition-colors">
                    <PackageOpen className="w-10 h-10" />
                  </div>
                  <span className="icon-box absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    02
                  </span>
                </div>
                <p className="work-steps-one__text text-lg font-bold text-gray-900">
                  <a href="/about" className="hover:text-red-600 transition-colors">Packaging &amp; Distribution</a>
                </p>
              </li>

              {/* Step 3 */}
              <li className="flex flex-col items-center text-center group">
                <div className="work-steps-one__icon relative w-36 h-36 flex items-center justify-center mb-6">
                  <div className="work-steps-one__count"></div>
                  <div className="work-steps-one__shape-1 absolute inset-0">
                    <img src="https://react-nextjs-flowtrack.mnsithub.com/assets/work-steps-one-shape-1-BnHNdWYC.png" alt="Shape 1" className="w-full h-full object-contain" />
                  </div>
                  <div className="work-steps-one__shape-2 absolute inset-0 flex items-center justify-center text-gray-800 group-hover:text-red-600 transition-colors">
                    <Truck className="w-10 h-10" />
                  </div>
                  <span className="icon-box absolute top-0 right-0 bg-red-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    03
                  </span>
                </div>
                <p className="work-steps-one__text text-lg font-bold text-gray-900">
                  <a href="/about" className="hover:text-red-600 transition-colors">Transportation Process</a>
                </p>
              </li>

            </ul>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactSection;