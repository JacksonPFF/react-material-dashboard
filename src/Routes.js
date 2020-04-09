import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { ProtectedRouteWithLayout, RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  SignIn as SignInView,
  NotFound as NotFoundView,
  OtaInfoList as OtaInfoListView,
  RegisteredGitasList as RegisteredGitasListView,
  HomePage as HomePageView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <ProtectedRouteWithLayout
        component={HomePageView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <ProtectedRouteWithLayout
        component={RegisteredGitasListView}
        exact
        layout={MainLayout}
        path="/registered-gitas"
      />      
      <ProtectedRouteWithLayout
        component={OtaInfoListView}
        exact
        layout={MainLayout}
        path="/ota-info"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
