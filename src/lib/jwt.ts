import { createServerFn } from '@tanstack/react-start'
import jwt from 'jsonwebtoken'
import { getServerEnv } from '@/validation/env'

type PayloadType = {
	id: number
	username: string
	groups: string[]
}

type PayloadResponse = {
	id: number,
	name: string
	groups: string[]
}

export const createJWT = createServerFn()
	.validator((data: PayloadType) => data)
	.handler(({ data }) => {
		const secret = getServerEnv().JWT_SECRET

		const JWTPayload = {
			sub: data.id, // Subject (user identifier)
			name: data.username, // Additional claims
			groups: data.groups
		}

		const jwtResult = jwt.sign(JWTPayload, secret, { expiresIn: '1h' })
		return jwtResult
	})

export const verifyJWT = createServerFn()
	.validator((data: string) => data)
	.handler(({ data }) => {
		const secret = getServerEnv().JWT_SECRET

		try {
			const decoded = jwt.verify(data, secret)
			return decoded as PayloadResponse
		} catch {
			throw new Error('Invalid token')
		}
	})
