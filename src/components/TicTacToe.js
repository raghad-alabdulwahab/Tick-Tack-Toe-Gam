import React from 'react'
import '../css/global.css'
// import '../css/TicTacToe.css';

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
      const [cpuTurn, setCpuTurn] = useState(false);
      const [winner, setWinner] = useState(null);
      const [currentTurn , setCurrentTurn] = useState(`${props.name} turn`);

  
      ///
      function playFn(columnIndex, rowIndex) {
        if (cpuTurn) return;
        if (winner) return;
        board[columnIndex][rowIndex] = players?.HUMAN?.SYM;
        setBoard((board) => [...board]);
        console.log("00 ====> ", columnIndex , rowIndex);
        let id = columnIndex +''+ rowIndex;
        document.getElementById(id).style.pointerEvents = 'none';
        //
        isWinner();
        setCpuTurn(true);
        displayTurn();
        CPU();

        // cpuTurn setCpuTurn
      }



      ///
      function CPU() {
        if (winner) return;   
        const move = AI();
        if (move){
          board[move.arrayIndex][move.index] = players?.CPU?.SYM;
          console.log("board"+board);
          setBoard((board) => [...board]);
          let id = move.arrayIndex +''+ move.index;
          document.getElementById(id).style.pointerEvents = 'none';
        }
        isWinner();
        setCpuTurn(false);   
        displayTurn();
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
        console.log("randomIndex  "+randomIndex);
        console.log("emptyIndexes[randomIndex]   "+ emptyIndexes[randomIndex]);
        return emptyIndexes[randomIndex];
      }


      ///
      function isWinner() {

        // check same row
        for (let index = 0; index < board.length; index++) {
          const row = board[index];
          // console.log("row = "+row);

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
          // console.log("column = "+column);

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
        } 
        return `${winner} won!`;
      }
       
      
      
      
      
      
      ///
      function displayTurn() {
        setTimeout(()=>{
          // console.log("setT")
        if (cpuTurn) {
          console.log("displayTurn()  => CPU's turn ")
          console.log("cpuTurn()  => "+ cpuTurn)
          return setCurrentTurn("CPU's turn");
        } 
        // else{
          console.log("displayTurn()  => your's turn ")
          console.log("cpuTurn()  => "+ cpuTurn)

          // return setCurrentTurn("Raghad turn");
          return setCurrentTurn(`${props.name} turn`);
        // }
      
      }, (1000));}







      // Reset everything 
      function restartRound() {
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
        setWinner(null);
        setCpuTurn(false);
        setCurrentTurn(`${props.name} turn`);
        
        const cells = [...document.querySelectorAll('.rounded-md')]; 

        cells.forEach((cell)=>{
          console.log("found cell", cell)
          cell.style.pointerEvents = 'auto';
        })
   
      }


  return <>
    
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{!winner && currentTurn }</h2>

      <div id="main" class="grid grid-cols-3 gap-1 justify-evenly"> 
        <div class="rounded-md text-white bg-green-700 w-26 h-12" 
        id='00' onClick={() => playFn(0, 0, 1)}>{board[0][0]}</div> 
        <div class="rounded-md text-white bg-green-500 w-26 h-12" 
        id='01' onClick={() => playFn(0, 1, 2)}>{board[0][1]}</div> 
        <div class="rounded-md text-white bg-green-300 w-26 h-12" 
        id='02' onClick={() => playFn(0, 2, 3)}>{board[0][2]}</div> 
        <div class="rounded-md text-white bg-green-700 w-26 h-12" 
        id='10' onClick={() => playFn(1, 0, 4)}>{board[1][0]}</div> 
        <div class="rounded-md text-white bg-green-500 w-26 h-12" 
        id='11' onClick={() => playFn(1, 1, 5)}>{board[1][1]}</div> 
        <div class="rounded-md text-white bg-green-300 w-26 h-12" 
        id='12' onClick={() => playFn(1, 2, 6)}>{board[1][2]}</div> 
        <div class="rounded-md text-white bg-green-700 w-26 h-12" 
        id='20' onClick={() => playFn(2, 0, 7)}>{board[2][0]}</div> 
        <div class="rounded-md text-white bg-green-500 w-26 h-12" 
        id='21' onClick={() => playFn(2, 1, 8)}>{board[2][1]}</div> 
        <div class="rounded-md text-white bg-green-300 w-26 h-12" 
        id='22' onClick={() => playFn(2, 2, 9)}>{board[2][2]}</div> 
      </div> 
      {winner && <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{displayWinner()}</h2>}

      {winner && (
        <>
      <button
              onClick={restartRound}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border 
                border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-300 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                play Again
      </button>
      <button
            className="group relative w-full flex justify-center py-2 px-4 border 
            border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-300 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Quit 
        </button>
        </>)}

      </div>
      </div>
  </>;}
