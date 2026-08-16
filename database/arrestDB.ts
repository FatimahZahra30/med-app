import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

export const db =
  Platform.OS === "web"
    ? null
    : SQLite.openDatabaseSync("anaesthesia_toolkit.db");

export function initialiseDatabase() {
  if (!db) return;

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
