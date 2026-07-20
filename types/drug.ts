export interface Drug {
  id: string;

  name: string;

  category:
    | "anesthetic"
    | "analgesic"
    | "relaxant"
    | "antiemetic"
    | "antibiotic";

  dose: number;

  unit: string;

  range: string;

  indication: string;

  mechanism: string;

  onset: string;

  duration: string;

  metabolism: string;

  cautions: string[];

  contraindications: string[];
}

export const DRUGS: Drug[] = [
  {
    id: "propofol",

    name: "Propofol",

    category: "anesthetic",

    dose: 2,

    unit: "mg",

    range: "1–2.5 mg/kg",

    indication: "Induction",

    mechanism:
      "Positive allosteric modulator of GABA-A receptors producing hypnosis and sedation.",

    onset: "20–40 seconds",

    duration: "5–10 minutes",

    metabolism:
      "Rapid hepatic metabolism with inactive metabolites.",

    cautions: [
      "Hypotension",
      "Respiratory depression",
      "Pain on injection",
    ],

    contraindications: [
      "Hypersensitivity to propofol",
      "Use with caution in haemodynamically unstable patients",
    ],
  },

  {
    id: "fentanyl",

    name: "Fentanyl",

    category: "analgesic",

    dose: 2,

    unit: "mcg",

    range: "1–2 mcg/kg",

    indication: "Analgesia",

    mechanism:
      "Selective μ-opioid receptor agonist producing potent analgesia.",

    onset: "1–2 minutes",

    duration: "30–60 minutes",

    metabolism:
      "Hepatic CYP3A4 metabolism.",

    cautions: [
      "Chest wall rigidity",
      "Respiratory depression",
      "Bradycardia",
    ],

    contraindications: [
      "Hypersensitivity",
      "Severe respiratory depression without airway support",
    ],
  },
];