export interface ArrestNode {
  title: string;
  steps: string[];
  actionSteps?: string[];
  yes?: string | null;
  no?: string | null;
  yesLabel?: string | null;
  noLabel?: string | null;
  timer?: boolean;
  timerDuration?: number;
}

export type ArrestEvent = {
  id: string;
  type: "start" | "shock" | "adrenaline" | "rhythm" | "rosc";
  description: string;
  elapsedTime: number;
  timestamp: string;
  nodeId: string;
};

export type ArrestLog = {
  id: string;
  startedAt: string;
  duration: number;
  events: ArrestEvent[];
};
