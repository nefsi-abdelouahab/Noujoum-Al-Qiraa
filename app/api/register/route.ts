import { NextRequest, NextResponse } from "next/server";
import { appendToSheet, checkDuplicateEmail } from "@/lib/googleSheets";
import { calculateCategory } from "@/utils/helpers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      lastName,
      firstName,
      dateOfBirth,
      wilaya,
      commune,
      daira,
      educationLevel,
      schoolName,
      parentName,
      phone,
      email,
      booksRead,
      genres,
      previousParticipation,
      presentationExperience,
      videoLink,
    } = body;

    // Required field validation
    const required = {
      lastName,
      firstName,
      dateOfBirth,
      wilaya,
      commune,
      educationLevel,
      schoolName,
      parentName,
      phone,
      email,
    };
    for (const [key, val] of Object.entries(required)) {
      if (!val || val.toString().trim() === "") {
        return NextResponse.json(
          { error: "يرجى ملء جميع الحقول الإلزامية" },
          { status: 400 },
        );
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "البريد الإلكتروني غير صالح" },
        { status: 400 },
      );
    }

    // Phone validation (Algerian)
    const phoneRegex = /^(0)(5|6|7)[0-9]{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "رقم الهاتف غير صالح" },
        { status: 400 },
      );
    }

    // Category check
    const category = calculateCategory(dateOfBirth);
    if (!category) {
      return NextResponse.json(
        { error: "العمر خارج النطاق المسموح به للبرنامج (5-30 سنة)" },
        { status: 400 },
      );
    }

    // Duplicate check
    const isDuplicate = await checkDuplicateEmail(email);
    if (isDuplicate) {
      return NextResponse.json(
        { error: "تم التسجيل مسبقاً بهذا البريد الإلكتروني" },
        { status: 409 },
      );
    }

    // Save to Google Sheets
    await appendToSheet({
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      dateOfBirth,
      category,
      wilaya,
      commune,
      daira,
      educationLevel,
      schoolName: schoolName.trim(),
      parentName: parentName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      booksRead: booksRead?.toString() || "0",
      genres: Array.isArray(genres) ? genres.join(", ") : genres || "",
      previousParticipation: previousParticipation || "لا",
      presentationExperience: presentationExperience || "لا",
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
      { status: 500 },
    );
  }
}
