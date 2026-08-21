import type { QueryClient } from '@tanstack/react-query'
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'
import type { ReactNode } from 'react'
import type { UserContext } from '@/types/userContext'
import appCss from '../styles.css?url'

interface RouterContext {
	queryClient: QueryClient
	userContext: UserContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'TanStack Start Starter' },
		],
		links: [{ rel: 'stylesheet', href: appCss }],
	}),
	shellComponent: ShellComponent,
})

function ShellComponent({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang='en'>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	)
}
