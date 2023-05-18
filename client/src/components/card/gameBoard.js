import React, {useState, useEffect} from "react";
import Card from "./card";
import './card.css'

const GameBoard = (props) => {


  
    return <div className="card-container">
   {(typeof props.data.cards === 'undefined') ? (
    <p>Loading...</p>
   ) : (
    props.data.cards.map((cardData, i) => (
      <Card title={cardData.title} description={cardData.description} cardType ={cardData.type} colorState={props.colorState} index={i}> </Card>
    ))
   )}
    </div>;
  };

  export default GameBoard;