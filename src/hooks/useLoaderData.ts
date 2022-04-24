import { createContext, useContext } from "react";
import { routes } from "../routes"
import { Page } from "../../server-runtime/handleRouteData"

const getServerData = async (to: string) => {
  let res = await fetch(`/data/${to}`);
  return await res.json();
  // return {
  //   message: 'test page'
  // }
};

type ContextType = {
  activePage: Page;
  setActivePage: (page: Page) => void;
};

export const AppRouteContext = createContext<ContextType>({} as any);

export const useLoaderData = () => {
  let { setActivePage } = useContext(AppRouteContext);

  return {
    navigate: async (to: string) => {
      let [props, { default: component }] = await Promise.all([
        getServerData(to),
        routes.find((route) => route.path === to).getComponent(),
      ]);

      setActivePage({ path: to, component, props });
      history.pushState(null, "", to);
    },
  };
};
