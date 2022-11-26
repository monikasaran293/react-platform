import React, { useEffect, useReducer, useState } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const PLAYER = {
  'O': 'X',
  'X': 'O'
}

function Square({ id, value = '' }) {
  return (
    <div
      id={id}
      className="square"
      style={squareStyle}>
      {value}
    </div>
  );
}

function Board() {
  const [player, setPlayer] = useState(PLAYER.O)
  const [playerPlaces, setPlayerPlaces] = useState({
    [PLAYER.O]: [],
    [PLAYER.X]: []
  })
  const [winner, setWinner] = useState('None')
  const [boardValues, setBoardValues] = useState({})

  useEffect(() => {
    console.log(player);
    console.log(boardValues);
    console.log(playerPlaces);
    console.log('-----------------------');
  }, [boardValues])

  const onReset = () => {
    setBoardValues({})
    setPlayer(PLAYER.O)
  }

  const isWinner = () => {
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        let pos = '' + i + j
      }
    }
  }

  const onBoardClick = (e) => {
    let index = e.target.id
    if (!boardValues[index]) {
      setBoardValues({ ...boardValues, [index]: player })
      setPlayer(PLAYER[player])
      setPlayerPlaces({ ...playerPlaces, [player]: [...playerPlaces[player], index] })
    }

  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={onReset}>Reset</button>
      <div style={boardStyle} onClickCapture={onBoardClick}>
        <div className="board-row" style={rowStyle}>
          <Square id='11' value={boardValues['11']} />
          <Square id='12' value={boardValues['12']} />
          <Square id='13' value={boardValues['13']} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square id='21' value={boardValues['21']} />
          <Square id='22' value={boardValues['22']} />
          <Square id='23' value={boardValues['23']} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square id='31' value={boardValues['31']} />
          <Square id='32' value={boardValues['32']} />
          <Square id='33' value={boardValues['33']} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game