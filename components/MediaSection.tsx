"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Replace these URLs with actual Facebook Reel URLs from your page
const reels = [
  {
    url: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1294885475603192&show_text=0",
    title: "لقطات من البرنامج",
    desc: "   نجوم القراء",
  },
  {
    url: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1723450511865344&show_text=0",
    title: "لقطات من البرنامج",
    desc: "   نجوم القراء",
  },
  {
    url: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F716358621026359&show_text=0",
    title: "لقطات من البرنامج",
    desc: "   نجوم القراء",
  },
];
// Placeholder card when no real URL is available
function VideoCard({
  reel,
  index,
}: {
  reel: (typeof reels)[0];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, y: -6 }}
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Video Embed */}
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          background: "linear-gradient(135deg, #0d0a1f, #07070f)",
          cursor: "pointer",
        }}
        onClick={() => setShowIframe(true)}
      >
        {showIframe ? (
          <iframe
            src={reel.url}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setLoaded(true)}
          />
        ) : (
          // Placeholder thumbnail
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, rgba(232,180,26,0.1), rgba(153,23,186,0.1))`,
              gap: "16px",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #E8B41A, #9917BA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                boxShadow: "0 0 30px rgba(232,180,26,0.4)",
              }}
            >
              ▶
            </motion.div>
            <span
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              انقر لتشغيل الفيديو
            </span>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div style={{ padding: "20px" }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "6px",
          }}
        >
          {reel.title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {reel.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function MediaSection() {
  return (
    <section
      id="media"
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
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(232,180,26,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}
      >
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
            الإعلام والمحتوى
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            شاهد تجارب من البرنامج
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
            لحظات أصيلة من رحلة نجوم القراءة
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {reels.map((reel, i) => (
            <VideoCard key={i} reel={reel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
