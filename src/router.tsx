import { createRouter, useRouterState } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultErrorComponent: ({ error }) => {
			return (
				<div>
					<h2>Global Error</h2>
					<pre className='text-destructive'>{error.message}</pre>
				</div>
			)
		},
		defaultNotFoundComponent: () => {
			const router = useRouterState()

			return (
				<div>
					<h2>Global Not Found</h2>
					<p>The route {router.location.href} was not found</p>
				</div>
			)
		},
	})

	return router
}
