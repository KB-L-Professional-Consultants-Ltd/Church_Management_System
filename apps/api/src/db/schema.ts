import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 120 }).notNull(),
  email: varchar('email', { length: 160 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type SelectMember = typeof members.$inferSelect;
export type InsertMember = typeof members.$inferInsert;
