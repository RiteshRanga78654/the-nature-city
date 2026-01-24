"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";

const PlotsPage = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("community"); // "community" represents Plots
  // Inside your PlotsPage component, before the return statement:

// 1. Setup the state for the brochure images
const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);

// 2. Swapped to high-quality placeholders that match the brochure content
const brochureImages = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000", // Representative of the 112 acres
  "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000", // Representative of premium land investment [cite: 15]
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000", // Representative of gated community infrastructure [cite: 3]
];

// 3. The handler function to cycle through images
const nextBrochure = () => {
  setCurrentBrochureIndex((prev) => (prev + 1) % brochureImages.length);
};

  return (
    <div className="relative min-h-screen bg-[#022c22] text-stone-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* 1. HEADER (Keep identical to Villa page for consistency) */}
      <header className="fixed top-0 w-full z-[150] flex items-center justify-between px-6 py-6 md:px-16 backdrop-blur-md bg-[#022c22]/20 border-b border-white/5">
        <div className="flex items-center gap-3 tracking-[0.3em] text-xs font-bold">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg">
            NV
          </div>
          <span>The Nature Valley</span>
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
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
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

      {/* 4. CORE VALUE SECTION - PLOTS SPECIFIC */}
      <section className="bg-stone-100 py-20 md:py-30 px-6 md:px-32 text-emerald-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
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
                Enjoy trouble-free instant registrations and seamless financing,
                as our project is approved by all major banks for your loan
                requirements. Secure your piece of the valley today.
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
          Building your own home brick by brick is now possible in a larger-than-life, self-sufficient community[cite: 13, 14]. These plots are perfect for world-class living and as an investment that greatly amplifies your returns[cite: 15].
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
        <div className="flex flex-col gap-2 text-stone-400 text-[10px] tracking-[0.2em] uppercase font-bold">
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
            <div className="hover-fill" style={{ position: "absolute", top: 0, left: 0, width: "0%", height: "100%", background: "#ffffff", transition: "width 0.4s ease", zIndex: -1 }} />
            <span className="btn-text" style={{ position: "relative", zIndex: 1, color: "#fff", transition: "color 0.3s ease" }}>
              Download Plot Map
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</section>
      <Footer />
    </div>
  );
};

export default PlotsPage;
