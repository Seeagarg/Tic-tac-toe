import React, { useEffect, useState } from 'react'
import Square from './Square'
import './Home.css'
import Lottie from 'lottie-react';
import  winner  from '../Animations/winner.json'
import './Input.css'

function Home() {

    const [box,setBox] = useState(Array(9).fill(null));
    const [userTurn,setUserTurn] = useState(true);


    const checkWinner=()=>{

            const winArray =[
                [0,1,2],
                [0,3,6],
                [0,4,8],
                [1,4,7],
                [2,5,8],
                [2,4,6],
                [3,4,5],
                [6,7,8]
    
            ]
    
            for(let logic of winArray){
                const [a,b,c] = logic;
                if(box[a] === box[b] && box[b] === box[c]){
    
                    return box[a];
                }
    
            }
            return false;
        
        
    } 

    const isWinner = checkWinner();

    const computerTurn=()=>{
        if(!userTurn){
            for(let i=0;i<9;i++){
                const randomIndex = Math.floor(Math.random() * box.length)
                if(!box[randomIndex]){
                    const copyBox = [...box];
                    copyBox[randomIndex] = '0';
                    setBox(copyBox);
                    setUserTurn(!userTurn);
                }
            }
        }
    }

    useEffect(()=>{
        setTimeout(()=>{computerTurn()},1000)
    },[userTurn])

    useEffect(()=>{
        if(!isWinner && box.forEach((item)=>(item !== null))){
            setBox(Array(9).fill(null));
        }
    })

    const squareClick=(index)=>{
        if(box[index] !== null){
            return;
        }
        
        const copyState = [...box];
        copyState[index] = userTurn ? 'X' : '0';
        setBox(copyState);
        setUserTurn(!userTurn);
        // console.log(index," clicked")
    }

    function clickHandler(){
        console.log("clicked")
        setBox(Array(9).fill(null))
    }

  return (
    <div className='' >
    
    <div className='title'>Tic Tac Toe Game</div>
     {
        isWinner?(
            <>
            <div className='win'>
            <div className="winData">
            <h3>{isWinner === 'X' ? "you Won the Game" : "computer wons the game"}</h3>
           <button className='play-btn' onClick={clickHandler}> Play Again</button>
            </div>
            
            
            <div className="animation">
            <Lottie
                animationData={winner}
                loop={true}
                autoPlay={true}
            />
            </div>

            
        
        
            </div>
            
        </>
        )
        :
        <>
      <div className='board'>
       
      <h3 style={{marginBottom:"40px",color:"black",fontWeight:"bold",fontSize:"1.5rem"}}> {userTurn? 'X will run the move'
        : '0 will run the move'}</h3>
      <div className="board-row">
      <Square value={box[0]} squareClick={()=>{setTimeout(squareClick(0),3000)}}/>
      <Square value={box[1]} squareClick={()=>{squareClick(1)}}/>
      <Square value={box[2]} squareClick={()=>{squareClick(2)}}/>
      </div>
      <div className="board-row">
      <Square value={box[3]} squareClick={()=>{squareClick(3)}}/>
      <Square value={box[4]} squareClick={()=>{squareClick(4)}}/>
      <Square value={box[5]} squareClick={()=>{squareClick(5)}}/>
      </div>
      <div className="board-row">
      <Square value={box[6]} squareClick={()=>{squareClick(6)}}/>
      <Square value={box[7]} squareClick={()=>{squareClick(7)}}/>
      <Square value={box[8]} squareClick={()=>{squareClick(8)}}/>
      </div>
      </div>
      </>
     }
    </div>
  )
}

export default Home
