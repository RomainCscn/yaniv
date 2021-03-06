import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './components/Routes';
import { SUITS, VALUES } from './constants';
import { getCardImagePath } from './core/utils';
import { cacheImages } from './utils';

const App = () => {
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
      <Suspense fallback=''>
        <Routes />
      </Suspense>
    </Router>
  );
};

export default App;
