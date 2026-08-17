import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field'
import { useAppForm } from '@/hooks/form-context'
import { useMutation } from '@tanstack/react-query'
import { getConnection } from '@/database/connect'

const loginSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'The username must be at least 5 characters long' }),
	password: z
		.string()
		.min(5, { message: 'The password must be at least 5 characters long' }),
})
type Login = z.infer<typeof loginSchema>

async function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

const handleLogin = createServerFn({ method: 'POST' })
	.validator((data: Login) => data)
	.handler(async ({ data }) => {
		await sleep(2000)
		await getConnection()

		const d = Math.floor(Math.random() * 100) + 1
		if (d % 2 !== 0) {
			throw new Error('Invalid credentials')
		}

		return { user: data.username }
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
			alert(`Success: ${data.user}`)
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
