import fs from "fs";
import path from "path";
import { ViteDevServer } from "vite";

export type PageContext = {
  path: string;
  props: any;
  component: any;
};

export const PREFIX_LINK = "__link__";

type Props = {
  url: string;
  vite: ViteDevServer;
  entryPath: string;
};

type PageLoaderResult = {
  template: string;
  Page: any;
  App: any;
  props: any;
};

interface ILoadModules {
  vite: ViteDevServer;
  entryPath: string;
  url: string;
}

function urlToFilePath(url: string) {
  let lastCharacter = url[url.length - 1];
  if (lastCharacter === "/") return `${url}index.tsx`;
  return `${url}.tsx`;
}

async function loadModules({ vite, entryPath, url }: ILoadModules) {
  const paths = entryPath.split("/");
  const basic = `/${paths[paths.length - 1]}`;

  const [{ default: Page, loader }, { App }] = await Promise.all([
    vite.ssrLoadModule(`${basic}/pages${urlToFilePath(url)}`),
    vite.ssrLoadModule(`${basic}/app.tsx`),
  ]);

  return {
    App,
    Page,
    loader,
  };
}

export const loadRouteData = async ({
  url,
  vite,
  entryPath,
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

  const { loader, Page, App } = await loadModules({
    entryPath,
    url,
    vite,
  });

  const props = loader ? await loader() : {};

  return { template, Page, props, App };
};
