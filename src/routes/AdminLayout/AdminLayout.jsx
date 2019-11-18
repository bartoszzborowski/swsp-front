import React from 'react';
import { history } from '../../helpers';
import { Redirect, Route, Router, Switch } from 'react-router';
import { PrivateRoute } from '../../components/PrivateRoute';
import { HomePage } from '../HomePage';
import { UsersPage } from '../UsersPage';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import style from './AdminLayout.module.scss';

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
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
            <Typography variant="h6" noWrap>
              Mini variant drawer
            </Typography>
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
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
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

  // render() {
  //   return (
  //     <>
  //       <AppBar position="static">
  //         <Toolbar>
  //           <IconButton edge="start" color="inherit" aria-label="menu">
  //             <MenuIcon />
  //           </IconButton>
  //           <Typography variant="h6">News</Typography>
  //           <Link to="/users">Users</Link>
  //         </Toolbar>
  //       </AppBar>
  //       <Router history={history}>
  //         <Switch>
  //           <PrivateRoute path="/home" component={HomePage} />
  //           <PrivateRoute path="/users" component={UsersPage} />
  //         </Switch>
  //       </Router>
  //     </>
  //   );
  // }
}

export { AdminLayout };
