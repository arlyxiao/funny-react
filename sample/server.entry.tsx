import React from "react";
import ReactDOMServer from "react-dom/server";
import { createServer, AppContext } from "mindoc-runtime/server";
import { PageContext } from "mindoc-runtime/routeData";
import { App } from "@sample/app";

// createServer({
//   entryPath: __dirname,
// });

interface Props {
  page: PageContext;
}

export const handleServerRender = ({ page }: Props) => {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <App page={page} />
    </React.StrictMode>
  );
};
