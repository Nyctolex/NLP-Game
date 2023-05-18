import React, { useState } from "react";
import "./wordForm.css";

function getCardsTitles(cards) {
  const titleList = cards.map((card) => card.title);
  return titleList;
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
      const response = await fetch("/association", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: word,
          words: getCardsTitles(props.data.cards),
          num:num,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        props.setColorState(data.closetWords);
        console.log("Retrieved value:", data);
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
        <label>Number ofwords with assosiation:</label>

        <input
          type="number"
          value={num}
          onChange={handleWordNumChange}
          placeholder="1"
          min="1"
          max="9"
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default WordForm;
