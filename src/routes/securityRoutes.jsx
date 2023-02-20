import withErrorBoundary from "components/HOCs/withErrorBoundary";
import { RouteBase } from "constants/routeUrl";
import Dashboard from "views/Dashboard/index";
import Universities from "../views/Universities";
// import Dashboard from 'views/Index';
// const HomePage = lazy(() => import('views/Home'));
// const Dashboard = lazy(() => import('views/Dashboard'));
// const Page404 = lazy(() => import('views/Page404'));

const securityRoutes = [
  // List Security URL
  {
    path: RouteBase.Dashboard,
    name: "menu:sidebar.dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: withErrorBoundary(Dashboard),
    layout: "/admin",
    showInMenu: true,
  },
  {
    path: RouteBase.Users,
    name: "menu:sidebar.users",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
    showInMenu: true,
  },
  {
    path: RouteBase.HighSchools,
    name: "Trung học phổ thông",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
    showInMenu: true,
  },
  {
    path: "university",
    name: "Đại học",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
    showInMenu: true,
    children: [
      {
        path: RouteBase.Universities,
        name: "Danh sách trường",
        icon: "ni ni-tv-2 text-primary",
        component: withErrorBoundary(Universities),
        layout: "/admin",
        showInMenu: true,
      },
    ],
  },
];

export default securityRoutes;
