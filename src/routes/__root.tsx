/// <reference types="vite/client" />

import type { ReactNode } from "react";
import {
    createRootRoute,
    HeadContent,
    Outlet,
    Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
                lang: "en",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "Tanstack Start",
            },
        ],
        links: [
            {
                rel: "stylesheet",
                href: appCss,
            },
        ],
    }),
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        // biome-ignore lint/a11y/useHtmlLang: defined in the meta properties of the head object
        <html>
            <head>
                <HeadContent />
            </head>

            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}
