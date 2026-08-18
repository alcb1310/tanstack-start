import { defineConfig } from 'drizzle-kit'
import { getServerEnv } from '@/validation/env'

const v = getServerEnv()
const url = `postgresql://${v.DB_USER}:${v.DB_PASSWORD}@${v.DB_HOST}:${v.DB_PORT}/${v.DB_NAME}`
console.log(url)

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/database/schema.ts',
	dbCredentials: {
		url,
	},
	migrations: {
		table: 'journal',
		schema: 'drizzle',
	},
})
