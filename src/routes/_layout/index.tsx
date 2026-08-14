import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_layout/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<p>Hello "/"!</p>
			<Button variant='default' size='xs'>
				Shadcn/UI Sample Button
			</Button>
		</div>
	)
}
