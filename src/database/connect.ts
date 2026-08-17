import { Pool } from 'pg'
import { getServerEnv } from '@/validation/env'

export async function getConnection() {
	const envVar = getServerEnv()

	// Create a connection pool
	const pool = new Pool({
		user: envVar.DB_USER,
		host: envVar.DB_HOST,
		database: envVar.DB_NAME,
		password: envVar.DB_PASSWORD,
		port: Number(envVar.DB_PORT),
	})

	// verify connection
	try {
		const client = await pool.connect()
		console.log('✅ Connected to PostgreSQL database')
		client.release()
	} catch (error) {
		console.error(`❌ Error connecting to the database: ${error}`)
		throw new Error(`❌ Error connecting to the database: ${error}`)
	}

	return pool
}
