import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/about")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <p>Hello "/about"!</p>
        </div>
    )
}
