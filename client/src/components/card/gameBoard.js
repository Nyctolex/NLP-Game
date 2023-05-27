import React, {useState, useEffect} from "react";
import Card from "./Card";
import './Card.css'

const GameBoard = (props) => {
  
    return <div className="card-container">
      
   {(typeof props.gameState.cards === 'undefined') ? (
    <p>Loading...</p>
   ) : (
    
    props.gameState.cards.map((cardData, i) => (
      <Card cardData = {cardData} setGameState={props.setGameState} gameState={props.gameState}> </Card>
    ))
   )}
    </div>;
  };

  export default GameBoard;