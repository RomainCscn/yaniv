import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import useAckee from 'use-ackee';

import { SUITS, VALUES } from './constants';
import Lobby from './components/Lobby';
import { getCardImagePath } from './core/utils';

const App = () => {
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

    images.push(getCardImagePath({ suit: 'joker', value: 98 }));
    images.push(getCardImagePath({ suit: 'joker', value: 99 }));
    images.push(`${process.env.PUBLIC_URL}back.svg`);

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
