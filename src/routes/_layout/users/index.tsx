import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { getConnection } from '@/database/connect'

const usersSchema = z.object({
	id: z.number(),
	username: z.string(),
})

type UserType = z.infer<typeof usersSchema>

const getAllUsers = createServerFn({ method: 'GET' }).handler(
	async (): Promise<UserType[]> => {
		const conn = await getConnection()

		const rows = conn.query('select id, username from users')

		return (await rows).rows as UserType[]
	},
)

export const Route = createFileRoute('/_layout/users/')({
	component: RouteComponent,
	loader: ({ context: { queryClient } }) => {
		queryClient.ensureQueryData({
			queryFn: () => getAllUsers(),
			queryKey: ['users'],
		})
	},
})

function RouteComponent() {
	const { data } = useSuspenseQuery({
		queryFn: () => getAllUsers(),
		queryKey: ['users'],
	})

	return (
		<div>
			<h2 className='mb-2 text-xl'>Users</h2>
			<ul>
				{data.length === 0 && <p>No users</p>}
				{data.map((user) => {
					return (
						<li key={user.id}>
							<Link to='/users/$id' params={{ id: user.id }}>
								{user.username}
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
