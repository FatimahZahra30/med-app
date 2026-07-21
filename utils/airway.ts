export type AirwayResult = {
  cuffedETT: string;
  uncuffedETT: string;

  depth: string;

  igel: string;

  lma: string;

  guedel: string;

  blade: string;
};

export function calculateAirway(
  age: number,
  weight: number,
  sex: "male" | "female",
): AirwayResult {
  /*
    Endotracheal Tube

    Adult formula:
    Cuffed ETT ≈ (age / 4) + 3.5
    Uncuffed ETT ≈ (age / 4) + 4
  */

  const cuffedETT =
    age >= 18 ? getAdultCuffedETT(age) : getPaediatricCuffedETT(age);

  const uncuffedETT =
    age >= 18 ? getAdultUncuffedETT(age) : getPaediatricUncuffedETT(age);

  /*
    ETT depth

    Adult approximation:
    3 x ETT size
  */

  const depth = `${Math.round(Number(cuffedETT) * 3)}`;

  /*
    iGel sizing based on weight
  */

  const igel = getIGelSize(weight);

  /*
    LMA Classic sizing
  */

  const lma = getLMASize(weight);

  /*
    Guedel

    Simplified adult recommendation
  */

  const guedel =
    sex === "male" ? "Size 4–5 (90–100 mm)" : "Size 3–4 (80–90 mm)";

  /*
    Laryngoscope blade
  */

  const blade = getBlade(age);

  return {
    cuffedETT,

    uncuffedETT,

    depth,

    igel,

    lma,

    guedel,

    blade,
  };
}

/* ------------------------------
   ETT calculations
-------------------------------- */

function getAdultCuffedETT(age: number) {
  if (age < 18) {
    return "5.5";
  }

  return "7.5";
}

function getAdultUncuffedETT(age: number) {
  if (age < 18) {
    return "6.0";
  }

  return "8.0";
}

function getPaediatricCuffedETT(age: number) {
  const size = age / 4 + 3.5;

  return size.toFixed(1);
}

function getPaediatricUncuffedETT(age: number) {
  const size = age / 4 + 4;

  return size.toFixed(1);
}

/* ------------------------------
   iGel sizing
-------------------------------- */

function getIGelSize(weight: number) {
  if (weight <= 5) return "1";

  if (weight <= 12) return "1.5";

  if (weight <= 25) return "2";

  if (weight <= 35) return "2.5";

  if (weight <= 50) return "3";

  if (weight <= 90) return "4";

  return "5";
}

/* ------------------------------
   LMA Classic sizing
-------------------------------- */

function getLMASize(weight: number) {
  if (weight <= 5) return "1";

  if (weight <= 10) return "1.5";

  if (weight <= 20) return "2";

  if (weight <= 30) return "2.5";

  if (weight <= 50) return "3";

  if (weight <= 70) return "4";

  if (weight <= 100) return "5";

  return "6";
}

/* ------------------------------
   Laryngoscope blade
-------------------------------- */

function getBlade(age: number) {
  if (age < 1) return "Miller 0";

  if (age < 2) return "Miller 1";

  if (age < 8) return "Macintosh 2";

  return "Macintosh 3–4";
}
