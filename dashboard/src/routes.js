import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AddMedia = React.lazy(() => import('./views/media/AddMedia'));
const AllMedia = React.lazy(() => import('./views/media/AllMedia'));

const routes = [
  { path: '/', exact: true, name: 'صفحه اصلی' },
  { path: '/dashboard', name: 'داشبورد', component: Dashboard },
  { path: '/media/add', name: 'افزودن', component: AddMedia },
  { path: '/media/all', name: 'کتابخانه', component: AllMedia }
];

export default routes;
