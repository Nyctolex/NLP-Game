import React, {useState, useEffect} from "react";
import './boardMap.css'

const MapBox = (props) =>{
    return <div className={`map-box ${(props.cardType+'-box')}`}></div>
}
const BoardMap = (props) => {
    return <div className={`board-map-container ${props.gameState.turn+'-turn-container'}`}>
{(typeof props.gameState.cards === 'undefined') ? (
    <p>Loading...</p>
   ) : (
    props.gameState.cards.map((cardData, i) => (
      <MapBox cardData={cardData} cardType ={cardData.type} index={i}> </MapBox>
    ))

   )}
    

    </div>;
  };

  export default BoardMap;