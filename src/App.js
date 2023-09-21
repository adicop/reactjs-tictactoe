import './App.css';

import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

import Square from './Components/Square';
import { WinningPatterns } from './WinningPatterns';

const initialTable = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [table, setTable] = useState(initialTable);
  const [currentPlayer, setCurrentPlayer] = useState({name: null, item: null});
  const [playerOne, setPlayerOne] = useState({name: null, item: "X"});
  const [playerTwo, setPlayerTwo] = useState({name: null, item: "O"});
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState({ winner: null, state: null });

  useEffect(() => {
    checkWin();
    checkIfTie();

    if(currentPlayer.item === "X") {
      setCurrentPlayer(playerTwo);
    } else {
      setCurrentPlayer(playerOne);
    }
  }, [table]);

  useEffect(() => {
    const { winner, state } = result;

    if (state === "won") {
      alert(`Game won by: ${winner} !!!`);
      restart();
    } else if (state === "tie") {
      alert("IT IS A TIE, TRY BETTER NEXT TIME !!!");
      restart();
    }
  }, [result]);

  const initializeGame = () => {
    const { name: playerOneName } = playerOne;
    const { name: playerTwoName } = playerTwo;

    playerOneName && playerTwoName ? (setGameStarted(true) && setCurrentPlayer(playerOne)) : alert("PLEASE ENTER YOUR NAMES");
  }

  const onClickSquare = (square) => {
    setTable(table.map((value, index) => {
      if (index === square && value === "") return currentPlayer.item

      return value;
    }))
  };

  const checkWin = () => {
    WinningPatterns.forEach((pattern) => {
      const firstPlayer = table[pattern[0]];

      if(firstPlayer === "") return;

      let foundWinningPattern = true;

      pattern.forEach((index) => {
        if(table[index] !== firstPlayer) {
          foundWinningPattern = false;
        }
      })

      if(foundWinningPattern) {
        setResult({ winner: currentPlayer.name, state: "won" });
      }
    })
  }

  const checkIfTie = () => {
    let tableFilled = true;
    table.forEach((square) => {
      if(square === "") {
        tableFilled = false;
      }
    })

    if(tableFilled) {
      setResult({ winner: null, state: "tie" });
    }
  }

  const restart = () => {
    setTable(initialTable);
  }

  return (
    <Grid className="wrapper">
      {!gameStarted ? 
        <Grid 
          className="form"
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <input
              placeholder="Player 1"
              onBlur={(event) => {
                setPlayerOne({...playerOne, name: event.target.value});
              }}
            />
          </Grid>
          <Grid item>
            <input
              placeholder="Player 2"
              onBlur={(event) => {
                setPlayerTwo({...playerTwo, name: event.target.value});
              }}
            />
          </Grid>
          <Grid item>
            <button onClick={initializeGame}>Start Game</button>
          </Grid>
        </Grid>
      : 
        <div className="table">
          <div className='row'>
            <Square value={table[0]} onclick={() => onClickSquare(0)}/>
            <Square value={table[1]} onclick={() => onClickSquare(1)}/>
            <Square value={table[2]} onclick={() => onClickSquare(2)}/>
          </div>
          <div className='row'>
            <Square value={table[3]} onclick={() => onClickSquare(3)}/>
            <Square value={table[4]} onclick={() => onClickSquare(4)}/>
            <Square value={table[5]} onclick={() => onClickSquare(5)}/>
          </div>
          <div className='row'>
            <Square value={table[6]} onclick={() => onClickSquare(6)}/>
            <Square value={table[7]} onclick={() => onClickSquare(7)}/>
            <Square value={table[8]} onclick={() => onClickSquare(8)}/>
          </div>
        </div>
      }
    </Grid>
  );
}

export default App;
