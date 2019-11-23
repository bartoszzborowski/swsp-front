import { LoginPage } from 'routes/AuthLayout/LoginEntryPage';
import { RegisterPage } from 'routes/AuthLayout/RegisterPage';
import { HomePage } from 'routes/AdminLayout/HomePage';
import { UsersPage } from 'routes/AdminLayout/UsersPage';
import { AdminLayout } from 'routes/AdminLayout';
import { AuthLayout } from 'routes/AuthLayout';
import head from 'lodash/head';
import React from 'react';

export const LOGIN_PAGE = 'login_page';
export const REGISTER_PAGE = 'register_page';
export const USERS_PAGE = 'users_page';
export const HOME_PAGE = 'home_page';

export const getLink = name => {
  const route = head(Routes.filter(x => x.slug === name));
  return route ? route.path : null;
};

export const Routes = [
  {
    slug: HOME_PAGE,
    private: true,
    exact: true,
    path: '/',
    component: HomePage,
    layout: AdminLayout,
  },
  {
    slug: LOGIN_PAGE,
    private: false,
    exact: false,
    path: '/login',
    component: LoginPage,
    layout: AuthLayout,
  },
  {
    slug: REGISTER_PAGE,
    private: false,
    exact: false,
    path: '/register',
    component: RegisterPage,
    layout: AuthLayout,
  },
  {
    slug: USERS_PAGE,
    private: true,
    exact: false,
    path: '/users',
    component: UsersPage,
    layout: AdminLayout,
  },
];

console.log('DefaultRoutes', Routes);
