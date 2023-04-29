import Hand from './Hand';
import React from 'react';
import { isEmpty } from 'lodash';

function HandView(props) {
  console.log(!props.hand);
  return (
    <div>
      <h3>{props.name}</h3>

      {
        isEmpty(props.hand) &&
        <button onClick={() => props.getHand(2, 'Hand')}>
          Deal {props.name}
        </button>
      }
      <Hand hand={props.hand} />
    </div>
  );
}

export default HandView;
