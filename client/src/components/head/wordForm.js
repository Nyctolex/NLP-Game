import React, { useState } from "react";
import "./wordForm.css";

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
  const [num, setNum] = useState("");

  const handleWordInputChange = (event) => {
    setWord(event.target.value);
  };
  const handleWordNumChange = (event) => {
    setNum(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const words = getCardsTitles(props.data.cards)
      const unMarkedWords = words.filter(word => !props.markedWords.includes(word));
      const response = await fetch("/association", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: word,
          words: unMarkedWords,
          num:num,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const indexes = getObjectIndexesByTitle(props.data.cards, data.closetWords)
        props.setColorState(prevState => {
          const updatedState = [...prevState];
          indexes.forEach(i => {
            updatedState[i] = true;
          })
          
          return updatedState;
        });
        props.setMarkedWords(prevState => {
          return [...prevState,...data.closetWords] });
        console.log(props.markedWords)
      

      } else {
        console.error("Failed to retrieve value:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    setWord("");
    setNum(1);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Assosiation:</label>
        <input
          type="text"
          value={word}
          onChange={handleWordInputChange}
          placeholder="Enter a word"
        />
        <br />
        <label>Number of words with assosiation:</label>

        <input
          type="number"
          value={num}
          onChange={handleWordNumChange}
          placeholder="1"
          min="1"
          max="9"
        />
        <br />

        <button  disabled={props.popupTrigger} className="form-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WordForm;
