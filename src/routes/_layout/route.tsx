import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { featureFlags } from "@/validation/env"

export const Route = createFileRoute("/_layout")({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    return (
        <div>
            <nav>
                <ul className='flex gap-1'>
                    <li>
                        <Button
                            variant='ghost'
                            onClick={() => {
                                navigate({ to: "/" })
                            }}
                            size='xs'
                        >
                            Home
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant='ghost'
                            onClick={() => {
                                navigate({ to: "/about" })
                            }}
                            size='xs'
                        >
                            About
                        </Button>
                    </li>
                    {featureFlags.contactFlag && (
                        <li>
                            <Button
                                variant='ghost'
                                onClick={() => {
                                    navigate({ to: "/contact" })
                                }}
                                size='xs'
                            >
                                Contact
                            </Button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    )
}
