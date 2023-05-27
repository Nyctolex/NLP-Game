import React, { useState, useEffect } from "react";
import "./wordForm.css";
import { motion } from "framer-motion";

function getCardsTitles(cards) {
  const titleList = cards.map((card) => card.title);
  return titleList;
}
function getObjectIndexesByTitle(objectList, titleList) {
  const indexes = [];

  for (let i = 0; i < objectList.length; i++) {
    const object = objectList[i];
    if (titleList.includes(object.title)) {
      indexes.push(i);
    }
  }

  return indexes;
}



const WordForm = (props) => {
  const [word, setWord] = useState("");
  const [num, setNum] = useState("1");

  const handleWordInputChange = (event) => {
    setWord(event.target.value);
  };
  const handleWordNumChange = (event) => {
    setNum(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const words = getCardsTitles(props.gameState.cards);
      const unMarkedWords = words.filter(
        (word) => !props.gameState.markedWords.includes(word)
      );
      const response = fetch("/association", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: word,
          words: unMarkedWords,
          num: num,
        }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) =>{
            const indexes = getObjectIndexesByTitle(
              props.gameState.cards,
              data.closetWords
            );
            
            props.setGameState((prevState) => {
              const updatedCards = [...prevState.cards];
              indexes.forEach((i) => {
                updatedCards[i] = { ...updatedCards[i], marked: true };
              });
            
              return {
                ...prevState,
                cards: updatedCards,
                markedWords: [...prevState.markedWords, ...data.closetWords],
                turn: prevState.turn === props.CardTypes.RED ? props.CardTypes.BLUE : props.CardTypes.RED,
              };
            });
          });
          
          

          
        }         else if (response.status === 400){
          alert("Couldn't find this word, please try a diffrent one");
        } 

        else {
          console.error("Failed to retrieve value:", response.status);
        }
      });
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setWord("");
    setNum(1);
  };

  return (
    <div className="form-container top-left-background top-right-background">
      <form onSubmit={handleSubmit}>
        <label>Assosiation:</label>
        <input
          className="input-box"
          type="text"
          required="required"
          value={word}
          onChange={handleWordInputChange}
          placeholder="Enter a word"
        />
        <br />
        <label>Number of words with assosiation:</label>

        <input
          className="input-box"
          type="number"
          value={num}
          onChange={handleWordNumChange}
          placeholder="1"
          min="1"
          max="24"
        />
        <br />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={!props.gameState.activated}
          className="form-button"
          type="submit"
        >
          Submit
        </motion.button>
      </form>
    </div>
  );
};

export default WordForm;
