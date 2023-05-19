import React, {useState, useEffect} from "react";
import './boardMap.css'

const MapBox = (props) =>{
    return <div className={`map-box ${(props.cardType+'-box')}`}></div>
}

const BoardMap = (props) => {
    return <div className={`board-map-container ${props.gameState.turn+'-turn-container'}`}>
{(typeof props.data.cards === 'undefined') ? (
    <p>Loading...</p>
   ) : (
    props.data.cards.map((cardData, i) => (
      <MapBox cardType ={cardData.type} index={i}> </MapBox>
    ))

   )}
    

    </div>;
  };

  export default BoardMap;