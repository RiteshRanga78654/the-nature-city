"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Slider from "./components/Slider";
import Footer from "./components/Footer";

const Page = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("learn");
  const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);

  const brochureImages = [
    "/assets/images/db-the-nature-city.jpeg",
    "/assets/images/hero image.jfif",
    "assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.24 PM.jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.21 PM (1).jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.15 PM (1).jpeg"
  ];

  // 1. State for tracking hovered FAQ to change background
  const [activeImg, setActiveImg] = useState(null);

  // 2. Images that will fade-in when you hover over questions
  const faqBgImages = [
   "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.22 PM (2).jpeg",
  "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.17 PM.jpeg",
  "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.18 PM (1).jpeg",
   "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.18 PM.jpeg"
  ];
  const nextBrochure = () => {
    setCurrentBrochureIndex((prev) => (prev + 1) % brochureImages.length);
  };

  const [orientation, setOrientation] = useState("east");

  const villaData = {
    east: {
      title: "East Facing 3BHK Villa",
      price: "₹3.5Cr",
      size: "3175 sft built up",
      heroImg:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.59 AM (2).jpeg",
      floorPlans: [
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.54 AM (1).jpeg",
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.56 AM (2).jpeg",
      ],
    },
    west: {
      title: "West Facing 3BHK Villa",
      price: "₹3.4Cr",
      size: "3175 sft built up",
      heroImg:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.59 AM (1).jpeg",
      floorPlans: [
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.57 AM (1).jpeg",
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.56 AM (1).jpeg",
      ],
    },
  };

  return (
    <div className="relative min-h-screen bg-[#022c22] text-stone-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
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
                  "Invest in Clubhouse",
                  "Brochure",
                  "Contact Us",
                ].map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-3xl font-Condensed Sans-Serif hover:text-emerald-400 transition-colors"
                  >
                    {item}
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
  <video
    autoPlay
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/assets/videos/herovideo.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

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
         
          {/* <h1 className="text-5xl md:text-[110px] leading-[0.85] font-Condensed Sans-Serif mb-6 text-emerald-400 tracking-tight">
             Nature's Embrace
          </h1>
         
          <p className="text-[9px] md:text-[15px] font-bold tracking-[0.4em]mb-10 text-emerald-400 opacity-90">
             Premium Plots • Resort Villas • Elite Clubhouse
           
          </p> */}
         
        </motion.div>
         {/* OVERLAPPING 3-WAY TOGGLE - Forced Visibility */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[90%] md:max-w-2xl px-2">
         
          <div className="flex bg-[#021c17] p-1.5 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 backdrop-blur-xl h-[75px] md:h-[95px]">
              {/* VILLAS OPTION - Redirect to Home */}
            <button
              onClick={() => {
                setActiveTab("learn");
                router.push("/"); // Directs to your main villas page
              }}
              className={`flex-1 flex items-center justify-center gap-2 md:gap-4 rounded-[2.2rem] text-[9px] md:text-xs font-bold tracking-widest transition-all duration-500 ${
                activeTab === "learn"
                  ? "bg-emerald-600 text-white shadow-2xl scale-[1.02]"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
               VILLAS
              {activeTab === "learn" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-5 w-5 md:h-7 md:w-7 rounded-full border-2 border-white/50 flex items-center justify-center"
                >
                 
                  <span className="text-[10px] md:text-xs">✓</span>
                 
                </motion.div>
              )}
             
            </button>
             {/* PLOTS OPTION - Redirect to /plots */}
            <button
              onClick={() => {
                setActiveTab("community");
                router.push("/plots"); // Directs to your app/plots/page.js
              }}
              className={`flex-1 flex items-center justify-center gap-2 md:gap-4 rounded-[2.2rem] text-[9px] md:text-xs font-bold tracking-widest transition-all duration-500 ${
                activeTab === "community"
                  ? "bg-emerald-600 text-white shadow-2xl scale-[1.02]"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
               PLOTS
              {activeTab === "community" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-5 w-5 md:h-7 md:w-7 rounded-full border-2 border-white/50 flex items-center justify-center"
                >
                 
                  <span className="text-[10px] md:text-xs">✓</span>
                 
                </motion.div>
              )}
             
            </button>
             {/* Clubhouse OPTION - Redirect to /Clubhouse */}
            <button
              onClick={() => {
                setActiveTab("Clubhouse");
                router.push("/Clubhouse"); // Directs to your app/Clubhouse/page.js
              }}
              className={`flex-1 flex items-center justify-center gap-2 md:gap-4 rounded-[2.2rem] text-[9px] md:text-xs font-bold tracking-widest transition-all duration-500 ${
                activeTab === "Clubhouse"
                  ? "bg-emerald-600 text-white shadow-2xl scale-[1.02]"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
               CLUBHOUSE
              {activeTab === "Clubhouse" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-5 w-5 md:h-7 md:w-7 rounded-full border-2 border-white/50 flex items-center justify-center"
                >
                 
                  <span className="text-[10px] md:text-xs">✓</span>
                 
                </motion.div>
              )}
             
            </button>
           
          </div>
         
        </div>
       
      </section>
      {/* 4. CORE VALUE SECTION */}
      <section className="bg-stone-100 py-20 md:py-30 px-6 md:px-32 text-emerald-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-Condensed Sans-Serif leading-tight text-emerald-900"
          >
            Luxury <br />
            <span className="text-emerald-600 ">Redefined.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-1 bg-emerald-600 mb-8"></div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-emerald-800/80">
              Own a sanctuary where modern design meets the tranquility of
              nature. Our BMRDA-approved plots and 3175 sq. ft. villas offer the
              ultimate escape.
            </p>
          </motion.div>
        </div>
      </section>
      {/* 5. VIDEO & INTERACTIVE BROCHURE SECTION */}
      <section className="bg-[#022c22] py-20 md:py-30 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* VIDEO SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-emerald-800/30">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/vft3CThpvQc"
                title="Villa Tour"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl md:text-6xl font-Condensed Sans-Serif text-white">
                Why invest in a resort villa?
              </h3>
              <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                Hassle-free ownership with zero maintenance. Let our
                professional team handle the care while you enjoy the lifestyle.
              </p>
            </div>
          </motion.div>

          {/* INTERACTIVE BROCHURE SIDE */}
          <div className="flex flex-col gap-16">
            <div
              className="relative w-full max-w-sm mx-auto lg:ml-auto cursor-pointer group"
              onClick={nextBrochure}
            >
              <div className="absolute -top-12 left-0 text-[10px]  tracking-[0.3em] text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view next page →
              </div>

              <div className="relative aspect-[4/5] w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentBrochureIndex}
                    src={brochureImages[currentBrochureIndex]}
                    initial={{ opacity: 0, x: 100, rotate: 5 }}
                    animate={{ opacity: 1, x: 0, rotate: -4 }}
                    exit={{ opacity: 0, x: -100, rotate: -10 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-[#ffffff] p-3"
                    alt="Brochure Page"
                  />
                </AnimatePresence>

                {/* Decorative depth layers */}
                <div className="absolute inset-0 bg-emerald-900/40 -z-10 translate-x-3 translate-y-3 rounded-2xl rotate-2"></div>
                <div className="absolute inset-0 bg-emerald-800/20 -z-20 translate-x-6 translate-y-6 rounded-2xl -rotate-1"></div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center lg:text-right space-y-10"
            >
              <h4 className="text-3xl md:text-5xl font-Condensed Sans-Serif leading-tight">
                Download our <br /> digital brochure
              </h4>
              <div className="pt-4">
                {/* Changed Button to Gold Theme */}
                <button
                  style={{
                    padding: "14px 60px",
                    backgroundColor: "#22C55E", // Default Gold Background
                    borderRadius: "8px",
                    color: "#fff", // Default White Text
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    border: "2px solid #22C55E", // Border keeps the button size stable
                    margin: "0 auto",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    const fill = e.currentTarget.querySelector(".hover-fill");
                    const text = e.currentTarget.querySelector(".btn-text");

                    // Slide in the white background
                    if (fill) fill.style.width = "100%";

                    // Change text color to Gold
                    if (text) text.style.color = "#22C55E";
                  }}
                  onMouseLeave={(e) => {
                    const fill = e.currentTarget.querySelector(".hover-fill");
                    const text = e.currentTarget.querySelector(".btn-text");

                    // Slide out the white background
                    if (fill) fill.style.width = "0%";

                    // Reset text color to White
                    if (text) text.style.color = "#fff";
                  }}
                >
                  {/* Hover Fill Layer: White */}
                  <div
                    className="hover-fill"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "0%",
                      height: "100%",
                      background: "#ffffff", // White background on hover
                      transition: "width 0.4s ease",
                      zIndex: -1,
                    }}
                  />

                  {/* Text Span with Transition */}
                  <span
                    className="btn-text"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      color: "#fff", // Initial color
                      transition: "color 0.3s ease",
                    }}
                  >
                    Download PDF
                  </span>
                </button>
              </div>
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-[60%] py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold  tracking-[0.1em] text-[14px] transition-all rounded-xl shadow-2xl"
              >
                Download PDF
              </motion.button> */}
            </motion.div>
          </div>
        </div>
      </section>
      <Slider />
      {/* 6. INTERACTIVE MAP, OVERLAPPING FORM & LOCATION INTEL */}
      <section className="relative bg-stone-50 pb-20 md:pb-30 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* MAP CONTAINER WITH DEPTH EFFECTS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-0 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group"
          >
            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
            <img
              src="/assets/images/nature-city-map.jpg"
              alt="The Nature City Site Map"
              className="w-full h-[400px] md:h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </motion.div>

          {/* OVERLAPPING PREMIUM FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative z-20 -mt-16 md:-mt-24 mx-auto max-w-6xl"
          >
            <div className="bg-[#022c22] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-8 md:p-12 border border-emerald-800/30 backdrop-blur-md">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
                {/* Input Group 1 */}
                <div className="relative group/input">
                  <input
                    type="text"
                    required
                    className="peer w-full bg-transparent border-b border-emerald-800/50 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all placeholder-transparent"
                    id="name"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-emerald-500 text-xs  tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-emerald-400 peer-focus:text-xs"
                  >
                    Your Name
                  </label>
                </div>

                {/* Input Group 2 */}
                <div className="relative group/input">
                  <input
                    type="tel"
                    required
                    className="peer w-full bg-transparent border-b border-emerald-800/50 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all placeholder-transparent"
                    id="phone"
                    placeholder="Phone"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 -top-3.5 text-emerald-500 text-xs  tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-emerald-400 peer-focus:text-xs"
                  >
                    Phone Number
                  </label>
                </div>

                {/* Input Group 3 */}
                <div className="relative group/input">
                  <select className="peer w-full bg-transparent border-b border-emerald-800/50 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all appearance-none cursor-pointer">
                    <option className="bg-[#022c22]" value="">
                      Select Range
                    </option>
                    <option className="bg-[#022c22]" value="1.5">
                      1.5Cr - 2.5Cr
                    </option>
                    <option className="bg-[#022c22]" value="2.5">
                      2.5Cr - 4Cr
                    </option>
                  </select>
                  <label className="absolute left-0 -top-3.5 text-emerald-500 text-xs  tracking-widest">
                    Select Budget
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  {/* Changed Button to Gold Theme */}
                  <button
                    style={{
                      padding: "14px 40px",
                      backgroundColor: "#22C55E", // Default Gold Background
                      borderRadius: "8px",
                      color: "#fff", // Default White Text
                      fontSize: "1.1rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      position: "relative",
                      overflow: "hidden",
                      zIndex: 1,
                      border: "2px solid #22C55E", // Border keeps the button size stable
                      margin: "0 auto",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      const fill = e.currentTarget.querySelector(".hover-fill");
                      const text = e.currentTarget.querySelector(".btn-text");

                      // Slide in the white background
                      if (fill) fill.style.width = "100%";

                      // Change text color to Gold
                      if (text) text.style.color = "#22C55E";
                    }}
                    onMouseLeave={(e) => {
                      const fill = e.currentTarget.querySelector(".hover-fill");
                      const text = e.currentTarget.querySelector(".btn-text");

                      // Slide out the white background
                      if (fill) fill.style.width = "0%";

                      // Reset text color to White
                      if (text) text.style.color = "#fff";
                    }}
                  >
                    {/* Hover Fill Layer: White */}
                    <div
                      className="hover-fill"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "0%",
                        height: "100%",
                        background: "#ffffff", // White background on hover
                        transition: "width 0.4s ease",
                        zIndex: -1,
                      }}
                    />

                    {/* Text Span with Transition */}
                    <span
                      className="btn-text"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        color: "#fff", // Initial color
                        transition: "color 0.3s ease",
                      }}
                    >
                      Schedule a Visit
                    </span>
                  </button>
                </div>
                {/* <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#10b981" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-600 text-white font-bold py-5 rounded-xl  tracking-[0.1em] text-[14px] shadow-2xl transition-all"
                >
                  Schedule a Visit
                </motion.button> */}
              </form>
            </div>
          </motion.div>

          {/* LOCATION DETAILS GRID */}
          <div className="mt-20 md:mt-30 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-10"
            >
              <h2 className="text-5xl md:text-7xl font-Condensed Sans-Serif text-[#022c22] leading-[1.1]">
                Minutes from <br />
                <span className="text-emerald-600 ">Global Connectivity.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="https://maps.app.goo.gl/J8HYx5LFmu9Yd1Gu7?g_st=ic">
                  <div className="pt-4">
                    {/* Changed Button to Gold Theme */}
                    <button
                      style={{
                        padding: "14px 40px",
                        backgroundColor: "#22C55E", // Default Gold Background
                        borderRadius: "8px",
                        color: "#fff", // Default White Text
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        position: "relative",
                        overflow: "hidden",
                        zIndex: 1,
                        border: "2px solid #22C55E", // Border keeps the button size stable
                        margin: "0 auto",
                        letterSpacing: "1px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        const fill =
                          e.currentTarget.querySelector(".hover-fill");
                        const text = e.currentTarget.querySelector(".btn-text");

                        // Slide in the white background
                        if (fill) fill.style.width = "100%";

                        // Change text color to Gold
                        if (text) text.style.color = "#22C55E";
                      }}
                      onMouseLeave={(e) => {
                        const fill =
                          e.currentTarget.querySelector(".hover-fill");
                        const text = e.currentTarget.querySelector(".btn-text");

                        // Slide out the white background
                        if (fill) fill.style.width = "0%";

                        // Reset text color to White
                        if (text) text.style.color = "#fff";
                      }}
                    >
                      {/* Hover Fill Layer: White */}
                      <div
                        className="hover-fill"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "0%",
                          height: "100%",
                          background: "#ffffff", // White background on hover
                          transition: "width 0.4s ease",
                          zIndex: -1,
                        }}
                      />

                      {/* Text Span with Transition */}
                      <span
                        className="btn-text"
                        style={{
                          position: "relative",
                          zIndex: 1,
                          color: "#fff", // Initial color
                          transition: "color 0.3s ease",
                        }}
                      >
                        Open in Google Maps
                      </span>
                    </button>
                  </div>
                  {/* <button className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-8 py-5 rounded-full font-bold  tracking-widest text-[10px] shadow-xl transition-all flex items-center justify-center gap-3 group">
                    Open in Google Maps
                    <span className="group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </button> */}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Airport Access",
                    desc: "25 minutes to Bengaluru International Airport.",
                  },
                  {
                    title: "Prime Hubs",
                    desc: "Bordering the Government IT Investment Region.",
                  },
                  {
                    title: "Luxury Near",
                    desc: "12 minute drive from JW Marriott.",
                  },
                  {
                    title: "Care Within Reach",
                    desc: "20 minute drive to Manipal Hospital.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="p-8 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="h-1 w-12 bg-emerald-600 mb-6 group-hover:w-full transition-all duration-500"></div>
                    <h4 className="text-emerald-900 font-bold  tracking-widest text-xs mb-3">
                      {item.title}
                    </h4>
                    <p className="text-stone-500 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-8 bg-emerald-50 rounded-3xl border border-emerald-100  text-emerald-800 font-Condensed Sans-Serif">
                "In the same belt as the Aerospace SEZ & the Devanahalli
                Business Zone."
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* VILLA ORIENTATION TOGGLE & DETAILS SECTION */}
      <section className="bg-stone-50 relative overflow-visible">
        {/* HERO IMAGE & TOGGLE */}
        <div className="relative h-[60vh] md:h-[80vh] w-full overflow-visible">
          <AnimatePresence mode="wait">
            <motion.img
              key={orientation}
              src={villaData[orientation].heroImg}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover"
              alt={villaData[orientation].title}
            />
          </AnimatePresence>

          {/* OVERLAPPING TOGGLE BUTTONS - Fixed Z-Index & Responsiveness */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[110] flex shadow-2xl rounded-xl overflow-hidden border border-emerald-900/10 bg-white min-w-fit whitespace-nowrap">
            <button
              onClick={() => setOrientation("east")}
              className={`px-5 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold tracking-widest  transition-all duration-500 ${orientation === "east" ? "bg-[#022c22] text-white shadow-inner" : "bg-white text-emerald-900 hover:bg-stone-100"}`}
            >
              East Facing Villa
            </button>
            <button
              onClick={() => setOrientation("west")}
              className={`px-5 md:px-10 py-4 md:py-6 text-[9px] md:text-[10px] font-bold tracking-widest  transition-all duration-500 ${orientation === "west" ? "bg-[#022c22] text-white shadow-inner" : "bg-white text-emerald-900 hover:bg-stone-100"}`}
            >
              West Facing Villa
            </button>
          </div>
        </div>

        {/* DETAILS & FLOOR PLANS */}
        <div className="pt-20 md:pt-30 pb-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
            {/* LEFT: TEXT & FLOOR PLANS */}
            <div className="space-y-12 order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={orientation}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-3"
                >
                  <h2 className="text-3xl md:text-6xl font-Condensed Sans-Serif text-[#022c22] leading-tight">
                    {villaData[orientation].title}
                  </h2>
                  <div className="flex flex-wrap gap-4 items-center">
                    <p className="text-base md:text-lg text-stone-500 font-light ">
                      {villaData[orientation].size}
                    </p>
                    <span className="hidden md:block h-4 w-[1px] bg-stone-300"></span>
                    <p className="text-xl md:text-2xl font-bold text-emerald-700">
                      Starting at {villaData[orientation].price}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {villaData[orientation].floorPlans.map((plan, idx) => (
                  <motion.div
                    key={`${orientation}-plan-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-4 shadow-xl rounded-2xl border border-stone-100 group overflow-hidden"
                  >
                    <img
                      src={plan}
                      alt="Villa Floor Plan"
                      className="w-full h-auto rounded-lg group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: BROCHURE & NEXT STEPS */}
            <div className="lg:pt-24 space-y-16 order-2">
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-Condensed Sans-Serif text-[#022c22]">
                  What does my resort villa look like?
                </h3>
                <div className="w-16 h-1 bg-emerald-600 rounded-full"></div>
                <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg">
                  All villas are 3100 sq. ft., but layouts vary based on plot
                  orientation. Once you choose your plot, the appropriate design
                  will be built for you.
                </p>
              </div>

              {/* MASTERPLAN IMAGE */}
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-emerald-50 p-6 md:p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm"
              >
                <img
                  src="/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.57 AM.jpeg"
                  alt="Estate Layout"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                <p className="mt-4 text-center text-[9px]  tracking-[0.3em] text-emerald-800 font-bold">
                  Estate Masterplan View
                </p>
              </motion.div>

              {/* NEXT STEPS LIST */}
              <div className="bg-[#022c22] p-8 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h4 className="text-xl md:text-2xl font-Condensed Sans-Serif mb-8 border-b border-emerald-800 pb-4">
                  Next Steps
                </h4>
                <ol className="space-y-5 text-stone-300 font-light list-decimal pl-5 marker:text-emerald-500 marker:font-bold">
                  <li className="pl-2">Pick your plot</li>
                  <li className="pl-2">Buy and register your plot</li>
                  <li className="pl-2">Sign Construction Agreement</li>
                  <li className="pl-2">Sign managed service agreement</li>
                  <li className="pl-2">Villa Build Starts</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 9. INVESTMENT ASSET SECTION */}
      <section className="bg-stone-50 py-10 md:py-15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Content & Video */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-Condensed Sans-Serif text-[#022c22]">
                  Can a resort villa <br />
                  <span className=" text-emerald-600">be an asset?</span>
                </h2>
                <p className="text-stone-500 font-light leading-relaxed">
                  A resort villa like this has a monthly maintenance fee of
                  ₹60,000 to ₹80,000, which can seem high. However, professional
                  management ensures your property remains a valuable,
                  appreciating asset.
                </p>
              </div>

              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/vft3CThpvQc"
                  title="Investment Talk"
                />
                <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* Right: Interactive Comparison Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              {[
                {
                  title: "6 Months Free",
                  usage: "Use for 6 months; rent for 6 months",
                  yield: "5% p.a.",
                  total: "5% p.a.",
                  highlight: false,
                },
                {
                  title: "Guaranteed Income",
                  usage: "30 complimentary nights per year",
                  yield: "3-5% p.a.",
                  total: "8-10% p.a.",
                  highlight: true,
                },
                {
                  title: "Revenue Share",
                  usage: "30 complimentary nights per year",
                  yield: "0-10% p.a.",
                  total: "5-15% p.a.",
                  highlight: false,
                },
              ].map((scheme, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className={`p-8 rounded-[2rem] border transition-all ${
                    scheme.highlight
                      ? "bg-[#022c22] text-white border-emerald-500 shadow-2xl scale-105 z-10"
                      : "bg-white text-[#022c22] border-stone-200"
                  }`}
                >
                  <p className="text-[10px]  tracking-widest font-bold mb-4 opacity-60">
                    Scheme
                  </p>
                  <h3 className="text-xl font-Condensed Sans-Serif mb-6 h-12 leading-tight">
                    {scheme.title}
                  </h3>

                  <div className="space-y-6">
                    <div className="pt-6 border-t border-current/10">
                      <p className="text-[10px]  font-bold opacity-50 mb-1">
                        Maintenance
                      </p>
                      <p className="text-sm">Zero monthly fees</p>
                    </div>
                    <div>
                      <p className="text-[10px]  font-bold opacity-50 mb-1">
                        Usage
                      </p>
                      <p className="text-sm leading-snug">{scheme.usage}</p>
                    </div>
                    <div>
                      <p className="text-[10px]  font-bold opacity-50 mb-1">
                        Asset Appreciation
                      </p>
                      <p className="text-sm font-bold text-emerald-500">
                        5% p.a.
                      </p>
                    </div>
                    <div className="pt-6 border-t-2 border-emerald-500/30">
                      <p className="text-[10px]  font-bold opacity-50 mb-1 text-emerald-400">
                        Total Value
                      </p>
                      <p className="text-2xl font-bold">{scheme.total}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 10. AMENITIES SECTION - Bright Glass & Forest */}
      <section className="bg-[#051d17] py-20 md:py-30 relative overflow-hidden">
        {/* Large White Ambient Light Leak */}
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-emerald-950 text-[10px] font-bold  tracking-[0.3em]">
                  Premium Lifestyle
                </span>
              </div>
              <h2 className="text-5xl md:text-8xl font-Condensed Sans-Serif text-white">
                61+
                <span className="text-white decoration-white/30">
                  Amenities.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-white/80 font-light text-lg md:text-xl leading-relaxed">
              From Olympic-sized pools to digital workouts, every detail is
              crafted for a
              <span className="text-white font-medium">
                world-class resort experience.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                label: "Clubhouse Life & Pool",
                items: [
                  "Function Hall",
                  "Dance Floor",
                  "Zumba Room",
                  "Reading Lounge",
                  "Digital Workout",
                  "Swimming Pool",
                  "Aqua Gym",
                ],
              },
              {
                label: "Sports & Play",
                items: [
                  "Tennis Court",
                  "Cricket Nets",
                  "Kabbadi Court",
                  "Badminton Court",
                  "Volley Ball",
                  "Kids Play Area",
                  "Sand Pit",
                ],
              },
              {
                label: "Outdoor & Nature",
                items: [
                  "Avenue Plantation",
                  "Jogging Track",
                  "Yoga Lawn",
                  "Tree Plaza",
                  "Cycle Racks",
                  "Hammock Garden",
                ],
              },
              {
                label: "Facilities & Security",
                items: [
                  "24/7 Security",
                  "RFID Gate Barrier",
                  "Rain Water Harvesting",
                  "Solar Power Backup",
                  "Car Parking",
                  "CCTV",
                ],
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/90 border border-white p-8 rounded-[2.5rem] hover:bg-white transition-all duration-500 group shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                <h3 className="text-emerald-900 font-bold  tracking-[0.2em] text-[10px] mb-8 group-hover:translate-x-2 transition-transform">
                  {cat.label}
                </h3>
                <ul className="space-y-4">
                  {cat.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-slate-700 text-sm font-medium group-hover:text-emerald-600 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 11. FAQ SECTION - Brightened Background */}
      <section className="relative bg-[#051d17] py-20 md:py-30 overflow-hidden border-t border-white/10">
        {/* Brightened Background Image Layer */}
        <div className="absolute inset-0 opacity-60 pointer-events-none">
         
          {/* Increased opacity from 0.4 to 0.6 */}
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg ?? "default"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={
                activeImg !== null
                  ? faqBgImages[activeImg]
                  : "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.20 PM.jpeg"
              }
              className="w-full h-full object-cover brightness-[0.8] contrast-[1.1]"
            />
          </AnimatePresence>
          {/* Added a light gradient overlay to blend the image into the white cards better */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#051d17]/50 via-transparent to-[#051d17]/80" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-start">
            <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
                <span className="text-emerald-950 text-[10px] font-bold  tracking-widest">
                  Information Hub
                </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-Condensed Sans-Serif text-white leading-none drop-shadow-md">
                Queries <br />
                <span className=" text-white font-light text-4xl md:text-6xl block mt-4  decoration-white/40">
                  Answered.
                </span>
              </h2>
            </div>

            <div className="lg:w-2/3 w-full space-y-4 md:space-y-6">
              {[
                {
                  q: "How does the villa design cater to holiday living?",
                  a: "The villas provide a seamless blend of indoor and outdoor living with expansive windows, open-plan areas, and smooth transitions to private decks.",
                  tag: "Architecture",
                },
                {
                  q: "How much does a resort villa cost?",
                  a: "The investment starts at ₹2.7 crores and scales with villa size. This includes elite Clubhousehouse access and estate management.",
                  tag: "Investment",
                },
                {
                  q: "How do the rental yield schemes work?",
                  a: "Choose between Guaranteed Income (8-10% p.a.), Revenue Share (up to 15%), or a balanced 6-month free usage model.",
                  tag: "Returns",
                },
                {
                  q: "What amenities are included in the estate?",
                  a: "The City features 61+ amenities including an Aqua Gym, Digital Workouts, and professional sports courts.",
                  tag: "Facilities",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActiveImg(i)}
                  onMouseLeave={() => setActiveImg(null)}
                  className={`p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 border cursor-pointer ${
                    activeImg === i
                      ? "bg-white border-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] scale-[1.02]"
                      : "bg-white/20 border-white/30 backdrop-blur-md hover:bg-white/30"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                      <span
                        className={`font-bold text-[10px]  tracking-widest transition-colors ${activeImg === i ? "text-emerald-600" : "text-white"}`}
                      >
                        {faq.tag}
                      </span>
                      <h3
                        className={`text-2xl md:text-4xl font-Condensed Sans-Serif leading-tight transition-colors ${activeImg === i ? "text-emerald-950" : "text-white"}`}
                      >
                        {faq.q}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: activeImg === i ? 45 : 0 }}
                      className={`w-14 h-14 rounded-full border flex items-center justify-center shrink-0 transition-all ${activeImg === i ? "bg-emerald-600 border-emerald-600 text-white" : "border-white/60 text-white bg-white/10"}`}
                    >
                      <span className="text-2xl">↗</span>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {activeImg === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-8 mt-8 border-t border-emerald-100 text-slate-600 font-light  text-lg leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-[#f8f9f8] py-20 md:py-30 lg:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Light Aesthetic Background Elements - Hidden on very small screens to improve performance */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[5%] left-[-10%] md:top-[10%] md:left-[15%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-emerald-100 rounded-full blur-[60px] md:blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[5%] right-[-10%] md:bottom-[10%] md:right-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-stone-200 rounded-full blur-[80px] md:blur-[120px]"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] md:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-white bg-white/40 backdrop-blur-md"
          >
            {/* Left Side: Information (40% Width) */}
            <div className="lg:w-2/5 p-8 sm:p-12 md:p-16 bg-[#0a241f] flex flex-col justify-between relative overflow-hidden">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"></div>

              <div className="relative z-10 space-y-8 md:space-y-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans text-white leading-[1.1] tracking-tight">
                  Begin your <br />
                  <span className=" text-emerald-400 font-light">Journey.</span>
                </h2>

                <div className="space-y-6 md:space-y-10 pt-8 md:pt-10 border-t border-white/10">
                  {[
                    { l: "Sales Inquiry", d: "+91 98450-77177" },
                    { l: "Estate Office", d: "Devanahalli, Bengaluru" },
                    { l: "Email", d: "concierge@natureCity.com" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 10 }}
                      className="group cursor-default"
                    >
                      <p className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] text-emerald-500 mb-1 md:mb-2 font-black ">
                        {item.l}
                      </p>
                      <p className="text-lg md:text-xl text-white font-light tracking-wide group-hover:text-emerald-200 transition-colors">
                        {item.d}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Form (60% Width) */}
            <div className="lg:w-3/5 p-8 sm:p-12 md:p-16 lg:p-20 bg-white/90 flex items-center">
              <div className="w-full">
                <div className="mb-10 md:mb-14">
                  <h3 className="text-emerald-950 text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.5em] mb-3 md:mb-4 ">
                    Discovery Request
                  </h3>
                  <div className="h-1 w-10 md:w-12 bg-emerald-600 rounded-full"></div>
                </div>

                <form className="space-y-8 md:space-y-12">
                  <div className="relative group">
                    <input
                      type="text"
                      required
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-stone-200 py-3 md:py-4 text-emerald-950 text-lg md:text-xl font-light focus:outline-none focus:border-emerald-600 transition-all placeholder-transparent"
                    />
                    <label className="absolute left-0 -top-4 text-[9px] md:text-[10px] tracking-widest font-bold text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-emerald-600">
                      Full Name
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="relative group">
                      <input
                        type="email"
                        required
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-stone-200 py-3 md:py-4 text-emerald-950 text-base focus:outline-none focus:border-emerald-600 transition-all placeholder-transparent"
                      />
                      <label className="absolute left-0 -top-4 text-[9px] md:text-[10px] tracking-widest font-bold text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-emerald-600">
                        Email
                      </label>
                    </div>

                    <div className="relative group">
                      <input
                        type="tel"
                        required
                        placeholder=" "
                        className="peer w-full bg-transparent border-b border-stone-200 py-3 md:py-4 text-emerald-950 text-base focus:outline-none focus:border-emerald-600 transition-all placeholder-transparent"
                      />
                      <label className="absolute left-0 -top-4 text-[9px] md:text-[10px] tracking-widest font-bold text-stone-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 md:peer-placeholder-shown:top-4 peer-focus:-top-4 peer-focus:text-emerald-600">
                        Phone
                      </label>
                    </div>
                  </div>
                  <div className="pt-4">
                    {/* Changed Button to Gold Theme */}
                    <button
                      style={{
                        padding: "14px 40px",
                        backgroundColor: "#22C55E", // Default Gold Background
                        borderRadius: "8px",
                        color: "#fff", // Default White Text
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "flex",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        position: "relative",
                        overflow: "hidden",
                        zIndex: 1,
                        border: "2px solid #22C55E", // Border keeps the button size stable
                        margin: "0 auto",
                        letterSpacing: "1px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        const fill =
                          e.currentTarget.querySelector(".hover-fill");
                        const text = e.currentTarget.querySelector(".btn-text");

                        // Slide in the white background
                        if (fill) fill.style.width = "100%";

                        // Change text color to Gold
                        if (text) text.style.color = "#22C55E";
                      }}
                      onMouseLeave={(e) => {
                        const fill =
                          e.currentTarget.querySelector(".hover-fill");
                        const text = e.currentTarget.querySelector(".btn-text");

                        // Slide out the white background
                        if (fill) fill.style.width = "0%";

                        // Reset text color to White
                        if (text) text.style.color = "#fff";
                      }}
                    >
                      {/* Hover Fill Layer: White */}
                      <div
                        className="hover-fill"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "0%",
                          height: "100%",
                          background: "#ffffff", // White background on hover
                          transition: "width 0.4s ease",
                          zIndex: -1,
                        }}
                      />

                      {/* Text Span with Transition */}
                      <span
                        className="btn-text"
                        style={{
                          position: "relative",
                          zIndex: 1,
                          color: "#fff", // Initial color
                          transition: "color 0.3s ease",
                        }}
                      >
                        Send Request
                      </span>
                    </button>
                  </div>

                  {/* <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "#059669",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto px-10 md:px-14 py-4 md:py-5 bg-emerald-600 text-white font-bold rounded-full tracking-[0.2em] text-[10px] shadow-lg flex items-center justify-center gap-4 transition-all"
                  >
                    Send Request
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </motion.button> */}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
