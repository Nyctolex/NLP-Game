import React, { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import GameBoard from "./components/Card/GameBoard";
import WordForm from "./components/head/wordForm";
import BoardMap from "./components/boardMap/boardMap";
import Popup from "./components/popup/Popup";
import "./App.css";
import { motion } from "framer-motion";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Alert } from "react-bootstrap";
class CardTypes {
  static BLUE = "blue";
  static RED = "red";
  static NEUTRAL = "neutral";
  static BOMB = "bomb";
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

function generateBoard(cardsData, setGameState) {
  const groupes = [CardTypes.RED, CardTypes.BLUE];
  const startingGroup = groupes[Math.floor(Math.random() * groupes.length)];
  let numBombs = 1;
  let numBlue = 8;
  let numRed = 8;
  let numNeutral = 7;
  if (startingGroup === CardTypes.RED) {
    numRed++;
  } else {
    numBlue++;
  }

  let boardCardTypes = generateBoardColors(
    numRed,
    numBlue,
    numNeutral,
    numBombs
  );

  // Create a new array with updated "type" key
  const updatedCardsData = cardsData.cards.map((card, index) => {
    // Create a new object with the existing card properties and the new "type" key
    return { ...card, type: boardCardTypes[index], marked: false };
  });
  // Update the "cardsData" state variable with the new array
  setGameState({
    turn: startingGroup,
    cards: updatedCardsData,
    markedWords: [],
    ended: false,
    endingReason: "",
    victorious: undefined,
    activated: true,
  });

  console.log(updatedCardsData);
}

function bombMarked(gameState) {
  if (typeof gameState.cards === "undefined") return false;
  // console.log(gameState.cards);
  let bombMarked = false;
  gameState.cards.forEach((card) => {
    if (card.type == CardTypes.BOMB && card.marked) {
      bombMarked = true;
    }
  });

  return bombMarked;
}

function teamWon(gameState, team) {
  if (typeof gameState.cards === "undefined") return false;

  for (const card of gameState.cards) {
    if (card.type === team && !card.marked) {
      return false;
    }
  }
  return true;
}

function checkGameEnded(gameState, setGameState) {
  if (bombMarked(gameState)) {
    console.log("bomb");
    let victorious = (gameState.turn === CardTypes.RED) ? CardTypes.BLUE : CardTypes.RED;
    setGameState((prevState) => {
      return {
        ...prevState,
        ended: true,
        endingReason: "Bomb had been reviled, " +  victorious +" is the winner",
        victorious: victorious,
      };
    });
    return;
  }

  if (teamWon(gameState, CardTypes.RED)) {
    setGameState((prevState) => {
      return {
        ...prevState,
        ended: true,
        endingReason: "Team Red had won!",
        victorious: prevState.turn,
      };
    });
  }

  if (teamWon(gameState, CardTypes.BLUE)) {
    setGameState((prevState) => {
      return {
        ...prevState,
        ended: true,
        endingReason: "Team Blue had won!",
        victorious: prevState.turn,
      };
    });
  }
}

function App() {
  const [gameState, setGameState] = useState({});
  const [instructionsPopupTrigger, setInstructionsPopupTrigger] = useState(false);
  const [winningPopupTrigger, setWinningPopupTrigger] = useState(false);

  const newGame = async () => {
    const response = await fetch("/cards")
      .then((res) => res.json())
      .then((data) => {
        generateBoard(data, setGameState);
      });
  };

  useEffect(() => {
    checkGameEnded(gameState, setGameState);
    // setPopupTrigger(gameState.ended);
  }, [gameState.markedWords]);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    setWinningPopupTrigger(gameState.ended);
    if (gameState.ended)
    activateGame(false);
  }, [gameState.ended]);


  // useEffect(() => {
  //   activateGame(!instructionsPopupTrigger);
  // }, [gameState]);

  

  const activateGame = (state) => {
    setGameState((prevState) => {
      return {
        ...prevState,
        activated: state,
      };
    });
  };


  return (
    <div className="App">
      <Popup
        trigger={instructionsPopupTrigger}
        setPopupTrigger={setInstructionsPopupTrigger}
        activateGame={() => {
          activateGame(true);
        }}
      >
        <h1>Rules</h1>
        <p>These are the rules of the game:</p>
      </Popup>

      <Popup
        trigger={winningPopupTrigger}
        setPopupTrigger={ setWinningPopupTrigger
        }
        activateGame={() => {
          activateGame(true);
        }}
      >
        <h1>Game ended</h1>
        <p>{gameState.endingReason}</p>
      </Popup>
<div>
<motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={!gameState.activated}
        className="button"
        type="button"
        onClick={()=> {activateGame(false);setInstructionsPopupTrigger(true)}}
      >
        Tutorial
 </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={!gameState.activated}
        className="button"
        type="button"
        onClick={newGame}
      >
        New Game
      </motion.button>
</div>
      
      <GameBoard setGameState={setGameState} gameState={gameState} />

      <div className="game-bottom-container">
        <WordForm
          CardTypes={CardTypes}
          setGameState={setGameState}
          gameState={gameState}
        />
        {typeof gameState.cards === "undefined" ? (
          ""
        ) : (
          <BoardMap gameState={gameState} />
        )}
      </div>
    </div>
  );
}
//

export default App;
