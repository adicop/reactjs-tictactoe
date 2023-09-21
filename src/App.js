import './App.css';

import { useState } from 'react';

import Square from './Components/Square';

function App() {
  const [table, setTable] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");

  const onClickSquare = (square) => {
    setTable(table.map((value, index) => {
      if (index === square) return player

      return value;
    }))

    if(player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

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
