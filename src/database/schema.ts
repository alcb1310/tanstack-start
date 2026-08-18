import {
	integer,
	snakeCase,
	timestamp,
	unique,
	varchar,
} from 'drizzle-orm/pg-core'

export const usersTable = snakeCase.table(
	'users',
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		username: varchar().notNull(),
		password: varchar().notNull(),
		createdAt: timestamp().defaultNow().notNull(),
	},
	(t) => [unique('uq_username').on(t.username)],
)
