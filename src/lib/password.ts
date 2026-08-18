import * as bcrypt from 'bcrypt'
import { getServerEnv } from '@/validation/env'

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
	const saltRounds = Number(getServerEnv().SALT)
	const salt = await bcrypt.genSalt(saltRounds)
	return bcrypt.hash(password, salt)
}

// Function to compare a password with a hashed password
export async function comparePassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return bcrypt.compare(password, hashedPassword)
}
