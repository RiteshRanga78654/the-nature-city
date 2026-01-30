'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, ChevronUp } from 'lucide-react';
import { FaTwitter, FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-[#0A1A10] text-[#E0E7E0] overflow-hidden pt-24 pb-12 border-t border-[#4ADE80]/20">

      {/* BACKGROUND DECORATION: Sage Green Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="green-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4ADE80" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#green-grid)" />
        </svg>
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">

          {/* COLUMN 1: BRANDING */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <div className="relative w-45 h-24">
              <img
                src="/mangal-realty-logo.png"
                alt="Mangal Realty Logo"
                className="object-contain brightness-200"
              />
            </div>
            <p className="text-sm leading-relaxed font-light tracking-wide text-[#B0C4B0]">
              Leading the revolution in sustainable luxury. We cultivate environments where modern architecture meets the serenity of nature.
            </p>
          </motion.div>

          {/* COLUMN 2: EXPLORE */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <h3 className="text-white font-bold  tracking-[0.1em] text-xs border-l-2 border-[#22C55E] pl-4">
              Explore
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {['About Us', 'Projects', 'Why Invest', 'Gallery', 'Contact', 'Awards', 'Blogs', 'Privacy'].map((item) => (
                <Link key={item} href="#" className="hover:text-[#4ADE80] transition-all duration-300 text-sm font-medium hover:translate-x-1">
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* COLUMN 3: CONNECT */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <h3 className="text-white font-bold  tracking-[0.1em] text-xs border-l-2 border-[#22C55E] pl-4">
              Connect
            </h3>
            <div className="flex flex-col gap-6">
              <div className="space-y-1">
                <p className="text-[#4ADE80] text-[10px]  font-bold tracking-widest">Visit us at our office in</p>
                <p className="text-sm font-light leading-relaxed">D-No: 49, 24-26, Shankaramatam Road, beside UK Parlour<br />Visakhapatnam</p>
              </div>

              <div className="flex flex-col gap-4">
                <a href="mailto:info@mangalrealty.com" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center group-hover:bg-[#22C55E] transition-all duration-500">
                    <Mail size={16} className="text-[#4ADE80] group-hover:text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white group-hover:text-[#4ADE80] transition-colors">info@mangalrealty.com</span>


                </a>
                <a href="tel:+91880000000" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center group-hover:bg-[#22C55E] transition-all duration-500">
                    <Phone size={16} className="text-[#4ADE80] group-hover:text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white group-hover:text-[#4ADE80] transition-colors">+91 040-4400033</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 4: NEWSLETTER */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            <h3 className="text-white font-bold  tracking-[0.1em] text-xs border-l-2 border-[#22C55E] pl-4">
              Newsletter
            </h3>
            <div className="flex flex-col gap-4">
              <p className="text-xs text-[#B0C4B0] ">Stay updated with our green initiatives.</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-[#051109] border border-[#22C55E]/20 px-5 py-4 rounded-sm focus:border-[#22C55E] outline-none text-white w-full text-sm transition-all"
                />
              </div>
              <button
                className="group relative cursor-pointer px-12 py-5 text-white font-bold  tracking-widest text-xs overflow-hidden"
              >
                <span className="relative z-10">Subscribe Now</span>
                <div className="absolute inset-1 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <div className="absolute inset-1 border border-green-600"></div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.1em] text-white-500 font-medium">
            © 2025 Mangal Realty — Sustainable Luxury.
            <span className="ml-2 text-white ">
              (Powered By <a href="https://www.ireedindia.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#4ADE80] transition-colors">IREED Media</a>)
            </span>
          </p>

          <div className="flex items-center gap-6">
            {[FaTwitter, FaFacebookF, FaPinterestP, FaInstagram].map((Icon, i) => (
              <Link key={i} href="#" className="text-white-500 hover:text-[#4ADE80] transition-all duration-300 transform hover:-translate-y-1">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FLOATING ACTION */}
      <motion.button
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-10 cursor-pointer right-10 w-14 h-14 bg-[#2b6642] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(21,128,61,0.4)] z-40"
      >
        <ChevronUp size={24} />
      </motion.button>
    </footer>
  );
}