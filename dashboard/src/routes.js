import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AddMedia = React.lazy(() => import('./views/media/AddMedia'));
const AllMedia = React.lazy(() => import('./views/media/AllMedia'));
const Category = React.lazy(() => import('./views/category/Category'));
const AddCategory = React.lazy(() => import('./views/category/AddCategory'));
const Customer = React.lazy(() => import('./views/customer/Customer'));
const User = React.lazy(() => import('./views/user/User'));

const routes = [
  { path: '/', exact: true, name: 'صفحه اصلی' },
  { path: '/dashboard', name: 'داشبورد', component: Dashboard },
  { path: '/media/add', name: 'افزودن', component: AddMedia },
  { path: '/media/all', name: 'کتابخانه', component: AllMedia },
  { path: '/category', name: 'دسته بندی', component: Category, exact: true },
  { path: '/category/add', name: 'افزودن دسته بندی', component: AddCategory },
  { path: '/customer', name: 'مشتریان', component: Customer, exact: true },
  { path: '/user', name: 'کاربران', component: User, exact: true },
];

export default routes;
