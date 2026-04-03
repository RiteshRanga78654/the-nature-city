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
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swal from 'sweetalert2';

const fontStyles = `
  @font-face {
    font-family: 'Velmont';
    src: url('/assets/fonts/Velmont.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }
  @font-face {
    font-family: 'Acumin Variable Concept';
    src: url('/assets/fonts/AcuminVariableConcept.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }
`;

const HEADING_FONT = { fontFamily: "'Velmont', serif" };
const BODY_FONT   = { fontFamily: "'Acumin Variable Concept', sans-serif" };
const BTN_COLOR   = "#3fad26";
const BTN_BORDER  = "2px solid #3fad26";
const BG_COLOR    = "#006633";

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
];cc

const Page = () => {
  const router = useRouter();
  const [activeTab, setActiveTab]         = useState("Clubhouse");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [activeImg, setActiveImg]         = useState(null);
  const [isLoading, setIsLoading]         = useState(false);

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const showNext = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: 'Visit Scheduled!',
          text: 'Our team at Nature City will contact you shortly.',
          icon: 'success',
          confirmButtonColor: BTN_COLOR,
          background: '#ffffff',
          customClass: { title: 'font-serif', confirmButton: 'rounded-full px-8 py-3' },
        });
        setIsBookModalOpen(false);
        e.target.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#ef4444',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Tab button helper ─────────────────────────────────────────────────── */
  const tabActiveStyle  = { backgroundColor: BTN_COLOR };
  const tabInactiveStyle = { backgroundColor: "#011411" };

  return (
    <>
      {/* Inject @font-face declarations */}
      <style>{fontStyles}</style>

      <div className="overflow-x-hidden" style={{ backgroundColor: BG_COLOR }}>

        {/* ── Mobile nav drawer ─────────────────────────────────────────────── */}
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
                className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[210] border-l border-emerald-800/50 p-12 flex flex-col justify-center shadow-2xl"
                style={{ backgroundColor: "#022c22" }}
              >
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-10 right-10 text-stone-400 hover:text-white text-3xl transition-colors"
                >
                  ✕
                </button>
                <nav className="flex flex-col gap-10">
                  {["Luxury Villas", "Invest in Plot", "Enjoy Clubhouse"].map((item, i) => (
                    <motion.a
                      key={item}
                      href={
                        item === "Luxury Villas" ? "/"
                        : item === "Invest in Plot" ? "/plots"
                        : "/clubhouse"
                      }
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl text-white hover:text-emerald-400 transition-colors"
                      style={HEADING_FONT}
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

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <header
          className="fixed top-0 w-full z-[150] flex items-center justify-between px-6 py-2 md:px-16 backdrop-blur-md border-b border-white/5"
          style={{ backgroundColor: "rgba(0, 102, 51, 0.2)" }}
        >
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
            <span
              className="text-[10px] tracking-widest hidden sm:block text-white"
              style={BODY_FONT}
            >
              Explore
            </span>
            <div className="flex flex-col gap-1.5">
              <div className="h-[1.5px] w-8 bg-white group-hover:w-10 transition-all" />
              <div className="h-[1.5px] w-10 bg-white group-hover:w-8 transition-all" />
            </div>
          </button>
        </header>

        {/* ── Hero Section ──────────────────────────────────────────────────── */}
        <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center justify-center z-20">
          {/* Background image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/assets/images/clubhousehero.png"
              alt="Clubhouse Hero"
              className="w-full h-full object-cover"
              onError={(e) => console.error("Hero image failed to load:", e.target.src)}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#022c22]/80" />
          </div>

          {/* Hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-4 -mt-10"
          >
            <h1
              className="text-5xl md:text-[110px] leading-[0.85] mb-6 text-white tracking-tight"
              style={HEADING_FONT}
            >
              Enjoy the{" "}
              <span style={{ color: BTN_COLOR }}>Clubhouse</span>
            </h1>
            <p
              className="text-[12px] md:text-[22px] font-bold tracking-[0.4em] text-white opacity-90"
              style={BODY_FONT}
            >
              THE NATURE CITY CLUBHOUSE
            </p>
          </motion.div>

          {/* ── Tab switcher ──────────────────────────────────────────────── */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[130] w-full max-w-[95%] md:max-w-4xl px-2">
            <div className="flex h-[75px] md:h-[95px] w-full items-center overflow-visible">

              {/* BUY — Villas */}
              <button
                onClick={() => { setActiveTab("learn"); router.push("/"); }}
                className="relative flex flex-col items-center cursor-pointer justify-center transition-all duration-500 ease-in-out h-full"
                style={{
                  ...(activeTab === "learn" ? tabActiveStyle : tabInactiveStyle),
                  flex: activeTab === "learn" ? "1.5" : "1",
                  color: activeTab === "learn" ? "#fff" : "#a8a29e",
                  zIndex: activeTab === "learn" ? 20 : 10,
                  transform: activeTab === "learn" ? "scaleY(1.25) scaleX(1.05)" : "none",
                  boxShadow: activeTab === "learn" ? "0 20px 50px rgba(0,0,0,0.4)" : "none",
                }}
              >
                <span className="leading-none transition-all duration-500 text-xl md:text-2xl" style={{ ...HEADING_FONT, fontSize: activeTab === "learn" ? "clamp(1.5rem,3vw,2.25rem)" : undefined }}>
                  Buy
                </span>
                <span className="text-[7px] md:text-[13px] font-bold tracking-[0.15em] uppercase" style={BODY_FONT}>
                  A Resort Villa
                </span>
              </button>

              {/* INVEST — Plots */}
              <button
                onClick={() => { setActiveTab("community"); router.push("/plots"); }}
                className="relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ease-in-out h-full border-l border-white/5"
                style={{
                  ...(activeTab === "community" ? tabActiveStyle : tabInactiveStyle),
                  flex: activeTab === "community" ? "1.5" : "1",
                  color: activeTab === "community" ? "#fff" : "#a8a29e",
                  zIndex: activeTab === "community" ? 20 : 10,
                  transform: activeTab === "community" ? "scaleY(1.25) scaleX(1.05)" : "none",
                  boxShadow: activeTab === "community" ? "0 20px 50px rgba(0,0,0,0.4)" : "none",
                }}
              >
                <span className="leading-none transition-all duration-500" style={{ ...HEADING_FONT, fontSize: activeTab === "community" ? "clamp(1.5rem,3vw,2.25rem)" : "clamp(1.25rem,2.5vw,1.5rem)" }}>
                  Invest
                </span>
                <span className="text-[7px] md:text-[13px] font-bold tracking-[0.15em] uppercase" style={BODY_FONT}>
                  In A Plot
                </span>
              </button>

              {/* ENJOY — Clubhouse */}
              <button
                onClick={() => { setActiveTab("Clubhouse"); router.push("/clubhouse"); }}
                className="relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ease-in-out h-full border-l border-white/5"
                style={{
                  ...(activeTab === "Clubhouse" ? tabActiveStyle : tabInactiveStyle),
                  flex: activeTab === "Clubhouse" ? "1.5" : "1",
                  color: activeTab === "Clubhouse" ? "#fff" : "#a8a29e",
                  zIndex: activeTab === "Clubhouse" ? 20 : 10,
                  transform: activeTab === "Clubhouse" ? "scaleY(1.25) scaleX(1.05)" : "none",
                  boxShadow: activeTab === "Clubhouse" ? "0 20px 50px rgba(0,0,0,0.4)" : "none",
                }}
              >
                <span className="leading-none transition-all duration-500" style={{ ...HEADING_FONT, fontSize: activeTab === "Clubhouse" ? "clamp(1.5rem,3vw,2.25rem)" : "clamp(1.25rem,2.5vw,1.5rem)" }}>
                  Enjoy
                </span>
                <span className="text-[7px] md:text-[13px] font-bold tracking-[0.15em] uppercase" style={BODY_FONT}>
                  The Clubhouse
                </span>
              </button>

            </div>
          </div>
        </section>

        {/* ── About / Book a Visit Section ──────────────────────────────────── */}
        <section className="relative py-20 z-10 px-4" style={{ backgroundColor: BG_COLOR }}>
          <div className="max-w-7xl mx-auto mt-15 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              {/* Heading — Velmont */}
              <h1
                className="text-4xl md:text-7xl font-semibold leading-tight text-white"
                style={HEADING_FONT}
              >
                Extraordinary Life at the{" "}
                <span style={{ color: BTN_COLOR }}>Clubhouse</span>
              </h1>

              {/* Paragraph — Acumin Variable */}
              <p
                className="text-lg leading-relaxed"
                style={{ ...BODY_FONT, color: "#d1fae5" }}
              >
                Our world-class clubhouse complex offers 281+ premium amenities, from adventure
                zones and paintball arenas to serene Miyawaki Forest trails and 30-acre organic
                farmland.
              </p>

              {/* Book a Visit button — #3fad26 */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  style={{
                    padding: "14px 60px",
                    backgroundColor: BTN_COLOR,
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 1,
                    border: BTN_BORDER,
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                    ...BODY_FONT,
                  }}
                  onMouseEnter={(e) => {
                    const fill = e.currentTarget.querySelector(".hover-fill");
                    const text = e.currentTarget.querySelector(".btn-text");
                    if (fill) fill.style.width = "100%";
                    if (text) text.style.color = BTN_COLOR;
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
                    style={{ position: "relative", zIndex: 1, color: "#fff", transition: "color 0.3s ease" }}
                  >
                    Book a Visit
                  </span>
                </button>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] overflow-hidden shadow-2xl">
              <img
                src="/assets/images/clubhouseimg.png"
                alt="Clubhouse Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── Book a Visit Modal ──────────────────────────────────────────── */}
          <AnimatePresence>
            {isBookModalOpen && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsBookModalOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Form Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl z-[1010]"
                >
                  <button
                    onClick={() => setIsBookModalOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X size={24} />
                  </button>

                  {/* Modal heading — Velmont */}
                  <h2
                    className="text-2xl font-bold text-slate-800 mb-2"
                    style={HEADING_FONT}
                  >
                    Book Your Visit
                  </h2>

                  {/* Modal subtext — Acumin Variable */}
                  <p className="text-slate-500 mb-6 text-sm" style={BODY_FONT}>
                    Fill in your details and our team will contact you shortly.
                  </p>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        style={BODY_FONT}
                      >
                        Full Name
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border text-black border-slate-200 rounded-lg outline-none focus:ring-2"
                        style={{ ...BODY_FONT, "--tw-ring-color": BTN_COLOR }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        style={BODY_FONT}
                      >
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-slate-200 text-black rounded-lg outline-none focus:ring-2"
                        style={BODY_FONT}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        style={BODY_FONT}
                      >
                        Contact Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 00000 00000"
                        className="w-full px-4 py-2 border border-slate-200 text-black rounded-lg outline-none focus:ring-2"
                        style={BODY_FONT}
                      />
                    </div>

                    {/* Submit — #3fad26 */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full text-white py-3 rounded-lg font-bold mt-4 transition-all shadow-md active:scale-[0.98]"
                      style={{
                        backgroundColor: isLoading ? "#a3d9a5" : BTN_COLOR,
                        cursor: isLoading ? "not-allowed" : "pointer",
                        ...BODY_FONT,
                      }}
                    >
                      {isLoading ? "Processing..." : "Confirm Booking"}
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </section>

        <Amenities />
        <ClubGallery />
        <EventGallery />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Page;