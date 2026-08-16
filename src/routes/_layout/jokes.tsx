import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ClientEnv } from '@/validation/env'

type JokeQuery = {
	icon_url: string
	id: string
	url: string
	value: string
}

async function getJoke() {
	const query = await fetch(ClientEnv.VITE_JOKES_API, {
		method: 'GET',
	})

	if (!query.ok) {
		throw new Error('Error fetching new joke')
	}

	return { joke: (await query.json()) as JokeQuery }
}

export const Route = createFileRoute('/_layout/jokes')({
	component: RouteComponent,
	loader: async () => {
		return getJoke()
	},
})

function RouteComponent() {
	const j = Route.useLoaderData()
	const [joke, setJoke] = useState<JokeQuery>(j.joke)

	return (
		<div>
			<h2 className='text-xl font-bold mb-2'>Daily Chuck Norris Joke</h2>
			<p>{joke.value}</p>

			<Button
				onClick={async () => {
					const j = await getJoke()
					setJoke(j.joke)
				}}
			>
				get next joke
			</Button>
		</div>
	)
}
