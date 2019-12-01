import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInboxOutlined';
import InputIcon from '@material-ui/icons/Input';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import style from './AdminLayout.module.scss';
import {
  getLink,
  LOGIN_PAGE,
  SETTINGS_PAGE,
  SETTINGS_PAGE_GENERAL,
  SETTINGS_PAGE_SESSION,
} from 'config/routes';
import SidebarNav from './components/SidebarNav/SidebarNav';

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
        href: '/users',
        icon: <PeopleIcon />,
      },
      {
        title: 'Products',
        href: '/products',
        icon: <ShoppingBasketIcon />,
      },
      {
        title: 'Authentication',
        href: '/sign-in',
        icon: <LockOpenIcon />,
      },
      {
        title: 'Typography',
        href: '/typography',
        icon: <TextFieldsIcon />,
      },
      {
        title: 'Icons',
        href: '/icons',
        icon: <ImageIcon />,
      },
      {
        title: 'Account',
        href: '/account',
        icon: <AccountBoxIcon />,
      },
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
            title: 'Test',
            href: '/settings/website',
          },
        ],
      },
    ];
    const { open } = this.state;
    return (
      <>
        <AppBar
          position="fixed"
          className={clsx(style.appBar, {
            [style.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
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
                  Mini variant drawer
                </Typography>
              </Box>
              <Box>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <IconButton
                  to={getLink(LOGIN_PAGE)}
                  component={RouterLink}
                  color="inherit"
                >
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
            paper: clsx({
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
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
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
