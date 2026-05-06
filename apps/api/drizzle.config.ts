import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

function normalizeDatabaseUrl(rawValue: string): string {
  const trimmedValue = rawValue.trim();
  const match = trimmedValue.match(/^psql\s+['"](.+)['"]$/);

  return match ? match[1] : trimmedValue;
}

function getMigrationDatabaseUrl(): string | undefined {
  const explicitMigrationUrl = process.env.DATABASE_URL_MIGRATE;

  if (explicitMigrationUrl) {
    return normalizeDatabaseUrl(explicitMigrationUrl);
  }

  const runtimeUrl = process.env.DATABASE_URL;

  if (!runtimeUrl) {
    return undefined;
  }

  try {
    const parsedUrl = new URL(runtimeUrl);

    if (parsedUrl.hostname.includes('-pooler.')) {
      parsedUrl.hostname = parsedUrl.hostname.replace('-pooler.', '.');
      return parsedUrl.toString();
    }

    return normalizeDatabaseUrl(runtimeUrl);
  } catch {
    return normalizeDatabaseUrl(runtimeUrl);
  }
}

const databaseUrl = getMigrationDatabaseUrl();

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL_MIGRATE or DATABASE_URL is not set. Add one of them to apps/api/.env before running Drizzle commands.',
  );
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
  verbose: true,
  strict: true,
});
