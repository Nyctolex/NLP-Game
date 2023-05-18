import React, {useState, useEffect} from "react";
import './card.css'

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

        <div className={`card-content ${isTextVisible ? 'visible' : 'hidden'}`} >
        <hr></hr>
        <p className="centered-text">{props.description}</p>
        </div>

      </div>

    );
  };

  export default Card