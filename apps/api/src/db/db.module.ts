import { Module, Global } from '@nestjs/common';
import { createDb } from './client';

export const DB_CONNECTION = 'DB_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DB_CONNECTION,
      useFactory: () => {
        return createDb();
      },
    },
  ],
  exports: [DB_CONNECTION],
})
export class DbModule {}
