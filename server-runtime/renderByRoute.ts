import { RequestHandler } from "express-serve-static-core";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ViteDevServer } from "vite";
import { handleRouteData } from "./handleRouteData";

type Props = {
  vite: ViteDevServer;
};

export const renderByRoute =
  ({ vite }: Props): RequestHandler =>
  async (req, res) => {
    const url = req.originalUrl;
    try {
      let { template, Page, App, props } = await handleRouteData({
        url,
        vite,
      });

      const appHtml = await ReactDOMServer.renderToString(
        React.createElement(App, {
          page: {
            props,
            path: req.originalUrl,
            component: Page,
          },
        })
      );

      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(
          "</head>",
          `<script type="text/javascript">window._APP_ROUTE_PROPS_ = ${JSON.stringify(
            props
          )}</script></head>`
        );

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      console.log(e)
      // If an error is caught, let vite fix the stracktrace so it maps back to
      // your actual source code.
      // vite.ssrFixStacktrace(e);
      // console.error(e);
      // res.status(500).end(e.message);
    }
  };
