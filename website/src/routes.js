import React from 'react';

const Home = React.lazy(() => import('./views/home/Home'));

const routes = [
    { path: '/', exact: true, name: 'صفحه اصلی' },
    { path: '/home', name: 'داشبورد', component: Home },
];

export default routes;
