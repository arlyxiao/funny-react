import { RequestHandler } from "express-serve-static-core";
import { ViteDevServer } from "vite";
import { handleRouteData } from "./handleRouteData";

type Props = {
  vite: ViteDevServer;
};

export const fetchComponentProps =
  ({ vite }: Props): RequestHandler =>
  async (req, res) => {
    const url = req.originalUrl.replace("/data/", "");

    let { props } = await handleRouteData({
      url,
      vite,
    });

    res.send(props);
  };
