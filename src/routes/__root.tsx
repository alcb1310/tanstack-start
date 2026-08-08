import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Chingu Tanstack Start" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	shellComponent: ShellComponent,
});

function ShellComponent({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-green-200">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
