export type Category = "الأطفال" | "اليافعون" | "الشباب" | null;

export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function calculateCategory(dateOfBirth: string): Category {
  const age = calculateAge(dateOfBirth);
  if (age >= 5 && age <= 13) return "الأطفال";
  if (age >= 14 && age <= 18) return "اليافعون";
  if (age >= 19 && age <= 30) return "الشباب";
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
    default:
      return "❓";
  }
}

export function getCategoryRange(category: Category): string {
  switch (category) {
    case "الأطفال":
      return "5 - 13 سنة";
    case "اليافعون":
      return "14 - 18 سنة";
    case "الشباب":
      return "19 - 30 سنة";
    default:
      return "";
  }
}