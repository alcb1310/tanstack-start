import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultErrorComponent: ({ error }) => (
			<div>
				<h1 className='text-2xl'>My custom error</h1>
				{error.message}
			</div>
		),
		defaultNotFoundComponent: () => <div>My custom not found</div>,
	})

	return router
}
