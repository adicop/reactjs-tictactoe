import '../App.css';

import React from "react";

function Square({value, onclick}) {
  return (
    <div className="square" onClick={onclick}>
      {value}
    </div>
  )
}

export default Square;