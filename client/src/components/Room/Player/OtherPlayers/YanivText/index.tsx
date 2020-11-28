import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const Text = styled(animated.div)`
  position: absolute;
  bottom: -1.2em;
  font-size: 2.5rem;
  font-weight: bold;
  color: #fbbf24;
  text-shadow: 2px 2px 1px #92400e;
`;

const YanivText = () => {
  const { t } = useTranslation('room');
  const { x } = useSpring({ from: { x: 0 }, x: 1 });

  return (
    <Text
      style={{
        opacity: x.to({ range: [0, 1], output: [0, 1] }) as any,
        transform: x
          .to({
            range: [0, 0.2, 0.5, 1],
            output: [1, 0.7, 1.5, 1],
          })
          .to((x: number) => `scale(${x}) rotate(4deg)`),
      }}
    >
      {t('end.called')}
    </Text>
  );
};

export default YanivText;
