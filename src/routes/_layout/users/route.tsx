import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/users')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<h1>Users</h1>
			<Outlet />
		</div>
	)
}
