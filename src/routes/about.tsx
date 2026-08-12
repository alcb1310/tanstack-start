import { createFileRoute, Link } from "@tanstack/react-router"
import { featureFlags } from "@/validation/env"

export const Route = createFileRoute("/about")({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <nav>
                <ul className='flex gap-3'>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    {featureFlags.contactFlag && (
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                    )}
                </ul>
            </nav>
            <p>Hello "/about"!</p>
        </div>
    )
}
