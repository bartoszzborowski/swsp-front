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
  CLASS_ROOM_LIST_PAGE,
  CLASS_ROUTINE,
  CLASSES_LIST_PAGE,
  CLASSES_PAGE,
  CLASSES_SECTION_LIST_PAGE,
  getLink,
  LOGIN_PAGE,
  SCHOOL_SELECT_PAGE,
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
import BottomNavigation from '@material-ui/core/BottomNavigation';
import TextFieldSelectCustom from './components/TextFieldSelectCustom/TextFieldSelectCustom';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
        title: 'Strona Główna',
        href: '/dashboard',
        icon: <DashboardIcon />,
      },
      {
        title: 'Użytkownicy',
        href: getLink(USERS_PAGE),
        icon: <PeopleIcon />,
        nested: [
          {
            title: 'List użytkowników',
            href: getLink(USER_INFO_LIST_PAGE),
          },
          {
            title: 'Dodaj użytkownika',
            href: getLink(USER_INFO_CREATE_PAGE),
          },
        ],
      },
      {
        title: 'Informacje o uczniach',
        href: getLink(STUDENT_INFO_PAGE),
        icon: <PeopleIcon />,
        nested: [
          {
            title: 'Lista uczniów',
            href: getLink(STUDENT_INFO_LIST_PAGE),
          },
          {
            title: 'Dziennik obecności',
            href: getLink(STUDENT_ATTENDANCE),
          },
        ],
      },
      {
        title: 'Zarządzaj szkoła',
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
          {
            title: 'Sale szkolne',
            href: getLink(CLASS_ROOM_LIST_PAGE),
          },
          {
            title: 'Plan zajęc',
            href: getLink(CLASS_ROUTINE),
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
        title: 'Ustawienia',
        href: getLink(SETTINGS_PAGE),
        icon: <SettingsIcon />,
        nested: [
          {
            title: 'Wybierz szkołę',
            href: getLink(SCHOOL_SELECT_PAGE),
          },
          {
            title: 'Ustawienia ogólne',
            href: getLink(SETTINGS_PAGE_GENERAL),
          },
          {
            title: 'Sesje szkolne',
            href: getLink(SETTINGS_PAGE_SESSION),
          },
          {
            title: 'Ustawienia Email',
            href: getLink(SETTINGS_PAGE_MAIL),
          },
          {
            title: 'Ustawienia płatności',
            href: getLink(SETTINGS_PAGE_PAYMENT),
          },
        ],
      },
    ];
    const maritalStatus = [
      {
        value: '1',
        label: 'Małżeństwo',
      },
      {
        value: '2',
        label: 'Wolny',
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
          {/*<div>*/}
          {/*  <TextField*/}
          {/*    id="standard-select-currency"*/}
          {/*    select*/}
          {/*    margin="normal"*/}
          {/*    variant="outlined"*/}
          {/*    size="small"*/}
          {/*    fullWidth*/}
          {/*    label="Wybierz szkołę"*/}
          {/*    value={'dupa'}*/}
          {/*    helperText="Please select your currency"*/}
          {/*  >*/}
          {/*    {maritalStatus.map(option => (*/}
          {/*      <MenuItem key={option.value} value={option.value}>*/}
          {/*        {option.label}*/}
          {/*      </MenuItem>*/}
          {/*    ))}*/}
          {/*  </TextField>*/}
          {/*</div>*/}
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
