import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "./components/provider";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import { Button } from "./components/ui/button";
import { AuthenticatePage } from "./pages/authenticate";
import { DashboardPage } from "./pages/dashboard";
import { ConnectionPage } from "./pages/connection";
import { OrganizationLoginPage } from "./pages/organization-login";
import "./globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Button asChild>
        <Link to={`/${import.meta.env.VITE_STYTCH_ORGANIZATION_SLUG}/login`}>
          Sign up or log in
        </Link>
      </Button>
    ),
  },
  {
    path: "/authenticate",
    element: <AuthenticatePage />,
  },
  {
    path: "/:slug/login",
    element: <OrganizationLoginPage />,
  },
  {
    path: "/:slug/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/:slug/dashboard/:connection_id",
    element: <ConnectionPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <RouterProvider router={router} />
      </main>
    </Provider>
  </React.StrictMode>
);
