import React from 'react'
import '../css/global.css'
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
      const [winner, setWinner] = useState(null);
      const [current, setCurrent] = useState(props.name)

      //

      
      ///
      function playFn(columnIndex, rowIndex) {
        if(current == props.name){
          setCurrent("CPU")
        }else{
          setCurrent(props.name)
        }
          if ( !winner ){
            board[columnIndex][rowIndex] = players?.HUMAN?.SYM;
            setBoard((board) => [...board]);
            let id = columnIndex +''+ rowIndex;
            document.getElementById(id).style.pointerEvents = 'none';
            isWinner();
            CPU();
          }



      }

      ///
      function CPU() {
        if (!winner){  
        const move = AI();
        if (move){
          board[move.arrayIndex][move.index] = players?.CPU?.SYM;
          setBoard((board) => [...board]);
          let id = move.arrayIndex +''+ move.index;
          document.getElementById(id).style.pointerEvents = 'none';
        }
        isWinner();
      }}


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
       
      
      
      
      
      
  
      // Reset everything 
      function restartRound() {
        setBoard([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]);
        setWinner(null);
        setCurrent(props.name);
        const cells = [...document.querySelectorAll('.rounded-md')]; 

        cells.forEach((cell)=>{
          cell.style.pointerEvents = 'auto';
        });
      }
      // Toggle Change on perent component 
      function Quit() {
        restartRound();
        props.onToggleChange(false);
      }


  return <>
    <div className="flex items-center justify-center ">

        <div className="max-w-md w-full space-y-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{!winner && current} </h2>

        {winner && <h2 className="mt-6 text-center text-3xl font-extrabold text-red-900">{displayWinner()}</h2>}


      <div id="main" class="grid grid-cols-3 gap-1 justify-evenly"> 
        <div class="rounded-md text-white bg-green-700 w-26 h-12 text-center text-5xl font-bold " 
        id='00' onClick={() => playFn(0, 0, 1)}>{board[0][0]}</div> 
        <div class="rounded-md text-white bg-green-500 w-26 h-12 text-center text-5xl font-bold " 
        id='01' onClick={() => playFn(0, 1, 2)}>{board[0][1]}</div> 
        <div class="rounded-md text-white bg-green-300 w-26 h-12 text-center text-5xl font-bold " 
        id='02' onClick={() => playFn(0, 2, 3)}>{board[0][2]}</div> 
        <div class="rounded-md text-white bg-green-700 w-26 h-12 text-center text-5xl font-bold " 
        id='10' onClick={() => playFn(1, 0, 4)}>{board[1][0]}</div> 
        <div class="rounded-md text-white bg-green-500 w-26 h-12 text-center text-5xl font-bold " 
        id='11' onClick={() => playFn(1, 1, 5)}>{board[1][1]}</div> 
        <div class="rounded-md text-white bg-green-300 w-26 h-12 text-center text-5xl font-bold " 
        id='12' onClick={() => playFn(1, 2, 6)}>{board[1][2]}</div> 
        <div class="rounded-md text-white bg-green-700 w-26 h-12 text-center text-5xl font-bold " 
        id='20' onClick={() => playFn(2, 0, 7)}>{board[2][0]}</div> 
        <div class="rounded-md text-white bg-green-500 w-26 h-12 text-center text-5xl font-bold " 
        id='21' onClick={() => playFn(2, 1, 8)}>{board[2][1]}</div> 
        <div class="rounded-md text-white bg-green-300 w-26 h-12 text-center text-5xl font-bold " 
        id='22' onClick={() => playFn(2, 2, 9)}>{board[2][2]}</div> 
      </div> 
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
        </>)}
        <button
      onClick={Quit}
            className="group relative w-full flex justify-center py-2 px-4 border 
            border-transparent text-sm font-medium rounded-md text-white bg-green-700 hover:bg-green-300 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Quit 
        </button>
      </div>
      
      </div>
  </>;}
