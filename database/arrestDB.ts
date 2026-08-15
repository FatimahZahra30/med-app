import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("anaesthesia_toolkit.db");

export function initialiseDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS arrest_logs (
      id TEXT PRIMARY KEY NOT NULL,
      started_at TEXT NOT NULL,
      completed_at TEXT NOT NULL,
      duration INTEGER NOT NULL,
      events TEXT NOT NULL
    );
  `);
}
