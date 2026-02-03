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
import { useRouter } from "next/navigation"; // 1. Import the hook

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swal from 'sweetalert2';

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
  const router = useRouter(); // 2. Initialize the router
  const [activeTab, setActiveTab] = useState("Clubhouse");
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  // "community" = Plots
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.target);
  // Get your free key from web3forms.com
  formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); 

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      // SUCCESS SWEETALERT
      Swal.fire({
        title: 'Visit Scheduled!',
        text: 'Our team at Nature City will contact you shortly.',
        icon: 'success',
        confirmButtonColor: '#10b981', // emerald-500
        background: '#ffffff',
        customClass: {
          title: 'font-serif',
          confirmButton: 'rounded-full px-8 py-3'
        }
      });

      setIsBookModalOpen(false); // Close the manual modal
      e.target.reset(); // Clear the form
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    // ERROR SWEETALERT
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
                {["Home", "Invest in Plot", "Enjoy Clubhouse"].map(
                  (item, i) => (
                    <motion.a
                      key={item}
                      href={
                        item === "Home"
                          ? "/"
                          : item === "Invest in Plot"
                            ? "/plots"
                            : "/clubhouse"
                      }
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl text-white font-Condensed Sans-Serif hover:text-emerald-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ),
                )}
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
        <button
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center gap-3 focus:outline-none text-white"
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

      <section className="relative h-[85vh] md:h-[90vh] w-full flex items-center justify-center z-20">
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/images/clubhousehero.png"
            alt="Clubhouse Hero"
            className="w-full h-full object-cover"
            // Added error handling to check if image loads
            onError={(e) =>
              console.error("Hero image failed to load at path:", e.target.src)
            }
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[130] w-full max-w-[95%] md:max-w-4xl px-2">
          {/* The container has overflow-visible to allow the "growth" to pop out top and bottom */}
          <div className="flex h-[75px] md:h-[95px] w-full items-center overflow-visible">
            {/* VILLAS BUTTON */}
            <button
              onClick={() => {
                setActiveTab("learn");
                router.push("/");
              }}
              className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-in-out h-full
        ${
          activeTab === "learn"
            ? "flex-[1.5] bg-[#22cc5e] text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "flex-1 bg-[#011411] text-stone-400 z-10"
        }`}
            >
              <span
                className={`font-serif  leading-none transition-all duration-500 ${activeTab === "learn" ? "text-3xl md:text-4xl mb-1" : "text-xl md:text-2xl"}`}
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
              className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-in-out h-full
        ${
          activeTab === "community"
            ? "flex-[1.5] bg-[#22cc5e] text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "flex-1 bg-[#011411] text-stone-400 z-10 border-l border-white/5"
        }`}
            >
              <span
                className={`font-serif  leading-none transition-all duration-500 ${activeTab === "community" ? "text-3xl md:text-4xl mb-1" : "text-xl md:text-2xl"}`}
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
              className={`relative flex flex-col items-center justify-center transition-all duration-500 ease-in-out h-full
        ${
          activeTab === "Clubhouse"
            ? "flex-[1.5] bg-[#22cc5e] text-white z-20 scale-y-125 scale-x-105 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "flex-1 bg-[#011411] text-stone-400 z-10 border-l border-white/5"
        }`}
            >
              <span
                className={`font-serif  leading-none transition-all duration-500 ${activeTab === "Clubhouse" ? "text-3xl md:text-4xl mb-1" : "text-xl md:text-2xl"}`}
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

      <section className="relative bg-white py-20 z-10 px-4">
        <div className="max-w-7xl mx-auto mt-15 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight">
              Experience Luxury at the{" "}
              <span className="text-emerald-500">Clubhouse</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our world-class resort clubhouse offers premium amenities, from
              fine dining to relaxing lounge areas.
            </p>
            <div className="flex gap-4">
              {/* Updated Button to trigger state */}
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="bg-emerald-500 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-600 transition-colors shadow-lg active:scale-95"
              >
                Book a Visit
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

        {/* --- POPUP MODAL --- */}
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

                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Book Your Visit
                </h2>
                <p className="text-slate-500 mb-6 text-sm">
                  Fill in your details and our team will contact you shortly.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      name="name" // The API uses this key
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border text-black border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 border border-slate-200 text-black rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-2 border border-slate-200 text-black rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white py-3 rounded-lg font-bold mt-4 transition-all shadow-md active:scale-[0.98] ${
                      isLoading
                        ? "bg-emerald-300 cursor-not-allowed"
                        : "bg-emerald-500 hover:bg-emerald-600"
                    }`}
                  >
                    {isLoading ? "Processing..." : "Confirm Booking"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ... Your Swiper and Lightbox Modal below remain unchanged ... */}
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
