import pkg from 'jsonwebtoken'
import { getServerEnv } from '@/validation/env'

const { sign, verify } = pkg

type PayloadType = {
	id: number
	username: string
}

export function createJWT(payload: PayloadType) {
	const secret = getServerEnv().JWT_SECRET

	const JWTPayload = {
		sub: payload.id, // Subject (user identifier)
		name: payload.username, // Additional claims
	}

	const jwtResult = sign(JWTPayload, secret, { expiresIn: '1h' })
	return jwtResult
}

export function verifyJWT(token: string) {
	const secret = getServerEnv().JWT_SECRET

	try {
		const decoded = verify(token, secret)
		console.log(decoded)
	} catch {
		throw new Error('Invalid token')
	}
}
