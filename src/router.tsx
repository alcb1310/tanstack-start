import { createRouter } from '@tanstack/react-router'
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
	})

	return router
}
