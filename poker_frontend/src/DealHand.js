import Hand from './Hand';
import React from 'react';
import { isEmpty } from 'lodash';
import Button from '@mui/material/Button';

function HandView(props) {

  return (
    <div>
      <h3>{props.name}</h3>
      {
        isEmpty(props.hand) &&
        <Button variant="contained" onClick={() => props.getHand(2, 'Hand')}>
          Deal {props.name}
        </Button>
      }
      <Hand hand={props.hand} />
    </div>
  );
}

export default HandView;
