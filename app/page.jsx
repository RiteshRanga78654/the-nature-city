"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Slider from "./components/Slider";
import Footer from "./components/Footer";

const Page = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [brochureForm, setBrochureForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleBrochureDownload = (e) => {
    e.preventDefault();

    // 1. Capture user details
    console.log("Brochure Lead:", brochureForm);

    // 👉 Later you can send this to API
    // fetch("/api/brochure-lead", { method: "POST", body: JSON.stringify(brochureForm) })

    // 2. Download brochure
    const link = document.createElement("a");
    link.href = "/assets/pdf/green.pdf";
    link.download = "The-Nature-City-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 3. Close modal
    setIsDownloadModalOpen(false);

    // 4. Reset form (optional)
    setBrochureForm({ name: "", email: "", phone: "" });
  };

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("learn");
  const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);

  const brochureImages = [
    "/assets/images/db-the-nature-city.jpeg",
    "/assets/images/hero image.jfif",
    "assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.24 PM.jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.21 PM (1).jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.15 PM (1).jpeg",
  ];
  // Add this inside your component
  useEffect(() => {
    const autoSlider = setInterval(() => {
      nextBrochure();
    }, 3000); // Changes image every 5 seconds

    return () => clearInterval(autoSlider); // Cleanup on unmount
  }, [currentBrochureIndex]); // Restarts timer whenever index changes

  // 1. State for tracking hovered FAQ to change background
  const [activeImg, setActiveImg] = useState(null);

  // 2. Images that will fade-in when you hover over questions
  const faqBgImages = [
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.22 PM (2).jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.17 PM.jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.18 PM (1).jpeg",
    // "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.18 PM.jpeg",
  ];
  const nextBrochure = () => {
    setCurrentBrochureIndex((prev) => (prev + 1) % brochureImages.length);
  };

  const [orientation, setOrientation] = useState("1BHK");

  const villaData = {
    "1BHK": {
      title: "Premium Villas",
      price: "Request",
      size: "4 villa configurations available",
      heroImg:
        "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.19 PM (1).jpeg",
      floorPlans: [
        "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.16 PM.jpeg",
        "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.23 PM.jpeg",
      ],
      masterPlan:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.54 AM.jpeg", // New key
    },
    "2BHK": {
      title: "2BHK Luxury Villa",
      price: "₹2.5Cr",
      size: "2100 sft built up",
      heroImg:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.56 AM (1).jpeg",
      floorPlans: [
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.56 AM.jpeg",
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.57 AM.jpeg",
      ],
      masterPlan:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.00 AM.jpeg", // New key
    },
    "3BHK": {
      title: "3BHK Luxury Villa",
      price: "₹3.5Cr",
      size: "3175 sft built up",
      heroImg:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.59 AM (2).jpeg",
      floorPlans: [
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.54 AM (1).jpeg",
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.56 AM (2).jpeg",
      ],
      masterPlan:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.57 AM.jpeg", // Original
    },
    "4BHK": {
      title: "4BHK Luxury Villa",
      price: "₹4.5Cr",
      size: "4200 sft built up",
      heroImg:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.58 AM.jpeg",
      floorPlans: [
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.01 AM.jpeg",
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.03 AM (2).jpeg",
      ],
      masterPlan:
        "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.05 AM (2).jpeg", // New key
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
                {["Luxury Villas", "Invest in Plot", "Enjoy Clubhouse"].map(
                  (item, i) => (
                    <motion.a
                      key={item}
                      href="#"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl font-Condensed Sans-Serif hover:text-emerald-400 transition-colors"
                    >
                      <a
                        href={
                          item === "Luxury Villas"
                            ? "/"
                            : item === "Invest in Plot"
                              ? "/plots"
                              : item === "Enjoy Clubhouse"
                                ? "/clubhouse"
                                : "#"
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </a>
                    </motion.a>
                  ),
                )}
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
          className="group flex items-center gap-3 focus:outline-none cursor-pointer"
        >
          <span className="text-[10px]  tracking-widest hidden sm:block ">
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
            muted
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
          <h1  className="text-5xl md:text-[110px] leading-[0.85] font-Condensed Sans-Serif mb-6 text-white tracking-tight gap-2">
            Where Adventure Meets <br/><span className="text-emerald-500">Calmness</span>
          </h1>

          <p className="text-[9px] md:text-[15px] font-bold tracking-[0.4em]mb-10 text-emerald-400 opacity-90">
            {/* •LuxuryVillas  */}
          </p>
        </motion.div>
        {/* Navigation Buttons */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[95%] md:max-w-4xl px-2">
          <div className="flex h-[75px] md:h-[95px] w-full items-center overflow-visible">
            {/* VILLAS BUTTON */}
            <button
              onClick={() => {
                setActiveTab("learn");
                router.push("/");
              }}
              className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ease-in-out h-full
        ${
          activeTab === "learn"
            ? "flex-[1.5] bg-emerald-600 text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "flex-1 bg-[#011411] text-stone-400 z-10"
        }`}
            >
              <span
                className={`font-Condensed Sans-Serif  leading-none transition-all duration-500 ${activeTab === "learn" ? "text-3xl md:text-4xl mb-1" : "text-xl md:text-2xl"}`}
              >
                Buy
              </span>
              <span className="text-[7px] md:text-[13px] font-bold tracking-[0.15em] uppercase">
                A Luxury Villa
              </span>
            </button>

            {/* PLOTS BUTTON */}
            <button
              onClick={() => {
                setActiveTab("community");
                router.push("/plots");
              }}
              className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ease-in-out h-full
        ${
          activeTab === "community"
            ? "flex-[1.5] bg-emerald-600 text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "flex-1 bg-[#011411] text-stone-400 z-10 border-l border-white/5"
        }`}
            >
              <span
                className={`font-Condensed Sans-Serif leading-none transition-all duration-500 ${activeTab === "community" ? "text-3xl md:text-4xl mb-1" : "text-xl md:text-2xl"}`}
              >
                Invest
              </span>
              <span className="text-[7px] md:text-[13px] font-bold tracking-[0.15em] uppercase">
                In A Plot
              </span>
            </button>

            {/* CLUBHOUSE BUTTON */}
            <button
              onClick={() => {
                setActiveTab("Clubhouse");
                router.push("/clubhouse");
              }}
              className={`relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ease-in-out h-full
        ${
          activeTab === "Clubhouse"
            ? "flex-[1.5] bg-emerald-600 text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "flex-1 bg-[#011411] text-stone-400 z-10 border-l border-white/5"
        }`}
            >
              <span
                className={`font-Condensed Sans-Serif  leading-none transition-all duration-500 ${activeTab === "Clubhouse" ? "text-3xl md:text-4xl mb-1" : "text-xl md:text-2xl"}`}
              >
                Enjoy
              </span>
              <span className="text-[7px] md:text-[13px] mt-2 font-bold tracking-[0.15em] uppercase">
                The Clubhouse
              </span>
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
            className="text-4xl md:text-7xl font-semibold font-Condensed Sans-Serif leading-tight text-emerald-900"
          >
            More Than a Township. 
            <br />
            <span className="text-emerald-600 "> A Way of Life.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-1 bg-emerald-600 mb-8"></div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-emerald-800/80">
             The Nature City Spread across 43 RERA-approved acres in Bondapalli, Vizianagaram. Welcome to India's most adventurous gated community with IGBC Platinum-certified living with Miyawaki Forest.
            </p>
          </motion.div>
        </div>
      </section>
      <div className="relative group overflow-hidden h-[300px] md:h-[550px] w-full">
        <img
          src="/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.04 AM.jpeg"
          alt="Plot Map"
          className="w-full h-[550px] object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 -mt-120 md:-mt-90"
        >
          <h1 className="text-3xl md:text-7xl leading-[0.85] font-Condensed Sans-Serif mb-6 text-white tracking-tight">
            Breathe Pure. Live Green. Thrive Naturally.
          </h1>

          <p className="text-[12px] md:text-[22px] font-bold tracking-[0.1em] mb-10 text-white opacity-90">
            Your Kids Deserve Better give them 281+ amenities designed for childhood as <br/>it should be wild, wonderful, and worry-free.
          </p>
        </motion.div>
      </div>
      {/* 5. VIDEO & INTERACTIVE BROCHURE SECTION */}
      <section className="bg-[#022c22] py-20 md:py-25 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* VIDEO SIDE - Remains the same */}
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
                Why The Nature City?
              </h3>
              <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                Safe, gated community with dedicated zones for kids, seniors, and everyone in between.
India's first residential township with go-karting, sky cycling, zipline, paintball, ATV rides, and 20+ adventure activities right at your doorstep.

              </p>
            </div>
          </motion.div>

          {/* AUTOMATIC BROCHURE SLIDER SIDE */}
          <div className="flex flex-col gap-16">
            <div className="relative w-full max-w-sm mx-auto lg:ml-auto group">
              <div className="absolute -top-12 left-0 text-[10px] tracking-[0.3em] text-emerald-500 font-bold opacity-60">
                Digital Experience — Auto Playing
              </div>

              <div className="relative aspect-[4/5] w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentBrochureIndex}
                    src={brochureImages[currentBrochureIndex]}
                    // Slide in from right with a rotation
                    initial={{ opacity: 0, x: 100, rotate: 10 }}
                    // Center with a slight organic tilt
                    animate={{ opacity: 1, x: 0, rotate: -2 }}
                    // Exit to the left with a rotation
                    exit={{ opacity: 0, x: -100, rotate: -10 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1], // Smooth cubic-bezier
                    }}
                    className="absolute w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-[#ffffff] p-3"
                    alt="Brochure Page"
                  />
                </AnimatePresence>

                {/* Decorative layers - Fixed rotation so they don't jump during slide */}
                <div className="absolute inset-0 bg-emerald-900/40 -z-10 translate-x-3 translate-y-3 rounded-2xl rotate-2"></div>
                <div className="absolute inset-0 bg-emerald-800/20 -z-20 translate-x-6 translate-y-6 rounded-2xl -rotate-1"></div>
              </div>
            </div>

            {/* DOWNLOAD SECTION */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center lg:text-right space-y-10"
            >
              <h4 className="text-3xl md:text-5xl font-Condensed Sans-Serif leading-tight">
                Download our <br /> Digital Brochure
              </h4>
              <div className="pt-4">
                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  style={{
                    padding: "14px 60px",
                    backgroundColor: "#22C55E",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    // display: "flex",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    border: "2px solid #22C55E",
                    margin: "0 auto",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                  }}
                  // Standard Hover Handlers restored from your code
                  onMouseEnter={(e) => {
                    const fill = e.currentTarget.querySelector(".hover-fill");
                    const text = e.currentTarget.querySelector(".btn-text");
                    if (fill) fill.style.width = "100%";
                    if (text) text.style.color = "#22C55E";
                  }}
                  onMouseLeave={(e) => {
                    const fill = e.currentTarget.querySelector(".hover-fill");
                    const text = e.currentTarget.querySelector(".btn-text");
                    if (fill) fill.style.width = "0%";
                    if (text) text.style.color = "#fff";
                  }}
                >
                  <div
                    className="hover-fill"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "0%",
                      height: "100%",
                      background: "#ffffff",
                      transition: "width 0.4s ease",
                      zIndex: -1,
                    }}
                  />
                  <span
                    className="btn-text"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      color: "#fff",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Download PDF
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
      </section>
      <Slider />

      {/* VILLA ORIENTATION TOGGLE & DETAILS SECTION */}
      <section className="bg-stone-50 relative overflow-visible">
        {/* HERO IMAGE & TOGGLE */}
        <div className="relative h-[350px] md:h-[600px] w-full overflow-visible">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-center px-4 -mt-60 md:-mt-110"
            >
              <h1 className="text-3xl md:text-7xl leading-[0.85] font-Condensed Sans-Serif mb-6 text-white tracking-tight">
                281+ Amenities for Extraordinary Living
              </h1>

              <p className="text-[12px] md:text-[22px] font-bold tracking-[0.1em] mb-10 text-white opacity-90">
                Our 43-acre township is meticulously zoned to create distinct experiences while <br/> maintaining seamless connectivity.
              </p>
              {/* <p className="text-[12px] md:text-[22px] font-bold tracking-[0.1em] mb-10 text-white opacity-90">
                Adventure Zone | Wellness Zone | Water Recreation Zone | Sports Zone | Kids' Kingdom
              </p> */}
            </motion.div>
          </AnimatePresence>

          {/* OVERLAPPING TOGGLE BUTTONS - Fixed Z-Index & Responsiveness */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[95%] md:max-w-5xl px-2">
            {/* Container with overflow-visible to allow the growth to pop out */}
            <div className="flex h-[75px] md:h-[95px] w-full items-center overflow-visible">
              {["1BHK", "2BHK", "3BHK", "4BHK"].map((type, index) => {
                const isActive = orientation === type;

                return (
                  <button
                    key={type}
                    onClick={() => setOrientation(type)}
                    className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-in-out h-full
            ${index !== 0 ? "border-l border-white/10" : ""} 
            ${
              isActive
                ? "flex-[1.8] bg-[#22cc5e] text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                : "flex-1 bg-[#011411] text-stone-400 z-10 hover:bg-[#021c17]"
            }`}
                  >
                    {/* Main Title - Using your Serif style */}
                    <span
                      className={`font-Condensed Sans-Serif  leading-none transition-all duration-500 ${
                        isActive
                          ? "text-2xl md:text-3xl "
                          : "text-lg md:text-2xl"
                      }`}
                    >
                      {type.charAt(0)}BHK Villa
                    </span>

                    {/* Subtitle - Using your bold uppercase style */}
                    {/* <span className="text-[7px] md:text-[9px] font-bold tracking-[0.15em] uppercase">
                      BHK Villa
                    </span> */}

                    {/* Optional: Active Indicator Dot */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDot"
                        className="absolute top-2 right-2 w-1 h-1 bg-emerald-400 rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>
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
                      Starting Price on {villaData[orientation].price}
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
                  What lifestyle does my Villa unlock?
                </h3>
                <div className="w-16 h-1 bg-emerald-600 rounded-full"></div>
                <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg">
                  We offer 4 distinct villa types designed for different family needs. Every villa includes 281+ amenity access, 5 years free maintenance all within walking distance from your doorstep.
                </p>
              </div>
              {/* MASTERPLAN IMAGE - Now Dynamic */}
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-emerald-50 p-6 md:p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${orientation}-masterplan`} // Ensures animation triggers on change
                    src={villaData[orientation].masterPlan} // Dynamic source
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    alt="Estate Layout"
                    className="w-full h-auto rounded-2xl shadow-lg"
                  />
                </AnimatePresence>
                <p className="mt-4 text-center text-[9px] tracking-[0.3em] text-emerald-800 font-bold">
                  Estate Masterplan View ({orientation})
                </p>
              </motion.div>

              {/* NEXT STEPS LIST */}
              <div className="bg-[#022c22] p-8 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h4 className="text-xl md:text-2xl font-Condensed Sans-Serif mb-8 border-b border-emerald-800 pb-4">
                  Why The Nature City Changes Everything
                </h4>
                <ol className="space-y-5 text-stone-300 font-light list-decimal pl-5 marker:text-emerald-500 marker:font-bold">
                  <li className="pl-2">
                    281+ amenities (Industry average: 20-30)
                  </li>
                  <li className="pl-2">
                    30 acres dedicated agricultural land (Industry standard: 0)
                  </li>
                  <li className="pl-2">
                    25,000 trees and plants (Most projects: Few hundred)
                  </li>
                  <li className="pl-2">
                    IGBC Platinum certified (Only 2% of Indian townships achieve
                    this)
                  </li>
                  <li className="pl-2">43 acres RERA-approved development</li>
                  {/* <li className="pl-2">600 units designed for balanced community</li>
                  <li className="pl-2">70% construction already complete</li>
                  <li className="pl-2">5 years complimentary maintenance</li>
                  <li className="pl-2">30 minutes to airport</li>
                  <li className="pl-2">5 minutes to railway station</li> */}
                </ol>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      {/* 6. INTERACTIVE MAP, OVERLAPPING FORM & LOCATION INTEL */}
      <section className="relative bg-stone-50 pb-20 md:pb-25 px-4 md:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* MAP CONTAINER WITH DEPTH EFFECTS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-0 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group"
          >
            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
            <a
              href="https://maps.app.goo.gl/J8HYx5LFmu9Yd1Gu7?g_st=ic"
              target="_blank"
            >
              {" "}
              <img
                src="/assets/images/nature-city-map.png"
                alt="The Nature City Site Map"
                className="w-full h-[400px] md:h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
            </a>
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
                Location Intelligence for
                <br />
                <span className="text-emerald-600 ">Investment Returns</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="https://maps.app.goo.gl/J8HYx5LFmu9Yd1Gu7?g_st=ic"
                  target="_blank"
                >
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
                    desc: "30 Minutes to Airport.You're closer to the airport than most city.",
                  },
                  {
                    title: "Route with Reach",
                    desc: "5 Minutes to the Railway Station. Weekend getaways made effortless.",
                  },
                  {
                    title: "Fresh Air, Quantified",
                    desc: "Our IGBC Platinum certification ensures 40%+ green cover.",
                  },
                  {
                    title: "Commute Advantage",
                    desc: "Yes, you're 2 minutes from adventure, and 5 minutes from community.",
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

              <div className="mt-8 p-8 bg-emerald-50 rounded-3xl border border-emerald-100 text-center text-emerald-800 font-Condensed Sans-Serif">
                "In the same belt as the Aerospace SEZ & the Devanahalli
                Business Zone."
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* 11. FAQ SECTION - Brightened Background */}
      <section className="relative bg-[#051d17] py-20 md:py-25 overflow-hidden border-t border-white/10">
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
                  q: "What does IGBC Platinum certification mean for me?",
                  a: "IGBC Platinum is India's highest green building certification, achieved by only 2% of residential projects. For you, this means: lower electricity bills, cleaner air and higher property appreciation as eco-certified properties command premium pricing. ",
                  tag: "Sustainability",
                },
                {
                  q: "What makes your amenity count so high compared to other townships?",
                  a: "We offer 281+ comprehensive amenities including: Adventure zones ,6 gym types , swimming pool complex, sports courts and wellness sanctuaries that others can't match  built on 43 acres optimized for experiences, not maximum plot count.",
                  tag: "Facilities",
                },
                {
                  q: "What security measures are in place?",
                  a: "We employ a comprehensive 3-tier security system: 24/7 CCTV surveillance with GEO tagging of every plot and structure, plus emergency support. Your family's safety is our priority.",
                  tag: "Security",
                },
                // {
                //   q: "What amenities are included in the estate?",
                //   a: "The City features 61+ amenities including an Aqua Gym, Digital Workouts, and professional sports courts.",
                //   tag: "Facilities",
                // },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  onMouseEnter={() => setActiveImg(i)}
                  onMouseLeave={() => setActiveImg(null)}
                  className={`p-8 md:p-5 rounded-[0.5rem] transition-all duration-500 border cursor-pointer ${
                    activeImg === i
                      ? "bg-white border-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] scale-[1.02]"
                      : "bg-white/20 border-white/30 backdrop-blur-md hover:bg-white/30"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
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
                        <p className="pt-4 mt-4 border-t border-emerald-100 text-slate-600 font-light  text-lg leading-relaxed">
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

      <AnimatePresence>
        {isDownloadModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDownloadModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[310] flex items-center justify-center px-4"
            >
              <div className="w-full max-w-xl bg-[#022c22] border border-emerald-800/40 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] p-8 md:p-12 relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl"
                >
                  ✕
                </button>

                {/* Heading */}
                <h3 className="text-3xl md:text-4xl font-Condensed Sans-Serif text-white mb-4">
                  Download Brochure
                </h3>
                <p className="text-stone-400 text-sm md:text-base mb-10">
                  Enter your details to receive the digital brochure instantly.
                </p>

                {/* Form */}
                <form className="space-y-8" onSubmit={handleBrochureDownload}>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={brochureForm.name}
                      onChange={(e) =>
                        setBrochureForm({
                          ...brochureForm,
                          name: e.target.value,
                        })
                      }
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-emerald-800/60 py-3 text-white focus:outline-none focus:border-emerald-400 placeholder-transparent"
                    />
                    <label className="absolute left-0 -top-3.5 text-xs tracking-widest text-emerald-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs">
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={brochureForm.email}
                      onChange={(e) =>
                        setBrochureForm({
                          ...brochureForm,
                          email: e.target.value,
                        })
                      }
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-emerald-800/60 py-3 text-white focus:outline-none focus:border-emerald-400 placeholder-transparent"
                    />
                    <label className="absolute left-0 -top-3.5 text-xs tracking-widest text-emerald-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs">
                      Email Address
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={brochureForm.phone}
                      onChange={(e) =>
                        setBrochureForm({
                          ...brochureForm,
                          phone: e.target.value,
                        })
                      }
                      placeholder=" "
                      className="peer w-full bg-transparent border-b border-emerald-800/60 py-3 text-white focus:outline-none focus:border-emerald-400 placeholder-transparent"
                    />
                    <label className="absolute left-0 -top-3.5 text-xs tracking-widest text-emerald-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs">
                      Phone Number
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full mt-6 py-4 bg-[#22C55E] text-white font-bold rounded-xl tracking-widest text-sm hover:bg-emerald-500 transition-all"
                  >
                    Download Now
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Page;
