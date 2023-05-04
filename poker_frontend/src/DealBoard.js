import Hand from './Hand';
import React from 'react';
import Button from '@mui/material/Button';

function BoardView(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      {
        props.board.nextStageIndex < props.stages.length &&
        < Button variant="contained" onClick={() => props.getHand(
          props.stages[props.board.nextStageIndex].dealNumber,
          'Board'
        )}>
          Deal {props.name}
        </Button>
      }
      <Hand hand={props.board.cards} />
    </div >
  );
}

export default BoardView;
