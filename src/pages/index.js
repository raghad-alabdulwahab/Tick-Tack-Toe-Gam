import React from "react";
import '../css/global.css'
import TicTacToe from "../components/TicTacToe.js";
import logo from "../images/Logo.jpeg"
import { useState } from "react";



export default function Home() {
  function toggleChange(newValue) {
    setIsShown(false);  
  }

  // get user name
  const Data = document.getElementById("userName");

    //toggle shown components
    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
      if (document.getElementById("userName").value != '' ){
        setIsShown(isShown => !isShown);
      }

    };

  
  return (
  <>
  
        <title> Tic Tac Toe game </title>

      {!isShown &&   
      <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-1000 w-auto" src={logo}  alt="logo"/>
            <p className="mt-2 text-center text-sm text-gray-600">
            The player who has the first move is X. 
            The player who plays second is O. 
            The first player to occupy three spaces in a row, column, or diagonal wins. 
            </p>
          </div>

          <form className="mt-8 space-y-6">
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
                Start
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </>  } 



    <div>
      {isShown && <TicTacToe name={Data.value} toggle={isShown} onToggleChange={toggleChange} />}

    </div>
  </>
  )
}


