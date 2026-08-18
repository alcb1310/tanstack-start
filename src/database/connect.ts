import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { getServerEnv } from '@/validation/env'

export function getConnection() {
	const envVar = getServerEnv()

	// Create a connection pool
	const pool = new Pool({
		user: envVar.DB_USER,
		host: envVar.DB_HOST,
		database: envVar.DB_NAME,
		password: envVar.DB_PASSWORD,
		port: Number(envVar.DB_PORT),
	})

	return pool
}

export const db = drizzle({ client: getConnection() })
