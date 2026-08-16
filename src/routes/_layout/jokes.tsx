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
	console.log('getting the joke')
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
		return await getJoke()
	},
})

function RouteComponent() {
	const j = Route.useLoaderData()
	const [joke, setJoke] = useState<JokeQuery>(j.joke)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [hasError, setHasError] = useState(false)

	async function getNextJoke() {
		setLoading(true)
		setError('')
		setHasError(false)
		try {
			const j = await getJoke()
			setJoke(j.joke)
		} catch (e) {
			setError(e.message)
			setHasError(true)
		}
		setLoading(false)
	}

	return (
		<div>
			<h2 className='text-xl font-bold mb-2'>Daily Chuck Norris Joke</h2>
			{!hasError && <p>{joke.value}</p>}
			{hasError && <p>An error occurred: {error}</p>}

			<Button onClick={getNextJoke} disabled={loading} size='xs'>
				get next joke
			</Button>
		</div>
	)
}
