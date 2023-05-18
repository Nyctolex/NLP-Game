import React, {useState, useEffect} from "react";
import Card from "./components/card/card";
import GameBoard from "./components/card/gameBoard";
import WordForm from "./components/head/wordForm";
import BoardMap from "./components/boardMap/boardMap";
import "./App.css"
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


function generateBoard(cardsData, setCardsData){

 
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
    console.log("aaaaaaaaaa")

}

function App() {

  const [colorState, setColorState] = useState(Array(25).fill(0))
  // setColorState(Array(24).fill(0));

  const [boardData, setBoardData] = useState([{}])
  useEffect (() => {
    fetch("/cards").then(
      res => res.json()
    ).then(
      data => {
        setBoardData(data)
        generateBoard(data, setBoardData)
        console.log(boardData)
      }
    )
  }, [])



  return(
  <div >
    <BoardMap data={boardData}/> <br></br>
      <GameBoard data={boardData} colorState={colorState} />
      <WordForm data={boardData} setColorState={setColorState}/> <br></br>
      
      
  </div>);
}
//

export default App
