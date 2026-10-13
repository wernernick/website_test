import { sql } from 'drizzle-orm';
import { index, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable(
	'user',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		// Wird beim Speichern normalisiert (trim + lowercase); der Index fängt Abweichungen trotzdem ab.
		email: text('email').notNull(),
		passwordHash: text('password_hash').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => [uniqueIndex('user_email_lower_idx').on(sql`lower(${table.email})`)]
);

export const session = pgTable(
	'session',
	{
		// Wird in v0.2.0 der SHA-256-Hash des Sitzungs-Tokens aus dem Cookie.
		id: text('id').primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
	},
	(table) => [index('session_user_id_idx').on(table.userId)]
);

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;
