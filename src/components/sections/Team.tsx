import React from "react";
import { motion } from "framer-motion";
import { useTeam } from "../../lib/useSiteData";

const getMemberImage = (member: { id: string; name: string; img?: string }): string => {
  // If img is already a clean local path, use it directly
  if (member.img && member.img.startsWith("/employes/")) {
    return member.img;
  }

  const n = (member.name || "").toLowerCase();
  if (n.includes("abu bakar")) return "/employes/abu_bakar.webp";
  if (n.includes("nazmul") || n.includes("shuvo")) return "/employes/nazmul.webp";
  if (n.includes("raiyan")) return "/employes/raiyan.webp";
  if (n.includes("wasif")) return "/employes/wasif.webp";
  if (n.includes("abir") || n.includes("ratul")) return "/employes/abir.webp";
  if (n.includes("barno")) return "/employes/barno.webp";
  if (n.includes("nafew")) return "/employes/nafew.webp";
  if (n.includes("sojol")) return "/employes/sojol.webp";
  if (n.includes("afolabi") || n.includes("isaiah")) return "/employes/afolabi.webp";
  if (n.includes("mamun")) return "/employes/mamun.webp";
  if (n.includes("fardin") || n.includes("sazid")) return "/employes/fardin.webp";

  const byId: Record<string, string> = {
    "1": "/employes/abu_bakar.webp",
    "2": "/employes/nazmul.webp",
    "3": "/employes/raiyan.webp",
    "4": "/employes/wasif.webp",
    "5": "/employes/abir.webp",
    "6": "/employes/barno.webp",
    "MHynmebMMimtKqq8jdUY": "/employes/nafew.webp",
    "VgcgURjZKxKMDtBNjpVL": "/employes/sojol.webp",
    "g4FBo4G0Om1u3n3OdHuZ": "/employes/afolabi.webp",
    "xdzyVdvEYexLZMzyezpD": "/employes/mamun.webp",
    "ozLvHtEGoAHoDOFoRBhH": "/employes/fardin.webp",
  };

  return byId[member.id] || member.img || "";
};

const Team = () => {
  const { team, loading } = useTeam();

  return (
    <section id="team" className="py-20 sm:py-28 bg-white dark:bg-[#05070F] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-14 sm:mb-20">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3">
              The Collective
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight">
              Meet the minds behind the cuts.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-sm font-medium">
            Story strategists, 3D animators, and sound designers engineering attention for world-class brands.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {team.map((member, index) => {
              const imageSrc = getMemberImage(member);
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group flex flex-col"
                >
                  <div className="relative w-full aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-5 bg-slate-100 dark:bg-[#090D1A] ring-1 ring-slate-200 dark:ring-white/10 group-hover:ring-blue-500/50 shadow-md group-hover:shadow-[0_12px_36px_rgba(37,99,235,0.18)] dark:group-hover:shadow-[0_12px_40px_rgba(37,99,235,0.25)] flex items-center justify-center transition-all duration-500">
                    {imageSrc ? (
                      <>
                        <img
                          src={imageSrc}
                          alt={`${member.name} - ${member.role} at Motionly Media`}
                          width="480"
                          height="600"
                          decoding="async"
                          className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                            const fallbackDiv = event.currentTarget.nextElementSibling as HTMLElement;
                            if (fallbackDiv) fallbackDiv.style.display = "flex";
                          }}
                        />
                        {/* Gradient vignette at bottom */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : null}
                    <div
                      className={`w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#0B1020] dark:to-[#060914] text-slate-800 dark:text-white flex-col items-center justify-center p-6 text-center ${imageSrc ? "hidden" : "flex"}`}
                    >
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-600/20 border border-blue-300 dark:border-blue-500/40 flex items-center justify-center text-2xl font-black text-blue-600 dark:text-blue-400 mb-3">
                      {member.name.charAt(0)}
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{member.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">{member.role}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
