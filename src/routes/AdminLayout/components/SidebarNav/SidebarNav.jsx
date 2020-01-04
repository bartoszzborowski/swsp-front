import React from 'react';
import { NavLink as RouterLink, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { List, ListItem, Button } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import style from './SidebarNav.module.scss';
import SidebarNavNested from './SidebarNavNested';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  const { path } = useRouteMatch();

  const theme = createMuiTheme({
    overrides: {
      MuiSvgIcon: {
        root: {
          width: '1rem',
          height: '1rem',
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <List {...rest} className={className}>
        {pages.map(page =>
          page.nested ? (
            <SidebarNavNested
              key={`nested-sidebar-${page.title}`}
              nestedPage={page}
            />
          ) : (
            <ListItem
              selected={page.href === path}
              className={style.item}
              disableGutters
              key={page.title}
            >
              <Button
                className={style.button}
                activeClassName={style.active}
                component={RouterLink}
                to={page.href}
              >
                <ListItemIcon className={style.listItemIcon}>
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  className={style.listItemText}
                  primary={page.title}
                />
              </Button>
            </ListItem>
          )
        )}
      </List>
    </ThemeProvider>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
};

export default SidebarNav;
