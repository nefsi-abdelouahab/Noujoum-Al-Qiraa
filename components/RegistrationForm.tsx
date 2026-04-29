"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  CheckCircle,
  MapPin,
  PartyPopper,
  Loader2,
  AlertTriangle,
  BookOpen,
  Heart,
  UserPlus,
  Download,
} from "lucide-react";
import { dairas, educationLevels, bookGenres } from "@/data/locations";
import {
  calculateCategory,
  getCategoryColor,
  getCategoryRange,
  type Category,
} from "@/utils/helpers";

// ─── Types ─────────────────────────────────────────────────────────────────
interface FormData {
  lastName: string;
  firstName: string;
  dateOfBirth: string;
  isSpecialNeeds: boolean;
  daira: string;
  commune: string;
  educationLevel: string;
  schoolName: string;
  parentName: string;
  phone: string;
  email: string;
  booksRead: string;
  genres: string[];
  previousParticipation: string;
  presentationExperience: string;
  aboutProgram: string;
  motivation: string;
  videoLink: string;
  agreedToTerms: boolean;
}

const STEPS = [
  "المعلومات الشخصية",
  "الموقع الجغرافي",
  "التعليم",
  "ولي الأمر",
  "معلومات إضافية",
];

const initialForm: FormData = {
  lastName: "",
  firstName: "",
  dateOfBirth: "",
  isSpecialNeeds: false,
  daira: "",
  commune: "",
  educationLevel: "",
  schoolName: "",
  parentName: "",
  phone: "",
  email: "",
  booksRead: "",
  genres: [],
  previousParticipation: "لا",
  presentationExperience: "لا",
  aboutProgram: "",
  motivation: "",
  videoLink: "",
  agreedToTerms: false,
};

// ─── Field Component ────────────────────────────────────────────────────────
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "rgba(255,255,255,0.7)",
          display: "flex",
          gap: "4px",
        }}
      >
        {label}
        {required && <span style={{ color: "#E8B41A" }}>*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            style={{
              color: "#ff6b6b",
              fontSize: "12px",
              fontWeight: 600,
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <AlertTriangle size={13} strokeWidth={2.5} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = (
  focused: boolean,
  hasError: boolean,
): React.CSSProperties => ({
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: `1.5px solid ${
    hasError
      ? "#ff6b6b66"
      : focused
        ? "rgba(232,180,26,0.5)"
        : "rgba(255,255,255,0.08)"
  }`,
  background: focused ? "rgba(232,180,26,0.04)" : "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "15px",
  fontFamily: "Cairo, sans-serif",
  outline: "none",
  transition: "all 0.2s ease",
  direction: "rtl",
  boxShadow: focused ? "0 0 0 3px rgba(232,180,26,0.1)" : "none",
  boxSizing: "border-box",
});

const textareaStyle = (focused: boolean): React.CSSProperties => ({
  ...inputStyle(focused, false),
  resize: "vertical",
  minHeight: "100px",
  lineHeight: 1.7,
});

// ─── Main Form ──────────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [focused, setFocused] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [detectedCategory, setDetectedCategory] = useState<Category>(null);

  const selectedDaira = dairas.find((d: any) => d.id === form.daira);
  const communes = selectedDaira?.communes || [];
  const isOutsideSchool = form.educationLevel === "خارج المنظومة التعليمية";

  const set = (key: keyof FormData, value: string | string[] | boolean) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
    if (key === "dateOfBirth" || key === "isSpecialNeeds") {
      const dob = key === "dateOfBirth" ? (value as string) : form.dateOfBirth;
      const sn =
        key === "isSpecialNeeds" ? (value as boolean) : form.isSpecialNeeds;
      setDetectedCategory(calculateCategory(dob, sn));
    }
  };

  const toggleGenre = (genre: string) => {
    const current = form.genres;
    set(
      "genres",
      current.includes(genre)
        ? current.filter((g) => g !== genre)
        : [...current, genre],
    );
  };

  // ─── Validation ──────────────────────────────────────────────────────────
  const validateStep = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};

    if (step === 0) {
      if (!form.dateOfBirth) {
        e.dateOfBirth = "تاريخ الميلاد مطلوب";
      } else {
        const cat = calculateCategory(form.dateOfBirth, form.isSpecialNeeds);
        if (!cat) {
          e.dateOfBirth = form.isSpecialNeeds
            ? "ذوو الهمم(المعاقين): العمر يجب أن يكون بين 8 و 18 سنة"
            : "العمر خارج النطاق المسموح به (8-35 سنة)";
        }
      }
    }

    if (step === 1) {
      if (!form.daira) e.daira = "الدائرة مطلوبة";
      if (!form.commune) e.commune = "البلدية مطلوبة";
    }

    if (step === 2) {
      if (!form.educationLevel) e.educationLevel = "المستوى الدراسي مطلوب";
      if (!isOutsideSchool && !form.schoolName.trim())
        e.schoolName = "اسم المؤسسة مطلوب";
    }

    if (step === 3) {
      if (!form.parentName.trim()) e.parentName = "اسم ولي الأمر مطلوب";
      if (!form.phone.trim()) e.phone = "رقم الهاتف مطلوب";
      else if (!/^(0)(5|6|7)[0-9]{8}$/.test(form.phone.replace(/\s/g, "")))
        e.phone = "رقم الهاتف غير صالح";
      if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "البريد الإلكتروني غير صالح";
    }

    setErrors(e as Partial<Record<keyof FormData, string>>);
    if (Object.keys(e).length > 0) {
      Object.values(e).forEach((msg) => toast.error(msg as string));
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!validateStep()) return;
    if (!form.agreedToTerms) {
      toast.error("يجب الموافقة على الالتزامات والتعهدات أولاً");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "حدث خطأ، يرجى المحاولة مجدداً");
      } else {
        setDetectedCategory(data.category);
        setSuccess(true);
        toast.success("تم التسجيل بنجاح!");
      }
    } catch {
      toast.error("خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  // ─── Success Screen ─────────────────────────────────────────────────────
  if (success) {
    return (
      <section
        id="register"
        style={{
          padding: "100px 24px",
          background: "linear-gradient(180deg, #07070f 0%, #0d0a1f 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(232,180,26,0.3)",
            borderRadius: "28px",
            padding: "60px 48px",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              marginBottom: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <PartyPopper size={72} color="#E8B41A" strokeWidth={1.5} />
          </motion.div>

          <h2
            style={{
              fontSize: "28px",
              fontWeight: 900,
              background: "linear-gradient(135deg, #E8B41A, #9917BA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "16px",
            }}
          >
            تم التسجيل بنجاح!
          </h2>

          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            شكراً لك! سنتواصل معك قريباً.
          </p>

          {detectedCategory && (
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                borderRadius: "14px",
                background: `${getCategoryColor(detectedCategory)}15`,
                border: `1px solid ${getCategoryColor(detectedCategory)}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <BookOpen
                size={18}
                color={getCategoryColor(detectedCategory)}
                strokeWidth={2}
              />
              <span
                style={{
                  color: getCategoryColor(detectedCategory),
                  fontWeight: 700,
                }}
              >
                فئتك: {detectedCategory}
              </span>
            </div>
          )}

          <motion.button
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 30px rgba(232,180,26,0.4)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSuccess(false);
              setStep(0);
              setForm(initialForm);
              setDetectedCategory(null);
              setErrors({});
            }}
            style={{
              marginTop: "32px",
              padding: "13px 32px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg, #E8B41A, #9917BA)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "Cairo, sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              margin: "32px auto 0",
            }}
          >
            <UserPlus size={18} strokeWidth={2.5} />
            تسجيل شخص آخر
          </motion.button>
        </motion.div>
      </section>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <section
      id="register"
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
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(153,23,186,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "720px", margin: "0 auto", position: "relative" }}
      >
        {/* ─── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <span
            style={{
              display: "inline-block",
              background: "rgba(232,180,26,0.1)",
              border: "1px solid rgba(232,180,26,0.25)",
              color: "#E8B41A",
              borderRadius: "100px",
              padding: "6px 18px",
              fontSize: "13px",
              fontWeight: 700,
              marginBottom: "16px",
            }}
          >
            انضم إلينا
          </span>

          <h2
            style={{
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            سجّل في{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E8B41A, #9917BA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              نجوم القراءة
            </span>
          </h2>

          {/* ── زر تحميل الدليل — دائماً مرئي ── */}
          <motion.a
            href="/دليل المشارك - نجوم القراءة الطبعة الثانية.pdf"
            download
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 24px rgba(232,180,26,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "8px",
              padding: "11px 26px",
              borderRadius: "100px",
              background: "rgba(232,180,26,0.08)",
              border: "1.5px solid rgba(232,180,26,0.3)",
              color: "#E8B41A",
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "Cairo, sans-serif",
              transition: "all 0.2s",
            }}
          >
            <Download size={15} strokeWidth={2.5} />
            تحميل دليل المشارك
          </motion.a>
        </motion.div>

        {/* ─── Form Card ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "28px",
            padding: "40px",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Progress */}
          <div style={{ marginBottom: "32px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                }}
              >
                الخطوة {step + 1} من {STEPS.length}
              </span>
              <span
                style={{ fontSize: "13px", color: "#E8B41A", fontWeight: 700 }}
              >
                {STEPS[step]}
              </span>
            </div>
            <div
              style={{
                height: "6px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "100px",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(to left, #E8B41A, #9917BA)",
                  borderRadius: "100px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  title={s}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background:
                      i < step
                        ? "#E8B41A"
                        : i === step
                          ? "linear-gradient(135deg, #E8B41A, #9917BA)"
                          : "rgba(255,255,255,0.1)",
                    border: i === step ? "2px solid #E8B41A" : "none",
                    transition: "all 0.3s",
                    boxShadow:
                      i <= step ? "0 0 8px rgba(232,180,26,0.4)" : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {step === 0 && (
                <Step0
                  form={form}
                  errors={errors}
                  focused={focused}
                  setFocused={setFocused}
                  set={set}
                  detectedCategory={detectedCategory}
                />
              )}
              {step === 1 && (
                <Step1
                  form={form}
                  errors={errors}
                  focused={focused}
                  setFocused={setFocused}
                  set={set}
                  communes={communes}
                />
              )}
              {step === 2 && (
                <Step2
                  form={form}
                  errors={errors}
                  focused={focused}
                  setFocused={setFocused}
                  set={set}
                  isOutsideSchool={isOutsideSchool}
                />
              )}
              {step === 3 && (
                <Step3
                  form={form}
                  errors={errors}
                  focused={focused}
                  setFocused={setFocused}
                  set={set}
                />
              )}
              {step === 4 && (
                <Step4
                  form={form}
                  errors={errors}
                  focused={focused}
                  setFocused={setFocused}
                  set={set}
                  toggleGenre={toggleGenre}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "36px",
              gap: "16px",
            }}
          >
            {step > 0 ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={prevStep}
                style={{
                  padding: "13px 28px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Cairo, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M5 12l7-7M5 12l7 7" />
                </svg>
                السابق
              </motion.button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 30px rgba(232,180,26,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={nextStep}
                style={{
                  padding: "13px 36px",
                  borderRadius: "14px",
                  border: "none",
                  background: "linear-gradient(135deg, #E8B41A, #9917BA)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "Cairo, sans-serif",
                  boxShadow: "0 4px 20px rgba(232,180,26,0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                التالي
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M19 12l-7 7M19 12l-7-7" />
                </svg>
              </motion.button>
            ) : (
              <motion.button
                whileHover={
                  form.agreedToTerms
                    ? {
                        scale: 1.04,
                        boxShadow: "0 0 40px rgba(232,180,26,0.6)",
                      }
                    : {}
                }
                whileTap={form.agreedToTerms ? { scale: 0.97 } : {}}
                onClick={handleSubmit}
                disabled={loading || !form.agreedToTerms}
                style={{
                  padding: "13px 40px",
                  borderRadius: "14px",
                  border: "none",
                  background:
                    loading || !form.agreedToTerms
                      ? "rgba(255,255,255,0.08)"
                      : "linear-gradient(135deg, #E8B41A, #9917BA)",
                  color:
                    loading || !form.agreedToTerms
                      ? "rgba(255,255,255,0.3)"
                      : "#fff",
                  fontSize: "16px",
                  fontWeight: 800,
                  cursor:
                    loading || !form.agreedToTerms ? "not-allowed" : "pointer",
                  fontFamily: "Cairo, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow:
                    form.agreedToTerms && !loading
                      ? "0 4px 20px rgba(232,180,26,0.35)"
                      : "none",
                  transition: "all 0.3s ease",
                  opacity: form.agreedToTerms ? 1 : 0.5,
                }}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ display: "flex" }}
                    >
                      <Loader2 size={18} strokeWidth={2.5} />
                    </motion.span>
                    جارٍ الإرسال...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} strokeWidth={2.5} />
                    أرسل التسجيل
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Step 0: Personal Info ──────────────────────────────────────────────────
function Step0({
  form,
  errors,
  focused,
  setFocused,
  set,
  detectedCategory,
}: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#fff",
          marginBottom: "4px",
        }}
      >
        المعلومات الشخصية
      </h3>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <Field label="اللقب" error={errors.lastName} required>
          <input
            value={form.lastName}
            maxLength={15}
            onChange={(e) => set("lastName", e.target.value)}
            onFocus={() => setFocused("lastName")}
            onBlur={() => setFocused("")}
            placeholder="مثال: بن علي"
            style={inputStyle(focused === "lastName", !!errors.lastName)}
          />
        </Field>
        <Field label="الاسم" error={errors.firstName} required>
          <input
            value={form.firstName}
            maxLength={15}
            onChange={(e) => set("firstName", e.target.value)}
            onFocus={() => setFocused("firstName")}
            onBlur={() => setFocused("")}
            placeholder="مثال: أحمد"
            style={inputStyle(focused === "firstName", !!errors.firstName)}
          />
        </Field>
      </div>

      <Field label="تاريخ الميلاد" error={errors.dateOfBirth} required>
        <input
          type="date"
          value={form.dateOfBirth}
          onChange={(e) => set("dateOfBirth", e.target.value)}
          onFocus={() => setFocused("dateOfBirth")}
          onBlur={() => setFocused("")}
          style={{
            ...inputStyle(focused === "dateOfBirth", !!errors.dateOfBirth),
            colorScheme: "dark",
          }}
        />
      </Field>

      {/* Special Needs Toggle */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        onClick={() => set("isSpecialNeeds", !form.isSpecialNeeds)}
        style={{
          padding: "16px 20px",
          borderRadius: "16px",
          background: form.isSpecialNeeds
            ? "rgba(79,195,247,0.08)"
            : "rgba(255,255,255,0.03)",
          border: `1.5px solid ${form.isSpecialNeeds ? "rgba(79,195,247,0.35)" : "rgba(255,255,255,0.08)"}`,
          display: "flex",
          alignItems: "center",
          gap: "14px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "6px",
            border: `2px solid ${form.isSpecialNeeds ? "#4FC3F7" : "rgba(255,255,255,0.2)"}`,
            background: form.isSpecialNeeds ? "#4FC3F7" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {form.isSpecialNeeds && (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <Heart
          size={18}
          color={form.isSpecialNeeds ? "#4FC3F7" : "rgba(255,255,255,0.4)"}
          strokeWidth={2}
        />
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: form.isSpecialNeeds ? "#4FC3F7" : "rgba(255,255,255,0.7)",
            }}
          >
            من ذوي الهمم (ذوي الاحتياجات الخاصة)
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
              marginTop: "2px",
            }}
          >
            جميع الأعمار من 8 إلى 18 سنة
          </div>
        </div>
      </motion.div>

      {/* Category Badge */}
      <AnimatePresence>
        {detectedCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              padding: "16px 20px",
              borderRadius: "16px",
              background: `${getCategoryColor(detectedCategory)}12`,
              border: `1.5px solid ${getCategoryColor(detectedCategory)}30`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <BookOpen
              size={28}
              color={getCategoryColor(detectedCategory)}
              strokeWidth={1.8}
            />
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  color: getCategoryColor(detectedCategory),
                }}
              >
                فئة {detectedCategory}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                نطاق السن: {getCategoryRange(detectedCategory)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Step 1: Location ───────────────────────────────────────────────────────
function Step1({ form, errors, focused, setFocused, set, communes }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#fff",
          marginBottom: "4px",
        }}
      >
        الموقع الجغرافي
      </h3>

      <div
        style={{
          padding: "12px 16px",
          borderRadius: "12px",
          background: "rgba(232,180,26,0.07)",
          border: "1px solid rgba(232,180,26,0.2)",
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <MapPin size={15} color="#E8B41A" strokeWidth={2} />
        ولاية تيميمون — اختر الدائرة ثم البلدية
      </div>

      <Field label="الدائرة" error={errors.daira} required>
        <select
          value={form.daira}
          onChange={(e) => {
            set("daira", e.target.value);
            set("commune", "");
          }}
          onFocus={() => setFocused("daira")}
          onBlur={() => setFocused("")}
          style={{
            ...inputStyle(focused === "daira", !!errors.daira),
            appearance: "none" as any,
          }}
        >
          <option value="" style={{ background: "#0d0a1f" }}>
            اختر الدائرة
          </option>
          {dairas.map((d: any) => (
            <option key={d.id} value={d.id} style={{ background: "#0d0a1f" }}>
              {d.name}
            </option>
          ))}
        </select>
      </Field>

      <AnimatePresence>
        {form.daira && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Field label="البلدية" error={errors.commune} required>
              <select
                value={form.commune}
                onChange={(e) => set("commune", e.target.value)}
                onFocus={() => setFocused("commune")}
                onBlur={() => setFocused("")}
                style={{
                  ...inputStyle(focused === "commune", !!errors.commune),
                  appearance: "none" as any,
                }}
              >
                <option value="" style={{ background: "#0d0a1f" }}>
                  اختر البلدية
                </option>
                {communes.map((c: any) => (
                  <option
                    key={c.id}
                    value={c.name}
                    style={{ background: "#0d0a1f" }}
                  >
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      {form.commune && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: "14px 18px",
            borderRadius: "14px",
            background: "rgba(23,186,110,0.08)",
            border: "1px solid rgba(23,186,110,0.2)",
            fontSize: "14px",
            color: "rgba(255,255,255,0.7)",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <MapPin size={16} color="#17BA6E" strokeWidth={2} />
          تم اختيار:{" "}
          <strong style={{ color: "#17BA6E" }}>{form.commune}</strong>
        </motion.div>
      )}
    </div>
  );
}

// ─── Step 2: Education ──────────────────────────────────────────────────────
function Step2({
  form,
  errors,
  focused,
  setFocused,
  set,
  isOutsideSchool,
}: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#fff",
          marginBottom: "4px",
        }}
      >
        المعلومات الدراسية
      </h3>

      <Field label="المستوى الدراسي" error={errors.educationLevel} required>
        <select
          value={form.educationLevel}
          onChange={(e) => set("educationLevel", e.target.value)}
          onFocus={() => setFocused("educationLevel")}
          onBlur={() => setFocused("")}
          style={{
            ...inputStyle(
              focused === "educationLevel",
              !!errors.educationLevel,
            ),
            appearance: "none" as any,
          }}
        >
          <option value="" style={{ background: "#0d0a1f" }}>
            اختر المستوى
          </option>
          {educationLevels.map((l) => (
            <option key={l} value={l} style={{ background: "#0d0a1f" }}>
              {l}
            </option>
          ))}
        </select>
      </Field>

      <AnimatePresence>
        {!isOutsideSchool && form.educationLevel && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <Field
              label="اسم المؤسسة التعليمية"
              error={errors.schoolName}
              required
            >
              <input
                value={form.schoolName}
                onChange={(e) => set("schoolName", e.target.value)}
                onFocus={() => setFocused("schoolName")}
                onBlur={() => setFocused("")}
                placeholder="مثال: ثانوية الشهيد مبارك الميلي"
                style={inputStyle(
                  focused === "schoolName",
                  !!errors.schoolName,
                )}
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      {isOutsideSchool && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            padding: "14px 18px",
            borderRadius: "14px",
            background: "rgba(79,195,247,0.06)",
            border: "1px solid rgba(79,195,247,0.2)",
            fontSize: "13px",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          لا يلزم إدخال اسم مؤسسة لمن هم خارج المنظومة التعليمية.
        </motion.div>
      )}
    </div>
  );
}

// ─── Step 3: Parent Info ────────────────────────────────────────────────────
function Step3({ form, errors, focused, setFocused, set }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#fff",
          marginBottom: "4px",
        }}
      >
        معلومات ولي الأمر والتواصل
      </h3>

      <Field label="اسم ولي الأمر" error={errors.parentName} required>
        <input
          value={form.parentName}
          onChange={(e) => set("parentName", e.target.value)}
          onFocus={() => setFocused("parentName")}
          onBlur={() => setFocused("")}
          placeholder="الاسم الكامل لولي الأمر"
          style={inputStyle(focused === "parentName", !!errors.parentName)}
        />
      </Field>

      <Field label="رقم الهاتف" error={errors.phone} required>
        <input
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          onFocus={() => setFocused("phone")}
          onBlur={() => setFocused("")}
          placeholder="0X XX XX XX XX"
          maxLength={10}
          style={{
            ...inputStyle(focused === "phone", !!errors.phone),
            direction: "ltr",
          }}
        />
      </Field>

      <Field label="البريد الإلكتروني (اختياري)" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused("")}
          placeholder="example@email.com"
          style={{
            ...inputStyle(focused === "email", !!errors.email),
            direction: "ltr",
          }}
        />
      </Field>
    </div>
  );
}

// ─── Step 4: Extra Info ─────────────────────────────────────────────────────
function Step4({ form, errors, focused, setFocused, set, toggleGenre }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: 800,
          color: "#fff",
          marginBottom: "4px",
        }}
      >
        معلومات إضافية
      </h3>

      <Field label="عدد الكتب التي قرأتها هذا العام">
        <input
          type="number"
          min="0"
          max="100"
          value={form.booksRead}
          onChange={(e) => set("booksRead", e.target.value)}
          onFocus={() => setFocused("booksRead")}
          onBlur={() => setFocused("")}
          placeholder="0"
          style={{
            ...inputStyle(focused === "booksRead", false),
            direction: "ltr",
          }}
        />
      </Field>

      <div>
        <label
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
            display: "block",
            marginBottom: "12px",
          }}
        >
          الأنواع الأدبية المفضلة (اختياري)
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {bookGenres.map((g) => {
            const selected = form.genres.includes(g);
            return (
              <motion.button
                key={g}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleGenre(g)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "100px",
                  border: `1.5px solid ${selected ? "#E8B41A" : "rgba(255,255,255,0.1)"}`,
                  background: selected
                    ? "rgba(232,180,26,0.15)"
                    : "rgba(255,255,255,0.03)",
                  color: selected ? "#E8B41A" : "rgba(255,255,255,0.6)",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "Cairo, sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {g}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        <Field label="هل شاركت سابقاً؟">
          <select
            value={form.previousParticipation}
            onChange={(e) => set("previousParticipation", e.target.value)}
            style={{ ...inputStyle(false, false), appearance: "none" as any }}
          >
            <option style={{ background: "#0d0a1f" }}>لا</option>
            <option style={{ background: "#0d0a1f" }}>نعم</option>
          </select>
        </Field>
        <Field label="هل لديك تجربة في التقديم؟">
          <select
            value={form.presentationExperience}
            onChange={(e) => set("presentationExperience", e.target.value)}
            style={{ ...inputStyle(false, false), appearance: "none" as any }}
          >
            <option style={{ background: "#0d0a1f" }}>لا</option>
            <option style={{ background: "#0d0a1f" }}>نعم</option>
          </select>
        </Field>
      </div>

      <Field label="ماذا تعرف عن نجوم القراءة؟ (اختياري)">
        <textarea
          value={form.aboutProgram}
          onChange={(e) => set("aboutProgram", e.target.value)}
          onFocus={() => setFocused("aboutProgram")}
          onBlur={() => setFocused("")}
          placeholder="أخبرنا بما تعرفه عن البرنامج..."
          style={textareaStyle(focused === "aboutProgram")}
        />
      </Field>

      <Field label="لماذا تود المشاركة في نجوم القراءة؟ (اختياري)">
        <textarea
          value={form.motivation}
          onChange={(e) => set("motivation", e.target.value)}
          onFocus={() => setFocused("motivation")}
          onBlur={() => setFocused("")}
          placeholder="شاركنا دوافعك وطموحاتك..."
          style={textareaStyle(focused === "motivation")}
        />
      </Field>

      <Field label="رابط فيديو تعريفي (اختياري)">
        <input
          value={form.videoLink}
          onChange={(e) => set("videoLink", e.target.value)}
          onFocus={() => setFocused("videoLink")}
          onBlur={() => setFocused("")}
          placeholder="https://youtube.com/..."
          style={{
            ...inputStyle(focused === "videoLink", false),
            direction: "ltr",
          }}
        />
      </Field>

      {/* ── الموافقة على الالتزامات ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          padding: "20px",
          borderRadius: "16px",
          background: form.agreedToTerms
            ? "rgba(232,180,26,0.07)"
            : "rgba(255,255,255,0.03)",
          border: `1.5px solid ${form.agreedToTerms ? "rgba(232,180,26,0.35)" : "rgba(255,255,255,0.08)"}`,
          transition: "all 0.3s ease",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.005 }}
          onClick={() => set("agreedToTerms", !form.agreedToTerms)}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          {/* Checkbox */}
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              border: `2px solid ${form.agreedToTerms ? "#E8B41A" : "rgba(255,255,255,0.25)"}`,
              background: form.agreedToTerms ? "#E8B41A" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: "2px",
              transition: "all 0.2s",
              boxShadow: form.agreedToTerms
                ? "0 0 12px rgba(232,180,26,0.45)"
                : "none",
            }}
          >
            <AnimatePresence>
              {form.agreedToTerms && (
                <motion.svg
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>

          <div style={{ flex: 1 }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: form.agreedToTerms
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                transition: "color 0.2s",
                display: "block",
              }}
            >
              أقر بأنني اطلعت على{" "}
              <span style={{ color: "#E8B41A" }}>دليل المشارك</span> وأوافق على
              جميع الالتزامات والتعهدات الواردة فيه
            </span>
            {!form.agreedToTerms && (
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                يجب الموافقة لإتمام التسجيل
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
