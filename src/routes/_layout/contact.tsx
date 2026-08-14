import { createFileRoute } from '@tanstack/react-router'
import { featureFlags } from '@/validation/env'

export const Route = createFileRoute('/_layout/contact')({
	component: RouteComponent,
	beforeLoad: () => {
		if (!featureFlags.contactFlag) {
			throw new Error(
				JSON.stringify({
					message: 'Not implemented',
					code: 503,
					desc: 'Service unavailable',
				}),
			)
		}
	},
	errorComponent: ({ error }) => {
		return (
			<div>
				<h2>Contact error</h2>
				<pre className='text-destructive'>{error.message}</pre>
			</div>
		)
	},
})

function RouteComponent() {
	return <div>Hello "/contact"!</div>
}
