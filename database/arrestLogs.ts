import { db } from "./arrestDB";

export type ArrestLog = {
  id: string;
  startedAt: string;
  completedAt: string;
  duration: number;
  events: unknown[];
};

export function saveArrestLog(log: ArrestLog) {
  db.runSync(
    `
      INSERT INTO arrest_logs (
        id,
        started_at,
        completed_at,
        duration,
        events
      )
      VALUES (?, ?, ?, ?, ?);
    `,
    [
      log.id,
      log.startedAt,
      log.completedAt,
      log.duration,
      JSON.stringify(log.events),
    ],
  );
}

// GET ALL SAVED ARREST LOGS
export function getArrestLogs(): ArrestLog[] {
  const rows = db.getAllSync<{
    id: string;
    started_at: string;
    completed_at: string;
    duration: number;
    events: string;
  }>(
    `
      SELECT *
      FROM arrest_logs
      ORDER BY started_at DESC;
    `,
  );

  return rows.map((row) => ({
    id: row.id,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    duration: row.duration,
    events: JSON.parse(row.events),
  }));
}
