import React from 'react';

function HandEval({ handEval }) {
  return (
    <div>
      {handEval &&
        <div>
          <p>{handEval.ranking}, with {handEval.high_card.rank} of {handEval.high_card.suit} high.</p>
        </div>
      }
    </div>
  );
}

export default HandEval;
