import type { Metadata } from "next";
import { Tajawal, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "نجوم القراءة - رؤية للإعلام و الإنتاج السمعي البصري",
  description: "حينما تصير القراءة أسلوب حياة - نحكي بالصوت والصور",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cn("font-sans", geist.variable)}>
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}