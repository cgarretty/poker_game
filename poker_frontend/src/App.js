import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DealHand from './DealHand';
import HandEval from './HandEval';

function App() {
  const [board, setBoard] = useState({hand: [], deck_id: null});
  const [hand, setHand] = useState({hand: [], deck_id: null});
  const [handEval, setHandEval] = useState(null);

  function handleDeal(numCards, name) {
    axios.post(
      'http://localhost:8000/api/player/deal_hand',
      {
        n_cards: numCards,
      }
    )
      .then(response => {
        if (name === 'Board') {
          setBoard(response.data);
        } else if (name === 'Hand') {
          setHand(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
      axios.post(
          'http://localhost:8000/api/player/evaluate_hand',
          {
            hand: [...board.hand, ...hand.hand]
          }
        )
        .then(response => {
          console.log(response.data)
          setHandEval(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  }, [hand, board]);

  return (
    <div>
      <DealHand getHand={handleDeal} hand={board} n={3} name='Board' />
      <DealHand getHand={handleDeal} hand={hand} n={2} name='Hand' />
      <HandEval handEval={handEval} />
    </div>
  );
}

export default App;
