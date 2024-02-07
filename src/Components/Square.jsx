import React from 'react'
import './Square.css'
import Lottie from 'lottie-react'
import cross from '../Animations/cross.json'
import zero from '../Animations/zero.json'

function Square({value,squareClick}) {
  return (
    <>
     <div onClick={squareClick} className="square">
        <div className="text">   
        {value == 'X' ?
          <Lottie
          animationData={cross}
          autoplay={true}
          loop={false}
          className='animation-square'
          // height={100}
          // width={100}
        />:""
        }
        {
          value=='0'?
          <Lottie
          animationData={zero}
          autoplay={true}
          loop={false}
          className='animation-square'
          // height={100}
          // width={100}
        />:""
        }
        </div>   
     </div> 
    </>
  )
}

export default Square
