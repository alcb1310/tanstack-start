import {
	createFileRoute,
	Outlet,
	redirect,
	useNavigate,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { deleteCookie, getCookie } from '@tanstack/react-start/server'
import { Button } from '@/components/ui/button'
import { verifyJWT } from '@/lib/jwt'

const logout = createServerFn({ method: 'POST' }).handler(async () => {
	deleteCookie('CHINGU')
})

const readCookieFn = createServerFn({ method: 'GET' }).handler(async () => {
	const cookieValue = getCookie('CHINGU')
	console.log(cookieValue)

	if (!cookieValue) {
		return { cookieValue: null }
	}
	return { cookieValue }
})

export const Route = createFileRoute('/_authed')({
	component: RouteComponent,
	loader: async () => {
		const token = await readCookieFn()
		if (!token.cookieValue) {
			throw redirect({ to: '/login' })
		}
		const tokenData = await verifyJWT({ data: token.cookieValue })

		return { cookieValue: tokenData }
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
