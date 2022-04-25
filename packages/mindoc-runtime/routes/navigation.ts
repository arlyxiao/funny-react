import { RequestHandler } from "express-serve-static-core";
import { ViteDevServer } from "vite";
import { loadRouteData, PREFIX_LINK } from "mindoc-runtime/routeData";

type Props = {
  vite: ViteDevServer;
  entryPath: string;
};

export const handleNavigationRequest =
  ({ vite, entryPath }: Props): RequestHandler =>
  async (req, res) => {
    const re = new RegExp(PREFIX_LINK, "g");
    const url = req.originalUrl.replace(re, "");

    let { props } = await loadRouteData({
      url,
      vite,
      entryPath,
    });

    res.send(props);
  };
