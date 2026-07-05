"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutProgram from "@/components/AboutProgram";
import ProgramStages from "@/components/ProgramStages";
import ParticipantExperience from "@/components/ParticipantExperience";
import AboutOrganization from "@/components/AboutOrganization";
import MediaSection from "@/components/MediaSection";
import RegistrationForm from "@/components/RegistrationForm";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Partners from "@/components/Partners";
import RegistrationClosed from "@/components/RegistrationClosed";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="relative">
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: "right",
          background: "linear-gradient(to left, var(--color-primary), var(--color-secondary))",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          zIndex: 100,
        }}
      />

      <ToastContainer
        position="top-right"
        rtl={true}
        theme="dark"
        toastStyle={{
          fontFamily: "Cairo, sans-serif",
          background: "#1a1a2e",
          border: "1px solid rgba(232,180,26,0.3)",
        }}
      />

      <Navbar />
      <HeroSection />
      <Partners />
      <StatsSection />
      <AboutProgram />
      <ProgramStages />
      {/* <ParticipantExperience /> */}
      <AboutOrganization />
      <MediaSection />
      <RegistrationForm />
      <ScrollToTop />
    </main>
  );
}
