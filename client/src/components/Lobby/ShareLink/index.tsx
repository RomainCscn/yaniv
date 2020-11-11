import React from 'react';

import styles from '../styles.module.css';

const ShareLink = () => (
  <div>
    <p className={styles.linkText}>Partagez ce lien à vos amis pour qu'ils vous rejoignent</p>
    <p className={styles.link}>
      <a href={window.location.href}>{window.location.host + window.location.pathname}</a>
    </p>
  </div>
);

export default ShareLink;
