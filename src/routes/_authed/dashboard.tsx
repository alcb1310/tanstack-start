import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/dashboard')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		console.log('dashboard before: ', context)
	},
	loader: ({ context }) => {
		console.log('dashboard: ', context)
		return { cookieValue: context.cookieValue }
	},
})

function RouteComponent() {
	const data = Route.useLoaderData()

	return (
		<div>
			<p>Hello "/_authed/dashboard"!</p>

			<p className='text-green-400'>
				User: <span className='text-amber-700'>{data.cookieValue.name}</span>
			</p>
		</div>
	)
}
