import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { createDb } from './db/client';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getDbHealth(): Promise<{
    status: string;
    databaseTime: string | null;
  }> {
    try {
      const db = createDb();
      const result = (await db.execute(sql`select now() as now`)) as Array<{
        now?: string | Date;
      }>;
      const row = result[0];

      return {
        status: 'ok',
        databaseTime: row?.now ? String(row.now) : null,
      };
    } catch {
      throw new ServiceUnavailableException(
        'Database connection failed. Confirm DATABASE_URL is set and valid.',
      );
    }
  }
}
