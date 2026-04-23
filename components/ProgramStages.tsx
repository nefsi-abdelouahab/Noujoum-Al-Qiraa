"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PartyPopper,
  BookOpen,
  Mic2,
  Medal,
  PenLine,
  Star,
} from "lucide-react";

interface Stage {
  number: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}

const stages: Stage[] = [
  {
    number: "01",
    icon: <PartyPopper size={26} />,
    title: "حفل الافتتاح الترويجي",
    desc: "انطلاقة البرنامج بحفل ترويجي يجمع المشاركين والشركاء لإطلاق شرارة الحماس",
    color: "#E8B41A",
  },
  {
    number: "02",
    icon: <BookOpen size={26} />,
    title: "التصفيات الأولى عبر البلديات",
    desc: "مسابقة القراءة الأولى تنطلق في البلديات العشر عبر ولاية تيميمون",
    color: "#9917BA",
  },
  {
    number: "03",
    icon: <Mic2 size={26} />,
    title: "يوم تكويني في التقديم والإلقاء",
    desc: "ورشة تكوينية مكثفة في تقنيات التقديم وفن الإلقاء والتعبير أمام الجمهور",
    color: "#17BA6E",
  },
  {
    number: "04",
    icon: <Medal size={26} />,
    title: "الدور النصف النهائي",
    desc: "التصفيات النهائية تجمع أفضل المشاركين في مسابقة قراءة تنافسية",
    color: "#E8B41A",
  },
  {
    number: "05",
    icon: <PenLine size={26} />,
    title: "ورشة إعداد المحتوى",
    desc: "إعداد وبلورة أفكار القراءة في محتوى سمعي بصري إبداعي ومؤثر",
    color: "#9917BA",
  },
  {
    number: "06",
    icon: <Star size={26} />,
    title: "العرض السمعي البصري النهائي",
    desc: "الحفل الكبير — القراءة أسلوب حياة — عرض النهائي الكبير بحضور الشركاء والجمهور",
    color: "#E8B41A",
  },
];

export default function ProgramStages() {
  return (
    <section
      id="stages"
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #07070f 0%, #0d0a1f 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* bg glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(153,23,186,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(232,180,26,0.1)",
              border: "1px solid rgba(232,180,26,0.25)",
              color: "#fff",
              borderRadius: "8px",
              padding: "6px 18px",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            مسيرة البرنامج
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            مراحل برنامج{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #E8B41A, #e8761a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              نجوم القراءة
            </span>
          </h2>
        </motion.div>

        {/* ── Desktop Timeline ── */}
        <div className="desktop-timeline" style={{ position: "relative" }}>
          <motion.div
            initial={{ scaleY: 0, transformOrigin: "top" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              right: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(to bottom, #E8B41A, #9917BA, #E8B41A)",
              borderRadius: "2px",
            }}
          />

          {stages.map((stage, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRight ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  justifyContent: isRight ? "flex-start" : "flex-end",
                  marginBottom: "48px",
                  position: "relative",
                }}
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  style={{
                    position: "absolute",
                    right: "calc(50% - 25px)",
                    top: "20px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: "#000",
                    border: "3px solid #E8B41A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    boxShadow: `0 0 20px ${stage.color}50`,
                  }}
                >
                  {stage.icon}
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  style={{
                    width: "calc(50% - 48px)",
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${stage.color}25`,
                    borderRadius: "20px",
                    padding: "24px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#E8B41A",
                      marginBottom: "6px",
                      letterSpacing: "2px",
                    }}
                  >
                    المرحلة {stage.number}
                  </div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#fff",
                      marginBottom: "8px",
                    }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.7,
                    }}
                  >
                    {stage.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile Timeline ── */}
        <div className="mobile-timeline" style={{ position: "relative" }}>
          {/* الخط على اليمين */}
          <motion.div
            initial={{ scaleY: 0, transformOrigin: "top" }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "absolute",
              right: "24px",
              left: "auto",
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(to bottom, #E8B41A, #9917BA, #E8B41A)",
              borderRadius: "2px",
              zIndex: 0,
            }}
          />

          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                display: "flex",
                flexDirection: "row", // ← row عادي
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "32px",
                position: "relative",
                direction: "ltr", // ← نفرض LTR حتى لا يتأثر بـ RTL الصفحة
              }}
            >
              {/* البطاقة أولاً في الـ DOM = تأخذ اليسار */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${stage.color}25`,
                  borderRadius: "16px",
                  padding: "18px",
                  transition: "all 0.3s ease",
                  direction: "rtl", // ← النص داخل البطاقة يبقى RTL
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#E8B41A",
                    marginBottom: "4px",
                    letterSpacing: "2px",
                  }}
                >
                  المرحلة {stage.number}
                </div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "6px",
                  }}
                >
                  {stage.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {stage.desc}
                </p>
              </motion.div>

              {/* النقطة ثانياً في الـ DOM = تذهب لليمين */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                style={{
                  flexShrink: 0,
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#000",
                  border: "3px solid #E8B41A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
                  boxShadow: `0 0 16px ${stage.color}50`,
                }}
              >
                {stage.icon}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .mobile-timeline  { display: none; }
        .desktop-timeline { display: block; }

        @media (max-width: 600px) {
          .desktop-timeline { display: none; }
          .mobile-timeline  { display: block; }
        }
      `}</style>
    </section>
  );
}
