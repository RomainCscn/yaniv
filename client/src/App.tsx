import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { SUITS, VALUES } from './constants';
import Lobby from './components/Lobby';
import { getCardImagePath } from './core/utils';

const App = () => {
  const cacheImages = async (imageArray: string[]) => {
    const promises = await imageArray.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => reject();
      });
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    const images: string[] = [];

    SUITS.forEach((suit) => {
      VALUES.forEach((value) => {
        images.push(getCardImagePath({ suit, value }));
      });
    });

    cacheImages(images);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path='/:roomId?'>
          <Lobby />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
