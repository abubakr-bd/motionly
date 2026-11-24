import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Camera, Users, Sparkles } from "lucide-react";

export const TeamBehindTheScenes: React.FC = () => {
  const teamMoments = [
    {
      name: "Abu Bakr Siddiq",
      role: "Founder & Creative Director",
      image: "/employes/abu_bakar.webp",
      caption: "Creative Direction & Story Architecture",
      span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
      name: "Nazmul Hossen",
      role: "Lead Motion Designer",
      image: "/employes/nazmul.webp",
      caption: "3D Motion Design & Kinetic Typography",
      span: "col-span-1 row-span-1",
    },
    {
      name: "Wasif Rahman",
      role: "Senior Video Editor",
      image: "/employes/wasif.webp",
      caption: "Rhythmic Timeline & Narrative Pacing",
      span: "col-span-1 row-span-1",
    },
    {
      name: "Raiyan Ahmed",
      role: "Post-Production Specialist",
      image: "/employes/raiyan.webp",
      caption: "DaVinci Color Grading & Spatial Audio",
      span: "col-span-1 row-span-1",
    },
    {
      name: "Nafew Kabir",
      role: "Visual Designer",
      image: "/employes/nafew.webp",
      caption: "Brand Systems & Vector Assets",
      span: "col-span-1 row-span-1",
    },
    {
      name: "Abir Hasan",
      role: "Motion Graphics Artist",
      image: "/employes/abir.webp",
      caption: "SaaS Screen Capture & UI Staging",
      span: "col-span-1 row-span-1",
    },
    {
      name: "Mamun Hossain",
      role: "Sound Designer & Foley Lead",
      image: "/employes/mamun.webp",
      caption: "Sound Design & Sonic Branding",
      span: "col-span-1 row-span-1",
    },
  ];

  return (
    <section 
      id="team"
      className="py-20 sm:py-28 bg-[#070b14] text-white border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header (Directly inspired by Image 3) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#38bdf8] mb-3.5">
              <Camera className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider font-bold">Behind The Scene: Team</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08] mb-3">
              The Creative Minds <br />
              <span className="font-serif italic font-normal text-[#38bdf8]">
                Behind Motionly.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              An international collective of directors, motion designers, animators, and sound engineers obsessed with visual craft.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/15 transition-all duration-150 active:scale-[0.97] shrink-0 self-start md:self-end cursor-pointer"
          >
            <span>Meet The Full Studio</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Editorial Photo Masonry Grid (Inspired by Image 3) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {teamMoments.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-lg hover:border-[#38bdf8]/40 transition-all duration-300 aspect-[4/5]`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width="400"
                height="500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/employes/abu_bakar.webp";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Card Meta Content */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono text-[#38bdf8] uppercase tracking-wider block mb-0.5">
                  {item.role}
                </span>
                <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                  {item.name}
                </h3>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5 font-normal opacity-80">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamBehindTheScenes;
