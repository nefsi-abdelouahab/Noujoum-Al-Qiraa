import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/googleSheets";
import { calculateCategory } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lastName,
      firstName,
      dateOfBirth,
      isSpecialNeeds,
      daira,
      commune,
      educationLevel,
      schoolName,
      parentName,
      phone,
      email,
      booksRead,
      genres,
      previousParticipation,
      presentationExperience,
      aboutProgram,
      motivation,
      videoLink,
    } = body;

    // الحقول الإلزامية
    const required: Record<string, any> = {
      lastName,
      firstName,
      dateOfBirth,
      daira,
      commune,
      educationLevel,
      parentName,
      phone,
    };

    for (const [key, val] of Object.entries(required)) {
      if (!val || val.toString().trim() === "") {
        return NextResponse.json(
          { error: "يرجى ملء جميع الحقول الإلزامية" },
          { status: 400 }
        );
      }
    }

    // اسم المؤسسة إلزامي فقط إذا لم يكن خارج المنظومة
    if (
      educationLevel !== "خارج المنظومة التعليمية" &&
      (!schoolName || schoolName.trim() === "")
    ) {
      return NextResponse.json(
        { error: "يرجى إدخال اسم المؤسسة التعليمية" },
        { status: 400 }
      );
    }

    // التحقق من رقم الهاتف
    const phoneRegex = /^(0)(5|6|7)[0-9]{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "رقم الهاتف غير صالح" },
        { status: 400 }
      );
    }

    // التحقق من البريد إن أُدخل
    if (email && email.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "البريد الإلكتروني غير صالح" },
          { status: 400 }
        );
      }
    }

    // حساب الفئة
    const category = calculateCategory(dateOfBirth, isSpecialNeeds === true);
    if (!category) {
      return NextResponse.json(
        { error: "العمر خارج النطاق المسموح به (5-35 سنة)" },
        { status: 400 }
      );
    }

    await appendToSheet({
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      dateOfBirth,
      category,
      isSpecialNeeds: isSpecialNeeds === true,
      daira,
      commune,
      educationLevel,
      schoolName: schoolName?.trim() || "",
      parentName: parentName.trim(),
      phone: phone.trim(),
      email: email?.trim().toLowerCase() || "",
      booksRead: booksRead?.toString() || "0",
      genres: Array.isArray(genres) ? genres.join(", ") : genres || "",
      previousParticipation: previousParticipation || "لا",
      presentationExperience: presentationExperience || "لا",
      aboutProgram: aboutProgram?.trim() || "",
      motivation: motivation?.trim() || "",
      videoLink: videoLink?.trim() || "",
    });

    return NextResponse.json({
      success: true,
      category,
      message: "تم التسجيل بنجاح! سنتواصل معك قريباً.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في الخادم، يرجى المحاولة لاحقاً" },
      { status: 500 }
    );
  }
}