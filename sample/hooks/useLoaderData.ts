import { createContext, useContext } from "react";
import { routes } from "@sample/routes";
import { RoutePage, PREFIX_LINK } from "mindoc-runtime/routeData";

const getServerData = async (to: string) => {
  let res = await fetch(`/${PREFIX_LINK}/${to}`);
  return await res.json();
  // return {
  //   message: 'test page'
  // }
};

type ContextType = {
  activePage: RoutePage;
  setActivePage: (page: RoutePage) => void;
};

export const AppRouteContext = createContext<ContextType>({} as any);

export const useLoaderData = () => {
  let { activePage, setActivePage } = useContext(AppRouteContext);

  return {
    props: activePage.props,
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
