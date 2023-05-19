import React from "react";
import "./Popup.css";
import { motion } from "framer-motion";
function Popup(props) {
    const dropIn = {
        hidden: {
            y: "-100vh",
            opacity:0,
        },
        visible: {
            y:"0",
            opacity:1,
            transition: {
                duration: 0.1,
                type: "spring",
                damping: 25,
                stiffness:500
            }
        },
        exit:{
            y:"100vh",
            opacity: 0,
        }
    }
// props.state(props.trigger);

  return (props.trigger) ? (
    <motion.div className="popup" initial={{opacity:1}} animated={{opacity:1}} exit={{opacity:1}}>
      <motion.div className="popup-inner" variants={dropIn}>
        {props.children}
        <button className="close-btn" onClick={() => {props.setPopupTrigger(false)}}> X </button>
      </motion.div>
    </motion.div>
  ) : (
    ""
  );
}

export default Popup;
