import withErrorBoundary from "components/HOCs/withErrorBoundary";
import { RouteBase } from "constants/routeUrl";
import Dashboard from "views/Dashboard/index";
import TestDetails from "../views/Example/components/TestDetails";
import Universities from "../views/Universities";
import SubjectDetail from "../views/Universities/components/SubjectDetail";
import UniversityDetail from "../views/Universities/components/UniversityDetail";
import Users from "../views/Users";
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
    path: "users",
    name: "menu:sidebar.users",
    icon: "ni ni-tv-2 text-primary",
    layout: "/admin",
    showInMenu: true,
    children: [
      {
        path: RouteBase.Users,
        name: "Danh sách người dùng",
        icon: "ni ni-tv-2 text-primary",
        component: withErrorBoundary(Users),
        layout: "/admin",
        showInMenu: true,
      },
      {
        path: RouteBase.UniversityDetail,
        component: withErrorBoundary(UniversityDetail),
        layout: "/admin",
      },
      {
        path: RouteBase.SubjectDetail,
        component: withErrorBoundary(SubjectDetail),
        layout: "/admin",
      },
      {
        path: RouteBase.TestDetails,
        component: withErrorBoundary(TestDetails),
        layout: "/admin",
      },
    ],
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
