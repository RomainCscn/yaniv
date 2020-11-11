import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Lobby from './components/Lobby';

const App = () => (
  <Router>
    <Switch>
      <Route path='/:roomId?'>
        <Lobby />
      </Route>
    </Switch>
  </Router>
);

export default App;
