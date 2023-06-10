import Hand from './Hand';
import React from 'react';

function PlayerView(props) {

  return (
    <div>
      <h3>{props.player.name}</h3>
      <Hand hand={props.player.hand} />
    </div>
  );
}

export default PlayerView;
