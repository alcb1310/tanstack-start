import z from 'zod'

const clientEnvSchema = z.object({
	VITE_CONTACT_FLAG: z.string(),
})

export const clientEnv = clientEnvSchema.parse(import.meta.env)
