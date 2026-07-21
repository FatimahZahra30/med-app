import { Emergency } from "@/types/emergency";

export const emergencies: Emergency[] = [
  {
    id: "anaphylaxis",

    title: "Anaphylaxis",

    category: "Allergic",

    recognition: [
      "Hypotension, tachycardia (may become bradycardic in severe cases)",
      "Bronchospasm or difficulty ventilating",
      "Rash, flushing, urticaria or angio-oedema",
      "Rising airway pressure",
      "Falling SpO₂",
      "Cardiovascular collapse or cardiac arrest",
    ],

    immediateManagement: [
      "Remove trigger (stop drug or blood product, flush IV line)",
      "Call for help — senior anaesthetist and ICU",
      "Maintain anaesthesia (propofol or volatile agent)",
      "Give 100% oxygen at high flow",
      "Crystalloid bolus 20 mL/kg (repeat as required)",
      "Adrenaline 50 micrograms IV every 3–5 minutes, titrated to response",
      "If cardiac arrest develops, follow ALS protocol with adrenaline 1 mg IV",
    ],

    secondaryManagement: [
      "Adrenaline infusion 0.05–0.1 micrograms/kg/min if hypotension persists",
      "Chlorphenamine 10 mg IV",
      "Hydrocortisone 200 mg IV",
      "Nebulised salbutamol 5 mg for bronchospasm",
      "ICU admission for 6–24 hours due to biphasic reactions",
    ],

    drugs: [
      {
        name: "Adrenaline IV (bolus)",
        dose: "50 micrograms every 3–5 min",
      },
      {
        name: "Adrenaline infusion",
        dose: "0.05–0.1 micrograms/kg/min",
      },
      {
        name: "Crystalloid",
        dose: "20 mL/kg bolus",
      },
      {
        name: "Chlorphenamine IV",
        dose: "10 mg",
      },
      {
        name: "Hydrocortisone IV",
        dose: "200 mg",
      },
    ],

    notes:
      "Most commonly triggered by neuromuscular blocking agents (especially rocuronium or suxamethonium) or antibiotics. Adrenaline is first-line therapy; antihistamines and corticosteroids are adjunctive. Arrange serum tryptase sampling and referral to an allergy clinic.",
  },

  {
    id: "last",

    title: "Local Anaesthetic Systemic Toxicity (LAST)",

    category: "Toxicity",

    recognition: [
      "Perioral tingling",
      "Agitation or confusion",
      "Muscle twitching",
      "Generalised seizures",
      "Hypotension",
      "Bradycardia",
      "Conduction block",
      "Ventricular arrhythmias",
      "Cardiac arrest",
    ],

    immediateManagement: [
      "Stop local anaesthetic injection immediately",
      "Call for help and prepare lipid emulsion",
      "Maintain airway with 100% oxygen",
      "Avoid hypoxia and acidosis",
      "Treat seizures with thiopental, propofol or benzodiazepines",
      "Commence 20% lipid emulsion therapy early",
      "Follow modified ALS during cardiac arrest",
    ],

    secondaryManagement: [
      "Continue prolonged CPR if required",
      "Avoid lidocaine, amiodarone, beta-blockers and calcium channel blockers",
      "Monitor coagulation profile and haemodynamics",
      "Refer to toxicology service",
    ],

    drugs: [
      {
        name: "20% Lipid emulsion",
        dose: "1.5 mL/kg IV bolus",
      },
      {
        name: "Lipid infusion",
        dose: "0.25 mL/kg/min",
      },
      {
        name: "Repeat lipid bolus",
        dose: "Repeat twice if unstable",
      },
      {
        name: "Maximum lipid dose",
        dose: "12 mL/kg over 30 min",
      },
      {
        name: "Thiopental",
        dose: "50–100 mg IV",
      },
    ],

    notes:
      "Early lipid therapy is lifesaving. Toxicity may occur up to 30 minutes after injection and is more common with bupivacaine or ropivacaine.",
  },

  {
    id: "mh",

    title: "Malignant Hyperthermia",

    category: "Pharmacogenetic",

    recognition: [
      "Rapid rise in end-tidal CO₂",
      "Tachycardia",
      "Cardiac arrhythmias",
      "Masseter muscle spasm",
      "Generalised rigidity",
      "Rapid temperature increase",
      "Hyperkalaemia",
      "Myoglobinuria",
      "Raised CK",
    ],

    immediateManagement: [
      "Stop volatile anaesthetic agents and suxamethonium immediately",
      "Call for help and request dantrolene",
      "Replace breathing circuit and CO₂ absorber",
      "Administer 100% oxygen at 10 L/min",
      "Convert to total IV anaesthesia",
      "Administer dantrolene 2.5 mg/kg IV immediately",
      "Terminate surgery as soon as safely possible",
    ],

    secondaryManagement: [
      "Active cooling with cold IV fluids and surface cooling",
      "Treat hyperkalaemia",
      "Obtain ABG, CK and myoglobin",
      "Correct metabolic acidosis with sodium bicarbonate",
      "ICU admission for at least 24–48 hours",
      "Refer for MH testing",
    ],

    drugs: [
      {
        name: "Dantrolene",
        dose: "2.5 mg/kg IV, repeat every 5 min up to 10 mg/kg",
      },
      {
        name: "Sodium bicarbonate",
        dose: "1–2 mmol/kg",
      },
      {
        name: "Insulin + 50% glucose",
        dose: "10 units Actrapid in 50 mL glucose",
      },
      {
        name: "Calcium chloride",
        dose: "10 mmol IV",
      },
      {
        name: "Mannitol",
        dose: "0.5 g/kg",
      },
    ],

    notes:
      "Triggered by volatile anaesthetic agents and suxamethonium. Dantrolene is the only specific treatment. Each vial contains 20 mg and requires reconstitution with 60 mL sterile water.",
  },

  {
    id: "failed-intubation",

    title: "Failed Intubation",

    category: "Airway",

    recognition: [
      "Cannot visualise vocal cords on laryngoscopy",
      "Multiple failed intubation attempts",
      "Airway trauma or epistaxis",
      "Falling oxygen saturation",
    ],

    immediateManagement: [
      "Call for senior help early",
      "Optimise head position and external laryngeal manipulation (BURP)",
      "Limit attempts to 3 (plus 3 by expert if appropriate)",
      "Maintain ventilation with bag-mask if possible",
      "Consider video laryngoscope, bougie or different blade",
      "Wake the patient if oxygenation is adequate and surgery is elective",
      "If oxygenation fails, proceed to DAS difficult airway algorithm",
    ],

    secondaryManagement: [
      "Document Cormack-Lehane grade and airway plan",
      "Consider awake fibreoptic intubation for future procedures",
      "Explain events to the patient",
      "Clearly document difficult airway for future anaesthetics",
    ],

    drugs: [],

    notes:
      "Follow the DAS 2015 Difficult Airway Guidelines. Avoid repeated traumatic attempts. Oxygenation always takes priority over intubation.",
  },

  {
    id: "cicv",

    title: "Can't Intubate, Can't Ventilate (CICV)",

    category: "Airway",

    recognition: [
      "Failed intubation",
      "Unable to ventilate with face mask",
      "Supraglottic airway unsuccessful",
      "Rapidly falling SpO₂",
      "Bradycardia progressing to cardiac arrest",
    ],

    immediateManagement: [
      "Call for immediate help",
      "Proceed directly to emergency front-of-neck access (eFONA)",
      "Identify the cricothyroid membrane",
      "Perform scalpel-bougie technique",
      "Insert 6.0 mm cuffed endotracheal tube",
      "Confirm placement with capnography",
    ],

    secondaryManagement: [
      "Secure airway",
      "Arrange ENT review",
      "Transfer to ICU",
      "Document airway emergency",
    ],

    drugs: [],

    notes:
      "Do not delay eFONA while making repeated airway attempts. Oxygenation is the priority. DAS Plan D recommends the scalpel-bougie technique.",
  },

  {
    id: "aspiration",

    title: "Aspiration of Gastric Contents",

    category: "Airway",

    recognition: [
      "Vomiting or regurgitation during anaesthesia",
      "Hypoxia",
      "Bilateral wheeze or crackles",
      "Right lower lobe infiltrates on chest X-ray",
      "Possible progression to ARDS",
    ],

    immediateManagement: [
      "Head-down lateral position",
      "Suction mouth and pharynx immediately",
      "Perform rapid sequence induction if required",
      "Intubate trachea",
      "Suction endotracheal tube and bronchi",
      "Ventilate with 100% oxygen and PEEP",
      "Do not lavage lungs with saline",
    ],

    secondaryManagement: [
      "Bronchoscopy if particulate aspiration suspected",
      "Chest X-ray",
      "ICU admission if severe",
      "Antibiotics only for confirmed infection",
      "Steroids not routinely recommended",
    ],

    drugs: [],

    notes:
      "Common risk factors include emergency surgery, obesity, pregnancy, bowel obstruction and gastro-oesophageal reflux disease. Prevention includes appropriate fasting and rapid sequence induction.",
  },

  {
    id: "vae",

    title: "Venous Air Embolism",

    category: "Cardiovascular",

    recognition: [
      "Sudden fall in end-tidal CO₂",
      "Hypotension",
      "Hypoxaemia",
      "Mill-wheel murmur",
      "Arrhythmias",
      "Cardiac arrest",
    ],

    immediateManagement: [
      "Stop source of air entry",
      "Flood surgical field with saline",
      "Place patient in Durant position (head down, left lateral)",
      "Administer 100% oxygen",
      "Aspirate air via central venous catheter if present",
      "Give IV fluids",
      "Discontinue nitrous oxide",
      "Commence CPR if necessary",
    ],

    secondaryManagement: [
      "Consider hyperbaric oxygen therapy",
      "CT brain if paradoxical embolism suspected",
      "ICU admission",
      "Provide inotropic support if required",
    ],

    drugs: [],

    notes:
      "Most commonly occurs during sitting neurosurgery, Caesarean section, laparoscopic surgery and orthopaedic cementing. Nitrous oxide rapidly enlarges air bubbles and should be stopped immediately.",
  },

  {
    id: "bronchospasm",

    title: "Severe Bronchospasm",

    category: "Respiratory",

    recognition: [
      "High airway pressures",
      "Wheeze on auscultation",
      "Prolonged expiratory phase",
      "Falling oxygen saturation",
      "Hypercapnia",
      "Silent chest (pre-arrest sign)",
    ],

    immediateManagement: [
      "Administer 100% oxygen",
      "Exclude mechanical obstruction (kinked tube, blocked filter, endobronchial intubation)",
      "Deepen anaesthesia with propofol or volatile agent",
      "Give salbutamol 250 µg IV or nebulised 5 mg",
      "Administer ipratropium 500 µg nebulised",
      "Give adrenaline 50 µg IV increments if life-threatening",
      "Administer hydrocortisone 100–200 mg IV",
      "Consider ketamine 1–2 mg/kg IV",
    ],

    secondaryManagement: [
      "Administer magnesium sulphate 2 g IV over 20 minutes",
      "Consider aminophylline 5 mg/kg IV loading dose",
      "Ventilate with low respiratory rate and prolonged expiratory time",
      "Check arterial blood gas and electrolytes",
      "Transfer to ICU if severe",
    ],

    drugs: [
      {
        name: "Salbutamol IV",
        dose: "250 µg slow IV bolus",
      },
      {
        name: "Salbutamol Neb",
        dose: "5 mg",
      },
      {
        name: "Ipratropium",
        dose: "500 µg nebulised",
      },
      {
        name: "Adrenaline",
        dose: "50 µg IV increments",
      },
      {
        name: "Magnesium Sulphate",
        dose: "2 g IV over 20 min",
      },
      {
        name: "Hydrocortisone",
        dose: "100–200 mg IV",
      },
    ],

    notes:
      "Always exclude tube obstruction or endobronchial intubation before escalating treatment. Consider anaphylaxis as a possible cause. Heliox may be useful in refractory bronchospasm.",
  },

  {
    id: "laryngospasm",

    title: "Laryngospasm",

    category: "Respiratory",

    recognition: [
      "Inspiratory stridor",
      "Paradoxical chest movement",
      "Absent air entry",
      "Rapid oxygen desaturation",
      "Bradycardia in severe cases",
    ],

    immediateManagement: [
      "Stop surgical stimulation",
      "Call for help",
      "Administer 100% oxygen",
      "Perform jaw thrust and apply CPAP",
      "Remove secretions or blood by suction",
      "Deepen anaesthesia with propofol",
      "If persistent, administer suxamethonium and intubate",
    ],

    secondaryManagement: [
      "Monitor for negative pressure pulmonary oedema",
      "Observe in recovery",
      "Investigate precipitating factors",
      "Document event",
    ],

    drugs: [
      {
        name: "Propofol",
        dose: "0.5–1 mg/kg IV",
      },
      {
        name: "Suxamethonium",
        dose: "0.5–1 mg/kg IV",
      },
      {
        name: "Atropine",
        dose: "20 µg/kg IV (children with bradycardia)",
      },
    ],

    notes:
      "Usually occurs during induction or emergence. Remove the stimulus first. Early jaw thrust with CPAP often prevents progression.",
  },

  {
    id: "cardiac-arrest",

    title: "Cardiac Arrest under Anaesthesia",

    category: "Cardiovascular",

    recognition: [
      "Loss of pulse",
      "Sudden ECG change",
      "Loss or sudden fall of capnography",
      "Absent oxygen saturation waveform",
      "VF, VT, PEA or asystole",
    ],

    immediateManagement: [
      "Call cardiac arrest team",
      "Stop surgery where appropriate",
      "Administer 100% oxygen",
      "Confirm arrest within 10 seconds",
      "Start high-quality CPR",
      "Defibrillate shockable rhythms",
      "Administer adrenaline 1 mg IV every 3–5 minutes",
      "Treat reversible causes (4 Hs & 4 Ts)",
    ],

    secondaryManagement: [
      "Administer amiodarone after third shock",
      "Identify underlying cause (anaphylaxis, hypoxia, MH, LAST, PE)",
      "Check ABG and electrolytes",
      "Post-ROSC ICU care",
      "Team debrief and documentation",
    ],

    drugs: [
      {
        name: "Adrenaline",
        dose: "1 mg IV every 3–5 min",
      },
      {
        name: "Amiodarone",
        dose: "300 mg IV after 3rd shock",
      },
      {
        name: "Amiodarone",
        dose: "150 mg IV after 5th shock",
      },
    ],

    notes:
      "Under anaesthesia, hypoxia, hypovolaemia and anaphylaxis are common reversible causes. A sudden loss of capnography is often the earliest indicator.",
  },

  {
    id: "awareness",

    title: "Awareness under Anaesthesia",

    category: "Other",

    recognition: [
      "Patient later recalls events",
      "Reports hearing voices",
      "Pain during surgery",
      "Paralysis with awareness",
      "Psychological distress or PTSD symptoms",
    ],

    immediateManagement: [
      "Deepen anaesthesia immediately",
      "Check anaesthetic delivery system",
      "Inform the surgical team",
      "Document events carefully",
      "Visit the patient postoperatively",
      "Offer explanation and apology",
    ],

    secondaryManagement: [
      "Arrange psychological follow-up",
      "Review at 24–48 hours",
      "Complete incident reporting",
      "Recommend BIS or processed EEG monitoring for future cases",
    ],

    drugs: [],

    notes:
      "Risk factors include TIVA without depth monitoring, equipment failure, trauma surgery and Caesarean section. Awareness under general anaesthesia is considered a serious reportable patient safety event.",
  },

  {
    id: "tension-pneumothorax",

    title: "Tension Pneumothorax",

    category: "Cardiovascular",

    recognition: [
      "Hypoxia and respiratory distress",
      "Unilateral absent breath sounds",
      "Tracheal deviation (late sign)",
      "Hypotension and tachycardia",
      "Distended neck veins (if not hypovolaemic)",
      "Asymmetrical chest expansion",
    ],

    immediateManagement: [
      "Call for senior help immediately",
      "Administer 100% oxygen",
      "Perform immediate needle decompression",
      "Preferred site: 5th intercostal space, mid-axillary line (or 2nd ICS mid-clavicular line)",
      "If needle decompression fails, perform finger thoracostomy",
      "Insert definitive intercostal chest drain",
    ],

    secondaryManagement: [
      "Obtain chest X-ray after stabilisation",
      "Transfer to ICU if unstable",
      "Identify underlying cause (barotrauma, trauma, central line, positive-pressure ventilation)",
      "Continue haemodynamic monitoring",
    ],

    drugs: [],

    notes:
      "Treat clinically—do not delay decompression while waiting for imaging. Positive-pressure ventilation can rapidly worsen tension pneumothorax. Needle decompression may fail in obese patients or with pleural adhesions; proceed to finger thoracostomy if required.",
  },

  {
    id: "high-spinal",

    title: "High / Total Spinal Block",

    category: "Regional",

    recognition: [
      "Profound hypotension",
      "Bradycardia",
      "Difficulty breathing or apnoea",
      "Upper limb weakness or paraesthesia",
      "Loss of consciousness",
    ],

    immediateManagement: [
      "Call for help",
      "Administer 100% oxygen",
      "Secure the airway and ventilate if required",
      "Give rapid IV crystalloid bolus",
      "Treat hypotension with vasopressors",
      "Ephedrine 6 mg IV increments if associated with bradycardia",
      "Metaraminol 0.5–1 mg IV if appropriate",
      "Treat bradycardia with atropine",
      "If cardiovascular collapse occurs, administer adrenaline and begin ALS",
    ],

    secondaryManagement: [
      "Start vasopressor infusion if prolonged hypotension persists",
      "Monitor in ICU until block regresses",
      "Document the event",
      "Arrange postoperative follow-up",
    ],

    drugs: [
      {
        name: "Ephedrine",
        dose: "6 mg IV increments (maximum 30 mg)",
      },
      {
        name: "Metaraminol",
        dose: "0.5–1 mg IV bolus",
      },
      {
        name: "Atropine",
        dose: "0.3–0.6 mg IV",
      },
      {
        name: "Adrenaline",
        dose: "50 µg IV increments if cardiovascular collapse",
      },
    ],

    notes:
      "Usually caused by excessive cephalad spread of neuraxial anaesthesia or accidental intrathecal injection during epidural dosing. Respiratory failure occurs when the block reaches C3–C5. Most patients recover completely as the block regresses, but airway and haemodynamic support are critical.",
  },
];
