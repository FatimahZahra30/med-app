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