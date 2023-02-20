import withErrorBoundary from 'components/HOCs/withErrorBoundary';
import { RouteBase } from 'constants/routeUrl';
import Dashboard from 'views/Dashboard/index';
// import Dashboard from 'views/Index';
// const HomePage = lazy(() => import('views/Home'));
// const Dashboard = lazy(() => import('views/Dashboard'));
// const Page404 = lazy(() => import('views/Page404'));

const securityRoutes = [
  // List Security URL
  {
    path: RouteBase.Dashboard,
    name: 'menu:sidebar.dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: withErrorBoundary(Dashboard),
    layout: '/admin',
    showInMenu: true,
  },
  {
    path: 'business',
    name: 'menu:sidebar.business',
    icon: 'ni ni-tv-2 text-primary',
    layout: '/admin',
    showInMenu: true,
  },
  {
    path: 'system',
    name: 'menu:sidebar.system',
    icon: 'ni ni-tv-2 text-primary',
    layout: '/admin',
    showInMenu: true,
  },
  {
    path: 'transaction',
    name: 'Transaction',
    icon: 'ni ni-tv-2 text-primary',
    // component: withErrorBoundary(TransactionList),
    layout: '/admin',
  },
];

export default securityRoutes;
