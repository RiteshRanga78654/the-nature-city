"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Slider from "../components/Slider.jsx";

const page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("learn");
  return (
    <div>
          {/* 1. HAMBURGER MENU DRAWER (This was missing) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            {/* Slide-out Menu */}
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
                {[
                  "Home", 
                  "Invest in Plot",
                  "Enjoy Clubhouse",
                  
                ].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-3xl text-white font-Condensed Sans-Serif hover:text-emerald-400 transition-colors"
                  >
                    <a href={item === "Home" ? "/" : item === "Invest in Plot" ? "/plots" : item === "Enjoy Clubhouse" ? "/clubhouse" : "#"} onClick={() => setIsMenuOpen(false)}>
                    {item}
                    </a>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* 2. HEADER */}
      <header className="fixed top-0 w-full z-[150] flex items-center justify-between px-6 py-6 md:px-16 backdrop-blur-md bg-[#022c22]/20 border-b border-white/5">
        <div className="flex items-center gap-3  tracking-[0.3em] text-xs font-bold">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
            NC
          </div>
          <span>The Nature City</span>
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center gap-3 focus:outline-none"
        >
          <span className="text-[10px]  tracking-widest hidden sm:block">
            Explore
          </span>
          <div className="flex flex-col gap-1.5">
            <div className="h-[1.5px] w-8 bg-white group-hover:w-10 transition-all"></div>
            <div className="h-[1.5px] w-10 bg-white group-hover:w-8 transition-all"></div>
          </div>
        </button>
      </header>
      {/* 3. HERO SECTION - REDUCED HEIGHT FOR FOLD VISIBILITY */}
      <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center justify-center overflow-visible">
        {/* Background Image Container */}
        <div className="absolute inset-0 overflow-hidden">
          {/* <video
            autoPlay
            loop
            playsInline
            muted
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/assets/videos/herovideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}

          {/* Your existing gradient overlay remains the same */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#022c22]/60"></div>
        </div>
        {/* Hero Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 -mt-10"
        >
          <h1 className="text-5xl md:text-[110px] leading-[0.85] font-Condensed Sans-Serif mb-6 text-emerald-400 tracking-tight">
            Enjoy the Clubhouse
          </h1>

          <p className="text-[9px] md:text-[15px] font-bold tracking-[0.4em]mb-10 text-emerald-400 opacity-90">
            THE NATURE CITY CLUBHOUSE
          </p>
        </motion.div>
        {/* Navigation Buttons */}
    
      </section>

         <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Info */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
              Experience Luxury at the <span className="text-emerald-500">Clubhouse</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our world-class resort clubhouse offers premium amenities, 
              from fine dining to relaxing lounge areas. Designed with 
              elegance in mind, it's the perfect social hub for your stay.
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

          {/* Right Side: Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/assets/images/slider/WhatsApp Image 2026-01-28 at 6.36.15 PM (1).jpeg" 
              alt="Clubhouse Interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
        <Slider />
    </div>
  )
}

export default page
