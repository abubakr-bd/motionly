import React from "react";
import Navbar from "./Navbar";
import Footer from "../sections/Footer";
import MaintenanceBanner from "../MaintenanceBanner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="site-shell min-h-screen flex flex-col">
      <MaintenanceBanner />
      <Navbar />
      <main className="public-main flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
