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

  note: string;
}