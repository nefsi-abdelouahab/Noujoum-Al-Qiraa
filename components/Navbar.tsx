"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
const navLinks = [
  { href: "#hero", label: "الرئيسية" },
  { href: "#about", label: "عن البرنامج" },
  { href: "#stages", label: "المراحل" },
  { href: "#media", label: "الإعلام" },
  { href: "#register", label: "التسجيل" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className=""
      style={{
        position: "fixed",
        top: "12px",
        left: 0,
        right: 0,
        margin: "0 auto",
        zIndex: 99,
        width: "95%",
        maxWidth: "1100px",
        borderRadius: "20px",
        padding: "2px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(10,10,20,0.92)" : "rgba(10,10,20,0.5)",
        backdropFilter: "blur(20px)",
        border: scrolled
          ? "1px solid rgba(232,180,26,0.2)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
      }}
    >
      {/* Logo */}
      <a href="#hero" style={{ textDecoration: "none" }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            <Image src="/logo.png" alt="Logo" width={200} height={200} />
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "17px",
              background: "linear-gradient(135deg, #E8B41A, #9917BA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          ></span>
        </motion.div>
      </a>

      {/* Desktop Links */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
        className="hidden-mobile"
      >
        {navLinks.map((link) => (
          <motion.a
            key={link.href}
            href={link.href}
            whileHover={{ scale: 1.05 }}
            style={{
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: 600,
              padding: "8px 14px",
              borderRadius: "10px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = "#E8B41A";
              (e.target as HTMLElement).style.fontWeight = "700";
              (e.target as HTMLElement).style.fontSize = "16px";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = "rgba(255,255,255,0.75)";
              (e.target as HTMLElement).style.fontWeight = "600";
              (e.target as HTMLElement).style.fontSize = "14px";
            }}
          >
            {link.label}
          </motion.a>
        ))}
        <motion.a
          href="#register"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(  #9917BA,#E8B41A)",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 700,
            padding: "9px 20px",
            borderRadius: "8px",
            marginRight: "8px",
            boxShadow: "0 4px 20px rgba(232,180,26,0.3)",
          }}
        >
          سجّل الآن
        </motion.a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "none",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
        className="show-mobile"
        aria-label="القائمة"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={
              open
                ? i === 0
                  ? { rotate: 45, y: 7 }
                  : i === 1
                    ? { opacity: 0 }
                    : { rotate: -45, y: -7 }
                : { rotate: 0, y: 0, opacity: 1 }
            }
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "#E8B41A",
              borderRadius: "2px",
            }}
          />
        ))}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            style={{
              position: "absolute",
              top: "70px",
              left: 0,
              right: 0,
              background: "rgba(10,10,20,0.97)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232,180,26,0.2)",
              borderRadius: "16px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
