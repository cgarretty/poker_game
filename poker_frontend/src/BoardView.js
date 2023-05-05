import Hand from './Hand';
import React from 'react';

function BoardView(props) {
  return (
    <div>
      <h3>Board</h3>
      <Hand hand={props.board.cards} />
    </div >
  );
}

export default BoardView;
