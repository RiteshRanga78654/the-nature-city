"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { useRouter } from "next/navigation";
import PlotSlider from "../components/PlotSlider";
import Footer from "../components/Footer";
import { useSpring, useInView } from "framer-motion";

const RollingNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Clean the string to see if it's a simple number + unit (like "112 Acres")
  // or a complex string (like "24/7")
  const numericPart = value.match(/\d+/);
  const isComplex = value.includes("/");

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView && !isComplex && numericPart) {
      motionValue.set(parseInt(numericPart[0]));
    }
  }, [isInView, motionValue, numericPart, isComplex]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current && !isComplex) {
        const suffix = value.replace(/[0-9]/g, "");
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
  }, [springValue, value, isComplex]);
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {isComplex ? value : "0"}
    </motion.span>
  );
};

const PlotsPage = () => {
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

  // 1. ALL HOOKS MUST BE INSIDE THE COMPONENT BODY
  const [activeTab, setActiveTab] = useState("community"); // "community" = Plots
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);

  // Parallax Logic
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const brochureImages = [
    "/assets/images/db-the-nature-city.jpeg",
    "/assets/images/hero image.jfif",
    "assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.24 PM.jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.21 PM (1).jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.15 PM (1).jpeg",
  ];

  const nextBrochure = () => {
    setCurrentBrochureIndex((prev) => (prev + 1) % brochureImages.length);
  };
  // Add this inside your component
  useEffect(() => {
    const autoSlider = setInterval(() => {
      nextBrochure();
    }, 3000); // Changes image every 5 seconds

    return () => clearInterval(autoSlider); // Cleanup on unmount
  }, [currentBrochureIndex]); // Restarts timer whenever index changes
  const neighbors = [
    {
      plot: "418",
      name: "Preetam Daniel",
      image: "/assets/images/nature-city-img/neighbour 1",
      quote:
        "For me, the bigger developers had a problem with valuation, the smaller ones had poor infrastructure. I own 3000sqft in Nature Valley and it was true value for money.",
    },
    {
      plot: "607",
      name: "Nirmal Raj",
      image: "/assets/images/nature-city-img/neighbour 2",
      quote:
        "It's easy to acquire property but maintaining it is a big headache. I think this is a good investment because they look after it and protect it.",
    },
  ];
  const plotData = [
    { no: "3", size: "1200 sft", facing: "West", value: "34.8 Lakhs" },
    { no: "10", size: "4427 sft", facing: "South", value: "123.95 Lakhs" },
    { no: "15", size: "1386 sft", facing: "East", value: "40.44 Lakhs" },
    { no: "30", size: "1753 sft", facing: "East", value: "52.89 Lakhs" },
  ];
  return (
    <>
      <div
        ref={containerRef}
        className="relative min-h-screen bg-[#022c22] text-stone-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden"
      >
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
        {/* 1. HEADER (Keep identical to Villa page for consistency) */}
        <header className="fixed top-0 w-full z-[150] flex items-center justify-between px-6 py-6 md:px-16 backdrop-blur-md bg-[#022c22]/20 border-b border-white/5">
          <div className="flex items-center gap-3 tracking-[0.3em] text-xs font-bold">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
              NC
            </div>
            <span>The Nature City</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-3 cursor-pointer"
          >
            <span className="text-[10px] tracking-widest hidden sm:block ">
              Explore
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="h-[1.5px] w-8 bg-white group-hover:w-10 transition-all"></div>
              <div className="h-[1.5px] w-10 bg-white group-hover:w-8 transition-all"></div>
            </div>
          </button>
        </header>

        {/* 2. HERO SECTION (Mirroring the Villa Page) */}
        <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center justify-center overflow-visible">
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/assets/videos/herovideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Your existing gradient overlay remains the same */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#022c22]/60"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 -mt-10"
          >
            <h1 className="text-5xl md:text-[110px] leading-[0.85] font-Condensed Sans-Serif mb-6 text-emerald-400 tracking-tight">
              Secure Your Soil
            </h1>
            <p className="text-[9px] md:text-[15px] font-bold tracking-[0.4em] mb-10 text-emerald-400 opacity-90">
              VMRDA Approved • High Growth • Clear Titles
            </p>
          </motion.div>

          {/* THE 3-WAY TOGGLE (Identical Logic) */}
          {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[90%] md:max-w-2xl px-2">
            <div className="flex bg-[#021c17] p-1.5 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 backdrop-blur-xl h-[75px] md:h-[95px]">
              <button
                onClick={() => router.push("/")} // Back to Villas
                className="flex-1 flex items-center justify-center text-[9px] md:text-xs font-bold tracking-widest text-stone-400 hover:text-stone-200"
              >
                VILLAS
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 md:gap-4 rounded-[2.2rem] text-[9px] md:text-xs font-bold tracking-widest bg-emerald-600 text-white shadow-2xl scale-[1.02]">
                PLOTS
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-5 w-5 md:h-7 md:w-7 rounded-full border-2 border-white/50 flex items-center justify-center"
                >
                  <span className="text-[10px] md:text-xs">✓</span>
                </motion.div>
              </button>

              <button
                onClick={() => router.push("/clubs")}
                className="flex-1 flex items-center justify-center text-[9px] md:text-xs font-bold tracking-widest text-stone-400 hover:text-stone-200"
              >
                CLUBHOUSE
              </button>
            </div>
          </div> */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[95%] md:max-w-4xl px-2">
            {/* The container has overflow-visible to allow the "growth" to pop out top and bottom */}
            <div className="flex h-[75px] md:h-[95px] w-full items-center overflow-visible">
              {/* VILLAS BUTTON */}
              <button
                onClick={() => {
                  setActiveTab("learn");
                  router.push("/");
                }}
                className={`relative flex flex-col items-center cursor-pointer justify-center transition-all duration-500 ease-in-out h-full
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
                  A Resort Villa
                </span>
              </button>

              {/* PLOTS BUTTON */}
              <button
                onClick={() => {
                  setActiveTab("community");
                  router.push("/plots");
                }}
                className={`relative flex flex-col items-center cursor-pointer justify-center transition-all duration-500 ease-in-out h-full
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
                className={`relative flex flex-col items-center cursor-pointer justify-center transition-all duration-500 ease-in-out h-full
        ${
          activeTab === "Clubhouse"
            ? "flex-[1.5] bg-emerald-600 text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "flex-1 bg-[#011411] text-stone-400 z-10 border-l border-white/5"
        }`}
              >
                <span
                  className={`font-Condensed Sans-Serif leading-none transition-all duration-500 ${activeTab === "Clubhouse" ? "text-3xl md:text-4xl mb-1" : "text-xl md:text-2xl"}`}
                >
                  Enjoy
                </span>
                <span className="text-[7px] md:text-[13px] font-bold tracking-[0.15em] uppercase">
                  The Clubhouse
                </span>
              </button>
            </div>
          </div>
        </section>

        <section className="bg-stone-100 py-20 md:py-30 px-6 md:px-32 text-emerald-950">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-Condensed Sans-Serif leading-tight text-emerald-900"
            >
              977 Plots. <br />
              <span className="text-emerald-600">Pure Nature.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-1 bg-emerald-600 mb-8"></div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-emerald-800/80">
                  Spread across 112 acres, each plot comes with fruit and
                  flower-bearing trees. With sizes ranging from 1200 sq.ft. to
                  5000 sq.ft., we offer a canvas for every dream.
                </p>

                <p className="text-lg md:text-xl font-light leading-relaxed text-emerald-700/70">
                  Enjoy trouble-free instant registrations and seamless
                  financing, as our project is approved by all major banks for
                  your loan requirements. Secure your piece of the City today.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        <div className="relative group overflow-hidden h-[550px] w-full">
              <img
                src="/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.00 AM (2).jpeg"
                alt="Plot Map"
                className="w-full h-[550px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
        {/* 5. ESTATE VIDEO & INTERACTIVE BROCHURE SECTION */}
        <section className="bg-[#022c22] py-20 md:py-30 px-6 md:px-12 lg:px-24">
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
                  Why invest in a Plots?
                </h3>
                <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                  Hassle-free ownership with zero maintenance. Let our
                  professional team handle the care while you enjoy the
                  lifestyle.
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
        </section>

        <section className="bg-white py-20 md:py-15 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* SECTION HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-Condensed text-[#022c22] leading-tight">
                Spend a Few Minutes Getting <br /> to know Your{" "}
                <span className="text-emerald-600 ">Neighbours.</span>
              </h2>
              <div className="h-1 w-20 bg-emerald-600 mx-auto rounded-full" />
            </motion.div>

            {/* TESTIMONIAL GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {neighbors.map((neighbor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="flex flex-col group"
                >
                  {/* IMAGE CONTAINER */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-stone-100 mb-8">
                    <img
                      src={neighbor.image}
                      alt={neighbor.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* PLOT BADGE - Sharp Geometric Style */}
                    <div className="absolute bottom-6 left-6 bg-[#022c22]/90 backdrop-blur-md px-6 py-4 border border-white/10">
                      <p className="text-emerald-500 text-[10px] tracking-[0.3em] font-black  mb-1">
                        Estate Asset
                      </p>
                      <h4 className="text-white text-2xl font-Condensed  tracking-tighter">
                        Plot {neighbor.plot}
                      </h4>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/40 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="space-y-6 px-2">
                    <p className="text-stone-500 font-light text-xl md:text-2xl leading-relaxed ">
                      "{neighbor.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-12 bg-emerald-600" />
                      <span className="text-[#022c22] font-bold tracking-widest text-xs ">
                        {neighbor.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CALL TO ACTION FOOTER */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-15 p-10 bg-stone-50 rounded-[3rem] border border-stone-100 text-center relative overflow-hidden"
            >
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h4 className="text-3xl font-Condensed text-[#022c22]">
                  Join a community of{" "}
                  <span className="text-emerald-600 ">977 families</span>{" "}
                  already investing in their future.
                </h4>
                <p className="text-stone-400 text-sm tracking-widest  font-bold">
                  Approved by all major banks for home loans
                </p>
              </div>
              {/* Subtle background graphic */}
              <div className="absolute top-0 right-0 p-8 opacity-5 text-[#022c22] font-black text-9xl -rotate-12 select-none">
                The Nature City
              </div>
            </motion.div>
          </div>
        </section>
        <PlotSlider />
        <section className="relative bg-[#021c17] py-20 md:py-25 px-6 md:px-16 overflow-hidden text-white">
          {/* Background Detail - Architectural Grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#22c55e 0.5px, transparent 0.5px)`,
              backgroundSize: "30px 30px",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* TOP SECTION: AERIAL TOUR & DESCRIPTION */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-30 items-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 space-y-8"
              >
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-emerald-500" />
                  <span className="text-emerald-500 text-xs font-black tracking-[0.5em] ">
                    Project Blueprint
                  </span>
                </div>
                <h2 className="text-4xl md:text-7xl font-Condensed leading-[0.85] tracking-tighter ">
                  Take an aerial tour <br />
                  <span className="text-emerald-500 ">of the property.</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="lg:col-span-5 pb-4"
              >
                <p className="text-stone-400 font-light text-xl leading-relaxed">
                  Spanning 112 acres across 4 Sectors. Featuring 24/7 security,
                  meditation centers, and a clubhouse designed for elite living.
                </p>
              </motion.div>
            </div>

            {/* MIDDLE SECTION: INTERACTIVE PRICING & MAP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* PRICING TABLE - Editorial Style */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12">
                  <h4 className="text-emerald-500 text-[10px] font-black tracking-[0.4em]  mb-10">
                    Live Inventory Highlights
                  </h4>

                  <div className="space-y-0">
                    {plotData.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{
                          x: 10,
                          backgroundColor: "rgba(255,255,255,0.03)",
                        }}
                        className="grid grid-cols-4 py-6 border-b border-white/10 group cursor-default transition-all"
                      >
                        <div className="flex flex-col">
                          <span className="text-stone-500 text-[9px]  font-bold">
                            Plot
                          </span>
                          <span className="text-lg font-Condensed">
                            № {item.no}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-stone-500 text-[9px]  font-bold">
                            Size
                          </span>
                          <span className="text-lg font-Condensed">
                            {item.size}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-stone-500 text-[9px]  font-bold">
                            Facing
                          </span>
                          <span className="text-lg font-Condensed">
                            {item.facing}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-emerald-500 text-[9px]  font-bold">
                            Value
                          </span>
                          <span className="text-lg font-Condensed text-emerald-400">
                            {item.value}
                          </span>
                        </div>
                      </motion.div>
                    ))}
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
                        Download The Full Price List
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* MAP DISPLAY - Modern Offset Design */}
              <div className="lg:col-span-7 order-1 lg:order-2 relative">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  className="relative aspect-[4/3] md:aspect-auto"
                >
                  <div className="absolute inset-0 bg-emerald-500/10 -rotate-2 scale-105" />
                  <div className="relative z-10 bg-stone-900 border border-white/10 p-4 shadow-2xl overflow-hidden">
                    <div className="video-container">
                      <iframe
                        width="683"
                        height="500"
                        src="https://www.youtube.com/embed/vft3CThpvQc"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  {/* Floating Map CTA */}
                  <div className="absolute -bottom-10 -right-10 hidden md:flex flex-col bg-[#A4C424] p-10 text-emerald-950 shadow-2xl z-20 max-w-xs">
                    <p className="text-sm font-bold tracking-widest  mb-4">
                      Masterplan
                    </p>
                    <h4 className="text-2xl font-Condensed leading-tight mb-6">
                      Ready to "Plug & Play" your dream villa?
                    </h4>
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
                          const text =
                            e.currentTarget.querySelector(".btn-text");

                          // Slide in the white background
                          if (fill) fill.style.width = "100%";

                          // Change text color to Gold
                          if (text) text.style.color = "#22C55E";
                        }}
                        onMouseLeave={(e) => {
                          const fill =
                            e.currentTarget.querySelector(".hover-fill");
                          const text =
                            e.currentTarget.querySelector(".btn-text");

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
                          Get HD PDF
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* BOTTOM STATS - Minimalist */}
            <div className="mt-15 mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-t text-center border-white/10 pt-12">
              {[
                { label: "Sectors", val: "4" },
                { label: "Plot Units", val: "977" },
                { label: "Estate Scale", val: "112 Acres" },
                { label: "Electricity", val: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-stone-500 text-[15px] font-black tracking-widest uppercase">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-4xl font-Condensed text-white tabular-nums">
                    <RollingNumber value={stat.val} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="max-w-4xl mx-auto py-20">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Site Plot Map</h3>
            </div>

            <div className="relative group overflow-hidden">
              <img
                src="/assets/images/plot-map.png"
                alt="Plot Map"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 text-sm text-gray-500 ">
              * Showing the latest plot availability and layout.
            </div>
          </div>
        </div>
        <section className="relative bg-stone-50 py-20 md:py-25 px-4 md:px-6 overflow-visible">
          <div className="max-w-7xl mx-auto">
            {/* MAP CONTAINER - Focused on the 112-Acre Estate Development */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-0 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group"
            >
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
              {/* Using a placeholder for the regional development map */}
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000"
                alt="Regional Connectivity Map"
                className="w-full h-[500px] md:h-[650px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
            </motion.div>

            {/* OVERLAPPING PREMIUM FORM - Specific to Plot Inquiries */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative z-20 -mt-24 md:-mt-30 mx-auto max-w-6xl px-4"
            >
              <div className="bg-[#022c22] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-8 md:p-12 border border-emerald-800/30 backdrop-blur-md">
                <div className=" text-center md:text-left">
                  <h3 className="text-white text-2xl font-Condensed Sans-Serif tracking-wide">
                    Instant Registration Inquiry
                  </h3>
                  <p className="text-emerald-500 text-[10px] font-bold tracking-[0.3em]  mt-2">
                    Approved by all major banks for loans
                  </p>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
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
                      className="absolute left-0 -top-3.5 text-emerald-500 text-xs tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-emerald-400 peer-focus:text-xs"
                    >
                      Full Name
                    </label>
                  </div>

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
                      className="absolute left-0 -top-3.5 text-emerald-500 text-xs tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-emerald-400 peer-focus:text-xs"
                    >
                      Mobile Number
                    </label>
                  </div>

                  <div className="relative group/input">
                    <select className="peer w-full bg-transparent border-b border-emerald-800/50 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all appearance-none cursor-pointer">
                      <option className="bg-[#022c22]" value="1200">
                        1200 - 2400 sq.ft
                      </option>
                      <option className="bg-[#022c22]" value="2400">
                        2400 - 5000 sq.ft
                      </option>
                    </select>
                    <label className="absolute left-0 -top-3.5 text-emerald-500 text-xs tracking-widest">
                      Plot Dimension
                    </label>
                  </div>

                  <div className="pt-4">
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
                          const text =
                            e.currentTarget.querySelector(".btn-text");

                          // Slide in the white background
                          if (fill) fill.style.width = "100%";

                          // Change text color to Gold
                          if (text) text.style.color = "#22C55E";
                        }}
                        onMouseLeave={(e) => {
                          const fill =
                            e.currentTarget.querySelector(".hover-fill");
                          const text =
                            e.currentTarget.querySelector(".btn-text");

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
                          Secure Plot
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* LOCATION DETAILS GRID - Centered between Visakhapatnam, Vizianagaram, Srikakulam */}
            <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-10"
              >
                <h2 className="text-5xl md:text-7xl font-Condensed Sans-Serif text-[#022c22] leading-[1.1]">
                  Gateway to <br />
                  <span className="text-emerald-600">Premium Living.</span>
                </h2>
                <p className="text-stone-500 font-light text-xl leading-relaxed">
                  Strategically located in Bhogapuram, Nature Valley offers an
                  exclusive opportunity to own premium villa plots in North
                  Bengaluru's growth corridor.
                </p>
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
                      title: "Aviation Hub",
                      desc: "Just 15 minutes away from the upcoming Bhogapuram International Airport.",
                    },
                    {
                      title: "Highway Access",
                      desc: "A quick 2-minute drive to the 6-lane National Highway ($NH-16$).",
                    },
                    {
                      title: "Coastal Leisure",
                      desc: "Located only 10 minutes from the pristine Chinthapalli Beach.",
                    },
                    {
                      title: "Adventure Ready",
                      desc: "Proximity to the upcoming AP Tourism Scuba Diving Training Center.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5 }}
                      className="p-8 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="h-1 w-12 bg-emerald-600 mb-6 group-hover:w-full transition-all duration-500"></div>
                      <h4 className="text-emerald-900 font-bold tracking-widest text-xs mb-3">
                        {item.title}
                      </h4>
                      <p className="text-stone-500 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PlotsPage;
