import React from "react";
import { hydrateRoot } from "react-dom/client";
import { createElement, useState } from "react";
import { AppRouteContext } from "./hooks/useLoaderData";
import { routes } from "./routes";
import { PageContext } from "mindoc-runtime/routeData";

type Props = {
  page: PageContext;
};

export const App = ({ page }: Props) => {
  let [activePage, setActivePage] = useState(page);

  return (
    <AppRouteContext.Provider value={{ activePage, setActivePage }}>
      {createElement(activePage.component, activePage.props)}
    </AppRouteContext.Provider>
  );
};

export const ErrorPage = () => {
  return (
    <>
      <p>Error 404</p>
    </>
  );
};

const hydrate = async () => {
  const container = document.getElementById("app")!;

  let activeRoute = routes.find(
    (route) => route.path === window.location.pathname
  );

  if (!activeRoute) {
    hydrateRoot(container, <ErrorPage />);
    return;
  }

  let { default: component } = await activeRoute.getComponent();

  hydrateRoot(
    container,
    <App
      page={{
        props: (window as any)._APP_ROUTE_PROPS_,
        path: window.location.pathname,
        component,
      }}
    />
  );
};

//@ts-ignore
if (!import.meta.env.SSR) hydrate();
