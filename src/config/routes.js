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
import { SectionList } from 'routes/AdminLayout/AcademicsPage/Section/SectionList';
import { SubjectList } from 'routes/AdminLayout/AcademicsPage/Subject/SubjectList';
import { ClassRoom } from 'routes/AdminLayout/AcademicsPage/ClassRoom/ClassRoom';
import { ClassRoutine } from 'routes/AdminLayout/AcademicsPage/ClassRoutine/ClassRoutine';
import { SettingSchoolChoice } from '../routes/AdminLayout/SettingsPage/SettingSchoolChoice/SettingSchoolChoice';
import { roles } from '../helpers/roles';
import { CertificatesList } from '../routes/AdminLayout/CertificatesPage/CertificatesList/CertificatesList';

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

export const SUBJECT_PAGE = 'subject_page';
export const SUBJECT_LIST_PAGE = 'subject_list_page';

export const CLASS_ROOM_PAGE = 'class_room_page';
export const CLASS_ROOM_LIST_PAGE = 'class_room_page';

export const CLASS_ROUTINE = 'class_routine';

export const SCHOOL_SELECT_PAGE = 'school_select_page';

export const CERTIFICATES_PAGE = 'certificates_page';
export const CERTIFICATES_LIST = 'certificates_list';

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

const certificateRouting = [
  {
    slug: CERTIFICATES_LIST,
    private: true,
    exect: false,
    path: '/certificates/list',
    component: CertificatesList,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
];

const academicRouting = [
  {
    slug: CLASSES_LIST_PAGE,
    private: true,
    exect: false,
    path: '/classes/list',
    component: ClassesList,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: CLASSES_SECTION_LIST_PAGE,
    private: true,
    exect: false,
    path: '/section/list',
    component: SectionList,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: SUBJECT_LIST_PAGE,
    private: true,
    exect: false,
    path: '/subject/list',
    component: SubjectList,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: CLASS_ROOM_LIST_PAGE,
    private: true,
    exect: false,
    path: '/class-room/list',
    component: ClassRoom,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: CLASS_ROUTINE,
    private: true,
    exect: false,
    path: '/class-routine',
    component: ClassRoutine,
    layout: AdminLayout,
    roles: [roles.admin.value, roles.student.value],
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
    roles: [roles.admin.value, roles.student.value],
  },
  {
    slug: LOGIN_PAGE,
    private: false,
    exact: false,
    path: '/login',
    component: LoginPage,
    layout: AuthLayout,
    roles: [roles.admin.value],
  },
  {
    slug: REGISTER_PAGE,
    private: false,
    exact: false,
    path: '/register',
    component: RegisterPage,
    layout: AuthLayout,
    roles: [roles.admin.value],
  },
  {
    slug: USERS_PAGE,
    private: true,
    exact: true,
    path: '/users',
    component: UsersPage,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: USER_INFO_LIST_PAGE,
    private: true,
    exact: false,
    path: '/users/list',
    component: UsersList,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: USER_INFO_CREATE_PAGE,
    private: true,
    exact: false,
    path: '/users/create',
    component: UserCreate,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: USER_INFO_EDIT_PAGE,
    private: true,
    exact: false,
    path: '/users/edit/:userId',
    component: UserEdit,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: STUDENT_INFO_DETAILS_PAGE,
    private: true,
    exact: false,
    path: '/student/details/:studentId',
    component: StudentDetails,
    layout: AdminLayout,
    roles: [roles.admin.value, roles.student.value],
  },
  {
    slug: STUDENT_INFO_LIST_PAGE,
    private: true,
    exact: false,
    path: '/students/list',
    component: StudentList,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: STUDENT_INFO_CREATE_PAGE,
    private: true,
    exact: false,
    path: '/students/create',
    component: StudentCreate,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: STUDENT_INFO_EDIT_PAGE,
    private: true,
    exact: false,
    path: '/students/edit/:studentId',
    component: StudentEdit,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: STUDENT_ATTENDANCE,
    private: true,
    exact: true,
    path: '/student-attendance',
    component: StudentAttendance,
    layout: AdminLayout,
    roles: [roles.admin.value, roles.student.value],
  },
  {
    slug: SETTINGS_PAGE,
    private: true,
    exact: true,
    path: '/settings',
    component: SettingsPage,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: SETTINGS_PAGE_GENERAL,
    private: true,
    exact: false,
    path: '/settings/general',
    component: SettingsGeneralPage,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: SETTINGS_PAGE_SESSION,
    private: true,
    exact: false,
    path: '/settings/session',
    component: SettingsSessionList,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: SETTINGS_PAGE_MAIL,
    private: true,
    exact: false,
    path: '/settings/mail',
    component: SettingsEmail,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: SETTINGS_PAGE_PAYMENT,
    private: true,
    exact: false,
    path: '/settings/payment',
    component: SettingPayment,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  {
    slug: SCHOOL_SELECT_PAGE,
    private: true,
    exact: false,
    path: '/school/select',
    component: SettingSchoolChoice,
    layout: AdminLayout,
    roles: [roles.admin.value],
  },
  ...academicRouting,
  ...certificateRouting,
];

console.log('DefaultRoutes', Routes);
