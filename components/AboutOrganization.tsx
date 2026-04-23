"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "مديرية الثقافة لولاية تيميمون", icon: "🏛️" },
  { name: "مديرية التربية لولاية تيميمون", icon: "📚" },
  { name: "مديرية الشباب والرياضة", icon: "⚽" },
  { name: "إذاعة الجزائر من تيميمون", icon: "📻" },
  { name: "مديرية الشؤون الدينية والأوقاف", icon: "☪️" },
  { name: "مديرية التكوين والتعليم المهنيين", icon: "🎓" },
];

const goals = [
  "تنشيط المحيط الاجتماعي والثقافي",
  "ترقية ممارسة الإعلام والسمعي البصري",
  "حفظ الذاكرة وتوثيق الرواية الشفهية",
  "احتواء الطاقات الشبانية واكتشاف المواهب",
  "تثمين التراث الثقافي والعادات الاجتماعية",
  "ترقية روح المواطنة وثقافة الحوار الوطني",
];

export default function AboutOrganization() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "linear-gradient(180deg, #07070f 0%, #0d0a1f 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(153,23,186,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}
      >
        {/* Header */}
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
            من نحن
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#fff",
               textAlign: "center",
            }}
          >
            فريق{"  "}
            <span
              style={{
                background: "linear-gradient( #E8B41A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              رؤية للإعلام و الإنتاج السمعي البصري
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "48px",
            marginBottom: "64px",
            alignItems: "start",
          }}
        >
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: "16px",
                }}
              >
                فريق إعلامي
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "15px",
                  lineHeight: 1.9,
                }}
              >
                متخصص في الجانب الإعلامي والإنتاج السمعي البصري بمختلف صيغه،
                نهدف من خلال نشاطاتنا إلى ترقية الممارسة الإعلامية لا سيما في
                منطقة تيميمون لدى الشباب والناشئين المشتغلين في مجال الإعلام،
                وتوفير فضاء الممارسة والتكوين للمهتمين بالمجال.
              </p>
            </div>
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#fff",
                marginBottom: "20px",
              }}
            >
              أهدافنا في ولاية تيميمون
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {goals.map((goal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: i % 2 === 0 ? "#E8B41A" : "#9917BA",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                    }}
                  >
                    {goal}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Partners */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "#fff",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            شركاؤنا في الإنجاز
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            {partners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
              >
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
