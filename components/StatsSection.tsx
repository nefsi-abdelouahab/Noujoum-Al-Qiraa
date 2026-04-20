"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Map, Mic, Trophy } from "lucide-react";
import Image from "next/image";
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const stats: StatItem[] = [
  {
    value: 500,
    suffix: "+",
    label: "طفل وشاب مشاركون",
    icon: <Users size={36} />,
    color: "#E8B41A",
  },
  {
    value: 10,
    suffix: "",
    label: "بلديات عبر الولاية",
    icon: <Map size={36} />,
    color: "#ffffff",
  },
  {
    value: 50,
    suffix: "+",
    label: "مشارك مكوّن في السرد",
    icon: <Mic size={36} />,
    color: "#ffffff",
  },
  {
    value: 6,
    suffix: "",
    label: "مراحل برنامج متكاملة",
    icon: <Trophy size={36} />,
    color: "#ffffff",
  },
];

function AnimatedCounter({
  value,
  suffix,
  color,
}: {
  value: number;
  suffix: string;
  color: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} style={{ color }}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background:
          "linear-gradient(180deg, #07070f 0%, #0d0a1f 50%, #07070f 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Blur */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(153,23,186,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{  margin: "0 auto", position: "relative" }}
      >
        {/* Section Header */}
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
              color: "#ffffff",
              borderRadius: "8px",
              padding: "6px 18px",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            بالأرقام
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              background:
                "linear-gradient(135deg, #fff, rgba(255,255,255,0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            أثر برنامج نجوم القراءة
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <Image
            src="/status.png"
            alt="background"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.15,
              zIndex: 0,
            }}
          />

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ scale: 1.04, y: -6 }}
              style={{
                borderRadius: "8px",
                padding: "36px 28px",
                textAlign: "center",
                cursor: "default",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
            

              <div
                className="flex justify-center"
                style={{ fontSize: "40px", marginBottom: "16px" }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontSize: "clamp(40px, 7vw, 56px)",
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: "12px",
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                />
              </div>

              <p
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  lineHeight: 1.5,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
