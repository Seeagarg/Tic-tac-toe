import React from 'react'
import './Square.css'

function Square({value,squareClick}) {
  return (
    <>
     <div onClick={squareClick} className="square">
        <div className="text">
        {value}
        </div>
           
     </div> 
    </>
  )
}

export default Square
