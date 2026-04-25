"use client";

import LogoLoopComponent from "./LogoLoop";
import Image from "next/image";

const LogoLoop = LogoLoopComponent as React.ComponentType<any>;

const Partners = () => {
  const data = Array.from({ length: 11 }, (_, i) => ({
    logo_url: `/logo${i + 1}.png`,
  })); // Mock data for testing;

  const logos = data?.map((partner: any) => ({
    node: (
      <Image
        src={partner.logo_url}
        alt={"partner"}
        width={200}
        height={100}
        style={{ objectFit: "contain" }}
      />
    ),
    title: "partner",
  }));

  return (
    <div className="mt-40 mb-0 pb-0">
      <div
        dir="ltr"
        style={{
          height: "150px",
          position: "relative",
          overflow: "hidden",
          marginTop: "40px",
          textAlign: "center",
        }}
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
            marginBottom: "30px",
          }}
        >
          الشركاء والداعمون
        </span>
        <LogoLoop
          logos={logos}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          ariaLabel="partners"
        />
      </div>
    </div>
  );
};

export default Partners;
