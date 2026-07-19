import { Drug } from "@/types/drug";

export const DRUGS: Drug[] = [
  {
    id: "propofol",
    name: "Propofol",

    category: "anesthetic",

    dose: 2,

    unit: "mg/kg",

    range: "1.5–2.5 mg/kg",

    note: "IV induction agent",
  },

  {
    id: "ketamine",
    name: "Ketamine",

    category: "anesthetic",

    dose: 2,

    unit: "mg/kg",

    range: "1–2 mg/kg",

    note: "IV induction",
  },

  {
    id: "thiopentone",
    name: "Thiopentone",

    category: "anesthetic",

    dose: 4,

    unit: "mg/kg",

    range: "3–5 mg/kg",

    note: "IV induction",
  },

  {
    id: "fentanyl",
    name: "Fentanyl",

    category: "analgesic",

    dose: 2,

    unit: "mcg/kg",

    range: "1–2 mcg/kg",

    note: "Opioid analgesic",
  },

  {
    id: "morphine",
    name: "Morphine",

    category: "analgesic",

    dose: 0.1,

    unit: "mg/kg",

    range: "0.05–0.1 mg/kg",

    note: "Post-operative analgesia",
  },

  {
    id: "rocuronium",
    name: "Rocuronium",

    category: "relaxant",

    dose: 0.6,

    unit: "mg/kg",

    range: "0.6–1.2 mg/kg",

    note: "Neuromuscular blocker",
  },

  {
    id: "atracurium",
    name: "Atracurium",

    category: "relaxant",

    dose: 0.5,

    unit: "mg/kg",

    range: "0.4–0.5 mg/kg",

    note: "Neuromuscular blocker",
  },

  {
    id: "ondansetron",
    name: "Ondansetron",

    category: "antiemetic",

    dose: 0.1,

    unit: "mg/kg",

    range: "0.1 mg/kg",

    note: "Maximum 8 mg",
  },

  {
    id: "dexamethasone",
    name: "Dexamethasone",

    category: "antiemetic",

    dose: 0.15,

    unit: "mg/kg",

    range: "0.1–0.15 mg/kg",

    note: "Maximum 8 mg",
  },

  {
    id: "cefazolin",
    name: "Cefazolin",

    category: "antibiotic",

    dose: 30,

    unit: "mg/kg",

    range: "30 mg/kg",

    note: "Surgical prophylaxis",
  },
];