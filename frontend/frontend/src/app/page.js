'use client';
import React, { useRef, useState } from 'react'
import axios from "axios";


export default function Home() {
  const [gameTable, setGameTable] = useState();
  const [sel, setSel] = useState("-");
  const [mediumGame, setMediumGame] = useState(["-", "-", "-", "-", "-",
    "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
    "-", "-", "-", "-", "-", "-", "-",])
  const [isGameOver, setGameOver] = useState(false)
  var lengthOfArray;
  


  function NewGame() {
    setGameOver(false)
    var difficulty = document.getElementById("difficulty");
    var numOfBombs = document.getElementById("numOfBombs");
    var numOfSpaces;

    if (difficulty.value === "easy") {
      numOfSpaces = 36;
    } else if (difficulty.value === "medium") {
      numOfSpaces = 25;
    } else {
      numOfSpaces = 9
    }
    var popup = document.getElementById("BOMB");
    popup.style.display = "none"
    var popupWin = document.getElementById("WINNER");
    popupWin.style.display = "none"
    axios.get("http://localhost:8080/game?numOfBombs=" + numOfBombs.value + "&numOfSpaces=" + numOfSpaces ).then(
      (res) => {
        lengthOfArray = res.data.length
        setGameTable(res.data)
        console.log(res.data)
        var element = document.getElementById("startGame")
        var element2 = document.getElementById("restartGame")
        element.hidden = true
        element2.hidden = false
        
      })
  }

  function restartGame() {
    NewGame()
    for (let i = 0; i < 36; i++) {
      let string = i.toString()
      var row = document.getElementById(string)
      if (row !== null) {
        row.innerText = "-"
      }
      var popup = document.getElementById("BOMB");
      popup.style.display = "none"
    }
  }


  function handleChoice(event) {
    console.log(mediumGame.length)
    if (isGameOver === false) {
      axios.get("http://localhost:8080/game/feedback?userPick=" + event.target.id).then(
        (res) => {
          if (res.data === "Winner") {
            setGameOver(true)
            setSel(gameTable)
            var popup = document.getElementById("WINNER");
            popup.style.display = "block"
            
          } else {
            if (res.data === "O") {
              event.target.innerText = "O"
              setSel(sel => sel + " ")
            } else {
              setGameOver(true)
              console.log("game over")
              var popup = document.getElementById("BOMB");
              popup.style.display = "block"
            }
          }
          
        }
      )
      
    }
      
    
  }

  return (
    <main>
      <div>
        <h1>MINESWEEPER (BASIC)</h1>
        <label for="difficulty">Choose a Difficulty:  </label>
        <form>
          <select name="difficulty" id="difficulty">
            <option value="hard">Hard - 3x3</option>
            <option value="medium">Medium - 5x5</option>
            <option value="easy">Easy  - 6x6</option>
          </select>
        </form>

        <label for="numOfBombs">Choose Number Of Bombs:  </label>
        <form>
          <select name="numOfBombs" id="numOfBombs">
            <option value="1">1 bomb</option>
            <option value="3">3 bombs</option>
            <option value="5">5 bombs</option>
          </select>
        </form>
        
          <br/>

          <button onClick={NewGame} id='startGame'>NEW GAME</button>
        
        <button onClick={restartGame} id='restartGame' hidden='true'>RESTART GAME</button>
        {(gameTable) && (sel) && (document.getElementById("difficulty").value === "hard") &&
          <table className='gameTable'>
            {document.getElementById("difficulty").value === "hard" && 
              <tr>
                <th onClick={handleChoice} id='0'>-</th>
                <th onClick={handleChoice} id='1'>-</th>
                <th onClick={handleChoice} id='2'>-</th>
              </tr>}

            <tr>
              <th onClick={handleChoice} id='3'>-</th>
              <th onClick={handleChoice} id='4'>-</th>
              <th onClick={handleChoice} id='5'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='6'>-</th>
              <th onClick={handleChoice} id='7'>-</th>
              <th onClick={handleChoice} id='8'>-</th>
            </tr>
          
          </table>}
        


        {(gameTable) && (sel) && (document.getElementById("difficulty").value === "medium") &&
          <table className='gameTable'>
              <tr>
                <th onClick={handleChoice} id='0'>-</th>
                <th onClick={handleChoice} id='1'>-</th>
                <th onClick={handleChoice} id='2'>-</th>
                <th onClick={handleChoice} id='3'>-</th>
                <th onClick={handleChoice} id='4'>-</th>
              </tr>

            <tr>
              <th onClick={handleChoice} id='5'>-</th>
              <th onClick={handleChoice} id='6'>-</th>
              <th onClick={handleChoice} id='7'>-</th>
              <th onClick={handleChoice} id='8'>-</th>
              <th onClick={handleChoice} id='9'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='10'>-</th>
              <th onClick={handleChoice} id='11'>-</th>
              <th onClick={handleChoice} id='12'>-</th>
              <th onClick={handleChoice} id='13'>-</th>
              <th onClick={handleChoice} id='14'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='15'>-</th>
              <th onClick={handleChoice} id='16'>-</th>
              <th onClick={handleChoice} id='17'>-</th>
              <th onClick={handleChoice} id='18'>-</th>
              <th onClick={handleChoice} id='19'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='20'>-</th>
              <th onClick={handleChoice} id='21'>-</th>
              <th onClick={handleChoice} id='22'>-</th>
              <th onClick={handleChoice} id='23'>-</th>
              <th onClick={handleChoice} id='24'>-</th>
            </tr>

          </table>}
        {(gameTable) && (sel) && (document.getElementById("difficulty").value === "easy") &&
          <table className='gameTable'>
            <tr>
              <th onClick={handleChoice} id='0'>-</th>
              <th onClick={handleChoice} id='1'>-</th>
              <th onClick={handleChoice} id='2'>-</th>
              <th onClick={handleChoice} id='3'>-</th>
              <th onClick={handleChoice} id='4'>-</th>
              <th onClick={handleChoice} id='5'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='6'>-</th>
              <th onClick={handleChoice} id='7'>-</th>
              <th onClick={handleChoice} id='8'>-</th>
              <th onClick={handleChoice} id='9'>-</th>
              <th onClick={handleChoice} id='10'>-</th>
              <th onClick={handleChoice} id='11'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='12'>-</th>
              <th onClick={handleChoice} id='13'>-</th>
              <th onClick={handleChoice} id='14'>-</th>
              <th onClick={handleChoice} id='15'>-</th>
              <th onClick={handleChoice} id='16'>-</th>
              <th onClick={handleChoice} id='17'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='18'>-</th>
              <th onClick={handleChoice} id='19'>-</th>
              <th onClick={handleChoice} id='20'>-</th>
              <th onClick={handleChoice} id='21'>-</th>
              <th onClick={handleChoice} id='22'>-</th>
              <th onClick={handleChoice} id='23'>-</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='24'>-</th>
              <th onClick={handleChoice} id='25'>-</th>
              <th onClick={handleChoice} id='26'>-</th>
              <th onClick={handleChoice} id='27'>-</th>
              <th onClick={handleChoice} id='28'>-</th>
              <th onClick={handleChoice} id='29'>-</th>
            </tr>
            <tr>
              <th onClick={handleChoice} id='30'>-</th>
              <th onClick={handleChoice} id='31'>-</th>
              <th onClick={handleChoice} id='32'>-</th>
              <th onClick={handleChoice} id='33'>-</th>
              <th onClick={handleChoice} id='34'>-</th>
              <th onClick={handleChoice} id='35'>-</th>
            </tr>

          </table>}
      </div>
      
      <div class='BOMB' id="BOMB"
        style={{ display: "none" }}
      >
        <p>BOMB!</p>
        <p>GAME OVER!</p>
        <button onClick={restartGame}>New Game?</button>
      </div>

      <div class='WINNER' id="WINNER"
        style={{ display: "none" }}
      >
        <p>YOU WON!</p>
        <button onClick={restartGame}>New Game?</button>
      </div>
      
    </main>
  );
}
