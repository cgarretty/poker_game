import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DealHand from './DealHand';
import DealBoard from './DealBoard';
import HandEval from './HandEval';

function App() {

  const stages = [
    { stageName: 'flop', dealNumber: 3 },
    { stageName: 'turn', dealNumber: 1 },
    { stageName: 'river', dealNumber: 1 }
  ]

  const new_game = {
    deck_id: null,
    hand: [],
    board: {
      nextStageIndex: 0,
      cards: []
    }
  }

  const [game, setGame] = useState(new_game);

  const [handEval, setHandEval] = useState(null);

  function newGame() {
    setGame(new_game);
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
            board: {
              nextStageIndex: 0,
              cards: ((name === 'Board') ? response.data.hand : game.board.cards)
            },
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
        hand: [...game.board.cards, ...game.hand]
      }
    )
      .then(response => {
        setHandEval(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [game]);
  console.log('current_state', game);
  return (
    <div>
      <DealHand getHand={newGame} name='New Game' />
      <DealBoard getHand={handleDeal} board={game.board} />
      <DealHand getHand={handleDeal} hand={game.hand} name='player_1' />
      <HandEval handEval={handEval} />
    </div>
  );
}

export default App;
