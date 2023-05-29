import React from "react";
import "./Popup.css";
import { motion } from "framer-motion";
function Popup(props) {

  const transition_settings = {
    duration: 10,
    type: "spring",
    damping: 20,
    stiffness: 300,
  };

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 10,
        type: "spring",
        damping: 5,
        stiffness: 50,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  return props.trigger ? (
    <motion.div className="popup">
      <motion.div
        className="popup-inner"
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1, transition: transition_settings }}
      >
        {props.children}
        <button
          className="close-btn"
          onClick={() => {
            props.setPopupTrigger(false);
            props.activateGame();
          }}
        >
          {" "}
          X{" "}
        </button>
      </motion.div>
    </motion.div>
  ) : (
    ""
  );
}

export default Popup;
