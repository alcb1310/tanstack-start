import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users')({
	component: RouteComponent,
	notFoundComponent: () => {
		return <div>
			<h2>User not found</h2>
			<p>The user is not found</p>
		</div>
	}
})

function RouteComponent() {
	return <Outlet />
}
