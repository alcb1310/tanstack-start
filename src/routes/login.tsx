import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'
import { z } from 'zod'
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field'
import { getConnection } from '@/database/connect'
import { useAppForm } from '@/hooks/form-context'
import { createJWT } from '@/lib/jwt'
import { comparePassword } from '@/lib/password'

const loginSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'The username must be at least 5 characters long' }),
	password: z
		.string()
		.min(5, { message: 'The password must be at least 5 characters long' }),
})
type Login = z.infer<typeof loginSchema>

const handleLogin = createServerFn({ method: 'POST' })
	.validator((data: Login) => data)
	.handler(async ({ data }) => {
		try {
			const pool = getConnection()
			const query =
				'SELECT id, username, password FROM users WHERE username=$1 LIMIT 1'
			const rows = await pool.query(query, [data.username])
			if (rows.rowCount === 0) {
				throw new Error('Invalid credentials')
			}
			const user = rows.rows[0]

			const ok = await comparePassword(data.password, user.password)
			if (!ok) {
				throw new Error('Invalid credentials')
			}

			const token = createJWT({
				id: user.id,
				username: user.username,
			})

			setCookie('CHINGU', token, { httpOnly: true })
			return {
				user: {
					id: user.id,
					username: user.username,
				},
			}
		} catch {
			throw new Error('Invalid credentials')
		}
	})

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

function RouteComponent() {
	const form = useAppForm({
		defaultValues: {
			username: '',
			password: '',
		} as Login,
		onSubmit: async ({ value }) => {
			mutate.mutate({ data: value })
		},
		validators: {
			onSubmit: loginSchema,
			onChange: loginSchema,
		},
	})

	const mutate = useMutation({
		mutationFn: handleLogin,
		onSuccess: (data) => {
			alert(`Success: ${data.user.username}`)
		},
		onError: (error) => {
			alert(`Error: ${error.message}`)
		},
		onSettled: () => {
			alert('Query settled')
		},
	})

	return (
		<div className='w-1/2 mx-auto'>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<FieldSet>
					<FieldLegend>Login</FieldLegend>
					<FieldDescription>
						Enter your username and password to login
					</FieldDescription>
					<FieldGroup>
						<form.AppField name='username'>
							{(field) => (
								<field.FormTextField label='username' placeholder='Username' />
							)}
						</form.AppField>
						<form.AppField name='password'>
							{(field) => (
								<field.FormTextField
									label='password'
									placeholder='******'
									type='password'
								/>
							)}
						</form.AppField>

						<form.AppForm>
							<form.FormButton label='Login' disabled={mutate.isPending} />
						</form.AppForm>
					</FieldGroup>
				</FieldSet>
			</form>
		</div>
	)
}
