import { useState, useEffect } from 'react'

import ScoreBoard from './components/ScoreBoard'

import blueCandy from './images/blue-candy.png'
import greenCandy from './images/green-candy.png'
import orangeCandy from './images/orange-candy.png'
import redCandy from './images/red-candy.png'
import purpleCandy from './images/purple-candy.png'
import yellowCandy from './images/yellow-candy.png'
import blank from './images/blank.png'

const width = 8
const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy,
]

const App = () => {
  const [colorArrangement, setColorArrangement] = useState([])
  const [squareBeingDraged, setSquareBeingDraged] = useState(null)
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  const createBoard = () => {
    const randomColorArrangement = []

    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColorArrangement.push(randomColor)
    }

    setColorArrangement(randomColorArrangement)
  }

  const checkForColumnThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnThree = [i, i + width, i + width * 2]
      const decidedColor = colorArrangement[i]
      const isBlank = colorArrangement[i] === blank
      if (
        columnThree.every(
          (square) => colorArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3)
        columnThree.forEach((square) => (colorArrangement[square] = blank))
        return true
      }
    }
  }

  const checkForColumnFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = colorArrangement[i]
      const isBlank = colorArrangement[i] === blank

      if (
        columnFour.every(
          (square) => colorArrangement[square] === decidedColor
        ) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4)
        columnFour.forEach((square) => (colorArrangement[square] = blank))
        return true
      }
    }
  }

  const checkForRowThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowThree = [i, i + 1, i + 2]
      const decidedColor = colorArrangement[i]
      const isBlank = colorArrangement[i] === blank
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ]

      if (notValid.includes(i)) continue

      if (
        rowThree.every((square) => colorArrangement[square] === decidedColor) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 3)
        rowThree.forEach((square) => (colorArrangement[square] = blank))
        return true
      }
    }
  }

  const checkForRowFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = colorArrangement[i]
      const isBlank = colorArrangement[i] === blank
      const notValid = [
        5, 13, 21, 29, 37, 45, 53, 61, 6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46,
        47, 54, 55, 62, 63, 64,
      ]

      if (notValid.includes(i)) continue

      if (
        rowFour.every((square) => colorArrangement[square] === decidedColor) &&
        !isBlank
      ) {
        setScoreDisplay((score) => score + 4)
        rowFour.forEach((square) => (colorArrangement[square] = blank))
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && colorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        colorArrangement[i] = candyColors[randomNumber]
      }

      if (colorArrangement[i + width] === blank) {
        colorArrangement[i + width] = colorArrangement[i]
        colorArrangement[i] = blank
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDraged(e.target)
  }
  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = () => {
    const squareBeingDraggeddId = parseInt(
      squareBeingDraged.getAttribute('data-id')
    )
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute('data-id')
    )

    colorArrangement[squareBeingReplacedId] =
      squareBeingDraged.getAttribute('src')
    colorArrangement[squareBeingDraggeddId] =
      squareBeingReplaced.getAttribute('src')

    const validMoves = [
      squareBeingDraggeddId - 1,
      squareBeingDraggeddId + 1,
      squareBeingDraggeddId - width,
      squareBeingDraggeddId + width,
    ]

    const validMove = validMoves.includes(squareBeingReplacedId)

    const isColumnFour = checkForColumnFour()
    const isColumnThree = checkForColumnThree()
    const isRowFour = checkForRowFour()
    const isRowThree = checkForRowThree()

    console.log(squareBeingReplacedId, validMove, validMoves)

    if (
      squareBeingReplacedId &&
      validMove &&
      (isRowFour || isRowThree || isColumnFour || isColumnThree)
    ) {
      setSquareBeingDraged(null)
      setSquareBeingReplaced(null)
    } else {
      colorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute('src')
      colorArrangement[squareBeingDraggeddId] =
        squareBeingDraged.getAttribute('src')
      setColorArrangement([...colorArrangement])
    }
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnFour()
      checkForColumnThree()
      checkForRowFour()
      checkForRowThree()
      moveIntoSquareBelow()
      setColorArrangement([...colorArrangement])
    }, 100)

    return () => clearInterval(timer)
  }, [
    checkForColumnFour,
    checkForColumnThree,
    checkForRowFour,
    checkForRowThree,
    moveIntoSquareBelow,
    colorArrangement,
  ])

  return (
    <div className="app">
      <div className="game">
        {colorArrangement.map((candyColor, index) => (
          <img
            key={index}
            alt={candyColor}
            src={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={scoreDisplay} />
    </div>
  )
}

export default App
