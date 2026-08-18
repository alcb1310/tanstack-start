import { z } from 'zod'

const clientEnvSchema = z.object({
	VITE_CONTACT_FLAG: z.string(),
})

export const ClientEnv = clientEnvSchema.parse(import.meta.env)

const serverEnvSchema = z.object({
	JOKES_API: z.url(),
	DB_USER: z.string(),
	DB_PASSWORD: z.string(),
	DB_HOST: z.string(),
	DB_PORT: z.string(),
	DB_NAME: z.string(),
	SALT: z.string(),
})

export function getServerEnv() {
	return serverEnvSchema.parse(process.env)
}

export const featureFlags = {
	contactFlag: ClientEnv.VITE_CONTACT_FLAG === 'true',
}
