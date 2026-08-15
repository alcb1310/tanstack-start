import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<h2 className='mb-2 text-xl'>Users</h2>
			<ul>
				<li>
					<Link to='/users/$id' params={{ id: 0 }}>
						user 0
					</Link>
				</li>
				<li>
					<Link to='/users/$id' params={{ id: 1 }}>
						user 1
					</Link>
				</li>
			</ul>
		</div>
	)
}
