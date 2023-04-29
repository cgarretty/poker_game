import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DealHand from './DealHand';
import DealBoard from './DealBoard';
import HandEval from './HandEval';
import { isEqual } from 'lodash';

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
    setHandEval(null);
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
              nextStageIndex: ((name === 'Board') ? game.board.nextStageIndex + 1 : game.board.nextStageIndex),
              cards: [...game.board.cards, ...((name === 'Board') ? response.data.hand : [])]
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
    <div class='game-table'>
      <DealBoard getHand={handleDeal} board={game.board} stages={stages} />
      <DealHand getHand={handleDeal} hand={game.hand} name='player_1' />
      <HandEval handEval={handEval} />
      <div>
        {!isEqual(game, new_game) && <button onClick={() => newGame()}>Deal New Game</button>}
      </div>
    </div>
  );
}

export default App;
