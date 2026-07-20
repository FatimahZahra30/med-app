import { Drug } from "@/types/drug";

export const DRUGS: Drug[] = [
  {
    id: "propofol",
    name: "Propofol",
    category: "anesthetic",

    dose: 2,
    unit: "mg/kg",
    range: "1.5–2.5 mg/kg",

    indication: "IV induction",

    mechanism:
      "Positive allosteric modulator of GABA-A receptors producing hypnosis and sedation.",

    onset: "20–40 seconds",

    duration: "5–10 minutes",

    metabolism:
      "Rapid hepatic metabolism. Recovery occurs primarily through redistribution.",

    cautions: [
      "Hypotension",
      "Respiratory depression",
      "Pain on injection",
    ],

    contraindications: [
      "Propofol allergy",
      "Use cautiously in severe haemodynamic instability",
    ],
  },

  {
    id: "ketamine",
    name: "Ketamine",
    category: "anesthetic",

    dose: 2,
    unit: "mg/kg",
    range: "1–2 mg/kg",

    indication: "IV induction",

    mechanism:
      "NMDA receptor antagonist producing dissociative anaesthesia and analgesia.",

    onset: "30–60 seconds",

    duration: "10–20 minutes",

    metabolism:
      "Hepatic metabolism to norketamine.",

    cautions: [
      "Increased salivation",
      "Emergence reactions",
      "Hypertension and tachycardia",
    ],

    contraindications: [
      "Severe uncontrolled hypertension",
      "Known hypersensitivity",
    ],
  },

  {
    id: "thiopentone",
    name: "Thiopentone",
    category: "anesthetic",

    dose: 4,
    unit: "mg/kg",
    range: "3–5 mg/kg",

    indication: "IV induction",

    mechanism:
      "Ultra-short acting barbiturate that enhances GABA-A receptor activity.",

    onset: "10–30 seconds",

    duration: "5–10 minutes",

    metabolism:
      "Slow hepatic metabolism with recovery mainly through redistribution.",

    cautions: [
      "Hypotension",
      "Respiratory depression",
      "Extravasation injury",
    ],

    contraindications: [
      "Acute porphyria",
      "Barbiturate allergy",
    ],
  },

  {
    id: "fentanyl",
    name: "Fentanyl",
    category: "analgesic",

    dose: 2,
    unit: "mcg/kg",
    range: "1–2 mcg/kg",

    indication: "Opioid analgesia",

    mechanism:
      "Potent μ-opioid receptor agonist providing analgesia.",

    onset: "1–2 minutes",

    duration: "30–60 minutes",

    metabolism:
      "Hepatic CYP3A4 metabolism.",

    cautions: [
      "Respiratory depression",
      "Chest wall rigidity",
      "Bradycardia",
    ],

    contraindications: [
      "Known hypersensitivity",
      "Severe respiratory depression without airway support",
    ],
  },

  {
    id: "morphine",
    name: "Morphine",
    category: "analgesic",

    dose: 0.1,
    unit: "mg/kg",
    range: "0.05–0.1 mg/kg",

    indication: "Post-operative analgesia",

    mechanism:
      "μ-opioid receptor agonist producing analgesia and sedation.",

    onset: "5–10 minutes",

    duration: "3–4 hours",

    metabolism:
      "Hepatic glucuronidation.",

    cautions: [
      "Respiratory depression",
      "Hypotension",
      "Nausea and vomiting",
    ],

    contraindications: [
      "Known hypersensitivity",
      "Severe respiratory depression",
    ],
  },

  {
    id: "rocuronium",
    name: "Rocuronium",
    category: "relaxant",

    dose: 0.6,
    unit: "mg/kg",
    range: "0.6–1.2 mg/kg",

    indication: "Neuromuscular blockade",

    mechanism:
      "Non-depolarising neuromuscular blocker.",

    onset: "60–90 seconds",

    duration: "30–60 minutes",

    metabolism:
      "Primarily biliary excretion.",

    cautions: [
      "Prolonged paralysis",
    ],

    contraindications: [
      "Known hypersensitivity",
    ],
  },

  {
    id: "atracurium",
    name: "Atracurium",
    category: "relaxant",

    dose: 0.5,
    unit: "mg/kg",
    range: "0.4–0.5 mg/kg",

    indication: "Neuromuscular blockade",

    mechanism:
      "Non-depolarising neuromuscular blocker undergoing Hofmann elimination.",

    onset: "2–3 minutes",

    duration: "20–35 minutes",

    metabolism:
      "Hofmann elimination and ester hydrolysis.",

    cautions: [
      "Histamine release",
      "Hypotension",
    ],

    contraindications: [
      "Known hypersensitivity",
    ],
  },

  {
    id: "ondansetron",
    name: "Ondansetron",
    category: "antiemetic",

    dose: 0.1,
    unit: "mg/kg",
    range: "0.1 mg/kg",

    indication: "Prevention of nausea and vomiting",

    mechanism:
      "Selective 5-HT3 receptor antagonist.",

    onset: "30 minutes",

    duration: "4–8 hours",

    metabolism:
      "Hepatic metabolism.",

    cautions: [
      "QT prolongation",
      "Headache",
    ],

    contraindications: [
      "Known hypersensitivity",
    ],
  },

  {
    id: "dexamethasone",
    name: "Dexamethasone",
    category: "antiemetic",

    dose: 0.15,
    unit: "mg/kg",
    range: "0.1–0.15 mg/kg",

    indication: "PONV prophylaxis",

    mechanism:
      "Glucocorticoid with anti-inflammatory and antiemetic properties.",

    onset: "1 hour",

    duration: "24–72 hours",

    metabolism:
      "Hepatic metabolism.",

    cautions: [
      "Hyperglycaemia",
      "Immunosuppression with repeated doses",
    ],

    contraindications: [
      "Known hypersensitivity",
    ],
  },

  {
    id: "cefazolin",
    name: "Cefazolin",
    category: "antibiotic",

    dose: 30,
    unit: "mg/kg",
    range: "30 mg/kg",

    indication: "Surgical prophylaxis",

    mechanism:
      "First-generation cephalosporin inhibiting bacterial cell wall synthesis.",

    onset: "Immediate after IV administration",

    duration: "6–8 hours",

    metabolism:
      "Renal excretion.",

    cautions: [
      "Allergic reactions",
      "Renal impairment",
    ],

    contraindications: [
      "Cephalosporin allergy",
      "Severe penicillin allergy (use clinical judgement)",
    ],
  },
];