import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  layout: Layout,
  component: Component,
  roles,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = localStorage.getItem('user');
      const isSelectSchool = localStorage.getItem('schoolId');
      const isRedirect = localStorage.getItem('schoolRedirect');

      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }

      if (!isSelectSchool && !isRedirect) {
        localStorage.setItem('schoolRedirect', 'true');
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: '/school/select', state: { from: props.location } }}
          />
        );
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/' }} />;
      }

      // authorised so return component
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);
