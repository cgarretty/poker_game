import Hand from './Hand';
import React from 'react';

function HandView(props) {

  return (
    <div>
      <h3>{props.name}</h3>
      <Hand hand={props.hand} />
    </div>
  );
}

export default HandView;
