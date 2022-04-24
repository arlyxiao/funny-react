import fs from "fs";
import path from "path";
import { ViteDevServer } from "vite";

export type Page = {
  path: string;
  props: any;
  component: any;
};

type Props = {
  url: string;
  vite: ViteDevServer;
};

type PageLoaderResult = {
  template: string;
  Page: any;
  App: any;
  props: any;
};

function urlToFilePath(url: string) {
  let lastCharacter = url[url.length - 1];
  if (lastCharacter === "/") return `${url}index.tsx`;
  return `${url}.tsx`;
}

export const handleRouteData = async ({
  url,
  vite,
}: Props): Promise<PageLoaderResult> => {
  // 1. Read index.html
  let template = fs.readFileSync(
    path.resolve(process.cwd(), "index.html"),
    "utf-8"
  );

  // 2. Apply vite HTML transforms. This injects the vite HMR client, and
  //    also applies HTML transforms from Vite plugins, e.g. global preambles
  //    from @vitejs/plugin-react-refresh
  template = await vite.transformIndexHtml(url, template);
  // 3. Load the server entry. vite.ssrLoadModule automatically transforms
  //    your ESM source code to be usable in Node.js! There is no bundling
  //    required, and provides efficient invalidation similar to HMR.

  const [{ default: Page, loader }, { App }] = await Promise.all([
    vite.ssrLoadModule(`/src/pages${urlToFilePath(url)}`),
    vite.ssrLoadModule(`/src/app.tsx`),
  ]);

  const props = loader ? await loader() : {};

  return { template, Page, props, App };
};
