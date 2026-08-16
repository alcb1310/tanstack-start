import { createFileRoute } from '@tanstack/react-router'
import { type ChangeEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

type Login = {
	username: string
	password: string
}

function RouteComponent() {
	const [credentials, setCredentials] = useState<Login>({
		username: '',
		password: '',
	})
	const [error, setError] = useState<Login>({
		username: '',
		password: '',
	})

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setCredentials((prevdata) => ({ ...prevdata, [name]: value }))
	}

	function submitForm() {
		setError({
			username: '',
			password: '',
		})
		let hasError: boolean = false
		if (credentials.username.length < 5) {
			setError((prevdata) => ({
				...prevdata,
				username: 'The username must be at least 5 characters long',
			}))
			hasError = true
		}
		if (credentials.password.length < 5) {
			setError((prevdata) => ({
				...prevdata,
				password: 'The password must be at least 5 characters long',
			}))
			hasError = true
		}

		if (hasError) return

		console.log(credentials)
	}

	return (
		<div className='w-1/2 mx-auto'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					submitForm()
				}}
			>
				<FieldSet>
					<FieldLegend>Login</FieldLegend>
					<FieldDescription>
						Enter your username and password to login
					</FieldDescription>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='username'>Username</FieldLabel>
							<Input
								name='username'
								autoComplete='off'
								placeholder='username'
								value={credentials.username}
								onChange={handleChange}
							/>
							{error.username && (
								<FieldError>Error: {error.username}</FieldError>
							)}
						</Field>
						<Field>
							<FieldLabel htmlFor='password'>Password</FieldLabel>
							<Input
								name='password'
								autoComplete='off'
								type='password'
								placeholder='********'
								value={credentials.password}
								onChange={handleChange}
							/>
							{error.password && (
								<FieldError>Error: {error.password}</FieldError>
							)}
						</Field>
						<Field>
							<Button type='submit' variant='default'>
								Login
							</Button>
						</Field>
					</FieldGroup>
				</FieldSet>
			</form>
		</div>
	)
}
