import { Drug } from "@/types/drug";

function formatDose(value: number): string {
  if (value < 0.01) {
    return value.toFixed(3);
  }

  if (value < 1) {
    return value.toFixed(2);
  }

  if (value < 10) {
    return value.toFixed(1);
  }

  return Math.round(value).toString();
}

export function calculateDose(
  weight: number,
  drug: Drug
) {
  const amount = drug.dose * weight;

  return {
    amount: formatDose(amount),

    unit: drug.unit.replace("/kg", ""),
  };
}