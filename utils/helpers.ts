export type Category =
  | "الأطفال"
  | "اليافعون"
  | "الشباب"
  | "ذوو الهمم(ذوي الاحتياجات الخاصة)"
  | null;

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  return today.getFullYear() - birth.getFullYear();
}

export function calculateCategory(
  dateOfBirth: string,
  isSpecialNeeds: boolean = false,
): Category {
  const age = calculateAge(dateOfBirth);

  // ─── مسار ذوو الهمم — فئة مستقلة بشروطها الخاصة ───
  if (isSpecialNeeds) {
    if (age >= 8 && age <= 18) return "ذوو الهمم(ذوي الاحتياجات الخاصة)";
    return null; // خارج نطاق ذوي الهمم = لا يُقبَل
  }

  // ─── مسار الفئات العادية ───
  if (age >= 8 && age <= 13) return "الأطفال";
  if (age >= 14 && age <= 18) return "اليافعون";
  if (age >= 19 && age <= 35) return "الشباب";

  return null;
}

export function getCategoryColor(category: Category): string {
  switch (category) {
    case "الأطفال":
      return "#E8B41A";
    case "اليافعون":
      return "#9917BA";
    case "الشباب":
      return "#17BA6E";
    case "ذوو الهمم(ذوي الاحتياجات الخاصة)":
      return "#4FC3F7";
    default:
      return "#666";
  }
}

export function getCategoryEmoji(category: Category): string {
  switch (category) {
    case "الأطفال":
      return "🌟";
    case "اليافعون":
      return "🚀";
    case "الشباب":
      return "💡";
    case "ذوو الهمم(ذوي الاحتياجات الخاصة)":
      return "♿";
    default:
      return "❓";
  }
}

export function getCategoryRange(category: Category): string {
  switch (category) {
    case "الأطفال":
      return "8 - 13 سنة";
    case "اليافعون":
      return "14 - 18 سنة";
    case "الشباب":
      return "19 - 35 سنة";
    case "ذوو الهمم(ذوي الاحتياجات الخاصة)":
      return "8 - 18 سنة";
    default:
      return "";
  }
}
