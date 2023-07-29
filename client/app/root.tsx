import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import global from "./styles/global.css";
import styles from "./root.module.css";
import SideNavigation, { SideNavigationLink } from "./components/SideNavigation/SideNavigation";
import Headers from "./components/Header/Header";

export const meta = () => {
  return [
    {
      title: "BerkeleyCoop",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: global },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={styles.root}>
        <SideNavigation expand="right">
          <SideNavigationLink to="/events">Events</SideNavigationLink>
          <SideNavigationLink to="/chats">Chats</SideNavigationLink>
        </SideNavigation>
        <div className={styles.wrapper}>
          <Headers />
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
