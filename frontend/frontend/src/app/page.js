'use client';
import React, { useRef, useState } from 'react'
import axios from "axios";


export default function Home() {
  const [gameTable, setGameTable] = useState();
  const [sel, setSel] = useState("-");
  const [initialValue, setInitialValue] = useState(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
  const [isGameOver, setGameOver] = useState(false)


  function NewGame() {
    setGameOver(false)
    var popup = document.getElementById("BOMB");
    popup.style.display = "none"
    var popupWin = document.getElementById("WINNER");
    popupWin.style.display = "none"
    axios.get("http://localhost:8080/game?numOfBombs=1&numOfSpaces=9").then(
      (res) => {
        setAnsArray(results)
        console.log(ansArray)
        var element = document.getElementById("startGame")
        var element2 = document.getElementById("restartGame")
        element.hidden = true
        element2.hidden = false
        
      })
  }

  function restartGame() {
    NewGame()
    for (let i = 0; i < 9; i++) {
      let string = i.toString()
      var row = document.getElementById(string)
      row.innerText = "-"
      var popup = document.getElementById("BOMB");
      popup.style.display = "none"
    }
  }


  function handleChoice(event) {
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
              setCounter(counter + 1)
              setSel(sel => sel + " ")
              console.log(counter)
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
        <button onClick={NewGame} id='startGame'>NEW GAME</button>
        <button onClick={restartGame} id='restartGame' hidden='true'>RESTART GAME</button>
        {(gameTable) && (sel) &&
          <table className='gameTable'>
            <tr>
              <th onClick={handleChoice} id='0'>{initialValue[0]}</th>
              <th onClick={handleChoice} id='1'>{initialValue[1]}</th>
              <th onClick={handleChoice} id='2'>{initialValue[2]}</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='3'>{initialValue[3]}</th>
              <th onClick={handleChoice} id='4'>{initialValue[4]}</th>
              <th onClick={handleChoice} id='5'>{initialValue[5]}</th>
            </tr>

            <tr>
              <th onClick={handleChoice} id='6'>{initialValue[6]}</th>
              <th onClick={handleChoice} id='7'>{initialValue[7]}</th>
              <th onClick={handleChoice} id='8'>{initialValue[8]}</th>
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