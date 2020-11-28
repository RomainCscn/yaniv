import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
  padding: 0.5em 1em;
  margin: 0.8em;
  font-family: 'Roboto';

  li {
    margin-bottom: 0.8em;
  }
`;

const Title = styled.h2`
  font-family: 'Simplicity';
  font-size: 3rem;
  margin: 0.5em 0;
  color: #4a5568;
`;

const Link = styled.a`
  text-align: center;
  font-weight: bold;
  color: #2b6cb0;
`;

const HowToPlay = () => {
  const { t } = useTranslation('how-to-play');

  return (
    <Container>
      <Title>{t('title')}</Title>
      <div>
        <ul>
          <li>
            {t('selectCard.part1')}
            <Link target='_blank' rel='noopener noreferrer' href={t('selectCard.link')}>
              {t('selectCard.here')}
            </Link>{' '}
            {t('selectCard.part2')}
          </li>
          <li>{t('deck')}</li>
          <li>{t('quickPlay.summary')}</li>
          <ul>
            <li>{t('quickPlay.case1')}</li>
            <li>{t('quickPlay.case2')}</li>
          </ul>
          <li>
            <Trans ns='how-to-play' i18nKey='yaniv.summary'>
              Si vous avez <strong>7 ou moins</strong> dans votre main, appuyez sur le bouton Yaniv
              pour terminer la manche
            </Trans>
          </li>
          <ul>
            <li>
              <Trans ns='how-to-play' i18nKey='yaniv.winner'>
                Si vous avez <strong>7 ou moins</strong> dans votre main, appuyez sur le bouton
                Yaniv pour terminer la manche
              </Trans>
            </li>
            <li>
              <Trans ns='how-to-play' i18nKey='yaniv.loser'>
                Si vous avez <strong>7 ou moins</strong> dans votre main, appuyez sur le bouton
                Yaniv pour terminer la manche
              </Trans>
            </li>
          </ul>
          <li>{t('cards.summary')}</li>
          <ul>
            <li>
              <Trans ns='how-to-play' i18nKey='cards.aces'>
                Les As valent <strong>1</strong>
              </Trans>
            </li>
            <li>
              <Trans ns='how-to-play' i18nKey='cards.numbers'>
                Les nombres du <strong>2 au 10</strong> valent leur valeur
              </Trans>
            </li>
            <li>
              <Trans ns='how-to-play' i18nKey='cards.faces'>
                Les figures valent <strong>10</strong>
              </Trans>
            </li>
            <li>
              <Trans ns='how-to-play' i18nKey='cards.joker'>
                Les Jokers valent <strong>0</strong>
              </Trans>
            </li>
          </ul>
          <li>
            <Trans ns='how-to-play' i18nKey='end'>
              La partie se termine lorsqu'un joueur atteint <strong>200 points</strong>. Le gagnant
              est le joueur avec le moins de points.
            </Trans>
          </li>
        </ul>
      </div>
      <p>
        <Link target='_blank' rel='noopener noreferrer' href={t('link')}>
          {t('linkText')}
        </Link>
      </p>
    </Container>
  );
};

export default HowToPlay;
