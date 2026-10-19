import React from "react";
import { motion } from "framer-motion";
import { useTeam } from "../../lib/useSiteData";

const Team = () => {
  const { team, loading } = useTeam();
  const fallbackImages: Record<string, string> = {
    "1": "/employes/abu bakar.png",
    "2": "/employes/Nazmul Hossen Shuvo.jpg",
    "3": "/employes/Raiyan.jpg",
    "4": "/employes/Wasif.png",
    "5": "/employes/abir.png",
    "6": "/employes/barno.png",
  };

  return (
    <section id="team" className="py-24 md:py-32 bg-white">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">The Team</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Meet the people behind the work.</h2>
          </div>
          <p className="text-lg text-slate-500 max-w-sm">
            Editors, strategists, and designers who help creators and brands make video with a clear purpose.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-slate-100 flex items-center justify-center">
                  {member.img ? (
                    <img
                      src={member.img}
                      alt={`${member.name} - ${member.role} at Motionly Media`}
                      width="480"
                      height="600"
                      decoding="async"
                      className="w-full h-full object-cover object-top grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                      onError={(event) => {
                        const fallback = fallbackImages[member.id];
                        if (fallback && !event.currentTarget.dataset.fallbackAttempted) {
                          event.currentTarget.dataset.fallbackAttempted = "true";
                          event.currentTarget.src = fallback;
                        } else {
                          event.currentTarget.style.display = "none";
                          const fallbackDiv = event.currentTarget.nextElementSibling as HTMLElement;
                          if (fallbackDiv) fallbackDiv.style.display = "flex";
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={`w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 text-white flex-col items-center justify-center p-6 text-center ${member.img ? "hidden" : "flex"}`}
                  >
                    <div className="w-20 h-20 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-3xl font-black text-blue-400 mb-4">
                      {member.name.charAt(0)}
                    </div>
                    <p className="text-sm font-bold text-slate-300">{member.name}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{member.role}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
