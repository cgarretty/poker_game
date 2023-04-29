import Hand from './Hand';
import React from 'react';

function BoardView(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      {
        props.board.nextStageIndex < props.stages.length &&
        < button onClick={() => props.getHand(
          props.stages[props.board.nextStageIndex].dealNumber,
          'Board'
        )}>
          Deal {props.name}
        </button>
      }
      <Hand hand={props.board.cards} />
    </div >
  );
}

export default BoardView;
