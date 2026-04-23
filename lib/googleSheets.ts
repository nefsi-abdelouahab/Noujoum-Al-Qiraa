import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });
}

export async function appendToSheet(data: any) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toLocaleString("ar-DZ"),
    data.lastName,
    data.firstName,
    data.dateOfBirth,
    data.category,
    data.isSpecialNeeds ? "نعم" : "لا",
    data.daira,
    data.commune,
    data.educationLevel,
    data.schoolName || "—",
    data.parentName,
    data.phone,
    data.email || "—",
    data.booksRead || "0",
    data.genres || "",
    data.previousParticipation || "لا",
    data.presentationExperience || "لا",
    data.aboutProgram || "",
    data.motivation || "",
    data.videoLink || "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}