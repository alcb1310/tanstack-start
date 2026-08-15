import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users/$id')({
	component: RouteComponent,
	params: {
		parse: (rawParams) => {
			const id = Number.parseInt(rawParams.id, 10)
			if (Number.isNaN(id)) {
				throw new Error(JSON.stringify({ msg: 'Invalid user id' }))
			}

			return { id }
		},
	},
	loader: ({ params: { id } }) => {
		if (id === 0) {
			throw notFound()
		}
	},
})

function RouteComponent() {
	const { id } = Route.useParams()

	return <div>Hello {`/_layout/users/${id}`}!</div>
}
