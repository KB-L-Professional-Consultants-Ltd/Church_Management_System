import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

function normalizeDatabaseUrl(rawValue: string): string {
  const trimmedValue = rawValue.trim();
  const match = trimmedValue.match(/^psql\s+['"](.+)['"]$/);

  return match ? match[1] : trimmedValue;
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Add it to apps/api/.env');
  }

  return normalizeDatabaseUrl(databaseUrl);
}

export function createDb() {
  const client = postgres(getDatabaseUrl(), { max: 1 });
  return drizzle({ client, schema });
}
