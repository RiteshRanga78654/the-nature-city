"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Amenities from "../components/Amenities";
import ClubGallery from "../components/ClubGallery";
import EventGallery from "../components/EventGallery";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/assets/images/slider/WhatsApp Image 2026-01-28 at 6.36.15 PM (1).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.52 AM (1).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.52 AM.jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.53 AM (1).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.53 AM (2).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.53 AM.jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.54 AM (1).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.54 AM (2).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.54 AM.jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.55 AM (1).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.55 AM (2).jpeg",
  "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.55 AM.jpeg",
];

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    /* Fix 1: overflow-x-hidden on the main wrapper prevents the horizontal scrollbar */
    <div className="overflow-x-hidden">
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#022c22] z-[210] border-l border-emerald-800/50 p-12 flex flex-col justify-center shadow-2xl"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-10 right-10 text-stone-400 hover:text-white text-3xl transition-colors"
              >
                ✕
              </button>
              <nav className="flex flex-col gap-10">
                {["Home", "Invest in Plot", "Enjoy Clubhouse"].map((item, i) => (
                  <motion.a
                    key={item}
                    href={item === "Home" ? "/" : item === "Invest in Plot" ? "/plots" : "/clubhouse"}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-3xl text-white font-Condensed Sans-Serif hover:text-emerald-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <header className="fixed top-0 w-full z-[150] flex items-center justify-between px-6 py-6 md:px-16 backdrop-blur-md bg-[#022c22]/20 border-b border-white/5">
        <div className="flex items-center gap-3 tracking-[0.3em] text-xs font-bold text-white">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
            NC
          </div>
          <span>The Nature City</span>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="group flex items-center gap-3 focus:outline-none text-white">
          <span className="text-[10px] tracking-widest hidden sm:block">Explore</span>
          <div className="flex flex-col gap-1.5">
            <div className="h-[1.5px] w-8 bg-white group-hover:w-10 transition-all"></div>
            <div className="h-[1.5px] w-10 bg-white group-hover:w-8 transition-all"></div>
          </div>
        </button>
      </header>

    <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden">
  {/* 1. Background Image Layer */}
  <div className="absolute inset-0 z-0">
    <img 
      src="/assets/images/clubhousehero.png" 
      alt="Clubhouse Hero" 
      className="w-full h-full object-cover"
      // Added error handling to check if image loads
      onError={(e) => console.error("Hero image failed to load at path:", e.target.src)}
    />
    
    {/* 2. Single Gradient Overlay (Darkens image so text is readable) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#022c22]/80"></div>
  </div>

  {/* 3. Text Content Layer */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="relative z-10 text-center px-4 -mt-10"
  >
    <h1 className="text-5xl md:text-[110px] leading-[0.85] font-Condensed Sans-Serif mb-6 text-emerald-400 tracking-tight">
      Enjoy the Clubhouse
    </h1>
    <p className="text-[9px] md:text-[15px] font-bold tracking-[0.4em] text-emerald-400 opacity-90">
      THE NATURE CITY CLUBHOUSE
    </p>
  </motion.div>
</section>

      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
              Experience Luxury at the <span className="text-emerald-500">Clubhouse</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our world-class resort clubhouse offers premium amenities, from fine dining to relaxing lounge areas.
            </p>
            <div className="flex gap-4">
              <button className="bg-emerald-500 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-600 transition-colors">
                Book a Visit
              </button>
              <button className="border border-slate-300 text-slate-700 px-8 py-3 rounded-full font-medium hover:bg-slate-50 transition-colors">
                Explore More
              </button>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] overflow-hidden shadow-2xl">
            <img
              src="/assets/images/slider/WhatsApp Image 2026-01-28 at 6.36.15 PM (1).jpeg"
              alt="Clubhouse Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-20"> {/* Replaced <br/> with margin-top */}
          {/* Fix 2: Added overflow-hidden to the relative container to clip the navigation buttons if they go outside */}
          <div className="relative group overflow-hidden md:overflow-visible">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={15}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12 px-4"
            >
              {images.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-[400px] overflow-hidden cursor-pointer shadow-lg group/item" onClick={() => setActiveImg(index)}>
                    <img src={src} alt="Clubhouse" className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white border border-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                        View Large
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Fix 3: Changed negative position to prevent horizontal overflow on smaller screens */}
            <button className="custom-prev absolute left-2 md:left-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl text-slate-800 opacity-0 group-hover:opacity-100 transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="custom-next absolute right-2 md:right-[-20px] top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl text-slate-800 opacity-0 group-hover:opacity-100 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Lightbox Modal */}
          {activeImg !== null && (
            <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10" onClick={() => setActiveImg(null)}>
              <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setActiveImg(null)}>
                <X size={40} />
              </button>
              <button className="absolute left-4 text-white/50 hover:text-white" onClick={showPrev}>
                <ChevronLeft size={48} />
              </button>
              <div className="relative max-w-5xl w-full flex flex-col items-center">
                <img src={images[activeImg]} className="max-h-[80vh] w-auto rounded-lg shadow-2xl" alt="Large" onClick={(e) => e.stopPropagation()} />
                <div className="mt-6 text-white/60 font-light flex items-center gap-4">
                  <span className="h-[1px] w-8 bg-white/20"></span>
                  {activeImg + 1} / {images.length}
                  <span className="h-[1px] w-8 bg-white/20"></span>
                </div>
              </div>
              <button className="absolute right-4 text-white/50 hover:text-white" onClick={showNext}>
                <ChevronRight size={48} />
              </button>
            </div>
          )}
        </div>
      </section>
      <Amenities />
      <ClubGallery />
      <EventGallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Page;