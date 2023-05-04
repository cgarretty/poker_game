import React from 'react';
import './Hand.css';

function Hand({ hand }) {

  const suits = new Map([
    ['♠', 'spade'],
    ['♥', 'heart'],
    ['♦', 'diamond'],
    ['♣', 'club'],
  ])

  const cardMap = new Map([
    // spades
    [JSON.stringify({ rank: "2", suit: "♠" }), "🂢"],
    [JSON.stringify({ rank: "3", suit: "♠" }), "🂣"],
    [JSON.stringify({ rank: "4", suit: "♠" }), "🂤"],
    [JSON.stringify({ rank: "5", suit: "♠" }), "🂥"],
    [JSON.stringify({ rank: "6", suit: "♠" }), "🂦"],
    [JSON.stringify({ rank: "7", suit: "♠" }), "🂧"],
    [JSON.stringify({ rank: "8", suit: "♠" }), "🂨"],
    [JSON.stringify({ rank: "9", suit: "♠" }), "🂩"],
    [JSON.stringify({ rank: "10", suit: "♠" }), "🂪"],
    [JSON.stringify({ rank: "J", suit: "♠" }), "🂫"],
    [JSON.stringify({ rank: "Q", suit: "♠" }), "🂭"],
    [JSON.stringify({ rank: "K", suit: "♠" }), "🂮"],
    [JSON.stringify({ rank: "A", suit: "♠" }), "🂡"],
    // hearts
    [JSON.stringify({ rank: "2", suit: "♥" }), "🂲"],
    [JSON.stringify({ rank: "3", suit: "♥" }), "🂳"],
    [JSON.stringify({ rank: "4", suit: "♥" }), "🂴"],
    [JSON.stringify({ rank: "5", suit: "♥" }), "🂵"],
    [JSON.stringify({ rank: "6", suit: "♥" }), "🂶"],
    [JSON.stringify({ rank: "7", suit: "♥" }), "🂷"],
    [JSON.stringify({ rank: "8", suit: "♥" }), "🂸"],
    [JSON.stringify({ rank: "9", suit: "♥" }), "🂹"],
    [JSON.stringify({ rank: "10", suit: "♥" }), "🂺"],
    [JSON.stringify({ rank: "J", suit: "♥" }), "🂻"],
    [JSON.stringify({ rank: "Q", suit: "♥" }), "🂽"],
    [JSON.stringify({ rank: "K", suit: "♥" }), "🂾"],
    [JSON.stringify({ rank: "A", suit: "♥" }), "🂱"],
    // diamonds
    [JSON.stringify({ rank: "2", suit: "♦" }), "🃂"],
    [JSON.stringify({ rank: "3", suit: "♦" }), "🃃"],
    [JSON.stringify({ rank: "4", suit: "♦" }), "🃄"],
    [JSON.stringify({ rank: "5", suit: "♦" }), "🃅"],
    [JSON.stringify({ rank: "6", suit: "♦" }), "🃆"],
    [JSON.stringify({ rank: "7", suit: "♦" }), "🃇"],
    [JSON.stringify({ rank: "8", suit: "♦" }), "🃈"],
    [JSON.stringify({ rank: "9", suit: "♦" }), "🃉"],
    [JSON.stringify({ rank: "10", suit: "♦" }), "🃊"],
    [JSON.stringify({ rank: "J", suit: "♦" }), "🃋"],
    [JSON.stringify({ rank: "Q", suit: "♦" }), "🃍"],
    [JSON.stringify({ rank: "K", suit: "♦" }), "🃎"],
    [JSON.stringify({ rank: "A", suit: "♦" }), "🃁"],
    // clubs
    [JSON.stringify({ rank: "2", suit: "♣" }), "🃒"],
    [JSON.stringify({ rank: "3", suit: "♣" }), "🃓"],
    [JSON.stringify({ rank: "4", suit: "♣" }), "🃔"],
    [JSON.stringify({ rank: "5", suit: "♣" }), "🃕"],
    [JSON.stringify({ rank: "6", suit: "♣" }), "🃖"],
    [JSON.stringify({ rank: "7", suit: "♣" }), "🃗"],
    [JSON.stringify({ rank: "8", suit: "♣" }), "🃘"],
    [JSON.stringify({ rank: "9", suit: "♣" }), "🃙"],
    [JSON.stringify({ rank: "10", suit: "♣" }), "🃚"],
    [JSON.stringify({ rank: "J", suit: "♣" }), "🃛"],
    [JSON.stringify({ rank: "Q", suit: "♣" }), "🃝"],
    [JSON.stringify({ rank: "K", suit: "♣" }), "🃞"],
    [JSON.stringify({ rank: "A", suit: "♣" }), "🃞"],
  ]);

  var cards;
  if (hand !== undefined) {
    cards = hand
  }

  return (
    <div>
      {cards && cards.length > 0 && (
        <div className='card-container'>
          {cards.map((card, index) => (
            <div className={'card ' + suits.get(card.suit)} key={index}> {cardMap.get(JSON.stringify(card))}</div>
          ))}
        </div>
      )
      }
    </div >
  );
}

export default Hand;
