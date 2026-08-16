import { z } from 'zod'

const clientEnvSchema = z.object({
	VITE_CONTACT_FLAG: z.string(),
	VITE_JOKES_API: z.string(),
})

export const ClientEnv = clientEnvSchema.parse(import.meta.env)

export const featureFlags = {
	contactFlag: ClientEnv.VITE_CONTACT_FLAG === 'true',
}
