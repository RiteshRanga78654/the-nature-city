"use client";
import React from "react";
// 1. Autoplay module ko import kiya
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Grid, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";


import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { 
  Bike, Zap, Trophy, Tent, Smile, Building2, Ship, Telescope, 
  Dumbbell, BookOpen, PartyPopper, ShieldCheck, Heart, Users, 
  Sun, Video, Wifi, FlameKindling, Droplets, ArrowDownToLine, 
  ZapOff, Camera, Stethoscope, Bed, Bath, Car, Map, TreePine, 
  Wind, Theater, Waves, Construction, Eye, Trees 
} from 'lucide-react';

export default function AmenitiesSection() {
  const brandGreen = "#22c55e";

  const baseAmenities = [
  { icon: <Bike />, title: "Sky Cycling" },
  { icon: <Zap />, title: "Ziplining" },
  { icon: <Trophy />, title: "Go-Karting" },
  { icon: <Construction />, title: "Track ATV" },
  { icon: <Tent />, title: "Night Camping & Camp Fire Zone" },
  { icon: <Smile />, title: "Laughing Park" },
  { icon: <Building2 />, title: "Temple" },
  { icon: <Ship />, title: "Boating in Ponds" },
  { icon: <Telescope />, title: "Sky Gazing Deck" },
  { icon: <Bike />, title: "Cycle Track & Skating Rink" },
  { icon: <Dumbbell />, title: "Outdoor Gym & Indoor Gym" },
  { icon: <BookOpen />, title: "Reading Lounge & Reading Zone" },
  { icon: <PartyPopper />, title: "Party Hall & Party Lawn" },
  { icon: <Building2 />, title: "Club House" },
  { icon: <ShieldCheck />, title: "24/7 Security" },
  { icon: <Heart />, title: "Goshala (Cow Shelter)" },
  { icon: <Users />, title: "Senior Citizen Park" },
  { icon: <Sun />, title: "Vitamin D Zone" },
  { icon: <Video />, title: "CCTV Video Surveillance & RFID System" },
  { icon: <Wifi />, title: "WiFi in Common Areas" },
  { icon: <FlameKindling />, title: "Fire Fighting System" },
  { icon: <Droplets />, title: "Overhead Water Tank" },
  { icon: <ArrowDownToLine />, title: "Underground Drainage System" },
  { icon: <ZapOff />, title: "Power Backup Generator" },
  { icon: <Camera />, title: "Selfie Point" },
  { icon: <Stethoscope />, title: "Emergency Room" },
  { icon: <Bed />, title: "Staff Accommodation" },
  { icon: <Bath />, title: "Driver & Servant Toilets" },
  { icon: <Droplets />, title: "Drinking Water Facility" },
  { icon: <Car />, title: "Car Washing Facility" },
  { icon: <Trophy />, title: "Multiple Sports Courts" },
  { icon: <Map />, title: "Wide 12M Internal Roads" },
  { icon: <TreePine />, title: "Designer Landscaping & Drip Irrigation" },
  { icon: <Eye />, title: "Signature Grand Entrance & Exit" },
  { icon: <Trees />, title: "Tree House with Mountain View" },
  { icon: <Wind />, title: "O3 Zone" },
  { icon: <Theater />, title: "Amphitheatre" },
  { icon: <Waves />, title: "Swimming Pool" },
  { icon: <Bike />, title: "Complimentary Bikes with Cycle Stand" },
];

  const allAmenities = Array(12).fill(baseAmenities).flat().slice(0, 216);

  return (
    <section className="relative py-24 px-4 overflow-hidden min-h-screen flex items-center bg-[#022c22]">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2000')",
        }}
      ></div>

      <div className="relative z-5 max-w-7xl mx-auto w-full">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-white text-5xl md:text-7xl font-semibold font-Condensed Sans-Serif tracking-tighter  ">
             Our <span className="text-emerald-600">Amenities & Facilities</span>
            </h2>
            <p className="text-white/50 tracking-[0.3em] text-[10px] mt-4 font-Condensed Sans-Serif uppercase font-bold">
              Automated Discovery of 200+ Features
            </p>
          </div>

          <div className="flex gap-4">
            <button className="amenity-prev w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-green-600 hover:border-green-600 transition-all cursor-pointer">
              <ChevronLeft size={20} />
            </button>
            <button className="amenity-next w-12 h-12 border border-white/20 flex items-center justify-center text-white hover:bg-green-600 hover:border-green-600 transition-all cursor-pointer">
              <ChevronRight size={20} />
            </button>
          </div>
        </header>

        <Swiper
          // 2. Modules me Autoplay add kiya
          modules={[Navigation, Pagination, Grid, Autoplay]}
          slidesPerView={2}
          grid={{
            rows: 3,
            fill: "row",
          }}
          spaceBetween={12}
          // 3. Autoplay Configuration (3000ms = 3 sec)
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Mouse le jane par ruk jayega
          }}
          navigation={{
            prevEl: ".amenity-prev",
            nextEl: ".amenity-next",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            640: { slidesPerView: 3, grid: { rows: 2 } },
            1024: { slidesPerView: 6, grid: { rows: 2 } },
          }}
          className="amenities-swiper !pb-14"
        >
          {allAmenities.map((item, i) => (
            <SwiperSlide key={i} className="!h-auto">
              <div className="group relative aspect-square border border-white/10 flex flex-col items-center justify-center overflow-hidden cursor-pointer bg-white/5 backdrop-blur-sm">
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                  style={{ backgroundColor: brandGreen }}
                ></div>

                <div className="relative z-10 text-green-500 group-hover:text-white transition-all duration-300 mb-3 group-hover:animate-bounce">
                  {React.cloneElement(item.icon, {
                    size: 32,
                    strokeWidth: 1.5,
                  })}
                </div>
                <span className="relative z-10 text-white text-[10px] md:text-[12px] font-bold tracking-widest text-center px-3 leading-tight uppercase">
                  {item.title}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .amenities-swiper .swiper-pagination-bullet { background: white !important; opacity: 0.3; }
        .amenities-swiper .swiper-pagination-bullet-active { background: #22c55e !important; opacity: 1; width: 20px; border-radius: 4px; }
        .swiper-grid-column .swiper-wrapper { flex-direction: row !important; }
      `}</style>
    </section>
  );
}