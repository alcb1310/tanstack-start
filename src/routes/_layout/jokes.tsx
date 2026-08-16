import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { getServerEnv } from '@/validation/env'

type JokeQuery = {
	icon_url: string
	id: string
	url: string
	value: string
}

const getJoke = createServerFn({ method: 'GET' }).handler(
	async (): Promise<JokeQuery> => {
		console.debug('DEBUG: joke')
		const url = getServerEnv().JOKES_API
		const query = await fetch(url, {
			method: 'GET',
		})

		if (!query.ok) {
			throw new Error('Error fetching new joke')
		}

		return (await query.json()) as JokeQuery
	},
)

export const Route = createFileRoute('/_layout/jokes')({
	component: RouteComponent,
	loader: async () => {
		return await getJoke()
	},
})

function RouteComponent() {
	const j = Route.useLoaderData()
	const [joke, setJoke] = useState<JokeQuery>(j)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [hasError, setHasError] = useState(false)

	async function getNextJoke() {
		setLoading(true)
		setError('')
		setHasError(false)
		try {
			const j = await getJoke()
			setJoke(j)
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
