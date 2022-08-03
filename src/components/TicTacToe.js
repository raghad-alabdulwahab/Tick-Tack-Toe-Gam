import React from 'react'

import '../css/TicTacToe.css';

import { useState } from "react";


export default function TicTacToe(props) {


  const players = {
    CPU: {
      SYM: "O",
      NAME: "CPU",
    },
    HUMAN: {
      SYM: "X",
      NAME: props.name,
    },
  };

     /// columns & rows are numbered from 0 to 2
    const [board, setBoard] = useState([    
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]);

      ///
      const [isCPUNext, cpuTurn] = useState(false);
      const [winner, setWinner] = useState(null)


      ///
      function playFn(columnIndex, rowIndex) {
        if (isCPUNext) return;
        if (winner) return;
        board[columnIndex][rowIndex] = players?.HUMAN?.SYM;
        setBoard((board) => [...board]);
        isWinner();
        cpuTurn(true);
        CPU();
      }



      ///
      function CPU() {
        if (winner) return;   
        const move = AI();

        board[move.arrayIndex][move.index] = players?.CPU?.SYM;
        console.log("board"+board);
        console.log("move arrayIndex "+move.arrayIndex);
        console.log("move index"+move.index);

        setBoard((board) => [...board]);
        isWinner();
        cpuTurn(false);   
      }


      /// AI 
      function AI() {
        const emptyIndexes = [];
        board.forEach((row, arrayIndex) => {
          row.forEach((cell, index) => {
            if (cell === "") {
              emptyIndexes.push({ arrayIndex, index });
            }
          });
        });
        const randomIndex = Math.floor(Math.random() * emptyIndexes.length);

        return emptyIndexes[randomIndex];
      }


      ///
      function isWinner() {

        // check same row
        for (let index = 0; index < board.length; index++) {
          const row = board[index];
          console.log("row = "+row);

          if (row.every((cell) => cell === players?.CPU?.SYM)) {
            setWinner(players?.CPU?.NAME);
            return;
          } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
            setWinner(players?.HUMAN?.NAME);
            return;
          }
        }
        // check same column
        for (let i = 0; i < 3; i++) {
          const column = board.map((row) => row[i]);
          console.log("column = "+column);

          if (column.every((cell) => cell === players?.CPU?.SYM)) {
            setWinner(players?.CPU?.NAME);
            return;
          } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
            setWinner(players?.HUMAN?.NAME);
            return;
          }
        }

        // check same diagonal
        const diagonal1 = [board[0][0], board[1][1], board[2][2]];
        // ["X", "", ""],
        // ["", "X", ""],
        // ["", "", "X"],
        const diagonal2 = [board[0][2], board[1][1], board[2][0]]
        // ["", "", "x"],
        // ["", "x", ""],
        // ["x", "", ""],
        if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
          setWinner(players?.CPU?.NAME);
          return;
        } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
          setWinner(players?.HUMAN?.NAME);
          return;
        } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
          setWinner(players?.CPU?.NAME);
          return;
        } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
          setWinner(players?.HUMAN?.NAME);
          return;
        } else if (board.flat().every((cell) => cell !== "")) {
          setWinner("draw");
          return;
        } else {
          setWinner(null);
          return;
        }
      }


      function displayWinner() {
        if (winner === "draw") {
          return "It's a draw!";
        } else if (winner) {
          return `${winner} won!`;
        }
      }

      function displayTurn() {
        if (isCPUNext) {
          return "CPU's turn";
        } else {
          return `${props.name} turn`;
        }
      }


      // Reset everything 
      function restartRound() {
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
        setWinner(null);
        cpuTurn(false);
      }


  return <div>
    
    {/* <p>{props.name}</p> */}
    <h2>{!winner && displayTurn()}</h2>

    <div className="container">
      <div className="col">
        <span onClick={() => playFn(0, 0)} className="cell">
          {board[0][0]}
        </span>
        <span onClick={() => playFn(0, 1)} className="cell">
          {board[0][1]}
        </span>
        <span onClick={() => playFn(0, 2)} className="cell">
          {board[0][2]}
        </span>
      </div>
      <div className="col">
        <span onClick={() => playFn(1, 0)} className="cell">
          {board[1][0]}
        </span>
        <span onClick={() => playFn(1, 1)} className="cell">
          {board[1][1]}
        </span>
        <span onClick={() => playFn(1, 2)} className="cell">
          {board[1][2]}
        </span>
      </div>
      <div className="col">
        <span onClick={() => playFn(2, 0)} className="cell">
          {board[2][0]}
        </span>
        <span onClick={() => playFn(2, 1)} className="cell">
          {board[2][1]}
        </span>
        <span onClick={() => playFn(2, 2)} className="cell">
          {board[2][2]}
        </span>
      </div>
    </div>
    {winner && <h2>{displayWinner()}</h2>}
    {winner && (
      <button className="playAgain" onClick={restartRound}>
        Restart
      </button>
    )}
  </div>;
  
}
