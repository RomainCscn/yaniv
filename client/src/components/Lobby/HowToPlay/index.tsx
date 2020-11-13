import React from 'react';

import styles from './styles.module.css';

const HowToPlay = () => {
  return (
    <div className={styles.container}>
      <h2>Comment jouer</h2>
      <p>
        <ul>
          <li>
            Cliquez sur une ou plusieurs cartes de votre main pour la/les sélectionner (voir{' '}
            <a
              className={styles.link}
              href='https://fr.wikipedia.org/wiki/Yaniv_(jeu_de_cartes)#Remplacement_de_cartes'
            >
              ici
            </a>{' '}
            pour les combinaisons possibles)
          </li>
          <li>Cliquez sur la pioche ou sur une carte de la défausse pour la piocher</li>
          <li>
            Double-cliquez sur une de vos cartes pour la jouer rapidement (ceci n'est pas considéré
            comme un tour de jeu). Deux cas possibles :
          </li>
          <ul>
            <li>
              Vous venez de piocher une carte de même valeur que celle que vous venez de défausser
              et le joueur suivant n'a pas joué
            </li>
            <li>
              Quelqu'un a posé une paire / un brelan et vous avez une carte de même valeur et le
              joueur suivant n'a pas joué
            </li>
          </ul>
          <li>
            Si vous avez <b>7 ou moins</b> dans votre main, appuyez sur le bouton Yaniv pour
            terminer la manche
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
        </ul>
      </p>
      <p>
        La variante du Yaniv utilisée ici se base sur <b>7 cartes</b> et un total de
        <b> 7 ou moins</b> pour annoncer <b>Yaniv</b>. Le score maximal est de <b>200 points</b>.
      </p>
      <p>
        <a className={styles.link} href='https://fr.wikipedia.org/wiki/Yaniv_(jeu_de_cartes)'>
          En savoir plus sur le Yaniv et ses règles
        </a>
      </p>
    </div>
  );
};

export default HowToPlay;
