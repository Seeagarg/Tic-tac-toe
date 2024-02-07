import React, { useEffect, useState } from 'react'
import Square from './Square'
import './Home.css'
import Lottie from 'lottie-react';
import  winner  from '../Animations/winner.json'
import './Input.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Strike from './Strike';


function Home() {

    const [box,setBox] = useState(Array(9).fill(null));
    const [isWinner,setWinner] = useState(null);
    const [userTurn,setUserTurn] = useState(true);
    const [winningSquares,setWinningSquares] = useState([]);
    const [endGame,setEndGame] = useState(false)

    const [strikeClass,setStrikeClass] = useState("");

    const navigate = useNavigate();

    const combination =[
        {combo:[0,1,2],strikeclass:"strike-row-1"},
        {combo:[3,4,5],strikeclass:"strike-row-2"},
        {combo:[6,7,8],strikeclass:"strike-row-3"},
        {combo:[0,3,6],strikeclass:"strike-col-1"},
        {combo:[1,4,7],strikeclass:"strike-col-2"},
        {combo:[2,5,8],strikeclass:"strike-col-3"},
        {combo:[0,4,8],strikeclass:"strike-diagonal-1"},
        {combo:[2,4,6],strikeclass:"strike-diagonal-2"},
    ]

    // const name = useSelector((state)=>state.name.value)
    

    const name = localStorage.getItem("NAME")


    useEffect(()=>{

        combination.map((item)=>{
            console.log("logic")
            console.log("winnn",winningSquares)
            console.log("item",item.combo)
            console.log(JSON.stringify(item.combo) == JSON.stringify(winningSquares))
            if(JSON.stringify(item.combo) == JSON.stringify(winningSquares)){
                console.log("-------",item.combo)
                setStrikeClass(item.strikeclass);
                setEndGame(true);
            }
        }
        )

    },[winningSquares])
    

    function checkWinner(){
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
                if( box[a] && box[b] && box[c] &&  box[a] === box[b] && box[b] === box[c]){
                    setWinningSquares(logic);
                    console.log(logic);
                    return box[a];
                }
            }
    
        return false;    
    } 

    

    useEffect(() => {
        const winner = checkWinner();
        const winnerCheckTimeout = setTimeout(() => {
            
            if (winner) {
                setWinner(winner);
                console.log(winningSquares);
            }
        }, 1000); 

        return () => clearTimeout(winnerCheckTimeout);
    }, [box]);
    
    
   

    

    const computerTurn=()=>{
        if(!userTurn && !endGame){
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


    const squareClick=(index)=>{
        if(box[index] !== null){
            return;
        }
        
        const copyState = [...box];
        copyState[index] = userTurn ? 'X' : '0';
        setBox(copyState);
        setUserTurn(!userTurn);
    }

    function clickHandler(){
        console.log("clicked")
        navigate('/')
        localStorage.removeItem("NAME")
        setBox(Array(9).fill(null))
    }

  return (
    <div className='home' >
    
    <div className='title'>Tic Tac Toe Game</div>
     {
        isWinner?(
            <>
            <div className='win'>
            <div className="winData">
            <div className='winner fw-bold text-white'>{isWinner === 'X' ? `${localStorage.getItem("NAME")} Won the Game` : "computer wons the game"}</div>
           <button className='play-btn' onClick={clickHandler}  > Play Again</button>
            </div>
            
            
            <div className="animation-win">
            <Lottie
                animationData={winner}
                loop={true}
                autoPlay={true}
                className="lottie-animation"
            />
            </div>    

            
        
        
            </div>
            
        </>
        )
        :
        <>
      <div className='board'>
       <div className="btn">
        <button onClick={()=>{setBox(Array(9).fill(null))}}>Reset Game</button>
       </div>
      <div className='turn'> {userTurn? `${name} will run the move`
        : 'Computer will run the move'}</div>
      <div className="board-row">
      <Square value={box[0]} squareClick={()=>{squareClick(0)}}/>
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
      <Strike strikeClass={strikeClass}/>
      </div>
      </>
     }
     
    </div>
  )
}

export default Home
