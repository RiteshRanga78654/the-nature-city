"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

const PlotsPage = () => {
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
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000",
  ];

  const nextBrochure = () => {
    setCurrentBrochureIndex((prev) => (prev + 1) % brochureImages.length);
  };
  const neighbors = [
    {
      plot: "418",
      name: "Preetam Daniel",
      image: "/assets/images/118.jfif",
      quote:
        "For me, the bigger developers had a problem with valuation, the smaller ones had poor infrastructure. I own 3000sqft in Nature Valley and it was true value for money.",
    },
    {
      plot: "607",
      name: "Nirmal Raj",
      image: "/assets/images/607.jfif",
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
            className="group flex items-center gap-3"
          >
            <span className="text-[10px] tracking-widest hidden sm:block">
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
          <div
            className="absolute inset-0 bg-cover bg-center transition-all"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000')", // Swapped for a Land/Plot focus image
            }}
          >
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
              BMRDA Approved • High Growth • Clear Titles
            </p>
          </motion.div>

          {/* THE 3-WAY TOGGLE (Identical Logic) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[90%] md:max-w-2xl px-2">
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
                CLUBS
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
        {/* 5. ESTATE VIDEO & INTERACTIVE BROCHURE SECTION */}
        <section className="bg-[#022c22] py-20 md:py-30 px-6 md:px-12 lg:px-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* VIDEO SIDE - Focused on the 112-Acre Estate Development */}

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
                  title="Estate Development Tour"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl font-Condensed Sans-Serif text-white">
                  A Mega City in <br /> the Making.
                </h3>
                <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                  Building your own home brick by brick is now possible in a
                  larger-than-life, self-sufficient community[cite: 13, 14].
                  These plots are perfect for world-class living and as an
                  investment that greatly amplifies your returns[cite: 15].
                </p>
              </div>
            </motion.div>
            {/* INTERACTIVE BROCHURE SIDE */}
            <div className="flex flex-col gap-16">
              <div
                className="relative w-full max-w-sm mx-auto lg:ml-auto cursor-pointer group"
                onClick={nextBrochure}
              >
                <div className="absolute -top-12 left-0 text-[10px] tracking-[0.3em] text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view estate layout →
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
                      className="absolute w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10"
                      alt="Estate Layout Page"
                    />
                  </AnimatePresence>

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
                  Explore Bliss in <br /> Every Plot
                </h4>

                {/* Plot Specific Highlights from your Brochure */}
                <div className="flex flex-col gap-2 text-stone-400 text-[10px] tracking-[0.2em]  font-bold">
                  <span>• Plots spread across over 112 Acres</span>
                  <span>• Each with Fruit & Flower Bearing Trees</span>
                  <span>• Approved by All Major Banks</span>
                </div>

                <div className="pt-4">
                  <button
                    style={{
                      padding: "14px 60px",
                      backgroundColor: "#22C55E",
                      borderRadius: "8px",
                      color: "#fff",
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
                      border: "2px solid #22C55E",
                      margin: "0 auto",
                      letterSpacing: "1px",
                      transition: "all 0.3s ease",
                    }}
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
                      Download Plot Map
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative bg-stone-50 py-20 md:py-30 px-4 md:px-6 overflow-visible">
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
                <div className="mb-8 text-center md:text-left">
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
                Spend a few minutes getting <br /> to know your{" "}
                <span className="text-emerald-600 ">neighbours.</span>
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
              className="mt-20 p-12 bg-stone-50 rounded-[3rem] border border-stone-100 text-center relative overflow-hidden"
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
        <Slider />
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
                  <span className="text-emerald-500 ">
                    of the property.
                  </span>
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
                    <div class="video-container">
                      <iframe
                        width="683"
                        height="500"
                        src="https://www.youtube.com/embed/vft3CThpvQc"
                        frameborder="0"
                        allowfullscreen
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
                     Get HD PDF
                    </span>
                  </button>
                </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* BOTTOM STATS - Minimalist */}
            <div className="mt-15 mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12">
              {[
                { label: "Sectors", val: "4" },
                { label: "Plot Units", val: "977" },
                { label: "Estate Scale", val: "112 Acres" },
                { label: "Electricity", val: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-stone-500 text-[15px]  font-black tracking-widest">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-4xl font-Condensed text-white">
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div class="max-w-4xl mx-auto py-20">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div class="p-4 bg-gray-50 border-b border-gray-100">
              <h3 class="text-lg font-bold text-gray-800">Site Plot Map</h3>
            </div>

            <div class="relative group overflow-hidden">
              <img
                src="/assets/images/plot-map.png"
                alt="Plot Map"
                class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div class="p-4 text-sm text-gray-500 ">
              * Showing the latest plot availability and layout.
            </div>
          </div>
        </div>
        <section className="relative bg-[#f8f9f8] py-20 md:py-30 px-4 sm:px-6 overflow-hidden">
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
    </>
  );
};

export default PlotsPage;
