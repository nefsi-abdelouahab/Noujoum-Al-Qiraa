"use client";

import { motion } from "framer-motion";
import { BookOpen, Mic2, Landmark, Handshake } from "lucide-react";

interface Feature {
  icon: React.ReactNode; // ← بدلاً من string
  title: string;
  desc: string;
  color: string;
}
const features = [
  {
    icon: <BookOpen size={22} />,
    title: "قراءة تفاعلية",
    desc: "يقرأ المشاركون مجموعة من الكتب ويبلورون أفكارها في عروض فكرية شيّقة",
    color: "#E8B41A",
  },
  {
    icon: <Mic2 size={22} />,
    title: "فضاء الإبداع والتعبير",
    desc: "تقنيات الإلقاء والتقديم والإنتاج السمعي البصري في قالب احترافي",
    color: "#9917BA",
  },
  {
    icon: <Landmark size={22} />,
    title: "الهوية الجزائرية",
    desc: "نستهدف مجالات الذاكرة والفكر والثقافة الجزائرية لربط الناشئة بجذورهم",
    color: "#17BA6E",
  },
  {
    icon: <Handshake size={22} />,
    title: "شراكات مؤسسية",
    desc: "يؤطره نخبة من الأساتذة بشراكة مديريات الثقافة والتربية والشباب والرياضة",
    color: "#E8B41A",
  },
];

export default function AboutProgram() {
  return (
    <section
      id="about"
      style={{
        padding: "100px 24px",
        background: "#07070f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Blob */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(232,180,26,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}
      >
        {/* Header */}
        <div className="flex justify-center">
          <span
            style={{
              display: "inline-block",
              background: "rgba(232,180,26,0.1)",
              border: "1px solid rgba(232,180,26,0.3)",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "6px 18px",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
            className="text-center"
          >
            عن البرنامج
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 42px)",
                fontWeight: 900,
                lineHeight: 1.25,
                marginBottom: "24px",
                color: "#fff",
              }}
            >
              برنامج{" "}
              <span
                style={{
                  background: "linear-gradient( #E8B41A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ثقافي قرائي
              </span>{" "}
              تفاعلي محلي
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "16px",
                lineHeight: 1.9,
                marginBottom: "20px",
              }}
            >
              يعتمد على نشر القراءة في الفضاءات الثقافية والشبانية وتفعيل
              التشاركية بين المجالات والقطاعات: الثقافة، الشباب، التكوين...
            </p>

            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "16px",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              يحفّز الناشئة عبر قراءة الكتب ومطالعة المواضيع ثم بلورتها في عرض
              فكري يحمل الفائدة والمتعة باستثمار تقنيات صناعة المحتوى من إلقاء
              وتقديم وإضاءة وصوت.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[" ولاية تيميمون"].map((tag, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                    borderRadius: "10px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${f.color}20`,
                  borderRadius: "20px",
                  padding: "24px 20px",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    marginBottom: "14px",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
