import React from 'react';

function Hand({ hand }) {

  var cards;
  if (hand !== undefined) {
    cards = hand.hand
  }

  return (
    <div>
      {cards && cards.length > 0 && (
        <div>
          {cards.map((card, index) => (
            <p key={index}>{card.rank} of {card.suit}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hand;
