import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hand from './Hand';
import HandEval from './HandEval';


function HandView() {
  const [hand, setHand] = useState(null);
  const [handEval, setHandEval] = useState(null);

  const handleClick = async () => {
    const response = await axios.post('http://localhost:8000/api/player/deal_hand', {});
    console.log(response.data);
    setHand(response.data);
  };

  useEffect(() => {
    if (hand) {
      axios.post('http://localhost:8000/api/player/evaluate_hand', hand)
        .then(response => {
          console.log(response.data)
          setHandEval(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [hand]);

  return (
    <div>
      <button onClick={handleClick}>Deal Hand</button>
      <Hand hand={hand} />
      <HandEval handEval={handEval} />
    </div>
  );
}

export default HandView;
