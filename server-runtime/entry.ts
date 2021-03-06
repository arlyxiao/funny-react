import express from "express";
import { createServer as createViteServer } from "vite";
import { renderByRoute } from "./renderByRoute";
import { fetchComponentProps } from "./fetchComponentProps";

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);
  app.use("/data/*", fetchComponentProps({ vite }));

  app.use("*", renderByRoute({ vite }));

  app.listen(3000, () => console.log("listening on :3000"));
}

createServer();
