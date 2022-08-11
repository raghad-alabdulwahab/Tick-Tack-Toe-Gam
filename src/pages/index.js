import React from "react";
import '../css/global.css'
import TicTacToe from "../components/TicTacToe.js";
import logo from "../images/Logo1.png"
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
      if (document.getElementById("userName").value !== '' ){
        setIsShown(isShown => !isShown);
      }

    }

    /////////////////////////////
    const animate = function (entries) {
      entries.forEach((entry) => {
        console.log(entry);
    
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
        } else {
          entry.target.classList.remove("animate-fadeIn");
        }
      });
    };
    
    const observer = new IntersectionObserver(animate);
    
    const targets = document.querySelectorAll(".js-show-on-scroll");
    targets.forEach(function (target) {
      target.classList.add("opacity-0");
      observer.observe(target);
    });
    
  



            

  
  return (
      <>
      <div class="p-4">

          <title> Tic Tac Toe game </title>

    {!isShown &&   <>
      
      <div className="min-h-screen flex flex-colmin-h-full 
      p-4 
      flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-300">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-1000 w-auto" src={logo}  alt="logo"/>
            <p className="mt-2 text-center text-sm text-gray-600">
            The player who has the first move is X. 
            The player who plays second is O. 
            The first player to occupy three spaces in a row, column, or diagonal wins. 
            </p>

          </div>
          <p className="animate-arrow mt-9 text-9xl text-center text-gray-600 text-90xl">&darr;</p>

        </div>
        
      </div>

      <div class="min-h-screen flex flex-col items-center justify-center bg-purple-300 pb-48 js-show-on-scroll p-4 my-4 ">

  <h1 class="text-3xl">Let start 😎!</h1>
  <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="text-3xl sr-only">
                  Your name
                </label>
                <input      
                  id="userName"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                  focus:z-10 sm:text-sm"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <button
              onClick={handleClick}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border 
                animate-bounce
                border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Start
              </button>
            </div>
          </form>

</div> </> }
     
     
     <div>
      {isShown && <TicTacToe name={Data.value} toggle={isShown} onToggleChange={toggleChange} />}

    </div>
    </div>
    </>   
  )
}







