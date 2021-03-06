/*
 *  Reducer
 */
import {ADD_SYMBOL, JUMP_TO_HISTORY} from '../actions';

interface IState {
  history: { squares: string[] }[];
  stepNumber: number;
  winner: string;
  xIsNext: boolean;
}

const initialState: IState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  xIsNext: true,
  winner: null,
};

const reducer = (state: IState = initialState, action: any) => {
  switch(action.type) {
    case ADD_SYMBOL:
      let history = state.history.slice(0, state.stepNumber + 1);
      let current = history[history.length - 1];
      let squares = current.squares.slice();
      let winner = state.winner;

      // for ignore the click
      // case1: already won the game / case2: already clicked
      if(winner || squares[action.index]) {
       return state;
      }

      squares[action.index] = state.xIsNext ? 'X' : 'O';

      return {
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        winner: calculateWinner(squares),
      };
    case JUMP_TO_HISTORY:
      let stepNumber = action.index;
      let xIsNext = stepNumber%2 === 0 ? true : false;
      winner = calculateWinner(state.history[stepNumber].squares);
      return {
        history: state.history,
        stepNumber: stepNumber,
        xIsNext: xIsNext,
        winner: winner,
      };
    default:
      return state;
  }
}

function calculateWinner(squares: string[]): string {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default reducer;
