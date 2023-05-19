import React, {useState, useEffect} from "react";
import Card from "./components/Card/Card";
import GameBoard from "./components/Card/GameBoard";
import WordForm from "./components/head/wordForm";
import BoardMap from "./components/boardMap/boardMap";
import Popup from "./components/popup/Popup";
import "./App.css"
import { motion } from "framer-motion";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Alert} from 'react-bootstrap';
class CardTypes {
  static BLUE = 'blue';
  static RED = 'red';
  static NEUTRAL = 'neutral';
  static BOMB = 'bomb';
}

function generateBoardColors(numRed, numBlue, numNeutral, numBombs) {
  const colors = [];
  
  // Add m elements of BLUE
  for (let i = 0; i < numBlue; i++) {
    colors.push(CardTypes.BLUE);
  }
  
  // Add m elements of RED
  for (let i = 0; i < numRed; i++) {
    colors.push(CardTypes.RED);
  }
  
  // Add K elements of NEUTRAL
  for (let i = 0; i < numNeutral; i++) {
    colors.push(CardTypes.NEUTRAL);
  }
  
  // Add B elements of BOMB
  for (let i = 0; i < numBombs; i++) {
    colors.push(CardTypes.BOMB);
  }
  
  // Shuffle the array randomly
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  
  return colors;
}


function generateBoard(cardsData, setCardsData, setGameState){

 
  const groupes = [CardTypes.RED, CardTypes.BLUE]
  const startingGroup = groupes[  Math.floor(Math.random() * groupes.length) ];
  let numBombs = 1;
  let numBlue = 8;
  let numRed = 8;
  let numNeutral = 7;
  if (startingGroup === CardTypes.RED){
    numRed++;
  }
  else{
    numBlue++;
  }
  
  
  let boardCardTypes = generateBoardColors(numRed, numBlue, numNeutral, numBombs);


    // Create a new array with updated "type" key
    const updatedCardsData = cardsData.cards.map((card, index) => {
      // Create a new object with the existing card properties and the new "type" key
      return { ...card, type: boardCardTypes[index] };
    });
    // Update the "cardsData" state variable with the new array
    setCardsData({cards: updatedCardsData, startingGroup: startingGroup});
    setGameState({turn: startingGroup});
    
    console.log(cardsData)
}

function App() {

  const [colorState, setColorState] = useState(Array(25).fill(0))
  const [gameState, setGameState] = useState({turn:CardTypes.RED})
  const [markedWords, setMarkedWords] = useState([])
  const [boardData, setBoardData] = useState([{}])
  const [popupTrigger, setPopupTrigger] = useState(true)




  const newGame = async () => {
    const response = await fetch("/cards").then(
      res => res.json()
    ).then(
      data => {
        setColorState(Array(25).fill(0))
        setBoardData(data)
        setMarkedWords([]);
        generateBoard(data, setBoardData, setGameState)
      }
    )
  }


  
  useEffect (() => {
    newGame()}
  , [])


  return(
  <div className="App">

<Popup trigger={popupTrigger} setPopupTrigger={setPopupTrigger}>
  <h1>Rules</h1>
  <p>These are the rules of the game:</p>
</Popup>


    <motion.button whileHover={{scale:1.1}} whileTap={{scale:0.9}}
    disabled={popupTrigger} className="button" type="button"  onClick={newGame}>New Game</motion.button>
    <GameBoard data={boardData} colorState={colorState} />

    <div className="game-bottom-container">
    <WordForm popupTrigger={popupTrigger} data={boardData} setColorState={setColorState} markedWords={markedWords} setMarkedWords={setMarkedWords}/>
      <BoardMap data={boardData} gameState={gameState}/> 
      
    </div>
      
    
      
      
  </div>);
}
//

export default App
