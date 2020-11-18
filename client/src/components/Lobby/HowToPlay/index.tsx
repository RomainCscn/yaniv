import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 600px;
  padding: 6px 16px;
  margin: 18px;
  font-family: 'Roboto';

  li {
    margin-bottom: 12px;
  }
`;

const Title = styled.h2`
  font-family: 'Simplicity';
  font-size: 48px;
  margin: 12px 0;
  color: #4a5568;
`;

const Link = styled.a`
  text-align: center;
  font-weight: bold;
  color: #2b6cb0;
`;

const HowToPlay = () => (
  <Container>
    <Title>Comment jouer</Title>
    <div>
      <ul>
        <li>
          Cliquez sur une ou plusieurs cartes de votre main pour la/les sélectionner (voir{' '}
          <Link href='https://fr.wikipedia.org/wiki/Yaniv_(jeu_de_cartes)#Remplacement_de_cartes'>
            ici
          </Link>{' '}
          pour les combinaisons possibles)
        </li>
        <li>Cliquez sur la pioche ou sur une carte de la défausse pour la piocher</li>
        <li>
          Double-cliquez sur une de vos cartes pour la jouer rapidement (ceci n'est pas considéré
          comme un tour de jeu). Deux cas possibles :
        </li>
        <ul>
          <li>
            Vous venez de piocher une carte de même valeur que celle que vous venez de défausser et
            le joueur suivant n'a pas joué
          </li>
          <li>
            Quelqu'un a posé une paire / un brelan et vous avez une carte de même valeur et le
            joueur suivant n'a pas joué
          </li>
        </ul>
        <li>
          Si vous avez <b>7 ou moins</b> dans votre main, appuyez sur le bouton Yaniv pour terminer
          la manche
          <ul>
            <li>
              Vous gagnez si aucun autre joueur n'a un score inférieur ou égal au vôtre et marquez{' '}
              <b>0 point</b>.
            </li>
            <li>
              Vous perdez si au moins un autre joueur a un score inférieur ou égal au vôtre et vous
              marquez <b>30 points + la valeur de votre main</b>.
            </li>
          </ul>
        </li>
        <li>Les valeurs des cartes sont :</li>
        <ul>
          <li>
            Les As valent <b>1</b>
          </li>
          <li>
            Les nombres du <b>2 au 10</b> valent leur valeur.
          </li>
          <li>
            Les figures valent <b>10</b>.
          </li>
          <li>
            Les Jokers valent <b>0</b>.
          </li>
        </ul>
        <li>
          La partie se termine lorsqu'un joueur atteint <b>200 points</b>. Le <b>gagnant</b> est le
          joueur avec le moins de points.
        </li>
      </ul>
    </div>
    <p>
      La variante du Yaniv utilisée ici se base sur <b>7 cartes</b> et un total de
      <b> 7 ou moins</b> pour annoncer <b>Yaniv</b>. Le score maximal est de <b>200 points</b>.
    </p>
    <p>
      <Link href='https://fr.wikipedia.org/wiki/Yaniv_(jeu_de_cartes)'>
        En savoir plus sur le Yaniv et ses règles
      </Link>
    </p>
  </Container>
);

export default HowToPlay;
