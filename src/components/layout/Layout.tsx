import React from "react";
import Navbar from "./Navbar";
import Footer from "../sections/Footer";
import MaintenanceBanner from "../MaintenanceBanner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="site-shell min-h-screen flex flex-col bg-white text-slate-900 dark:bg-[#05070F] dark:text-slate-100 antialiased selection:bg-blue-600/40 selection:text-white transition-colors duration-300">
      <MaintenanceBanner />
      <Navbar />
      <main className="public-main flex-grow pt-24 bg-transparent">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
