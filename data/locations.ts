export interface Commune {
  id: string;
  daira: string;
  name: string;
}

export interface Daira {
  id: string;
  name: string;
  communes: Commune[];
}

export interface Wilaya {
  id: string;
  name: string;
  dairas: Daira[];
}

export const wilayas: Wilaya[] = [
  {
    id: "timimoun",
    name: "تيميمون",
    dairas: [
      {
        id: "timimoun_d",
        name: "تيميمون",
        communes: [
          { id: "timimoun_c", daira: "تيميمون", name: "تيميمون" },
          { id: "oulad_said", daira: "تيميمون", name: "أولاد سعيد" },
        ],
      },
      {
        id: "ougrout_d",
        name: "أوقروت",
        communes: [
          { id: "ougrout", daira: "أوقروت", name: "أوقروت" },
          { id: "deldoul", daira: "أوقروت", name: "دلدول" },
          { id: "matarfa", daira: "أوقروت", name: "المطارفة" },
        ],
      },
      {
        id: "tinerkouk_d",
        name: "تينركوك",
        communes: [
          { id: "tinerkouk", daira: "تينركوك", name: "تينركوك" },
          { id: "ksar_kaddour", daira: "تينركوك", name: "قصر قدور" },
        ],
      },
      {
        id: "charouine_d",
        name: "شروين",
        communes: [
          { id: "charouine", daira: "شروين", name: "شروين" },
          { id: "talmine", daira: "شروين", name: "طالمين" },
          { id: "oulad_issa", daira: "شروين", name: "أولاد عيسى" },
        ],
      },
    ],
  },
];

// الولاية الافتراضية دائماً تيميمون
export const dairas: Daira[] = wilayas[0].dairas;

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