import { createFileRoute } from "@tanstack/react-router"
import { featureFlags } from "@/validation/env"

export const Route = createFileRoute("/_layout/contact")({
    component: RouteComponent,
    beforeLoad: () => {
        if (!featureFlags.contactFlag) {
            throw new Error(
                JSON.stringify({
                    message: "Not implemented",
                    code: 503,
                    desc: "Service unavailable",
                }),
            )
        }
    },
})

function RouteComponent() {
    return <div>Hello "/contact"!</div>
}
