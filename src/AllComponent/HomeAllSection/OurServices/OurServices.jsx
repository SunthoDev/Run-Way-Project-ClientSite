import React from 'react';
import { Truck, Globe, Package, Smartphone, Building2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurServices = () => {

  const services = [
    {
      icon: Truck,
      title: "Express Delivery",
      description: "Fast and reliable delivery services for your urgent packages with guaranteed timing.",
      features: ["Same-day delivery", "Real-time tracking", "Secure handling"]
    },
    {
      icon: Globe,
      title: "Ecommerce Delivery",
      description: "Fast & Secure Courier Delivery Across the Nation to boost your online sales.",
      features: ["Cash on Delivery", "Daily pickup, no limits", "24/7 Customer Service"]
    },
    {
      icon: Package,
      title: "Package Handling",
      description: "Professional handling of all types of packages with utmost care and safety.",
      features: ["Fragile handling", "Temperature control", "Special packaging"]
    },
    {
      icon: Smartphone,
      title: "Digital Tracking",
      description: "Advanced tracking system for your shipments to monitor every single movement.",
      features: ["Live updates", "SMS notifications", "Mobile app access"]
    },
    {
      icon: Building2,
      title: "Business Solutions",
      description: "Tailored logistics solutions designed specifically for growing businesses & enterprises.",
      features: ["Bulk shipping", "Warehouse solutions", "Supply chain management"]
    },
    {
      icon: ShieldCheck,
      title: "Secure Delivery",
      description: "Ensuring maximum safety and insurance of your valuable packages on transit.",
      features: ["Insurance coverage", "Secure packaging", "Signature confirmation"]
    }
  ];
  
  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/60 to-white overflow-hidden font-sans">

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-xs sm:text-sm font-extrabold text-[#7136B0] uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#7136B0]/10 mb-4">
            Our Core Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            Trusted Transport <span className="text-[#7136B0]">Logistic Company</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            With our commitment, excellence, dedication, and customer satisfaction, we're here to streamline your supply chain and drive your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {

            const IconComponent = service.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col justify-between hover:-translate-y-2"
              >
                {/* Top Accent Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7136B0] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>

                <div>
                  {/* Icon Box */}
                  <div className="w-16 h-16 rounded-xl bg-[#7136B0]/10 text-[#7136B0] group-hover:bg-[#7136B0] group-hover:text-white flex items-center justify-center mb-6 shadow-sm transition-all duration-300 border border-[#7136B0]/20">
                    <IconComponent className="w-8 h-8 stroke-[1.8]" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-[#7136B0] transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-3 mb-8 pt-4 border-t border-gray-100">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Button */}
                <Link
                  to=""
                  className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 group-hover:bg-[#7136B0] text-gray-800 group-hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-sm"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-24">
          <div className="bg-gradient-to-r from-[#7136B0] to-[#582688] rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden border border-[#D4AF37]/30">
            {/* Decorative Overlay Circles */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#D4AF37]/20 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-[#D4AF37] font-bold text-xs sm:text-sm uppercase tracking-widest block mb-3">
                Grow With Us
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
                Trustereo Courier: Delivering Your Growth
              </h3>
              <p className="text-gray-200 text-base sm:text-lg mb-8 leading-relaxed">
                Fast, Reliable & Nationwide — Trustereo Courier is Always On Time. Partner with us today and scale your business effortlessly.
              </p>

              <a
                href="/"
                className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#e6be32] hover:from-[#c29c29] hover:to-[#D4AF37] text-black font-extrabold text-sm sm:text-base uppercase tracking-wider px-10 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Become a Merchant
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default OurServices;