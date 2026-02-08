"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Sparkles, Utensils, Waves, Users } from "lucide-react";

const clubhouseGallery = [
  { 
    id: 1, 
    title: "Infinity Poolside", 
    cat: "Sports", 
    src: "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.58 AM.jpeg", 
    icon: <Waves size={16} /> 
  },
  { 
    id: 2, 
    title: "Gourmet Dining", 
    cat: "Adventures", 
    src: "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.13.04 AM.jpeg", 
    icon: <Utensils size={16} /> 
  },
  { 
    id: 3, 
    title: "Social Lounge", 
    cat: "Wellness", 
    src: "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.20 PM.jpeg", 
    icon: <Users size={16} /> 
  },
  { 
    id: 4, 
    title: "Yoga Retreat", 
    cat: "Wellness", 
    src: "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.57 AM (2).jpeg", 
    icon: <Sparkles size={16} /> 
  },
 { 
    id: 5, 
    title: "Tracking", 
    cat: "Adventures", 
    src: "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.22 PM (1).jpeg", 
    icon: <Utensils size={16} /> 
  },
  { 
    id: 6, 
    title: "Wooden Walkway", 
    cat: "Adventures", 
    src: "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.55 AM (2).jpeg", 
    icon: <Utensils size={16} /> 
  },
  { 
    id: 7, 
    title: "Badminton", 
    cat: "Sports", 
    src: "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.16 PM.jpeg", 
    icon: <Waves size={16} /> 
  },
  { 
    id: 8, 
    title: "Cricket", 
    cat: "Sports", 
    src: "/assets/images/nature-city-img/WhatsApp Image 2026-01-28 at 6.36.22 PM.jpeg", 
    icon: <Waves size={16} /> 
  },
  { 
    id: 9, 
    title: "Cycling", 
    cat: "Sports", 
    src: "/assets/images/slider/WhatsApp Image 2026-01-29 at 11.12.59 AM.jpeg", 
    icon: <Waves size={16} /> 
  },
     
];

const categories = ["All", "Sports", "Adventures", "Wellness", "Dining"];

const ClubhouseGallery = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);
  const brandGreen = "#22c55e";

  const filteredImages = clubhouseGallery.filter(
    (img) => filter === "All" || img.cat === filter
  );

  return (
    <section className="bg-[#fcfdfd] py-24 px-6 relative overflow-hidden">
      {/* Decorative background text */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between item-start md:items-end mb-16 gap-6">
          <div className="text-left">
            <p 
              className="text-[10px] tracking-[0.5em] text-emerald-600 font-bold mb-4 uppercase"
            >
              The Social Hub
            </p>
            <h2 className="text-5xl md:text-7xl font-semibold font-Condensed Sans-Serif text-emerald-900 tracking-tighter">
              Clubhouse <br />
              <span style={{ color: brandGreen }}>Immersions</span>
            </h2>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full  cursor-pointer text-[10px] font-bold tracking-widest transition-all duration-300 ${
                  filter === cat
                    ? "bg-[#022c22] text-white shadow-lg"
                    : "bg-white text-slate-400 border border-slate-100 hover:border-emerald-200 hover:text-emerald-600"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* --- Gallery Masonry Grid --- */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group cursor-pointer overflow-hidden  bg-white border border-slate-50"
                onClick={() => setSelectedImg(img)}
              >
                {/* Image */}
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  src={img.src}
                  alt={img.title}
                  className="w-full h-auto object-cover"
                />

                {/* Hover UI */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#022c22]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 text-emerald-400 mb-2">
                        {img.icon}
                        <span className="text-[10px] font-bold tracking-widest uppercase">{img.cat}</span>
                      </div>
                      <h4 className="text-white text-3xl font-Condensed Sans-Serif">
                        {img.title}
                      </h4>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white border border-white/20">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- Image Detail Lightbox --- */}
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1000] bg-[#022c22]/98 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedImg(null)}
            >
              <button 
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedImg(null)}
              >
                <X size={40} strokeWidth={1} />
              </button>

              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedImg.src} 
                  alt={selectedImg.title} 
                  className="w-full h-auto max-h-[80vh] object-contain rounded-3xl shadow-2xl"
                />
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <h3 className="text-white text-4xl font-Condensed Sans-Serif tracking-wider">
                      {selectedImg.title}
                    </h3>
                    <p className="text-emerald-500 font-bold text-xs tracking-[0.3em] mt-2 uppercase">
                      The Nature City Experience
                    </p>
                  </div>
                  <button className="bg-white text-[#022c22] px-8 py-3 rounded-full text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all">
                    BOOK A VISIT
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ClubhouseGallery;