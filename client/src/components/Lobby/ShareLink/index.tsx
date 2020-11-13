import React from 'react';

import styles from './styles.module.css';

const ShareLink = () => {
  const copyLink = () => {
    const textField = document.createElement('textarea');
    textField.innerText = window.location.href;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  return (
    <div>
      <p className={styles.linkText}>Partagez ce lien à vos amis pour qu'ils vous rejoignent</p>
      <div className={styles.linkContainer}>
        <a className={styles.link} href={window.location.href}>
          {window.location.host + window.location.pathname}
        </a>
        <button className={styles.copyButton} onClick={() => copyLink()}>
          Copier
        </button>
      </div>
    </div>
  );
};

export default ShareLink;
