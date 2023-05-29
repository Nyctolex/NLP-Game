import React, {useState, useEffect} from "react";
import './Card.css'
import Popup from "../popup/Popup";

const Card = (props) => {
    const [isTextVisible, setIsTextVisible] = useState(false);
  
    const handleCardClick = () => {
      if (props.gameState.activated){
        setIsTextVisible(!isTextVisible);
        activateGame(false);
      }
      
      
    };
    
    // props.setPopupTrigger(isTextVisible);
    const activateGame = (state) => {
      props.setGameState((prevState) => {
        return{
          ...prevState,
          activated: state
        }
      })
    };

    return (
      //
      <div className={`card ${props.cardData.marked ? (props.cardData.type+'-card'): ''}`} onClick={handleCardClick}>
        <p className="centered-text">{props.cardData.title}</p>

        
<Popup trigger = {isTextVisible} setPopupTrigger={setIsTextVisible} activateGame={()=> activateGame(true)}>
<div className={`card-content`} >
  <h1>{props.cardData.title}</h1>
        <hr></hr>
        {

props.cardData.description.map((description, i) => (
  <div>
  <p className="centered-text">{description}</p>
  <hr Style="width:50%"></hr>
  </div>
))

}
        
        </div>
</Popup>
      </div>

    

    );
  };

  export default Card