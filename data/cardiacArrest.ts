import { ArrestNode } from "@/types/cardiacArrest";

export const arrestFlow: Record<string, ArrestNode> = {
  start: {
    title: "Recognise Cardiac Arrest",
    steps: [
      "Confirm cardiac arrest",
      "Call for help",
      "Start CPR 30:2",
      "Give high-flow oxygen",
      "Attach defib / monitor",
    ],
    yes: "rhythm",
    no: "rhythm",
    yesLabel: "Start CPR",
    noLabel: null,
    timer: false,
  },
  rhythm: {
    title: "Assess Rhythm",
    steps: [
      "Is it Shockable? (VF / pulseless VT)",
      "or Non Shockable? (Asystole / PEA)",
    ],
    yes: "shock1",
    no: "nonshockable",
    yesLabel: "Shockable",
    noLabel: "Non-shockable",
    timer: false,
  },
  shock1: {
    title: "Shock 1",
    actionSteps: ["Deliver shock (200 J biphasic)"],
    steps: [
      "Resume CPR immediately for 2 minutes",
      "Prepare adrenaline (1 mg IV)",
      "Rhythm check in 2 minutes",
    ],
    yes: "cpr2",
    no: "peaCpr",
    yesLabel: "Shockable",
    noLabel: "Non-Shockable",
    timer: true,
    timerDuration: 120,
  },
  cpr2: {
    title: "CPR Cycle 2",
    steps: ["CPR for 2 min", "Prepare amiodarone (300 mg)"],
    actionSteps: ["Administer adrenaline (1 mg IV)"],
    yes: "rhythm2",
    no: "rhythm2",
    yesLabel: "Rhythm check now",
    noLabel: null,
    timer: true,
    timerDuration: 120,
  },
  rhythm2: {
    title: "Rhythm Check 2",
    steps: ["Reassess rhythm — still shockable?"],
    yes: "shock2",
    no: "rosc",
    yesLabel: "Shockable",
    noLabel: "Check ROSC",
    timer: false,
  },
  shock2: {
    title: "Shock 2",
    actionSteps: ["Deliver shock (200 J biphasic)"],
    steps: ["Prepare amiodarone (300 mg)", "Resume CPR 2 min"],
    yes: "cpr3",
    no: "cpr3",
    yesLabel: "Done — resume CPR",
    noLabel: null,
    timer: true,
    timerDuration: 120,
  },
  cpr3: {
    title: "CPR Cycle 3",
    steps: [
      "CPR for 2 min",
      "Continue adrenaline 1 mg every 3–5 min",
      "Amiodarone 150 mg after 5th shock",
    ],
    yes: "rhythm2",
    no: "rhythm2",
    yesLabel: "Rhythm check",
    noLabel: null,
    timer: true,
    timerDuration: 120,
  },
  nonshockable: {
    title: "Non-Shockable (Asystole / PEA)",
    steps: [
      "Confirm non-shockable rhythm",
      "Start CPR 2 min",
      "Give adrenaline 1 mg IV immediately",
    ],
    yes: "peaCpr",
    no: "peaCpr",
    yesLabel: "Begin CPR",
    noLabel: null,
    timer: true,
    timerDuration: 120,
  },
  peaCpr: {
    title: "CPR & Reversible Causes",
    steps: [
      "CPR 2 min",
      "Identify & treat reversible causes (4 Hs & 4 Ts)",
      "Give adrenaline every 3–5 min",
    ],
    yes: "rhythm",
    no: "rhythm",
    yesLabel: "Rhythm check",
    noLabel: null,
    timer: true,
    timerDuration: 120,
  },
  rosc: {
    title: "Check for ROSC",
    steps: [
      "Check for return of spontaneous circulation",
      "If pulse present → post-ROSC care",
      "If no pulse → continue algorithm",
    ],
    yes: "end",
    no: "rhythm",
    yesLabel: "ROSC achieved",
    noLabel: "No ROSC",
    timer: false,
  },
  end: {
    title: "Post-ROSC Care",
    steps: [
      "12-lead ECG",
      "Optimise oxygenation & BP",
      "Target temperature management",
      "Treat underlying cause",
      "Prepare for transfer",
    ],
    yes: null,
    no: null,
    yesLabel: "Restart algorithm",
    noLabel: null,
    timer: false,
  },
};

export const REVERSIBLE = [
  {
    name: "Hypoxia",
    detail:
      "Low oxygen tension. Check airway patency, oxygen supply, ETT position and bilateral chest movement. Ventilate with 100% O₂. Exclude tension pneumothorax.",
  },
  {
    name: "Hypovolaemia",
    detail:
      "Circulatory volume depletion. Identify blood loss, sepsis, anaphylaxis. Give IV fluid bolus (20 mL/kg crystalloid). Consider blood products. Control bleeding source.",
  },
  {
    name: "Hypo/hyperkalaemia",
    detail:
      "Check ABG/VBG for potassium. Hyperkalaemia (>6.5): calcium chloride 10 mmol IV, insulin-dextrose, bicarbonate. Hypokalaemia: IV potassium replacement.",
  },
  {
    name: "Hypothermia",
    detail:
      "Core temperature <35°C. Warm IV fluids, forced-air warmer, cardiopulmonary bypass for severe hypothermia. Continue resuscitation until normothermic.",
  },
  {
    name: "Thrombosis (cardiac)",
    detail:
      "Acute coronary syndrome / massive MI. Consider coronary angiography and PCI. Give aspirin, heparin. Discuss with cardiology.",
  },
  {
    name: "Thrombosis (PE)",
    detail:
      "Massive pulmonary embolism. Consider systemic thrombolysis (alteplase), surgical embolectomy, or catheter-directed thrombolysis.",
  },
  {
    name: "Tension pneumothorax",
    detail:
      "Needle decompression (2nd ICS mid-clavicular or 5th ICS mid-axillary line), followed by chest drain. Signs: tracheal deviation, unilateral absent breath sounds, hypoxia.",
  },
  {
    name: "Tamponade",
    detail:
      "Cardiac tamponade. Perform pericardiocentesis (subxiphoid approach). Consider emergency thoracotomy if traumatic. Signs: muffled heart sounds, distended neck veins, hypotension.",
  },
  {
    name: "Toxins",
    detail:
      "Drug overdose or poisoning. Identify toxin. Specific antidotes: naloxone (opioids), flumazenil (benzodiazepines), digoxin Fab, lipid emulsion (local anaesthetic). Consult toxbase/poisons centre.",
  },
];
