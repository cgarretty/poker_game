import React, { useState } from 'react';
import axios from 'axios';

function HandView() {
  const [hand, setHand] = useState(null);

  const handleClick = async () => {
    const response = await axios.post('http://localhost:8000/api/deal_hand', {});
    setHand(response.data.hand);
  };

  return (
    <div>
      <button onClick={handleClick}>Deal Hand</button>
      {hand &&
        <div>
          <p>{hand[0].rank} of {hand[0].suit}</p>
          <p>{hand[1].rank} of {hand[1].suit}</p>
        </div>
      }
    </div>
  );
}

export default HandView;
