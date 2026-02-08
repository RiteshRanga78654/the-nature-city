"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Clock, MessageCircle, Navigation } from "lucide-react";

export default function ContactLocation() {
  const brandGreen = "#22c55e";
   const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="text-emerald-500" />,
      title: "Our Location",
      details: "69C4+4F7 Bondapalli, Andhra Pradesh, India",
    },
    {
      icon: <Mail className="text-emerald-500" />,
      title: "Email Us",
      details: "info@mangalrealty.com",
    },
    {
      icon: <Clock className="text-emerald-500" />,
      title: "Business Hours",
      details: "Open today: 09:00 am – 10:30 pm",
    },
  ];

  return (
    <section className="relative py-15 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="text-left mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.5em] text-emerald-500 font-bold mb-4 uppercase"
          >
            Connect With Us
          </motion.p>
          <h2 className="text-5xl md:text-7xl font-semibold font-Condensed Sans-Serif text-emerald-900 leading-none">
            Visit the <span className="text-emerald-500">Heart of Nature</span>
          </h2>
          {/* <div className="w-24 h-1 bg-emerald-500 mx-auto mt-8"></div> */}
        </div>

        {/* --- Grid Layout: 4 Columns Text | 8 Columns Map --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* --- LEFT: Contact Details (Wider than before) --- */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="bg-[#f8fafc] p-10 rounded-[2.5rem] border border-slate-100 shadow-sm h-full flex flex-col">
              <h3 className="text-3xl font-Condensed Sans-Serif text-slate-800 mb-8 uppercase tracking-wider">
                Contact Us
              </h3>

              <div className="space-y-8 flex-grow">
                {contactInfo.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-50">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">
                        {item.title}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {item.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              {/* <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-10 bg-[#022c22] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-emerald-900 transition-all uppercase text-xs tracking-widest"
              >
                <MessageCircle size={20} className="text-emerald-400" />
                Message us on WhatsApp
              </motion.button> */}
              <button
                onClick={() => {
                  // 1. Open WhatsApp in a new tab
                  // Replace '1234567890' with your actual phone number including country code
                  window.open(
                    "https://wa.me/9034565817?text=Hi, I'm interested in booking a visit to Nature City!",
                    "_blank",
                  );

                  // 2. Optional: Still open your modal
                  setIsBookModalOpen(true);
                }}
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
                  margin: "0 0",
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
                  Message us on WhatsApp
                </span>
              </button>
            </div>
          </div>

          {/* --- RIGHT: Wide Interactive Map (8 Columns) --- */}
          <div className="lg:col-span-8 relative group">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 w-full h-full min-h-[500px] lg:aspect-video"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3789.7743041457375!2d83.35359667518443!3d18.22029248281596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDEzJzEzLjEiTiA4M8KwMjEnMjIuMiJF!5e0!3m2!1sen!2sus!4v1769859165150!5m2!1sen!2sus"
                className="w-full h-full grayscale-[20%] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>

              {/* Navigation Floating UI */}
              <div className="absolute top-8 right-8">
                <a
                  href="https://maps.app.goo.gl/J8HYx5LFmu9Yd1Gu7?g_st=ic"
                  target="_blank"
                  className="inline-block"
                >
                  <button
                    onClick={() => setIsBookModalOpen(true)}
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
                      margin: "0 0",
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
                      Get Directions
                    </span>
                  </button>
                </a>
              </div>

              {/* Signature Branding */}
              <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/20 shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  NC
                </div>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 tracking-widest uppercase">
                    Visit Us At
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    NATURE CITY CLUBHOUSE
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Quote */}
        {/* <div className="mt-16 text-center">
            <p className="italic text-slate-300 text-sm max-w-2xl mx-auto">
              "Experience Gurugram's finest greenery and world-class hospitality at M3M Golfestate."
            </p>
        </div> */}
      </div>
    </section>
  );
}
