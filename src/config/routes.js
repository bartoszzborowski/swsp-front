import head from 'lodash/head';
import { history } from 'helpers/history';

import { AdminLayout } from 'routes/AdminLayout';
import { AuthLayout } from 'routes/AuthLayout';
import { HomePage } from 'routes/AdminLayout/HomePage';
import { LoginPage } from 'routes/AuthLayout/LoginEntryPage';
import { RegisterPage } from 'routes/AuthLayout/RegisterPage';
import {
  SettingPayment,
  SettingsEmail,
  SettingsGeneralPage,
  SettingsPage,
  SettingsSessionList,
} from '/routes/AdminLayout/SettingsPage';
import {
  UserEdit,
  UsersPage,
  UsersList,
  UserCreate,
} from 'routes/AdminLayout/UsersPage';
import {
  StudentDetails,
  StudentEdit,
  StudentCreate,
  StudentList,
  StudentAttendance,
} from 'routes/AdminLayout/StudentInfoPage';

import { ClassesList } from 'routes/AdminLayout/AcademicsPage/Classes/ClassesList';
import { SectionList } from '../routes/AdminLayout/AcademicsPage/Section/SectionList';

export const LOGIN_PAGE = 'login_page';
export const REGISTER_PAGE = 'register_page';
export const HOME_PAGE = 'home_page';

export const SETTINGS_PAGE = 'settings_page';
export const SETTINGS_PAGE_GENERAL = 'settings_page_general';
export const SETTINGS_PAGE_SESSION = 'settings_page_session';
export const SETTINGS_PAGE_MAIL = 'settings_page_mail';
export const SETTINGS_PAGE_PAYMENT = 'settings_page_payment';

export const STUDENT_INFO_PAGE = 'student_info_page';
export const STUDENT_INFO_DETAILS_PAGE = 'student_info_details_page';
export const STUDENT_INFO_LIST_PAGE = 'student_info_list_page';
export const STUDENT_INFO_EDIT_PAGE = 'student_info_edit_page';
export const STUDENT_INFO_CREATE_PAGE = 'student_info_create_page';

export const STUDENT_ATTENDANCE = 'student_attendance';

export const USERS_PAGE = 'users_page';
export const USER_INFO_LIST_PAGE = 'user_info_list_page';
export const USER_INFO_CREATE_PAGE = 'user_info_create_page';
export const USER_INFO_EDIT_PAGE = 'user_info_edit_page';

export const CLASSES_PAGE = 'classes_page';
export const CLASSES_LIST_PAGE = 'classes_list_page';

export const CLASSES_SECTION_PAGE = 'classes_section_page';
export const CLASSES_SECTION_LIST_PAGE = 'classes_section_list_page';

export const getLink = name => {
  const route = head(Routes.filter(x => x.slug === name));
  return route ? route.path : null;
};

export const redirectTo = (name, parameters = []) => {
  const tempLink = getLink(name);
  let link = tempLink;
  parameters.map(param => {
    const paramKey = head(Object.keys(param));
    link = tempLink.replace(`:${paramKey}`, param[paramKey]);
  });

  if (link) {
    history.push(link);
  }
};

const academicRouting = [
  {
    slug: CLASSES_LIST_PAGE,
    private: true,
    exect: false,
    path: '/classes/list',
    component: ClassesList,
    layout: AdminLayout,
  },
  {
    slug: CLASSES_SECTION_LIST_PAGE,
    private: true,
    exect: false,
    path: '/section/list',
    component: SectionList,
    layout: AdminLayout,
  },
];

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
    exact: true,
    path: '/users',
    component: UsersPage,
    layout: AdminLayout,
  },
  {
    slug: USER_INFO_LIST_PAGE,
    private: true,
    exact: false,
    path: '/users/list',
    component: UsersList,
    layout: AdminLayout,
  },
  {
    slug: USER_INFO_CREATE_PAGE,
    private: true,
    exact: false,
    path: '/users/create',
    component: UserCreate,
    layout: AdminLayout,
  },
  {
    slug: USER_INFO_EDIT_PAGE,
    private: true,
    exact: false,
    path: '/users/edit/:userId',
    component: UserEdit,
    layout: AdminLayout,
  },
  {
    slug: STUDENT_INFO_DETAILS_PAGE,
    private: true,
    exact: false,
    path: '/student/details/:studentId',
    component: StudentDetails,
    layout: AdminLayout,
  },
  {
    slug: STUDENT_INFO_LIST_PAGE,
    private: true,
    exact: false,
    path: '/students/list',
    component: StudentList,
    layout: AdminLayout,
  },
  {
    slug: STUDENT_INFO_CREATE_PAGE,
    private: true,
    exact: false,
    path: '/students/create',
    component: StudentCreate,
    layout: AdminLayout,
  },
  {
    slug: STUDENT_INFO_EDIT_PAGE,
    private: true,
    exact: false,
    path: '/students/edit/:studentId',
    component: StudentEdit,
    layout: AdminLayout,
  },
  {
    slug: STUDENT_ATTENDANCE,
    private: true,
    exact: true,
    path: '/student-attendance',
    component: StudentAttendance,
    layout: AdminLayout,
  },
  {
    slug: SETTINGS_PAGE,
    private: true,
    exact: true,
    path: '/settings',
    component: SettingsPage,
    layout: AdminLayout,
  },
  {
    slug: SETTINGS_PAGE_GENERAL,
    private: true,
    exact: false,
    path: '/settings/general',
    component: SettingsGeneralPage,
    layout: AdminLayout,
  },
  {
    slug: SETTINGS_PAGE_SESSION,
    private: true,
    exact: false,
    path: '/settings/session',
    component: SettingsSessionList,
    layout: AdminLayout,
  },
  {
    slug: SETTINGS_PAGE_MAIL,
    private: true,
    exact: false,
    path: '/settings/mail',
    component: SettingsEmail,
    layout: AdminLayout,
  },
  {
    slug: SETTINGS_PAGE_PAYMENT,
    private: true,
    exact: false,
    path: '/settings/payment',
    component: SettingPayment,
    layout: AdminLayout,
  },
  ...academicRouting,
];

console.log('DefaultRoutes', Routes);
