import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './components/Routes';
import { SUITS, VALUES } from './constants';
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

    images.push(getCardImagePath({ suit: 'joker', value: 98 }));
    images.push(getCardImagePath({ suit: 'joker', value: 99 }));
    images.push(`${process.env.PUBLIC_URL}back.svg`);

    cacheImages(images);
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
