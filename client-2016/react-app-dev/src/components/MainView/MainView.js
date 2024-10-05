import React from 'react';
import { Routes, Switch } from 'react-router-dom';
import {PropsRoute, AuthRoute} from '@lib/CustomRoutes';

export default (props) => (
  <div style={{height: '100%'}}>
    <div style={{height: '100%'}}>
      <Switch>
        {props.routes.map(route => {
          const otherProps = route.props || {};
          const routeProps = {
            key: route.path,
            exact: route.exact ? true : false,
            path: route.path,
            component: route.view,
            ...otherProps
          };
          if(route.authRequired)
            return <AuthRoute {...routeProps}/>;
          else
            return <PropsRoute {...routeProps}/>;
        })}
      </Switch>
    </div>
  </div>
);
