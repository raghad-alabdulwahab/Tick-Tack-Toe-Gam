import React from "react";
import '../css/global.css'
// import '../css/Home.css';
import TicTacToe from "../components/TicTacToe.js";
// import { useStaticQuery, graphql } from 'gatsby'
import {useState} from 'react';



export default function Home() {
  
  const Data = document.getElementById("userName");

    //toggle shown components
    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
      setIsShown(isShown => !isShown);
    };

  
  return (
  // <div className="containerHome">
  <>
  
        <title> Tic Tac Toe game </title>

      {!isShown &&   
      <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="../images/logo.png"
              alt="Workflow"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Tic Tac Toe game</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            The player who has the first move is X. 
            The player who plays second is O. 
            The first player to occupy three spaces in a row, column, or diagonal wins. 
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your name
                </label>
                <input
                  id="userName"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <button
              onClick={handleClick}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border 
                border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span> */}
                Start
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </>  } 

    <div>
      {isShown && <TicTacToe name={Data.value} />}

    </div>

  {/* </div> */}
  </>
  )
}


