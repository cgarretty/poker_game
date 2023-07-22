import React, { useState } from "react";

// libraries
import axios from "axios";

// components
import { stages, newPlayers, newHand } from "./Constants";
import PlayerView from "./PlayerView";
import BoardView from "./BoardView";
import DealerButton from "./DealerButton";

// style
import { Card } from "@mui/material";
import "./GameTable.css";

function GameTable() {
  const [game, setGame] = useState(newHand);
  const [players, setPlayers] = useState(newPlayers);

  function newGame() {
    setGame(newHand);
    setPlayers(newPlayers);
  }

  function handleBoard(numCards) {
    axios
      .post("http://localhost:8000/api/deck/deal_hand", {
        n_cards: numCards,
        deck_id: game.deck_id,
      })
      .then((response) => {
        console.log("response: ", response.data);
        setGame({
          deck_id: response.data.deck_id,
          board: {
            nextStageIndex: game.board.nextStageIndex + 1,
            cards: [...game.board.cards, ...response.data.hand],
          },
        });
        console.log("game: ", game);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDeal(numCards, playerIndex) {
    axios
      .post("http://localhost:8000/api/deck/deal_hand", {
        n_cards: numCards,
        deck_id: game.deck_id,
      })
      .then((response) => {
        const copiedPlayers = [...players];
        copiedPlayers[playerIndex] = {
          eval: players[playerIndex].eval,
          name: players[playerIndex].name,
          hand: response.data.hand,
          isDealer: players[playerIndex].isDealer,
        };
        setPlayers(copiedPlayers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="game-table">
      <BoardView getHand={handleBoard} board={game.board} stages={stages} />
      <div className="players">
        {players.map((player, index) => (
          <Card key={index} variant="outlined" className="player-box">
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
        ))}
      </div>
    </div>
  );
}

export default GameTable;
