type SingleRoute = {
  path: string;
  exact?: boolean;
  getComponent: () => any;
};

export const routes: SingleRoute[] = [
  {
    path: "/",
    exact: true,
    getComponent: () => import("../pages/index"),
  },
  {
    path: "/test",
    getComponent: () => import("../pages/test"),
  },
];
