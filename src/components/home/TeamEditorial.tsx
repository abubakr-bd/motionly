import React from "react";
import { Link } from "react-router-dom";
import { useTeam } from "../../lib/useSiteData";
import { ArrowUpRight } from "lucide-react";

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
    if (r.includes("ceo") || r.includes("founder")) return "Creative direction & brand vision";
    if (r.includes("coo") || r.includes("growth")) return "Operations & client partnerships";
    if (r.includes("lead") || r.includes("senior")) return "Post-production & narrative pacing";
    if (r.includes("animat") || r.includes("3d")) return "3D CGI & advanced motion design";
    if (r.includes("designer")) return "Visual systems & graphic direction";
    return "Motion graphics & sound foley";
  };

  const featuredTeam = team.slice(0, 8);

  return (
    <section 
      id="about" 
      className="py-20 sm:py-28 bg-[#f5f7fa] dark:bg-[#07080d] text-[#111827] dark:text-[#eef0f5] border-b border-black/[0.06] dark:border-[#eef0f5]/[0.08] transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="font-mono text-xs text-[#2563eb] mb-3">
              The studio team
            </div>

            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#111827] dark:text-[#eef0f5] leading-[1.1] mb-3">
              Creative minds, different perspectives
            </h2>

            <p className="text-base sm:text-lg text-[#4b5565] dark:text-[#a3a9b8] leading-relaxed">
              Behind every project is a team focused on storytelling, motion design, and visual craft
            </p>
          </div>

          <div>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-[#ffffff] dark:bg-[#11141c] hover:bg-[#eceff4] dark:hover:bg-[#1a1e28] text-[#111827] dark:text-[#eef0f5] text-xs font-medium border border-black/[0.08] dark:border-[#eef0f5]/[0.08] transition-colors duration-150 active:scale-[0.98]"
            >
              <span>Meet our team</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#6b7487] dark:text-[#7a8296]" />
            </Link>
          </div>
        </div>

        {/* Editorial Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {featuredTeam.map((member) => {
            const imgSrc = getMemberImage(member);
            const expertise = getExpertise(member.role);

            return (
              <div
                key={member.id}
                className="rounded-2xl overflow-hidden bg-[#ffffff] dark:bg-[#11141c] border border-black/[0.08] dark:border-[#eef0f5]/[0.08] flex flex-col justify-between shadow-xs group"
              >
                {/* Photo */}
                <div className="relative aspect-[4/5] bg-[#07080d] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={member.name}
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-150"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/employes/abu_bakar.webp";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080d]/80 via-transparent to-transparent" />

                  {/* Role and Name Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] font-mono text-[#a3a9b8] mb-0.5">
                      {member.role}
                    </p>
                    <h3 className="text-sm sm:text-base font-medium tracking-tight">
                      {member.name}
                    </h3>
                  </div>
                </div>

                {/* Expertise Footer */}
                <div className="p-3 bg-[#f5f7fa] dark:bg-[#11141c] border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08]">
                  <p className="text-xs text-[#6b7487] dark:text-[#7a8296] truncate">
                    {expertise}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamEditorial;
