import React, { useEffect, useState } from "react";
import "./Input.css";
import { useDispatch } from "react-redux";
import { add } from "../Store/NameSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import tictactoe from "../Animations/tictactoe.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Input() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const Filledname = useSelector((state) => state.name.value);

  const handleClick = (name) => {
    dispatch(add(name));
    localStorage.setItem("NAME", name);
    if (localStorage.getItem("NAME") !== "") {
      navigate("/game");
    } else {
      // alert("Please Enter your name");
      toast("Enter Your Name first!!")
    }
  };


  useEffect(() => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // Find your button element by its id, class, or other selector
            const button = document.getElementById('myButton');
            if (button) {
                button.click();
            }
        }
    };

    // Attach keypress event listener to the document
    document.addEventListener('keypress', handleKeyPress);

    // Cleanup: remove event listener when the component unmounts
    return () => {
        document.removeEventListener('keypress', handleKeyPress);
    };
}, []); 



  return (
    <div className="main">
    <div className="title-input">
      TIC TAC TOE
    </div>
    <div className="container">
      <div className="animation-container">
        <Lottie animationData={tictactoe}
        loop={true}
        autoplay={true}
        className="animation"
         />
      </div>
      <div className="form-container">
        <div className="fw-bold">
          <label>Enter Your Name:</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <motion.div>
          <button id="myButton" className="play-btn" onClick={() => handleClick(name)}>
            Play Game
          </button>
        </motion.div>
      </div>
    </div>
    <ToastContainer />
    </div>

  );
}

export default Input;
