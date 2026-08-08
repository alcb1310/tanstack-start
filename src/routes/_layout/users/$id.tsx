import { createFileRoute, notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users/$id')({
	loader: ({ params: { id } }) => {
		if (id === 'new') {
			throw notFound()
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	const { id } = Route.useParams()

	return <div>Hello `/_layout/users/{id}`!</div>
}
