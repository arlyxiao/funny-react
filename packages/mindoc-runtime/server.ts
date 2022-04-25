import express from "express";
import { createServer as createViteServer } from "vite";
import { handleNavigationRequest, handleRefreshRequest } from "./routes";
import { PREFIX_LINK } from "./routeData";

export interface CreateServerContext {
  entryPath: string;
  defaultPort?: string;
}

export async function createServer({
  entryPath,
  defaultPort,
}: CreateServerContext) {
  const app = express();
  const port = defaultPort ? defaultPort : 3344;

  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });

  app.use(vite.middlewares);

  app.use(`/${PREFIX_LINK}/*`, handleNavigationRequest({ vite, entryPath }));
  app.use("*", handleRefreshRequest({ vite, entryPath }));

  app.listen(port, () => console.log(`listening on :${port}`));
}
