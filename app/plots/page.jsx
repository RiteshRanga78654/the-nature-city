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

/* ─── GLOBAL FONT INJECTION ─────────────────────────────────────────────── */
/*
  Add this to your global CSS / _document.js / layout.tsx:

  @font-face {
    font-family: 'Velmont';
    src: url('/fonts/Velmont.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
  }

  @import url('https://use.typekit.net/YOUR_KIT_ID.css'); // for Acumin Variable Concept
  -- OR --
  @font-face {
    font-family: 'Acumin Variable Concept';
    src: url('/fonts/AcuminVariableConcept.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
  }

  Then in tailwind.config.js add:
  fontFamily: {
    velmont: ['Velmont', 'serif'],
    acumin: ['Acumin Variable Concept', 'sans-serif'],
  }
*/

const RollingNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
      style={{ fontFamily: "'Velmont', serif" }}
    >
      {isComplex ? value : "0"}
    </motion.span>
  );
};

/* ─── SHARED STYLE TOKENS ────────────────────────────────────────────────── */
const BG_DARK   = "#006633";   // main dark background
const BG_DARKER = "#004d26";   // slightly deeper variant
const BTN_GREEN = "#3fad26";   // button colour
const BTN_HOVER_TEXT = "#3fad26";

/** Reusable CTA button with slide-fill hover */
const CtaButton = ({ label, onClick, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      padding: "14px 40px",
      backgroundColor: BTN_GREEN,
      borderRadius: "8px",
      color: "#fff",
      fontSize: "1.05rem",
      fontWeight: "700",
      fontFamily: "'Acumin Variable Concept', 'Myriad Pro', sans-serif",
      letterSpacing: "1px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      position: "relative",
      overflow: "hidden",
      zIndex: 1,
      border: `2px solid ${BTN_GREEN}`,
      margin: "0 auto",
      transition: "all 0.3s ease",
      ...style,
    }}
    onMouseEnter={(e) => {
      const fill = e.currentTarget.querySelector(".hover-fill");
      const text = e.currentTarget.querySelector(".btn-text");
      if (fill) fill.style.width = "100%";
      if (text) text.style.color = BTN_HOVER_TEXT;
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
        top: 0, left: 0,
        width: "0%",
        height: "100%",
        background: "#ffffff",
        transition: "width 0.4s ease",
        zIndex: -1,
      }}
    />
    <span
      className="btn-text"
      style={{ position: "relative", zIndex: 1, color: "#fff", transition: "color 0.3s ease" }}
    >
      {label}
    </span>
  </button>
);

/* ─── HEADING & PARAGRAPH HELPERS ───────────────────────────────────────── */
const velmont = { fontFamily: "'Velmont', serif" };
const acumin  = { fontFamily: "'Acumin Variable Concept', 'Myriad Pro', sans-serif" };

const PlotsPage = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [brochureForm, setBrochureForm] = useState({ name: "", email: "", phone: "" });

  const handleBrochureDownload = (e) => {
    e.preventDefault();
    console.log("Brochure Lead:", brochureForm);
    const link = document.createElement("a");
    link.href = "/assets/pdf/green.pdf";
    link.download = "The-Nature-City-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadModalOpen(false);
    setBrochureForm({ name: "", email: "", phone: "" });
  };

  const router = useRouter();
  const [activeTab, setActiveTab] = useState("community");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBrochureIndex, setCurrentBrochureIndex] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const brochureImages = [
    "/assets/images/db-the-nature-city.jpeg",
    "/assets/images/hero image.jfif",
    "assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.24 PM.jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.21 PM (1).jpeg",
    "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.15 PM (1).jpeg",
  ];

  const nextBrochure = () => setCurrentBrochureIndex((prev) => (prev + 1) % brochureImages.length);

  useEffect(() => {
    const autoSlider = setInterval(() => nextBrochure(), 3000);
    return () => clearInterval(autoSlider);
  }, [currentBrochureIndex]);

  const neighbors = [
    {
      plot: "418",
      name: "Preetam Daniel",
      image: "/assets/images/slider/n1.jpg",
      quote: "For me, the bigger developers had a problem with valuation, the smaller ones had poor infrastructure. I own 3000sqft in Nature Valley and it was true value for money.",
    },
    {
      plot: "607",
      name: "Nirmal Raj",
      image: "/assets/images/slider/n2.jpg",
      quote: "It's easy to acquire property but maintaining it is a big headache. I think this is a good investment because they look after it and protect it.",
    },
  ];

  const plotData = [
    { no: "3",  size: "1200 sft", facing: "West",  value: "34.8 Lakhs"   },
    { no: "10", size: "4427 sft", facing: "South", value: "123.95 Lakhs" },
    { no: "15", size: "1386 sft", facing: "East",  value: "40.44 Lakhs"  },
    { no: "30", size: "1753 sft", facing: "East",  value: "52.89 Lakhs"  },
  ];

  return (
    <>
      {/* ── INJECT FONT STYLES ── */}
      <style>{`
        * { box-sizing: border-box; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Velmont', serif !important; }
        p, span, label, input, select, textarea, li, a, button {
          font-family: 'Acumin Variable Concept', 'Myriad Pro', sans-serif !important;
        }
        /* Keep rolling numbers using Velmont */
        .rolling-num { font-family: 'Velmont', serif !important; }
      `}</style>

      <div
        ref={containerRef}
        className="relative min-h-screen text-stone-100 selection:bg-emerald-500/30 overflow-x-hidden"
        style={{ backgroundColor: BG_DARK, fontFamily: "'Acumin Variable Concept', 'Myriad Pro', sans-serif" }}
      >
        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[210] border-l border-emerald-800/50 p-12 flex flex-col justify-center shadow-2xl"
                style={{ backgroundColor: BG_DARK }}
              >
                <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-stone-400 hover:text-white text-3xl transition-colors">✕</button>
                <nav className="flex flex-col gap-10">
                  {["Luxury Villas", "Invest in Plot", "Enjoy Clubhouse"].map((item, i) => (
                    <motion.a
                      key={item}
                      href="#"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl hover:text-emerald-400 transition-colors"
                      style={velmont}
                    >
                      <a
                        href={item === "Luxury Villas" ? "/" : item === "Invest in Plot" ? "/plots" : item === "Enjoy Clubhouse" ? "/clubhouse" : "#"}
                        onClick={() => setIsMenuOpen(false)}
                      >{item}</a>
                    </motion.a>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── HEADER ── */}
        <header className="fixed top-0 w-full z-[150] flex items-center justify-between px-6 py-2 md:px-16 backdrop-blur-md border-b border-white/5" style={{ backgroundColor: "rgba(0, 102, 51, 0.2)" }}>
        <div className="flex items-center">
          <img
            src="/assets/logo/logo-mangal-realty-white.png"
            alt="The Nature City"
            className="h-16 w-auto object-contain"
          />
        </div>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center gap-3 focus:outline-none cursor-pointer"
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

        {/* ── HERO ── */}
        <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center justify-center overflow-visible">
          <div className="absolute inset-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src="/assets/videos/herovideo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), transparent, ${BG_DARK}99)` }}></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 -mt-10"
          >
            <h1 className="text-5xl md:text-[110px] leading-[0.85] mb-6 text-white tracking-tight" style={velmont}>
              Secure Your <span style={{ color: BTN_GREEN }}>Soil</span>
            </h1>
            <p className="text-[12px] md:text-[22px] font-bold tracking-[0.1em] mb-10 text-white opacity-90" style={acumin}>
              VMRDA Approved • High Growth • Clear Titles
            </p>
          </motion.div>

          {/* ── 3-WAY TOGGLE ── */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[120] w-full max-w-[95%] md:max-w-4xl px-2">
            <div className="flex h-[75px] md:h-[95px] w-full items-center overflow-visible">
              {[
                { tab: "learn",     label: "Buy",   sub: "A Resort Villa",  path: "/" },
                { tab: "community", label: "Invest", sub: "In A Plot",      path: "/plots" },
                { tab: "Clubhouse", label: "Enjoy",  sub: "The Clubhouse",  path: "/clubhouse" },
              ].map(({ tab, label, sub, path }, i) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); router.push(path); }}
                  className="relative flex flex-col items-center cursor-pointer justify-center transition-all duration-500 ease-in-out h-full"
                  style={{
                    flex: activeTab === tab ? "1.5" : "1",
                    backgroundColor: activeTab === tab ? BTN_GREEN : BG_DARKER,
                    color: activeTab === tab ? "#fff" : "#a8a29e",
                    zIndex: activeTab === tab ? 20 : 10,
                    transform: activeTab === tab ? "scaleY(1.125) scaleX(1.05)" : "none",
                    boxShadow: activeTab === tab ? "0 20px 50px rgba(0,0,0,0.4)" : "none",
                    borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <span className="leading-none transition-all duration-500" style={{ ...velmont, fontSize: activeTab === tab ? "clamp(1.6rem,4vw,2.5rem)" : "clamp(1.2rem,3vw,1.8rem)", marginBottom: activeTab === tab ? "4px" : 0 }}>{label}</span>
                  <span className="text-[7px] md:text-[13px] font-bold tracking-[0.15em] uppercase" style={acumin}>{sub}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── BUILD YOUR DREAM HOME ── */}
        <section className="bg-stone-100 py-20 md:pt-30 pb-25 px-6 md:px-32 text-emerald-950">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.h2
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-5xl md:text-7xl font-semibold leading-tight text-emerald-900"
              style={velmont}
            >
              Build your <br />
              <span style={{ color: BTN_GREEN }}>Dream Home</span>
            </motion.h2>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="w-20 h-1 mb-8" style={{ backgroundColor: BTN_GREEN }}></div>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-emerald-800/80" style={acumin}>
                  The Nature City plots aren't just land parcels, they're your ticket to India's most adventurous lifestyle township. Where your morning coffee comes with forest trails and organic farms.
                </p>
                <p className="text-lg md:text-xl font-light leading-relaxed text-emerald-700/70" style={acumin}>
                  251+ Amenities Ready for You From 6 specialized gyms to swimming pool complex, everything is ready.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── BANNER IMAGE ── */}
        <div className="relative group overflow-hidden h-[350px] md:h-[550px] w-full">
          <img
            src="/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.00 AM (2).jpeg"
            alt="Plot Map"
            className="w-full h-[550px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 -mt-100 md:-mt-90"
          >
            <h1 className="text-3xl md:text-7xl leading-slug mb-6 text-white tracking-tight" style={velmont}>
              Most Townships Give You a House.<br />
              <span className="text-white">We Give You a Universe.</span>
            </h1>
          </motion.div>
        </div>

        {/* ── BROCHURE + VIDEO ── */}
        <section className="py-20 md:py-25 px-6 md:px-12 lg:px-24" style={{ backgroundColor: BG_DARK }}>
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* VIDEO */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-emerald-800/30">
                <iframe className="w-full h-full" src="https://www.youtube.com/embed/vft3CThpvQc" title="Villa Tour" />
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl md:text-6xl text-white" style={velmont}>Why invest in a Plot?</h3>
                <p className="text-stone-400 text-lg md:text-xl font-light leading-relaxed max-w-lg" style={acumin}>
                  Hassle-free ownership with zero maintenance. Let our professional team handle the care while you enjoy the lifestyle.
                </p>
              </div>
            </motion.div>

            {/* BROCHURE SLIDER */}
            <div className="flex flex-col gap-16">
              <div className="relative w-full max-w-sm mx-auto lg:ml-auto group">
                <div className="absolute -top-12 left-0 text-[10px] tracking-[0.3em] font-bold opacity-60" style={{ color: BTN_GREEN, ...acumin }}>
                  Digital Experience — Auto Playing
                </div>
                <div className="relative aspect-[4/5] w-full flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentBrochureIndex}
                      src={brochureImages[currentBrochureIndex]}
                      initial={{ opacity: 0, x: 100, rotate: 10 }}
                      animate={{ opacity: 1, x: 0, rotate: -2 }}
                      exit={{ opacity: 0, x: -100, rotate: -10 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-[#ffffff] p-3"
                      alt="Brochure Page"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-emerald-900/40 -z-10 translate-x-3 translate-y-3 rounded-2xl rotate-2"></div>
                  <div className="absolute inset-0 bg-emerald-800/20 -z-20 translate-x-6 translate-y-6 rounded-2xl -rotate-1"></div>
                </div>
              </div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center lg:text-right space-y-10">
                <h4 className="text-3xl md:text-5xl leading-tight" style={velmont}>
                  Download our <br /> Digital Brochure
                </h4>
                <div className="pt-4">
                  <CtaButton label="Download PDF" onClick={() => setIsDownloadModalOpen(true)} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── BROCHURE DOWNLOAD MODAL ── */}
          <AnimatePresence>
            {isDownloadModalOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsDownloadModalOpen(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[300]"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed inset-0 z-[310] flex items-center justify-center px-4"
                >
                  <div className="w-full max-w-xl border border-emerald-800/40 rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] p-8 md:p-12 relative" style={{ backgroundColor: BG_DARK }}>
                    <button onClick={() => setIsDownloadModalOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl">✕</button>
                    <h3 className="text-3xl md:text-4xl text-white mb-4" style={velmont}>Download Brochure</h3>
                    <p className="text-stone-400 text-sm md:text-base mb-10" style={acumin}>
                      Enter your details to receive the digital brochure instantly.
                    </p>
                    <form className="space-y-8" onSubmit={handleBrochureDownload}>
                      {[
                        { id: "name",  type: "text",  label: "Full Name",     val: brochureForm.name,  key: "name" },
                        { id: "email", type: "email", label: "Email Address", val: brochureForm.email, key: "email" },
                        { id: "phone", type: "tel",   label: "Phone Number",  val: brochureForm.phone, key: "phone" },
                      ].map(({ id, type, label, val, key }) => (
                        <div className="relative" key={id}>
                          <input
                            type={type} required value={val} placeholder=" "
                            onChange={(e) => setBrochureForm({ ...brochureForm, [key]: e.target.value })}
                            className="peer w-full bg-transparent border-b border-emerald-800/60 py-3 text-white focus:outline-none focus:border-emerald-400 placeholder-transparent"
                            style={acumin}
                          />
                          <label className="absolute left-0 -top-3.5 text-xs tracking-widest peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs" style={{ color: BTN_GREEN, ...acumin }}>
                            {label}
                          </label>
                        </div>
                      ))}
                      <button type="submit" className="w-full mt-6 py-4 text-white font-bold rounded-xl tracking-widest text-sm transition-all" style={{ backgroundColor: BTN_GREEN, ...acumin }}>
                        Download Now
                      </button>
                    </form>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </section>

        {/* ── NEIGHBOURS / TESTIMONIALS ── */}
        <section className="bg-white py-20 md:py-15 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-7xl font-semibold text-emerald-900 leading-tight" style={velmont}>
                Spend a Few Minutes Getting <br /> to know Your{" "}
                <span style={{ color: BTN_GREEN }}>Neighbours.</span>
              </h2>
              <div className="h-1 w-20 mx-auto rounded-full" style={{ backgroundColor: BTN_GREEN }} />
            </motion.div>

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
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl border border-stone-100 mb-8">
                    <img src={neighbor.image} alt={neighbor.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute bottom-6 left-6 backdrop-blur-md px-6 py-4 border border-white/10" style={{ backgroundColor: `${BG_DARK}e6` }}>
                      <p className="text-[10px] tracking-[0.3em] font-black mb-1" style={{ color: BTN_GREEN, ...acumin }}>Estate Asset</p>
                      <h4 className="text-white text-2xl tracking-tighter" style={velmont}>Plot {neighbor.plot}</h4>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#006633]/40 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="space-y-6 px-2">
                    <p className="text-stone-500 font-light text-xl md:text-2xl leading-relaxed" style={acumin}>"{neighbor.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] w-12" style={{ backgroundColor: BTN_GREEN }}></div>
                      <span className="font-bold tracking-widest text-xs" style={{ color: BG_DARK, ...acumin }}>{neighbor.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-15 p-10 bg-stone-50 rounded-[3rem] border border-stone-100 text-center relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h4 className="text-3xl" style={{ color: BG_DARK, ...velmont }}>
                  Your Dream Home.{" "}<span style={{ color: BTN_GREEN }}>Ready When You Are.</span>
                </h4>
                <p className="text-stone-400 text-sm tracking-widest font-bold" style={acumin}>
                  Our villas aren't just built, they're choreographed to enhance life.
                </p>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-5 font-black text-9xl -rotate-12 select-none" style={{ color: BG_DARK, ...velmont }}>
                The Nature City
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PLOT SLIDER ── */}
        <PlotSlider />

        {/* ── AERIAL TOUR / PRICING / MAP ── */}
        <section className="relative py-20 md:py-25 px-6 md:px-16 overflow-hidden text-white" style={{ backgroundColor: BG_DARKER }}>
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(${BTN_GREEN} 0.5px, transparent 0.5px)`, backgroundSize: "30px 30px" }}
          />
          <div className="max-w-7xl mx-auto relative z-10">
            {/* HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-30 items-end">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12" style={{ backgroundColor: BTN_GREEN }}></div>
                  <span className="text-lg font-black tracking-[0.5em]" style={{ color: BTN_GREEN, ...acumin }}>Project Blueprint</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-semibold leading-[0.85] tracking-tighter" style={velmont}>
                  Take an Aerial Tour <br />
                  <span style={{ color: BTN_GREEN }}>of Paradise.</span>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="lg:col-span-5 pb-4">
                <p className="text-stone-400 font-light text-xl leading-relaxed" style={acumin}>
                  Spanning 90 acres of IGBC Platinum-certified paradise. Featuring 251+ amenities, 30-acre agricultural zone, Miyawaki Forest, adventure zones with ziplines & Go-Karting, 30-acre organic farmland, and a clubhouse that redefines luxury.
                </p>
              </motion.div>
            </div>

            {/* PRICING + MAP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* PRICING TABLE */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12">
                  <h4 className="text-[10px] font-black tracking-[0.4em] mb-10" style={{ color: BTN_GREEN, ...acumin }}>Live Inventory Highlights</h4>
                  <div className="space-y-0">
                    {plotData.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                        className="grid grid-cols-4 py-6 border-b border-white/10 group cursor-default transition-all"
                      >
                        {[
                          { lbl: "Plot",   val: `№ ${item.no}`,    accent: false },
                          { lbl: "Size",   val: item.size,          accent: false },
                          { lbl: "Facing", val: item.facing,        accent: false },
                          { lbl: "Value",  val: item.value,         accent: true  },
                        ].map(({ lbl, val, accent }) => (
                          <div key={lbl} className={`flex flex-col ${accent ? "text-right" : ""}`}>
                            <span className="text-stone-500 text-[9px] font-bold" style={acumin}>{lbl}</span>
                            <span className="text-lg" style={{ ...(accent ? { color: "#6ee7b7" } : {}), ...velmont }}>{val}</span>
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <CtaButton label="Download The Full Price List" />
                  </div>
                </div>
              </div>

              {/* MAP */}
              <div className="lg:col-span-7 order-1 lg:order-2 relative">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="relative aspect-[4/3] md:aspect-auto">
                  <div className="absolute inset-0 -rotate-2 scale-105" style={{ backgroundColor: `${BTN_GREEN}1a` }}></div>
                  <div className="relative z-10 bg-stone-900 border border-white/10 p-4 shadow-2xl overflow-hidden">
                    <div className="video-container">
                      <iframe width="683" height="500" src="https://www.youtube.com/embed/vft3CThpvQc" frameBorder="0" allowFullScreen></iframe>
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 hidden md:flex flex-col p-10 shadow-2xl z-20 max-w-xs" style={{ backgroundColor: "#A4C424", color: "#022c22" }}>
                    <p className="text-sm font-bold tracking-widest mb-4" style={acumin}>Masterplan</p>
                    <h4 className="text-2xl leading-tight mb-6" style={velmont}>Ready to "Plug & Play" your dream villa?</h4>
                    <CtaButton label="Get HD PDF" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-15 mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 border-t text-center border-white/10 pt-12">
              {[
                { label: "Amenities",    val: "251"     },
                { label: "Plot Units",   val: "600"     },
                { label: "Estate Scale", val: "90 Acres"},
                { label: "Electricity",  val: "24/7"    },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-stone-500 text-[15px] font-black tracking-widest uppercase" style={acumin}>{stat.label}</p>
                  <p className="text-2xl md:text-4xl text-white tabular-nums rolling-num">
                    <RollingNumber value={stat.val} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PLOT MAP ── */}
        <div className="max-w-4xl mx-auto py-20">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800" style={velmont}>Site Plot Map</h3>
            </div>
            <div className="relative group overflow-hidden">
              <img src="/assets/images/plot-map.png" alt="Plot Map" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4 text-sm text-gray-500" style={acumin}>* Showing the latest plot availability and layout.</div>
          </div>
        </div>

        {/* ── LOCATION / INQUIRY ── */}
        <section className="relative bg-stone-50 py-20 md:py-25 px-4 md:px-6 overflow-visible">
          <div className="max-w-7xl mx-auto">
            {/* MAP IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative z-0 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-200 bg-white group"
            >
              <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000"
                alt="Regional Connectivity Map"
                className="w-full h-[500px] md:h-[650px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
            </motion.div>

            {/* INQUIRY FORM */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="relative z-20 -mt-24 md:-mt-30 mx-auto max-w-6xl px-4"
            >
              <div className="rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-8 md:p-12 border border-emerald-800/30 backdrop-blur-md" style={{ backgroundColor: BG_DARK }}>
                <div className="text-center md:text-left">
                  <h3 className="text-white text-2xl tracking-wide" style={velmont}>Instant Registration Inquiry</h3>
                  <p className="text-xs font-bold tracking-[0.3em] mt-2" style={{ color: BTN_GREEN, ...acumin }}>Approved by all major banks for loans</p>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end mt-8">
                  {[
                    { id: "name",  type: "text", label: "Full Name",    ph: "Name"  },
                    { id: "phone", type: "tel",  label: "Mobile Number", ph: "Phone" },
                  ].map(({ id, type, label, ph }) => (
                    <div key={id} className="relative">
                      <input
                        type={type} required placeholder=" "
                        className="peer w-full bg-transparent border-b border-emerald-800/50 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all placeholder-transparent"
                        id={id} style={acumin}
                      />
                      <label
                        htmlFor={id}
                        className="absolute left-0 -top-3.5 text-xs tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs"
                        style={{ color: BTN_GREEN, ...acumin }}
                      >{label}</label>
                    </div>
                  ))}

                  <div className="relative">
                    <select className="peer w-full bg-transparent border-b border-emerald-800/50 py-3 text-white focus:outline-none focus:border-emerald-400 transition-all appearance-none cursor-pointer" style={acumin}>
                      <option className="bg-[#006633]" value="1200">1200 - 2400 sq.ft</option>
                      <option className="bg-[#006633]" value="2400">2400 - 5000 sq.ft</option>
                    </select>
                    <label className="absolute left-0 -top-3.5 text-xs tracking-widest" style={{ color: BTN_GREEN, ...acumin }}>Plot Dimension</label>
                  </div>

                  <div className="pt-4">
                    <CtaButton label="Secure Plot" />
                  </div>
                </form>
              </div>
            </motion.div>

            {/* LOCATION DETAILS */}
            <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-5 space-y-10">
                <h2 className="text-5xl md:text-7xl font-semibold text-emerald-900 leading-[1.1]" style={velmont}>
                  Gateway to <br />
                  <span style={{ color: BTN_GREEN }}>Adventure Living.</span>
                </h2>
                <p className="text-stone-500 font-light text-xl leading-relaxed" style={acumin}>
                  Perfectly positioned in Bondapalli, Vizianagaram, The Nature City offers an exceptional opportunity to experience premium villa plots with 251+ amenities in Andhra Pradesh's emerging growth corridor.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Airport Connectivity", desc: "Just 30 minutes away from Visakhapatnam International Airport." },
                    { title: "Commute Ease",         desc: "Only 5 minutes to Vizianagaram Railway Station for stress-free daily travel." },
                    { title: "IGBC Excellence",       desc: "Located in Andhra Pradesh's only IGBC Platinum-certified residential township." },
                    { title: "Adventure Living",      desc: "Home to India's first residential Go-Karting track, ziplines, and 275+ more amenities." },
                  ].map((item, index) => (
                    <motion.div
                      key={index} whileHover={{ y: -5 }}
                      className="p-8 bg-white rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="h-1 w-12 mb-6 group-hover:w-full transition-all duration-500" style={{ backgroundColor: BTN_GREEN }}></div>
                      <h4 className="font-bold tracking-widest text-xs mb-3" style={{ color: BG_DARK, ...acumin }}>{item.title}</h4>
                      <p className="text-stone-500 font-light leading-relaxed" style={acumin}>{item.desc}</p>
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