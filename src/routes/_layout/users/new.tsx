import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import z from 'zod'
import {
	FieldDescription,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from '@/components/ui/field'
import { db } from '@/database/connect'
import { useAppForm } from '@/hooks/form-context'
import { usersTable } from '@/database/schema';

const newUserSchema = z.object({
	username: z
		.string()
		.min(5, { message: 'Username must be at least 5 characters long' }),
	password: z
		.string()
		.min(5, { message: 'Password must be at least 5 characters long' }),
})

type NewUserType = z.infer<typeof newUserSchema>

const saveUser = createServerFn({ method: 'POST' })
	.validator((data: NewUserType) => data)
	.handler(async ({ data }) => {
		try {
			// const query = 'INSERT INTO users (username, password) values ($1, $2)'
			// const values = [data.username, data.password]
			// const pool = getConnection()
			//
			// const result = await pool.query(query, values)
			const result = await db.insert(usersTable).values({
				username: data.username,
				password: data.password
			})
			console.log('Result: ', result)
		} catch (e) {
			console.error(`Error inserting user: ${e}`)
			throw e
		}
	})

export const Route = createFileRoute('/_layout/users/new')({
	component: RouteComponent,
})

function RouteComponent() {
	const { queryClient } = Route.useRouteContext()
	const navigate = useNavigate()

	const form = useAppForm({
		defaultValues: {
			username: '',
			password: '',
		} as NewUserType,
		validators: {
			onSubmit: newUserSchema,
		},
		onSubmit: ({ value }) => {
			mutate.mutate({ data: value })
		},
	})

	const mutate = useMutation({
		mutationFn: saveUser,
		onSuccess: () => {
			alert('success')
			queryClient.invalidateQueries({
				queryKey: ['users'],
			})
			navigate({ to: '/users' })
		},
		onError: ({ message }) => {
			alert(message)
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
