import { useState } from "react";
import "./styles.css";

const generateBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

// main app
const TicTacToe = () => {
  const [board, setBoard] = useState(generateBoard(3));
  const [currPlayer, setCurrPlayer] = useState("x");
  const [displayWinner, setDisplayWinner] = useState(false);

  // this is our base check for if there is enough in a row to win
  // the other checks use this as a base
  const checkHorizontal = (board) => {
    for (let row of board) {
      const newSet = new Set(row);
      if (newSet.size === 1 && !newSet.has(undefined)) {
        return true;
      }
    }
  };

  const checkVertical = (board) => {
    let newBoard = [];
    let col = 0;
    while (col < board.length) {
      let newRow = [];
      for (let row = 0; row < board.length; row++) {
        newRow.push(board[row][col]);
      }
      newBoard.push(newRow);
      col++;
    }
    return newBoard;
  };
  const checkDiagonal = (board) => {
    let newBoard = [[], []];
    let increment = 0;
    let decrement = board.length - 1;
    while (increment < board.length) {
      newBoard[0].push(board[increment][increment]);
      newBoard[1].push(board[decrement][increment]);
      increment++;
      decrement--;
    }

    return newBoard;
  };

  // center for checking wins
  const checkForWin = (board) => {
    // horizontal
    if (checkHorizontal(board)) {
      return true;
    }
    // vertical
    if (checkHorizontal(checkVertical(board))) {
      return true;
    }
    // diagonal
    if (checkHorizontal(checkDiagonal(board))) {
      return true;
    }
  };

  // placing your letters
  const handleClick = (row, col) => {
    // this prevents the user from chaning the letter used
    if (board[row][col] === undefined) {
      board[row][col] = currPlayer;
      setBoard([...board]);
    }

    if (checkForWin(board)) {
      setDisplayWinner((prev) => !prev);
      setBoard(generateBoard(3));
      // this fixes the issue of displaying the wrong letter for the winner
      setTimeout(() => {
        setDisplayWinner((prev) => !prev);
        setCurrPlayer("x");
      }, 1500);
    } else {
      setCurrPlayer(currPlayer === "x" ? "o" : "x");
    }
  };

  return (
    <>
      <div className="App">
        {/* rows */}
        {board.map((row, r) => {
          return (
            <div style={{ display: "flex" }} key={r}>
              {/* individual cells */}
              {row.map((cell, c) => {
                return (
                  <div
                    onClick={() => handleClick(r, c)}
                    style={{
                      border: "solid 1px #fff",
                      width: "9vw",
                      height: "9vw",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      fontSize: "5vw",
                    }}
                    key={c}
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <h1 className="display" style={{ color: "#fff" }}>
        {displayWinner ? currPlayer + " is the winner!" : null}
      </h1>
    </>
  );
};

export default TicTacToe;
