import { createFileRoute } from '@tanstack/react-router'
import { ClientEnv } from '@/validation/env'

type JokeQuery = {
	icon_url: string
	id: string
	url: string
	value: string
}

export const Route = createFileRoute('/_layout/jokes')({
	component: RouteComponent,
	loader: async () => {
		const query = await fetch(ClientEnv.VITE_JOKES_API, {
			method: 'GET',
		})

		if (!query.ok) {
			throw new Error('Error fetching new joke')
		}

		return { joke: (await query.json()) as JokeQuery }
	},
})

function RouteComponent() {
	const j = Route.useLoaderData()

	return (
		<div>
			<h2 className='text-xl font-bold mb-2'>Daily Chuck Norris Joke</h2>
			<p>{j.joke.value}</p>
		</div>
	)
}
