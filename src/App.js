import './App.css';

import { useState, useEffect } from 'react';

import Square from './Components/Square';
import { WinningPatterns } from './WinningPatterns';

function App() {
  const [table, setTable] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({winner: null, state: null});

  useEffect(() => {
    checkWin();

    if(player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [table]);

  useEffect(() => {
    result.state && alert(`Game won by ${result.winner} !!!`);
  }, [result]);

  const onClickSquare = (square) => {
    setTable(table.map((value, index) => {
      if (index === square && value === "") return player

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
        setResult({winner: player, state: "won"});
      }
    })
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
