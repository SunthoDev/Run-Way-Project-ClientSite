import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Building2 } from 'lucide-react';

const LicensedAndPartners = () => {

  const deliveryPartners = [
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
  ];

  return (
    <div className="bg-white font-sans text-gray-800">
      
      {/* ---------------- 1. Licensed & Professional Associations Section ---------------- */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Card: RJSC Licensed */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5b1696] to-[#8c46d3] text-white flex items-center justify-center mr-4 shadow-sm">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[#7136B0] text-xs font-extrabold uppercase tracking-widest">Government Certified</span>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mt-1">
                      Trustereo Courier RJSC Licensed
                    </h2>
                  </div>
                </div>
x
                <div className="py-6 flex justify-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-[#5b1696]/10 via-[#7136B0]/5 to-[#D4AF37]/10 rounded-2xl flex items-center justify-center border border-gray-100 shadow-inner">
                    <img
                      src="https://i.ibb.co.com/JWmkkF5Z/RJSC-Logo.png"
                      alt="RJSC Logo"
                      className="w-24 h-24 md:w-32 md:h-32 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Exact Brand Purple Gradient Footer */}
              <div className="mt-8 pt-3 pb-3 px-5 rounded-2xl bg-gradient-to-r from-[#5b1696] via-[#7136B0] to-[#8c46d3] text-white flex items-center justify-between text-xs font-bold shadow-sm">
                <span>Official Registration</span>
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Fully Verified
                </span>
              </div>
            </div>

            {/* Right Card: Professional Associations */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 text-[#c29c29] flex items-center justify-center mr-4 border border-[#D4AF37]/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[#D4AF37] text-xs font-extrabold uppercase tracking-widest">Memberships</span>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mt-1">
                      Professional Associations
                    </h2>
                  </div>
                </div>

                {/* Sub-cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                      <img
                        src="https://i.ibb.co.com/N6dLxJxc/ecab.png"
                        alt="e-CAB Logo"
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <span className="text-gray-800 font-bold text-sm md:text-base">e-CAB Certified</span>
                    <span className="text-xs text-gray-400 mt-1">E-Commerce Association of Bangladesh</span>
                  </div>

                  <div className="bg-gray-50/60 rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                      <Building2 className="w-10 h-10 text-[#7136B0]" />
                    </div>
                    <span className="text-gray-800 font-bold text-sm md:text-base">Verified Partner</span>
                    <span className="text-xs text-gray-400 mt-1">Reliable Logistics Network</span>
                  </div>
                </div>
              </div>

              {/* Exact Brand Purple Gradient Footer */}
              <div className="mt-8 pt-3 pb-3 px-5 rounded-2xl bg-gradient-to-r from-[#5b1696] via-[#7136B0] to-[#8c46d3] text-white flex items-center justify-between text-xs font-bold shadow-sm">
                <span>Industry Standard</span>
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Active Member
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. Trusted Network & E-commerce Delivery Partner Section ---------------- */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs sm:text-sm font-extrabold text-[#7136B0] uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#7136B0]/10 mb-3">
              Trusted Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              E-commerce <span className="text-[#7136B0]">Delivery Partner</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-3">
              We proudly power nationwide deliveries for leading e-commerce platforms and growing online shops.
            </p>
          </div>

          {/* Logos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center">
            {deliveryPartners.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between items-center h-[160px] border border-gray-100 group"
              >
                <div className="h-16 w-full flex items-center justify-center">
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Partner Card Sub-footer */}
                <div className="w-full pt-2 border-t border-gray-100 text-center">
                  <span className="text-xs font-bold text-gray-400 group-hover:text-[#7136B0] transition-colors duration-300">
                    {partner.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LicensedAndPartners;