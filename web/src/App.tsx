import React from 'react'

import './day1'
import './day2'


function App() {
  return (
    <div class='wrapper'>
      <h2>Day 1</h2>
      <textarea id='textarea-day1' class='textarea'></textarea>
      <span id='output-day1' class='output' />

      <div class='day2'>
        <h2>Day 2</h2>
        <textarea id='day2-program' class='textarea'></textarea>
        <button id='day2-run-program' class='button'>Run Program!</button>
        <span id='day2-output' class='output' />
      </div>
    </div>
  )
}

export default App
