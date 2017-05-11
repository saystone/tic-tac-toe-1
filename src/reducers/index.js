import {ADD_SYMBOL, JUMP_TO_HISTORY} from '../actions';

const initialState = {
  history: [{
    squares: Array(9).fill(null),
  }],
  stepNumber: 0,
  xIsNext: true,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_SYMBOL:
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      // for ignore the click
      // case1: already won the game / case2: already clicked
      if(squares[action.index]) {
       return state;
      }

      squares[action.index] = state.xIsNext ? 'X' : 'O';

      return {
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext
      };
    case JUMP_TO_HISTORY:
      return state;
    default:
      return state;
  }
}

function calculateWinner(squares) {
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
