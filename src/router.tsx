import { QueryClient } from '@tanstack/react-query'
import { createRouter, useRouterState } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	const queryClient = new QueryClient()

	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: 'intent',
		context: { queryClient },
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

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	})

	return router
}
