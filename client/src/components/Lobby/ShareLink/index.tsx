import React from 'react';

import { CopyButton, Link, LinkContainer, LinkText } from './styles';

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
      <LinkText>Partagez ce lien à vos amis pour qu'ils vous rejoignent</LinkText>
      <LinkContainer>
        <Link href={window.location.href}>{window.location.host + window.location.pathname}</Link>
        <CopyButton onClick={() => copyLink()}>Copier</CopyButton>
      </LinkContainer>
    </div>
  );
};

export default ShareLink;
