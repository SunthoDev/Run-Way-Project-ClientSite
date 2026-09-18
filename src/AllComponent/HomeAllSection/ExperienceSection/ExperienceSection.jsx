import React, { useEffect, useState } from "react";
import { Clock, Globe, ShieldCheck, PhoneCall } from "lucide-react";
import './ExperienceSection.css';

const ExperienceSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger progress bar animation after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="aboutUs" className="experience-section bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ================= LEFT SIDE: Image + 24 Hours Service Box ================= */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-gray-900 group">
              
              {/* Background Image / Delivery Scene */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-75 group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url("https://i.ibb.co/dsqF7dMN/Trustereo-Courier-Delivery-Scene.png")` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* 24 Hours Service Badge Top-Right */}
              <div className="absolute top-0 right-0 bg-gradient-to-br from-[#5b1696] to-[#8c46d3] text-white p-6 sm:p-8 rounded-bl-3xl shadow-lg flex items-center gap-4 z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight">24</h3>
                  <p className="text-xs uppercase tracking-wider font-semibold text-purple-200">Hours Service</p>
                </div>
              </div>

              {/* Foreground Overlay Content */}
              <div className="relative z-10 pt-16 px-6 pb-8 flex flex-col justify-end min-h-[480px]">
                <div className="max-w-md">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    Trustereo Courier
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Fast & Secure Logistics
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    We ensure that every package reaches its destination promptly and safely across Bangladesh.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE: Content, Progress & Features ================= */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-3">
              <span className="inline-block px-4 py-1.5 bg-[#7136B0]/10 text-[#7136B0] rounded-full text-xs font-extrabold uppercase tracking-widest">
                WHY YOU CHOOSE US
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                We Provide clients <span className="text-[#7136B0]">Best Logistics Services</span>
              </h2>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Arki features minimal and stylish design. The theme is well crafted for all the modern architect and interior design website. With Arki, it makes your website look even more attractive and impressive to
            </p>

            {/* Progress Bars (Shipping & Management) */}
            <div className="space-y-5 pt-2">
              
              {/* Shipping Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-gray-800">
                  <span>Shipping</span>
                  <span className="text-[#7136B0]">80%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-[#5b1696] via-[#7136B0] to-[#8c46d3] rounded-full transition-all duration-1000"
                    style={{ width: isVisible ? '80%' : '0%' }}
                  ></div>
                </div>
              </div>

              {/* Management Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold text-gray-800">
                  <span>Managment</span>
                  <span className="text-[#7136B0]">80%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-[#5b1696] via-[#7136B0] to-[#8c46d3] rounded-full transition-all duration-1000"
                    style={{ width: isVisible ? '80%' : '0%' }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Feature Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#7136B0]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5b1696] to-[#8c46d3] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">International Shipping</h4>
                  <p className="text-xs text-gray-500">Global reach & solutions</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#7136B0]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5b1696] to-[#8c46d3] text-white flex items-center justify-center shadow-sm shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Safety Gurranted</h4>
                  <p className="text-xs text-gray-500">Secure parcel handling</p>
                </div>
              </div>
            </div>

            {/* Bottom Call Text */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100">
              <p className="why-choose-one__bottom-text text-sm font-semibold text-gray-700">
                Do you have any project on your mind? Call Us: <a href="tel:+8809611049234" className="text-[#7136B0] font-bold hover:underline">+880 9611-049234</a>
              </p>
            </div>

          </div>

        </div>

        {/* ================= BOTTOM IMAGES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              src: "https://i.ibb.co/p6dJyC4c/Purple-Truck-and-Train-Journey.png",
              alt: "Plane and Truck",
              title: "Advanced Fleet"
            },
            {
              src: "https://i.ibb.co/dsqF7dMN/Trustereo-Courier-Delivery-Scene.png",
              alt: "Night Truck",
              title: "Safe Transit"
            },
            {
              src: "https://i.ibb.co/SwTqJ7dn/Trust-cu.png",
              alt: "Logistics Hub",
              title: "Hub Network"
            },
          ].map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                <span className="font-bold text-sm">{image.title}</span>
                <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">Explore</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;