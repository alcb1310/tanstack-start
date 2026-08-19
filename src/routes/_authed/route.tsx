import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { deleteCookie } from '@tanstack/react-start/server'
import { Button } from '@/components/ui/button'

const logout = createServerFn({ method: 'POST' }).handler(async () => {
	deleteCookie('CHINGU')
})

export const Route = createFileRoute('/_authed')({
	component: RouteComponent,
	errorComponent: () => {
		return <h2>Authed error component</h2>
	},
})

function RouteComponent() {
	const navigate = useNavigate()

	return (
		<div>
			<nav className='flex justify-between'>
				<ul className='flex gap-1'>
					<li>
						<Button
							variant='ghost'
							onClick={() => {
								navigate({ to: '/' })
							}}
							size='xs'
						>
							Home
						</Button>
					</li>
				</ul>
				<Button
					variant='ghost'
					size='xs'
					onClick={async () => {
						await logout()
						navigate({ to: '/login' })
					}}
				>
					Logout
				</Button>
			</nav>
			<Outlet />
		</div>
	)
}
