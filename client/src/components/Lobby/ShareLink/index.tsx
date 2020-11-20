import React from 'react';
import { useTranslation } from 'react-i18next';

import { CopyButton, Link, LinkContainer, LinkText } from './styles';

const ShareLink = () => {
  const { t } = useTranslation();

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
      <LinkText>{t('lobby.share.text')}</LinkText>
      <LinkContainer>
        <Link href={window.location.href}>{window.location.host + window.location.pathname}</Link>
        <CopyButton onClick={() => copyLink()}>{t('lobby.share.copy')}</CopyButton>
      </LinkContainer>
    </div>
  );
};

export default ShareLink;
