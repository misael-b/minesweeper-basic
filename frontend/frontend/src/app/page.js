'use client';
import React, { useEffect, useState } from 'react'
import axios from "axios";


export default function Home() {
  const [gameTable, setGameTable] = useState();
  const [sel, setSel] = useState("-");

  function NewGame() {
    // console.log("new game started")
    axios.get("http://localhost:8080/game?numOfBombs=1&numOfSpaces=9").then(
      (res) => {
        setGameTable(res.data)
        
      })
  }

  function handleChoice(event) {
    axios.get("http://localhost:8080/game/feedback?userPick=" + event.target.id).then(
      (res) => {
        if (res.data === "O") {
          event.target.innerText = "O"
          setSel(sel => sel + " ")
        } else {
          console.log("game over")
        }
      }
      
    )
  }

  return (
    <main>
      <div>
        <h1>MINESWEEPER (BASIC)</h1>
        <button onClick={NewGame}>NEW GAME</button>
        {(gameTable) && (sel) &&
          <table className='gameTable'>
            <tr>
              <th onClick={handleChoice} id='0'>-</th>
              <th onClick={handleChoice} id='1'>-</th>
              <th onClick={handleChoice} id='2'>-</th>
            </tr>

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
      </div>
      
    </main>
  );
}
