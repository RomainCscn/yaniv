const BACK = process.env.PUBLIC_URL + 'back.svg';

const getCardImagePath = (card) =>
  `${process.env.PUBLIC_URL}cards/${card.suit.toUpperCase()}-${card.value}.svg`;

const Card = ({
  canPick,
  card,
  dropCard,
  isActive,
  isPrevious,
  pickCard,
  isStack,
}) => {
  const onCardClick = () => {
    if (canPick && !isActive) {
      if (isStack) {
        pickCard();
      } else if (isPrevious) {
        pickCard(card);
      }
    } else if (!canPick && dropCard) {
      dropCard(card);
    }
  };

  return (
    <img
      style={{
        border: `1px solid ${isStack ? 'transparent' : 'black'}`,
        margin: '6px',
        borderRadius: '8px',
        cursor:
          (canPick && !isActive && 'pointer') ||
          (!canPick && dropCard && 'pointer'),
      }}
      width='150'
      height='208'
      alt=''
      onClick={onCardClick}
      src={isStack ? BACK : getCardImagePath(card)}
    />
  );
};

export default Card;
