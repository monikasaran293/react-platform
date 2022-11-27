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
  const [player, setPlayer] = useState(PLAYER.X)
  const [playerPlaces, setPlayerPlaces] = useState({
    [PLAYER.O]: [],
    [PLAYER.X]: []
  })
  const [winner, setWinner] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [boardValues, setBoardValues] = useState({})

  useEffect(() => {
    !gameOver && setPlayer(PLAYER[player])
  }, [boardValues])

  const onReset = () => {
    setBoardValues({})
    setPlayer(PLAYER.O)
    setGameOver(false)
    setWinner(null)
  }

  const isWinner = (id) => {
    const changedRow = id[0]
    const changedCol = id[1]
    const isDiagonalBox = changedRow === changedCol
      || parseInt(changedRow) + parseInt(changedCol) === 4
    if (isDiagonalBox) {
      let isDiagonal1 = true
      let isDiagonal2 = true
      for (let i = 1; i <= 3; i++) {
        let diagonal1Box = `${i}${i}`
        let diagonal2Box = `${4 - i}${i}`
        if (isDiagonal1) {
          isDiagonal1 = boardValues[diagonal1Box] === player || id === diagonal1Box
        }
        if (isDiagonal2) {
          isDiagonal2 = boardValues[diagonal2Box] === player || id === diagonal2Box
        }
      }
      if (isDiagonal1 || isDiagonal2) {
        setWinner(player)
        setGameOver(true)
      }
    }
    let isHorzontalMatch = true
    let isVerticalMatch = true
    for (let i = 1; i <= 3; i++) {
      let horizontalPos = `${changedRow}${i}`
      let verticalPos = `${i}${changedCol}`
      if (isHorzontalMatch) {
        isHorzontalMatch = boardValues[horizontalPos] === player || id === horizontalPos
      }
      if (isVerticalMatch) {
        isVerticalMatch = boardValues[verticalPos] === player || id === verticalPos
      }
    }
    if (isHorzontalMatch || isVerticalMatch) {
      setWinner(player)
      setGameOver(true)
    }
  }

  const onBoardClick = (e) => {
    if (!gameOver) {
      let index = e.target.id
      if (!boardValues[index]) {
        setBoardValues({ ...boardValues, [index]: player })
        setPlayerPlaces({ ...playerPlaces, [player]: [...playerPlaces[player], index] })
        isWinner(index)
      }
    }
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        Next player: <span>{gameOver ? 'Game Over!' : player}</span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner || 'None'}</span>
      </div>
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