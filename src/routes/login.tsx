import { createFileRoute } from '@tanstack/react-router'
import { type ChangeEvent, useState } from 'react'
import { z, ZodError } from 'zod'
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
import { useAppForm } from '@/hooks/form-context'

export const Route = createFileRoute('/login')({
	component: RouteComponent,
})

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

function RouteComponent() {
	const form = useAppForm({
		defaultValues: {
			username: '',
			password: '',
		} as Login,
		onSubmit: async ({ value }) => {
			await sleep(2000)
			console.log(value)
		},
		validators: {
			onSubmit: loginSchema,
			onChange: loginSchema,
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
							<form.FormButton label='Login' />
						</form.AppForm>
					</FieldGroup>
				</FieldSet>
			</form>
		</div>
	)
}
