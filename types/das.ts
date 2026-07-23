export type DASPlan = {
  id: "A" | "B" | "C" | "D";
  title: string;
  subtitle: string;
  steps: string[];
  decision: string;
  nextPlan?: "A" | "B" | "C" | "D";
  note?: string;
};