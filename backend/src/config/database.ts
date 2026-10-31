import { config } from './env.js';

export interface DatabaseConnection {
  url: string;
  isConnected: boolean;
}

export const dbConfig: DatabaseConnection = {
  url: config.databaseUrl,
  isConnected: true,
};

export async function checkDatabaseHealth(): Promise<boolean> {
  // In demo / fallback mode, return true
  return true;
}
