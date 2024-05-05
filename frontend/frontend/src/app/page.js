'use client';
import React, { useRef, useState } from 'react'
import axios from "axios";


export default function Home() {
  const [gameTable, setGameTable] = useState();
  const [sel, setSel] = useState("-");
  const [initialValue, setInitialValue] = useState(["-", "-", "-", "-", "-", "-", "-", "-", "-"])
  const [counter, setCounter] = useState(0)
  let btnRef = useRef()

  function NewGame() {
    // console.log("new game started")
    axios.get("http://localhost:8080/game?numOfBombs=1&numOfSpaces=9").then(
      (res) => {
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
    for (let i = 0; i < 9; i++) {
      let string = i.toString()
      var row = document.getElementById(string)
      row.innerText = "-"
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show")
    }
  }

  function nothing() {
    
  }

  function handleChoice(event) {
      axios.get("http://localhost:8080/game/feedback?userPick=" + event.target.id).then(
        (res) => {
          if (res.data === "O") {
            event.target.innerText = "O"
            setCounter(counter + 1)
            setSel(sel => sel + " ")
            console.log(counter)
          } else {
            console.log("game over")
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
          }
        }

      )
    
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
              <th onClick={handleChoice} id='0' ref={btnRef}>{initialValue[0]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
              <th onClick={handleChoice} id='1'>{initialValue[1]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
              <th onClick={handleChoice} id='2'>{initialValue[2]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
            </tr>

            <tr>
              <th onClick={handleChoice} id='3'>{initialValue[3]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
              <th onClick={handleChoice} id='4'>{initialValue[4]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
              <th onClick={handleChoice} id='5'>{initialValue[5]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
            </tr>

            <tr>
              <th onClick={handleChoice} id='6'>{initialValue[6]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
              <th onClick={handleChoice} id='7'>{initialValue[7]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
              <th onClick={handleChoice} id='8'>{initialValue[8]}</th>
              <div class="popup" >
                <span class="popuptext" id="myPopup">BOMB!</span>
              </div>
            </tr>
          
          </table>}
      </div>
      
    </main>
  );
}
