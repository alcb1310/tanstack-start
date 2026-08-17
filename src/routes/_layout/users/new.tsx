import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field'
import { useAppForm } from '@/hooks/form-context'

const newUserSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'Username must be at least 5 characters long' }),
	password: z
		.string()
		.min(5, { message: 'Password must be at least 5 characters long' }),
})

type NewUserType = z.infer<typeof newUserSchema>

export const Route = createFileRoute('/_layout/users/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const form = useAppForm({
		defaultValues: {
			username: '',
			password: '',
		} as NewUserType,
		validators: {
			onSubmit: newUserSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value)
		},
	})

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<FieldSet>
					<FieldLegend>Add a user</FieldLegend>
					<FieldDescription>
						Create a new user with its password
					</FieldDescription>
					<FieldGroup>
						<form.AppField name='username'>
							{(field) => (
								<field.FormTextField label='username' placeholder='username' />
							)}
						</form.AppField>
						<form.AppField name='password'>
							{(field) => (
								<field.FormTextField
									type='password'
									label='password'
									placeholder='password'
								/>
							)}
						</form.AppField>

						<form.AppForm>
							<form.FormButton label='Create' />
						</form.AppForm>
					</FieldGroup>
				</FieldSet>
			</form>
		</div>
	)
}
