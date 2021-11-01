import React from 'react'

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
    <div class="box">
  <div class="container"><h1>You have scored: {score}</h1></div>
</div>
      
      <p>
        <h3>Scoring Schemes:
        <ol>
          <li>
            <strong>With a column or a row of 4: </strong>4 points
          </li>
          <li>
            <strong>With a column or a row of 3: </strong>3 points
          </li>
        </ol>
        </h3>
      </p>
      
    </div>
  )
}

export default ScoreBoard
