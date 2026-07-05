"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const floatingShapes = [
  { size: 220, x: "12%", y: "20%", color: "rgba(232,180,26,0.10)", delay: 0, duration: 9 },
  { size: 160, x: "78%", y: "15%", color: "rgba(153,23,186,0.14)", delay: 1, duration: 11 },
  { size: 130, x: "65%", y: "65%", color: "rgba(232,180,26,0.08)", delay: 2, duration: 8 },
  { size: 90, x: "18%", y: "70%", color: "rgba(153,23,186,0.12)", delay: 0.5, duration: 10 },
];

export default function RegistrationClosed() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      id="register"
      style={{
        position: "relative",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "100px 24px",
        background:
          "linear-gradient(135deg, #07070f 0%, #0d0a1f 40%, #12071e 70%, #0a0a14 100%)",
      }}
    >
      {/* Ambient mesh, consistent with Hero */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(153,23,186,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(232,180,26,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(153,23,186,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating shapes */}
      {mounted &&
        floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              x: [0, 12, 0],
              scale: [1, 1.05, 1],
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

      {/* Grid pattern */}
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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(232,180,26,0.25)",
          borderRadius: "20px",
          padding: "56px 36px",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Icon */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "72px",
            height: "72px",
            margin: "0 auto 28px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(232,180,26,0.15), rgba(153,23,186,0.15))",
            border: "1px solid rgba(232,180,26,0.3)",
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E8B41A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 7v5l3.5 2" />
          </svg>
        </motion.div>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid rgba(153,23,186,0.35)",
            borderRadius: "100px",
            padding: "6px 18px",
            marginBottom: "24px",
            fontSize: "14px",
            fontWeight: 700,
            color: "#c040e0",
          }}
        >
          التسجيل مغلق حاليًا
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 900,
            lineHeight: 1.3,
            marginBottom: "18px",
            background:
              "linear-gradient(135deg, #E8B41A 0%, #f0c84a 30%, #9917BA 70%, #c040e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          انتهت فترة التسجيل في برنامج نجوم القراءة في طبعته الثانية
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(16px, 2.2vw, 19px)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.9,
            marginBottom: "8px",
          }}
        >
          نشكر كل من تقدّم بطلب الالتحاق بالبرنامج. تم إغلاق باب التسجيل ولن
          يتم قبول طلبات جديدة في الوقت الحالي.
        </p>
        <p
          style={{
            fontSize: "clamp(14px, 2vw, 16px)",
            fontWeight: 500,
            color: "rgba(255,255,255,0.5)",
            marginTop: "8px",
          }}
        >
تابعونا على منصات التواصل الاجتماعي لتتبع احداث المسابقة لحظة بلحظة        </p>

        {/* Social / follow CTA (optional, adjust link as needed) */}
        <motion.a
          href="#about"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-block",
            marginTop: "32px",
            border: "2px solid rgba(255,255,255,0.15)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "15px",
            padding: "14px 32px",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
        >
          تعرّف على البرنامج
        </motion.a>
      </motion.div>
    </section>
  );
}
