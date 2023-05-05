import { isEmpty } from 'lodash';
import Button from '@mui/material/Button';
import React from 'react';

function DealerButton(props) {

  if (!props.player.isDealer) {
    return null
  }

  if (isEmpty(props.players[props.playerIndex].hand)) {
    return (
      <Button variant="contained" onClick={() => props.handleDeal(2, props.playerIndex)}>
        Deal Hands
      </Button>
    );
  } else if (props.game.board.nextStageIndex < props.stages.length) {
    return (
      < Button variant="contained" onClick={() => props.handleBoard(
        props.stages[props.game.board.nextStageIndex].dealNumber
      )}>
        Deal {props.stages[props.game.board.nextStageIndex].stageName}
      </Button>
    );
  } else {
    return (
      <Button variant="contained" onClick={() => props.newGame()}>Deal New Game</Button>
    );
  }
}

export default DealerButton;
