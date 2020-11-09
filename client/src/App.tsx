import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import WaitingRoom from './components/WaitingRoom';

const App = () => (
  <Router>
    <Switch>
      <Route path='/:roomId?'>
        <WaitingRoom />
      </Route>
    </Switch>
  </Router>
);

export default App;
