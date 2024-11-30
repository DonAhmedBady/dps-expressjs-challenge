import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = path.resolve('./db/db.sqlite3');

if (!fs.existsSync(dbPath)) {
  console.error('Database file not found:', dbPath);
  process.exit(1); // Terminate if the database is missing
}

// Function to open the database connection
async function openDb() {
  return open({
    filename: dbPath,  // Use the correct path here
    driver: sqlite3.Database, // Use sqlite3 driver
  });
}

// Utility function to perform SELECT queries
export const query = async (sql: string, params: (string | number)[] = []): Promise<any[]> => {
  const db = await openDb();
  return db.all(sql, ...params);
};

// Utility function to perform INSERT/UPDATE/DELETE queries
export const run = async (sql: string, params: (string | number)[] = []): Promise<void> => {
  const db = await openDb();
  await db.run(sql, ...params);
};

// Export a promise-based query wrapper
export const runQuery = async (sql: string, params: any[] = []): Promise<any[]> => {
  const db = await openDb();
  return db.all(sql, ...params);
};

export const db = async () => {
	return open({
	  filename: process.env.DATABASE_URL || path.resolve('./db/db.sqlite3'),
	  driver: sqlite3.Database,
	});
};
