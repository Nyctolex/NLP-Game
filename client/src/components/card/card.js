import React, {useState, useEffect} from "react";
import './Card.css'
import Popup from "../popup/Popup";

const Card = (props) => {
    const [isTextVisible, setIsTextVisible] = useState(false);
  
    const handleCardClick = () => {
      setIsTextVisible(!isTextVisible);
    };
    
    // console.log((props.cardType+'-card'));
    return (
      //
      <div className={`card ${props.colorState[props.index] !== 0 ? (props.cardType+'-card'): ''}`} onClick={handleCardClick}>
        <p className="centered-text">{props.title}</p>

        
<Popup trigger = {isTextVisible} setPopupTrigger={setIsTextVisible}>
<div className={`card-content`} >
  <h1>{props.title}</h1>
        <hr></hr>
        {

props.description.map((description, i) => (
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