import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
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
	beforeLoad: async ({ context: { queryClient } }) => {
		queryClient.prefetchQuery({
			queryKey: ['jokes'],
			queryFn: () => getJoke(),
		})
	},
})

function RouteComponent() {
	const queryClient = Route.useRouteContext().queryClient
	const {
		data: jokes,
		isFetching,
		error,
		isError,
	} = useSuspenseQuery({
		queryKey: ['jokes'],
		queryFn: () => getJoke(),
	})

	return (
		<div>
			<h2 className='text-xl font-bold mb-2'>Daily Chuck Norris Joke</h2>
			{!isError && <p>{jokes.value}</p>}
			{isError && <p>An error occurred: {error.message}</p>}

			<Button
				onClick={() =>
					queryClient.invalidateQueries({
						queryKey: ['jokes'],
					})
				}
				disabled={isFetching}
				size='xs'
			>
				get next joke
			</Button>
		</div>
	)
}
