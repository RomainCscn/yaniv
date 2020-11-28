import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 1em;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  margin-left: 1.5em;

  &:first-child {
    margin-left: 0;
  }

  a {
    color: #075985;
  }
`;

const Language = styled.span`
  margin-left: 1.5em;
  cursor: pointer;
  color: #075985;
  text-decoration: underline;
`;

const Footer = () => {
  const { t, i18n } = useTranslation('lobby');

  return (
    <Container>
      <Text>
        {t('footer.creator')} <a href='https://romaincascino.com'>Romain Cascino</a>
      </Text>
      <Text>
        {t('footer.code')} <a href='https://github.com/RomainCscn/yaniv'>GitHub</a>
      </Text>
      <Language onClick={() => i18n.changeLanguage('en')}>English</Language>
      <Language onClick={() => i18n.changeLanguage('fr')}>Français</Language>
    </Container>
  );
};

export default Footer;
