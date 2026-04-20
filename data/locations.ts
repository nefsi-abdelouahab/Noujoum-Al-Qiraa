export interface Commune {
  id: string;
  daira: string;
  name: string;
}

export interface Wilaya {
  id: string;
  name: string;
  communes: Commune[];
}

export const wilayas: Wilaya[] = [
  {
    id: "timimoun",
    name: "تيميمون",
    communes: [
      { id: "timimoun_c", daira: " تيميمون", name: "تيميمون" },
      { id: "oulad_said", daira: " تيميمون", name: "أولاد سعيد" },
      { id: "ougrout", daira: " أوقروت", name: "أوقروت" },
      { id: "deldoul", daira: " أوقروت", name: "دلدول" },
      { id: "matarfa", daira: " أوقروت", name: "المطارفة" },
      { id: "tinerkouk", daira: " تينركوك", name: "تينركوك" },
      { id: "ksar_kaddour", daira: " تينركوك", name: "قصر قدور" },
      { id: "charouine", daira: " شروين", name: "شروين" },
      { id: "talmine", daira: " شروين", name: "طالمين" },
      { id: "oulad_issa", daira: " شروين", name: "أولاد عيسى" },
    ],
  },
];

export const educationLevels = [
  "ابتدائي",
  "متوسط",
  "ثانوي",
  "جامعي",
  "خارج المنظومة التعليمية",
];

export const bookGenres = [
  "روايات",
  "تاريخ جزائري",
  "علوم",
  "فلسفة",
  "ديني",
  "أدب عربي",
  "رحلات واكتشاف",
  "تطوير الذات",
  "تراث وثقافة",
  "أطفال وناشئة",
];
