import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AddMedia = React.lazy(() => import('./views/media/AddMedia'));

const routes = [
  { path: '/', exact: true, name: 'صفحه اصلی' },
  { path: '/dashboard', name: 'داشبورد', component: Dashboard },
  { path: '/media/add', name: 'افزودن پرونده چندرسانه ای', component: AddMedia }
];

export default routes;
