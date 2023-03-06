const axios = require('axios');
const assert = require('assert');

describe('API Test', function () {
  it('should return 2 hardcoded cards from the API', async function () {
    const response = await axios.post('http://localhost:8000/api/deal_hand', {
      hand: [
        { rank: '10', suit: '♥' },
        { rank: '5', suit: '♦' },
      ],
    });
    assert.deepStrictEqual(response.status, 200);
    assert.deepStrictEqual(response.data, {
      hand: [
        { rank: '10', suit: '♥' },
        { rank: '5', suit: '♦' },
      ],
    });
  });
});
