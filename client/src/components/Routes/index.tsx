import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import useAckee from 'use-ackee';

import Lobby from '../Lobby';

const Routes = () => {
  const location = useLocation();

  useAckee(
    location.pathname,
    {
      server: 'https://gifinder-analytics.tk',
      domainId: '963ced5d-f56e-43eb-9fdb-7dc661aa1e2f',
    },
    {
      ignoreLocalhost: true,
      detailed: true,
    },
  );

  return (
    <Switch>
      <Route path='/:roomId?'>
        <Lobby />
      </Route>
    </Switch>
  );
};

export default Routes;
