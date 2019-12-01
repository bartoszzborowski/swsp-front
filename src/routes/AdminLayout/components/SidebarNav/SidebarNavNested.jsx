import React from 'react';
import { NavLink as RouterLink, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, ListItem, Button } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import style from './SidebarNav.module.scss';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const SidebarNavNested = props => {
  const { nestedPage } = props;
  const { path } = useRouteMatch();
  const { nested = [] } = nestedPage;
  const isActiveRoute = nested.find(page => page.href === path) || false;
  const [open, setOpen] = React.useState(!!isActiveRoute);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        className={style.item}
        onClick={handleClick}
        disableGutters
        key={nestedPage.title}
      >
        <Button className={style.button}>
          <ListItemIcon className={style.listItemIcon}>
            {nestedPage.icon}
          </ListItemIcon>
          <ListItemText
            className={style.listItemText}
            primary={nestedPage.title}
          />
          {open ? <ExpandLess /> : <ExpandMore />}
        </Button>
      </ListItem>
      <Collapse in={open} component="li" timeout="auto" unmountOnExit>
        <List disablePadding>
          {nested.map(page => (
            <ListItem
              className={style.item}
              selected={page.href === path}
              disableGutters
              key={page.title}
            >
              <Button
                className={clsx(style.button, style.nested)}
                activeClassName={clsx({ [style.active]: page.href === path })}
                component={RouterLink}
                to={page.href}
              >
                <ListItemText
                  className={style.listItemText}
                  primary={page.title}
                />
              </Button>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

SidebarNavNested.propTypes = {
  nestedPage: PropTypes.object.isRequired,
};

export default SidebarNavNested;
