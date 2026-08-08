import { createFileRoute } from '@tanstack/react-router'
import { clientEnv } from '@/config/env'

export const Route = createFileRoute('/_layout/contact')({
	beforeLoad: () => {
		if (clientEnv.VITE_CONTACT_FLAG !== 'true') {
			throw new Error('Contact flag is not enabled')
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/contact"!</div>
}
