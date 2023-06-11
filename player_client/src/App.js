import React, { useState } from 'react';

// libraries
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// components
import PlayerView from './PlayerView';
import BoardView from './BoardView';
import DealerButton from './DealerButton';

// style
import { Card } from '@mui/material';
import './App.css';

function App() {

  const stages = [
    { stageName: 'flop', dealNumber: 3 },
    { stageName: 'turn', dealNumber: 1 },
    { stageName: 'river', dealNumber: 1 }
  ]

  const new_players = [
    {
      name: 'Hero',
      hand: [],
      eval: {},
      isDealer: true
    },
    {
      name: 'Villian 1',
      hand: [],
      eval: {},
      isDealer: false
    },
    {
      name: 'Villian 2',
      hand: [],
      eval: {},
      isDealer: false
    }
  ]

  const new_game = {
    deck_id: uuidv4(),
    board: {
      nextStageIndex: 0,
      cards: []
    }
  }

  const [game, setGame] = useState(new_game);
  const [players, setPlayers] = useState(new_players);

  function newGame() {
    setGame(new_game);
    setPlayers(new_players);
  }

  function handleBoard(numCards) {
    axios.post(
      'http://localhost:8000/api/deck/deal_hand',
      {
        n_cards: numCards,
        deck_id: game.deck_id
      }
    )
      .then(response => {
        console.log('response: ', response.data)
        setGame(
          {
            deck_id: response.data.deck_id,
            board: {
              nextStageIndex: game.board.nextStageIndex + 1,
              cards: [...game.board.cards, ...response.data.hand]
            }
          }
        );
        console.log('game: ', game);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleDeal(numCards, playerIndex) {
    axios.post(
      'http://localhost:8000/api/deck/deal_hand',
      {
        n_cards: numCards,
        deck_id: game.deck_id
      }
    )
      .then(response => {
        const copiedPlayers = [...players];
        copiedPlayers[playerIndex] = {
          eval: players[playerIndex].eval,
          name: players[playerIndex].name,
          hand: response.data.hand,
          isDealer: players[playerIndex].isDealer
        };
        setPlayers(copiedPlayers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className='game-table'>
      <BoardView getHand={handleBoard} board={game.board} stages={stages} />
      <div className='players'>
        {
          players.map((player, index) => (
            <Card key={index} variant='outlined' className='player-box' >
              <DealerButton
                game={game}
                players={players}
                handleBoard={handleBoard}
                handleDeal={handleDeal}
                newGame={newGame}
                stages={stages}
                playerIndex={index}
                player={player}
              />
              <PlayerView getHand={handleDeal} player={player} />
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default App;
