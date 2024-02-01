import React,{useState} from 'react'
import './Input.css'
import { useDispatch } from 'react-redux';
import {add} from '../Store/NameSlice';
import { useNavigate } from 'react-router-dom';

function Input() {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const [name,setName] = useState("");

    const handleClick=(name)=>{
        dispatch(add(name));
        navigate('/game')
    }

    
  return (
    <div className="container">
    <div className='sub-container'>
      <div className="input-data fw-bold">
      <label>Enter Your Name:</label>
        <input className='input' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
      </div>
      <div>
        <button className='play-btn' onClick={()=>handleClick(name)}> 
            Play Game
        </button>
      </div>
    </div>
    </div>
    
  )
}

export default Input
