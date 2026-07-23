import { DASPlan } from "@/types/das";

export const dasPlans: DASPlan[] = [
  {
    id: "A",
    title: "Plan A",
    subtitle: "Initial Tracheal Intubation",
    steps: [
      "Optimise patient position: ramped, head-up or sniffing position.",
      "Pre-oxygenate with 100% O₂ for 3 minutes (or 8 vital capacity breaths).",
      "Prepare equipment: ETT, laryngoscope (videolaryngoscopy preferred), bougie/stylet, suction, SAD as rescue.",
      "Administer induction + neuromuscular blocker (RSI).",
      "Attempt laryngoscopy & intubation (max 3 attempts, change technique between attempts).",
      "Confirm placement: capnography (ETCO₂), bilateral chest expansion.",
    ],
    decision: "Failed intubation? (cannot intubate after best attempts)",
    nextPlan: "B",
  },

  {
    id: "B",
    title: "Plan B",
    subtitle: "Supraglottic Airway Device (SAD) Rescue",
    steps: [
      "Maintain oxygenation: attempt face mask ventilation between attempts.",
      "Insert 2nd-generation SAD (i-gel / ProSeal LMA).",
      "Confirm ventilation & capnography trace.",
      "If SAD ventilation adequate → consider as definitive airway or awaken patient.",
      "If intubation via SAD needed: use fibreoptic-guided intubation through SAD.",
    ],
    decision: "Failed SAD ventilation? (cannot ventilate via SAD)",
    nextPlan: "C",
  },

  {
    id: "C",
    title: "Plan C",
    subtitle: "Face Mask Ventilation & Oxygenation",
    steps: [
      "Remove SAD. Attempt face mask ventilation with oral/nasal airway.",
      "Use two-person, two-hand mask technique.",
      "Optimise: head extension, jaw thrust, reduce cricoid pressure if applied.",
      "If mask ventilation successful → wake the patient up (postpone surgery).",
      "If CICO (Can't Intubate, Can't Oxygenate) → proceed to Plan D immediately.",
    ],
    decision: "Failed face mask ventilation? (CICO scenario)",
    nextPlan: "D",
  },

  {
    id: "D",
    title: "Plan D",
    subtitle: "Emergency Front of Neck Access (eFONA)",
    steps: [
      "Declare CICO emergency loudly: 'Can't intubate, can't oxygenate'.",
      "Call for senior anaesthetist & ENT surgeon immediately.",
      "Scalpel-bougie technique (recommended): transverse incision through cricothyroid membrane.",
      "Pass bougie through incision, railroad 6.0 mm cuffed ETT over bougie.",
      "Confirm placement with capnography. Secure tube. Ventilate.",
    ],
    decision: "eFONA is a life-saving emergency procedure. Regular simulation training is essential.",
  },
];