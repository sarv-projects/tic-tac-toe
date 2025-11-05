import { useState } from "react";
import Square from "./Square";
import StatusPanel from "./StatusPanel";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const lineClass = result ? `strike-${result.direction}` : "";

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <div className="board-container">
        <h3>Tic-Tac-Toe</h3>
        <div className="board-wrapper">
          <div className="board">
            {squares.map((val, i) => (
              <Square key={i} value={val} onSquareClick={() => handleClick(i)} />
            ))}
            {winner && <div className={`strike ${lineClass}`}></div>}
          </div>
        </div>
      </div>
      <StatusPanel status={status} resetGame={resetGame} />
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, "row-1"],
    [3, 4, 5, "row-2"],
    [6, 7, 8, "row-3"],
    [0, 3, 6, "col-1"],
    [1, 4, 7, "col-2"],
    [2, 5, 8, "col-3"],
    [0, 4, 8, "diag-1"],
    [2, 4, 6, "diag-2"],
  ];

  for (let [a, b, c, dir] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return { winner: squares[a], direction: dir };
  }
  return null;
}
