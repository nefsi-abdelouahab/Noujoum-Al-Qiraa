"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    quote: "القراءة لم تعد مجرد هواية، صارت جزءاً من هويتي بعد البرنامج",
    name: "مشارك من تيميمون",
    category: "اليافعون",
    icon: "🚀",
    color: "#9917BA",
  },
  {
    quote: "تعلمت كيف أحوّل ما أقرأه إلى عرض يؤثر في الجمهور",
    name: "مشاركة من أوقروت",
    category: "الشباب",
    icon: "💡",
    color: "#17BA6E",
  },
  {
    quote: "البرنامج فتح لي عالماً جديداً من الأفكار والإبداع",
    name: "مشارك من شروين",
    category: "الأطفال",
    icon: "🌟",
    color: "#E8B41A",
  },
];

export default function ParticipantExperience() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "#07070f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          width: "400px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(232,180,26,0.06) 0%, transparent 70%)",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(153,23,186,0.1)",
              border: "1px solid rgba(153,23,186,0.25)",
              color: "#9917BA",
              borderRadius: "100px",
              padding: "6px 18px",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            أصوات المشاركين
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            تجارب{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E8B41A, #9917BA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              حقيقية
            </span>{" "}
            وأثر دائم
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -8 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${exp.color}20`,
                borderRadius: "24px",
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  left: "-30px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: `${exp.color}10`,
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ fontSize: "40px", marginBottom: "20px", position: "relative" }}>
                "
              </div>

              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.8,
                  marginBottom: "28px",
                  fontWeight: 500,
                  position: "relative",
                }}
              >
                {exp.quote}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${exp.color}40, ${exp.color}20)`,
                    border: `2px solid ${exp.color}50`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  {exp.icon}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                    {exp.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: exp.color,
                      fontWeight: 600,
                    }}
                  >
                    {exp.category}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}