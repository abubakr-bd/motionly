import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTeam } from "../../lib/useSiteData";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const TeamEditorial: React.FC = () => {
  const { team } = useTeam();

  const getMemberImage = (m: { id: string; name: string; img?: string }) => {
    if (m.img && m.img.startsWith("/employes/")) return m.img;
    const lower = m.name.toLowerCase();
    if (lower.includes("abu bakar")) return "/employes/abu_bakar.webp";
    if (lower.includes("nazmul")) return "/employes/nazmul.webp";
    if (lower.includes("nafew")) return "/employes/nafew.webp";
    if (lower.includes("raiyan")) return "/employes/raiyan.webp";
    if (lower.includes("wasif")) return "/employes/wasif.webp";
    if (lower.includes("abir")) return "/employes/abir.webp";
    if (lower.includes("mamun")) return "/employes/mamun.webp";
    if (lower.includes("barno")) return "/employes/barno.webp";
    if (lower.includes("sojol")) return "/employes/sojol.webp";
    if (lower.includes("fardin")) return "/employes/fardin.webp";
    if (lower.includes("afolabi")) return "/employes/afolabi.webp";
    return m.img || "/employes/abu_bakar.webp";
  };

  const getExpertise = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("ceo") || r.includes("founder")) return "Creative Direction & Brand Vision";
    if (r.includes("coo") || r.includes("growth")) return "Operations & Client Success";
    if (r.includes("cco") || r.includes("production")) return "Cinematography & Directing";
    if (r.includes("presenter") || r.includes("social")) return "On-Screen Storytelling & Community";
    if (r.includes("cinematographer")) return "Lighting, Camera & Film Production";
    if (r.includes("strategy")) return "Narrative Strategy & Positioning";
    if (r.includes("designer")) return "Visual Systems & Graphic Design";
    return "Pacing, Motion Graphics & Sound Design";
  };

  // Featured team members for the homepage gallery
  const featuredTeam = team.slice(0, 8);

  return (
    <section 
      id="about" 
      className="py-20 sm:py-32 bg-[#05070F] text-white relative overflow-hidden border-t border-white/5"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>The People Behind the Frames</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
              Creative Minds. <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">
                Different Perspectives.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Behind every project is a team of people who care about storytelling, design, and bringing ideas to life.
            </p>
          </div>

          <div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 hover:border-blue-400/30 transition-all"
            >
              <span>Meet Our Team</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Editorial Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-7 mb-14">
          {featuredTeam.map((member, index) => {
            const imgSrc = getMemberImage(member);
            const expertise = getExpertise(member.role);

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0E152E]/90 to-[#070B19]/95 border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={member.name}
                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/employes/abu_bakar.webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                  {/* Role Badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-blue-400 mb-0.5">
                      {member.role}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Expertise footer */}
                <div className="p-3.5 bg-black/40 border-t border-white/5">
                  <p className="text-[11px] text-slate-300 font-normal truncate">
                    {expertise}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamEditorial;