import { v4 as uuidv4 } from "uuid";

const stages = [
  { stageName: "flop", dealNumber: 3 },
  { stageName: "turn", dealNumber: 1 },
  { stageName: "river", dealNumber: 1 },
];

const newPlayers = [
  {
    name: "Hero",
    hand: [],
    eval: {},
    isDealer: true,
  },
  {
    name: "Villian 1",
    hand: [],
    eval: {},
    isDealer: false,
  },
  {
    name: "Villian 2",
    hand: [],
    eval: {},
    isDealer: false,
  },
];

const newHand = {
  deck_id: uuidv4(),
  board: {
    nextStageIndex: 0,
    cards: [],
  },
};

export { stages, newPlayers, newHand };
