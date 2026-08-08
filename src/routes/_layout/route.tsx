import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { clientEnv } from '@/config/env'

export const Route = createFileRoute('/_layout')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<nav>
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
			</nav>
			<Outlet />
		</div>
	)
}
