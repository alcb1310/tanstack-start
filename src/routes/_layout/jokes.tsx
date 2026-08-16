import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/jokes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_layout/jokes"!</div>
}
