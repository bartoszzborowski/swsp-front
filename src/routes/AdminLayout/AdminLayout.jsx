import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InputIcon from '@material-ui/icons/Input';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import style from './AdminLayout.module.scss';
import {
  CLASSES_LIST_PAGE,
  CLASSES_PAGE,
  CLASSES_SECTION_LIST_PAGE,
  getLink,
  LOGIN_PAGE,
  SETTINGS_PAGE,
  SETTINGS_PAGE_GENERAL,
  SETTINGS_PAGE_MAIL,
  SETTINGS_PAGE_PAYMENT,
  SETTINGS_PAGE_SESSION,
  STUDENT_ATTENDANCE,
  STUDENT_INFO_LIST_PAGE,
  STUDENT_INFO_PAGE,
  SUBJECT_LIST_PAGE,
  USER_INFO_CREATE_PAGE,
  USER_INFO_LIST_PAGE,
  USERS_PAGE,
} from 'config/routes';
import SidebarNav from './components/SidebarNav/SidebarNav';
import Notifier from 'helpers/notifier';

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };

    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  render() {
    const pages = [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'Users',
        href: getLink(USERS_PAGE),
        icon: <PeopleIcon />,
        nested: [
          {
            title: 'User List',
            href: getLink(USER_INFO_LIST_PAGE),
          },
          {
            title: 'User Create',
            href: getLink(USER_INFO_CREATE_PAGE),
          },
        ],
      },
      {
        title: 'Student info',
        href: getLink(STUDENT_INFO_PAGE),
        icon: <PeopleIcon />,
        nested: [
          {
            title: 'Student list',
            href: getLink(STUDENT_INFO_LIST_PAGE),
          },
          {
            title: 'Dziennik obecności',
            href: getLink(STUDENT_ATTENDANCE),
          },
        ],
      },
      {
        title: 'Akademia',
        href: getLink(CLASSES_PAGE),
        icon: <PeopleIcon />,
        nested: [
          {
            title: 'Klasy',
            href: getLink(CLASSES_LIST_PAGE),
          },
          {
            title: 'Sekcje',
            href: getLink(CLASSES_SECTION_LIST_PAGE),
          },
          {
            title: 'Przedmioty szkolne',
            href: getLink(SUBJECT_LIST_PAGE),
          },
        ],
      },
      // {
      //   title: 'Products',
      //   href: '/products',
      //   icon: <ShoppingBasketIcon />,
      // },
      // {
      //   title: 'Authentication',
      //   href: '/sign-in',
      //   icon: <LockOpenIcon />,
      // },
      // {
      //   title: 'Typography',
      //   href: '/typography',
      //   icon: <TextFieldsIcon />,
      // },
      // {
      //   title: 'Icons',
      //   href: '/icons',
      //   icon: <ImageIcon />,
      // },
      // {
      //   title: 'Account',
      //   href: '/account',
      //   icon: <AccountBoxIcon />,
      // },
      {
        title: 'Settings',
        href: getLink(SETTINGS_PAGE),
        icon: <SettingsIcon />,
        nested: [
          {
            title: 'General Settings',
            href: getLink(SETTINGS_PAGE_GENERAL),
          },
          {
            title: 'Session',
            href: getLink(SETTINGS_PAGE_SESSION),
          },
          {
            title: 'Email Settings',
            href: getLink(SETTINGS_PAGE_MAIL),
          },
          {
            title: 'Payment Settings',
            href: getLink(SETTINGS_PAGE_PAYMENT),
          },
        ],
      },
    ];
    const { open } = this.state;
    return (
      <>
        <Notifier />
        <AppBar
          position="fixed"
          className={clsx(style.appBar, {
            [style.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(style.menuButton, {
                [style.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Box
              justifyContent="center"
              alignItems="center"
              display="flex"
              style={{ width: '100%' }}
            >
              <Box flexGrow={1}>
                <Typography variant="h6" noWrap>
                  Swsp
                </Typography>
              </Box>
              <Box>
                <IconButton aria-label="show 4 new mails">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="primary">
                  <AccountCircle />
                </IconButton>
                <IconButton to={getLink(LOGIN_PAGE)} component={RouterLink}>
                  <InputIcon />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(style.drawer, {
            [style.drawerOpen]: open,
            [style.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(style.drawer, {
              [style.drawerOpen]: open,
              [style.drawerClose]: !open,
            }),
          }}
          open={open}
        >
          <div className={style.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <SidebarNav pages={pages} />
          {/*<Divider />*/}
          {/*<List>*/}
          {/*  {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
          {/*    <ListItem button key={text}>*/}
          {/*      <ListItemIcon>*/}
          {/*        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
          {/*      </ListItemIcon>*/}
          {/*      <ListItemText primary={text} />*/}
          {/*    </ListItem>*/}
          {/*  ))}*/}
          {/*</List>*/}
        </Drawer>
        <main
          className={clsx(style.content, {
            [style.appContentShift]: open,
          })}
        >
          <div className={style.toolbar} />
          {this.props.children}
        </main>
      </>
    );
  }
}

export { AdminLayout };
