import React from 'react';
import { Route } from 'react-router';

import { generateRoute } from 'utils/localized-routes';
import { isConnected } from 'utils/routes-hooks';
/* eslint no-unused-vars: 0 */
export default function (flux) { /* eslint react/display-name: 0 */
  return (
    <Route component={ require('./components/app') }>
      { generateRoute({
        paths: [ '/' ],
        component: require('./components/menulink'),
        onEnter: isConnected(flux)
      }) }
      { generateRoute({
        paths: [ '/fantasydiary/:nodeid' ],
        component: require('./components/diary'),
        onEnter: isConnected(flux)
      }) }
      { generateRoute({
        paths: [ '/login' ],
        component: require('./components/login')
      }) }
      <Route path='*' component={ require('./pages/not-found') } />
    </Route>
  );
}
