import Hand from './Hand';
import React from 'react';

function HandView(props) {

  return (
    <div>
      <h3>{props.name}</h3>
      <button onClick={() => props.getHand(props.n, props.name)}>
        Deal {props.name}
      </button>
      <Hand hand={props.hand} />
    </div>
  );
}

export default HandView;
