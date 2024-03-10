import { Outlet, LiveReload, Link, Links, useRouteError } from "@remix-run/react";
import { ReactNode } from "react";
import globalStyleUrls from "~/styles/global.css";

export const links = () => [{ rel: "stylesheet", href: globalStyleUrls }];

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

export default function App() {
  return (
    <Document title="">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title ? title : "REMIX FIRST"}</title>
        <Links />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix
        </Link>
        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">{children}</div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  // Extract the error message from the error object
  const errorMessage = error instanceof Error ? error.message : "An error occurred";

  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{errorMessage}</p>
      </Layout>
    </Document>
  );
}
