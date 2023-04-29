import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DealHand from './DealHand';
import HandEval from './HandEval';

function App() {
  const [game, setGame] = useState(
    {
      deck_id: null,
      hand: [],
      board: []
    }
  );

  const [handEval, setHandEval] = useState(null);

  function newGame() {
    setGame(
      {
        deck_id: null,
        hand: [],
        board: []
      }
    );
  }

  function handleDeal(numCards, name) {
    axios.post(
      'http://localhost:8000/api/deck/deal_hand',
      {
        n_cards: numCards,
        deck_id: game.deck_id
      }
    )
      .then(response => {
        console.log(response.data)
        setGame(
          {
            deck_id: response.data.deck_id,
            board: ((name === 'Board') ? response.data.hand : game.board),
            hand: ((name === 'Hand') ? response.data.hand : game.hand)
          }
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios.post(
      'http://localhost:8000/api/player/evaluate_hand',
      {
        deck_id: game.deck_id,
        hand: [...game.board, ...game.hand]
      }
    )
      .then(response => {
        setHandEval(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [game]);

  return (
    <div>
      <DealHand getHand={newGame} name='New Game' />
      <DealHand getHand={handleDeal} hand={game.board} n={3} name='Board' />
      <DealHand getHand={handleDeal} hand={game.hand} n={2} name='Hand' />
      <HandEval handEval={handEval} />
    </div>
  );
}

export default App;
