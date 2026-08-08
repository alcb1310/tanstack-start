import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
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
			</ul>
			Hello "/about"!
		</div>
	)
}
