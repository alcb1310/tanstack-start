import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<p>Hello "/"!</p>
			<Button variant='default'>Shadcn/UI button</Button>
		</div>
	)
}
