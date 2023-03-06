const assert = require('assert');
const axios = require('axios');

describe('Deal Hand API', function() {
  it('should return a hand with any two cards', function(done) {
    axios.post('http://localhost:8000/api/deal_hand', {})
      .then(function(response) {
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.hand.length, 2);
        assert.strictEqual(typeof response.data.hand[0].rank, 'string');
        assert.strictEqual(typeof response.data.hand[0].suit, 'string');
        assert.strictEqual(typeof response.data.hand[1].rank, 'string');
        assert.strictEqual(typeof response.data.hand[1].suit, 'string');
        done();
      })
      .catch(function(error) {
        done(error);
      });
  });
});
