import React from 'react';

function Hand({ hand }) {
  return (
    <div>
      {hand &&
        <div>
          <p>{hand.hand[0].rank} of {hand.hand[0].suit}</p>
          <p>{hand.hand[1].rank} of {hand.hand[1].suit}</p>
        </div>
      }
    </div>
  );
}

export default Hand;
