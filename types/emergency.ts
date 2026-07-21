export type EmergencyCategory =
  | "Allergic"
  | "Airway"
  | "Respiratory"
  | "Cardiovascular"
  | "Regional"
  | "Pharmacogenetic"
  | "Toxicity"
  | "Other";

export type EmergencyDrug = {
  name: string;
  dose: string;
};

export type Emergency = {
  id: string;

  title: string;

  category: EmergencyCategory;

  recognition: string[];

  immediateManagement: string[];

  secondaryManagement: string[];

  drugs?: EmergencyDrug[];

  notes?: string;
};
