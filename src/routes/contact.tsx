import { createFileRoute, Link } from '@tanstack/react-router'
import { clientEnv } from '@/config/env'

export const Route = createFileRoute('/contact')({
	beforeLoad: () => {
		if (clientEnv.VITE_CONTACT_FLAG !== 'true') {
			throw new Error('Contact flag is not enabled')
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<ul className='flex gap-4'>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
				{clientEnv.VITE_CONTACT_FLAG === 'true' && (
					<li>
						<Link to='/contact'>Contact</Link>
					</li>
				)}
			</ul>
			Hello "/contact"!
		</div>
	)
}
