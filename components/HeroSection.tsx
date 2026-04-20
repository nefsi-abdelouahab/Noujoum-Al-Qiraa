"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
const floatingShapes = [
  {
    size: 300,
    x: "10%",
    y: "15%",
    color: "rgba(232,180,26,0.12)",
    delay: 0,
    duration: 8,
  },
  {
    size: 200,
    x: "75%",
    y: "10%",
    color: "rgba(153,23,186,0.15)",
    delay: 1,
    duration: 10,
  },
  {
    size: 150,
    x: "60%",
    y: "70%",
    color: "rgba(232,180,26,0.08)",
    delay: 2,
    duration: 7,
  },
  {
    size: 100,
    x: "20%",
    y: "75%",
    color: "rgba(153,23,186,0.12)",
    delay: 0.5,
    duration: 9,
  },
  {
    size: 80,
    x: "85%",
    y: "55%",
    color: "rgba(232,180,26,0.15)",
    delay: 1.5,
    duration: 6,
  },
  {
    size: 60,
    x: "40%",
    y: "20%",
    color: "rgba(153,23,186,0.1)",
    delay: 2.5,
    duration: 11,
  },
];

const stars = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
}));

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #07070f 0%, #0d0a1f 40%, #12071e 70%, #0a0a14 100%)",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/cover.png"
          alt="background"
          fill
          priority
          sizes="100vw" 
          style={{
            objectFit: "contain",
            objectPosition: "bottom",
            opacity: 0.3,
          }}
        />
      </div>
      {/* Animated Background Mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(153,23,186,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(232,180,26,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(153,23,186,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Stars */}
      {mounted &&
        stars.map((star) => (
          <motion.div
            key={star.id}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: "50%",
              background: "#fff",
              pointerEvents: "none",
            }}
          />
        ))}

      {/* Floating Shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: shape.x,
            top: shape.y,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            borderRadius: "50%",
            background: shape.color,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className=""
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(232,180,26,0.3)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "32px",
            fontSize: "18px",
            fontWeight: 600,
            color: "#E8B41A",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Image src="/roeya.png" alt="Logo" width={50} height={50} />
          </motion.span>
          فريق رؤية للإعلام و الإنتاج السمعي البصري
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <Image src="/roeya.png" alt="Logo" width={50} height={50} />
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: "clamp(52px, 10vw, 100px)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "24px",
            background:
              "linear-gradient(135deg, #E8B41A 0%, #f0c84a 30%, #9917BA 70%, #c040e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-2px",
            marginTop: "10px",
          }}
        >
          نجوم القراءة
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ marginBottom: "16px" }}
        >
          <p
            style={{
              fontSize: "clamp(18px, 3vw, 26px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              marginBottom: "8px",
            }}
          >
            حينما تصير القراءة أسلوب حياة..... نحكي بالصوت والصور..
          </p>
        </motion.div>

        {/* Divider */}
        {/* <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            width: "120px",
            height: "3px",
            background: "linear-gradient(to left, #E8B41A, #9917BA)",
            borderRadius: "2px",
            margin: "28px auto",
          }}
        /> */}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "24px",
          }}
        >
          <motion.a
            href="#register"
            whileHover={{
              scale: 1.06,
              boxShadow:
                "0 0 40px rgba(232,180,26,0.6), 0 0 80px rgba(232,180,26,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #E8B41A, #f0c84a)",
              color: "#07070f",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "17px",
              padding: "16px 40px",
              borderRadius: "8px",
              boxShadow: "0 0 30px rgba(232,180,26,0.4)",
              transition: "all 0.3s ease",
              letterSpacing: "0.5px",
            }}
          >
            سجّل الآن
          </motion.a>

          <motion.a
            href="#about"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-block",
              border: "2px solid rgba(255,255,255,0.15)",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "16px",
              padding: "16px 36px",
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
          >
            اعرف أكثر
          </motion.a>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: "60px" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.3)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "2px",
            }}
          >
            <span>اكتشف أكثر</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
