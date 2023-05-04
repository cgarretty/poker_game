import { isEmpty } from 'lodash';
import Button from '@mui/material/Button';
import React from 'react';

function DealerButton(props) {

  return (
    <div>
      {
        props.game.board.nextStageIndex === 3 &&
        <Button variant="contained" onClick={() => props.newGame()}>Deal New Game</Button>
      }
      {
        (props.game.board.nextStageIndex < props.stages.length && !isEmpty(props.game.hand)) &&
        < Button variant="contained" onClick={() => props.handleDeal(
          props.stages[props.game.board.nextStageIndex].dealNumber,
          'Board'
        )}>
          Deal {props.stages[props.game.board.nextStageIndex].stageName}
        </Button>
      }
      {
        isEmpty(props.game.hand) &&
        <Button variant="contained" onClick={() => props.handleDeal(2, 'Hand')}>
          Deal Hands
        </Button>
      }
    </div>
  )
}

export default DealerButton;
