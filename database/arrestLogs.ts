import { Platform } from "react-native";
import { db } from "./arrestDB";

export type ArrestLog = {
  id: string;
  startedAt: string;
  completedAt: string;
  duration: number;
  events: unknown[];
};

const WEB_STORAGE_KEY = "anaesthesia_toolkit_arrest_logs";

/**
 * Get logs stored in localStorage on web.
 */
function getWebLogs(): ArrestLog[] {
  if (Platform.OS !== "web") {
    return [];
  }

  try {
    const stored = localStorage.getItem(WEB_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as ArrestLog[];
  } catch (error) {
    console.error("Failed to read web arrest logs:", error);
    return [];
  }
}

/**
 * Save logs to localStorage on web.
 */
function saveWebLogs(logs: ArrestLog[]) {
  if (Platform.OS !== "web") {
    return;
  }

  try {
    localStorage.setItem(WEB_STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error("Failed to save web arrest logs:", error);
  }
}

/**
 * SAVE ARREST LOG
 */
export function saveArrestLog(log: ArrestLog) {
  // WEB
  if (Platform.OS === "web") {
    const logs = getWebLogs();

    const existingIndex = logs.findIndex(
      (existingLog) => existingLog.id === log.id,
    );

    if (existingIndex >= 0) {
      logs[existingIndex] = log;
    } else {
      logs.push(log);
    }

    saveWebLogs(logs);

    return;
  }

  // MOBILE / NATIVE
  if (!db) {
    return;
  }

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

/**
 * GET ALL SAVED ARREST LOGS
 */
export function getArrestLogs(): ArrestLog[] {
  // WEB
  if (Platform.OS === "web") {
    return getWebLogs().sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );
  }

  // MOBILE / NATIVE
  if (!db) {
    return [];
  }

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

/**
 * GET ONE ARREST LOG BY ID
 */
export function getArrestLogById(id: string): ArrestLog | null {
  // WEB
  if (Platform.OS === "web") {
    const logs = getWebLogs();

    return logs.find((log) => log.id === id) ?? null;
  }

  // MOBILE / NATIVE
  if (!db) {
    return null;
  }

  const row = db.getFirstSync<{
    id: string;
    started_at: string;
    completed_at: string;
    duration: number;
    events: string;
  }>(
    `
      SELECT *
      FROM arrest_logs
      WHERE id = ?
      LIMIT 1;
    `,
    [id],
  );

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    duration: row.duration,
    events: JSON.parse(row.events),
  };
}
