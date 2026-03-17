import { dispalyGameBoard } from "./data/dispaly.js";
import { LADDER_JUMPS, SNAKE_JUMPS, WIN_POSITION } from "./data/data.js";

const move = (step) => {
  const newStep = SNAKE_JUMPS[step] || LADDER_JUMPS[step] || step;
  const symbol = newStep > step ? "🪜" : (newStep === step) ? "🏃‍♂️‍➡️" : "🐍";
  console.log(`\n${symbol} ${step} -> ${newStep}`);
  return newStep;
};

const positionChange = (diceValue, board, previousStep = 0) => {
  const currentStep = diceValue + previousStep;
  if (currentStep > board.length) {
    console.log("\n❗️invalid move");
    return previousStep;
  }

  return move(currentStep);
};

const rollTheDice = () => Math.ceil(Math.random() * 6);

const handleDiceRoll = (playerName) => {
  prompt(`\n${playerName} roll the dice:`);
  const steps = rollTheDice();
  console.log(`\ndice rolled 🎲 - ${steps}`);
  return steps;
};

export const startGame = ({ board, currentPlayer, players, state }) => {
  dispalyGameBoard(board, players);

  const diceValue = handleDiceRoll(currentPlayer.name);
  currentPlayer.position = positionChange(diceValue,board,currentPlayer.position,);
  prompt(`${currentPlayer.name} moved to  ${currentPlayer.position}`);

  if (currentPlayer.position === WIN_POSITION) {
    dispalyGameBoard(board, players);
    console.log(`\n${currentPlayer.name} won 🏆 match `);
    return "game completed";
  }

  const index = state++ % players.length;
  currentPlayer = players[index];
  return startGame({ board, currentPlayer, players, state });
};
