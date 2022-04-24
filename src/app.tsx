import React from "react";
import ReactDOM from "react-dom";
import { createElement, useState } from "react";
import { AppRouteContext } from "./hooks/useLoaderData";
import { routes } from "./routes"
import { Page } from "../server-runtime/handleRouteData"

type Props = {
  page?: Page;
};

export const App = ({ page }: Props) => {
  let [activePage, setActivePage] = useState(page);

  return (
    <AppRouteContext.Provider value={{ activePage, setActivePage }}>
      {createElement(activePage.component, activePage.props)}
    </AppRouteContext.Provider>
  );
};

const hydrate = async () => {
  let activeRoute = routes.find(
    (route) => route.path === window.location.pathname
  );

  let { default: component } = await activeRoute.getComponent();

  ReactDOM.hydrate(
    <App
      page={{
        props: (window as any)._APP_ROUTE_PROPS_,
        path: window.location.pathname,
        component,
      }}
    />,
    document.getElementById("app")
  );
};

//@ts-ignore
if (!import.meta.env.SSR) hydrate();
