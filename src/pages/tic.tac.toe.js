import React, { useState, useEffect } from 'react';

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
  const [winner, setWinner] = useState(null)
  const [boardValues, setBoardValues] = useState({})

  useEffect(() => {
    !winner && setPlayer(PLAYER[player])
  }, [boardValues])

  const onReset = () => {
    setBoardValues({})
    setPlayer(PLAYER.O)
    setWinner(null)
  }

  const isWinner = (id) => {
    const changedRow = id[0]
    const changedCol = id[1]
    let isLeftDiagonal = true
    let isRightDiagonal = true
    let isHorizontal = true
    let isVertical = true

    for (let i = 1; i <= 3; i++) {
      let diagonalLeftPos = `${i}${i}`
      let diagonalRightPos = `${4 - i}${i}`
      let horizontalPos = `${changedRow}${i}`
      let verticalPos = `${i}${changedCol}`
      if (isHorizontal) {
        isHorizontal = boardValues[horizontalPos] === player || horizontalPos === id
      }
      if (isVertical) {
        isVertical = boardValues[verticalPos] === player || verticalPos === id
      }
      if (isLeftDiagonal) {
        isLeftDiagonal = boardValues[diagonalLeftPos] === player || diagonalLeftPos === id
      }
      if (isRightDiagonal) {
        isRightDiagonal = boardValues[diagonalRightPos] === player || diagonalRightPos === id
      }
    }

    if (isLeftDiagonal || isRightDiagonal || isHorizontal || isVertical) {
      setWinner(player)
    }
  }

  const onBoardClick = (e) => {
    if (!winner) {
      let clickedId = e.target.id
      if (!boardValues[clickedId]) {
        setBoardValues({ ...boardValues, [clickedId]: player })
        isWinner(clickedId)
      }
    }
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner || 'None'}</span></div>
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