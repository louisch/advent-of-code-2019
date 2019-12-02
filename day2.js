(function() {
function getParameters(state, numberOfParameters) {
  const { instructionPointer, memory } = state
  if (numberOfParameters === 0) return []
  if (instructionPointer + numberOfParameters + 1 > memory.length) throw new TypeError(`Not enough arguments for executing opcode ${opcode} at instructionPointer ${instructionPointer}!`)
  return memory.slice(instructionPointer + 1, instructionPointer + numberOfParameters + 1)
}

function addOp(state) {
  const { memory, instructionPointer } = state

  const [i1, i2, store] = getParameters(state, 3)
  if (memory[i1] === undefined) throw new TypeError(`Error OP: Add, POS: ${instructionPointer} - Memory has nothing at instructionPointer ${i1}`)
  if (memory[i2] === undefined) throw new TypeError(`Error OP: Add, POS: ${instructionPointer} - Memory has nothing at instructionPointer ${i2}`)

  const sum = memory[i1] + memory[i2]
  const newMemory = [...memory]
  newMemory[store] = sum

  return { ...state, memory: newMemory, instructionPointer: instructionPointer + 4 }
}

function mulOp(state) {
  const { memory, instructionPointer } = state

  const [i1, i2, store] = getParameters(state, 3)
  if (memory[i1] === undefined) throw new TypeError(`Error OP: Add, POS: ${instructionPointer} - Memory has nothing at instructionPointer ${i1}`)
  if (memory[i2] === undefined) throw new TypeError(`Error OP: Add, POS: ${instructionPointer} - Memory has nothing at instructionPointer ${i2}`)

  const sum = memory[i1] * memory[i2]
  const newMemory = [...memory]
  newMemory[store] = sum

  return { ...state, memory: newMemory, instructionPointer: instructionPointer + 4 }
}

function haltOp(state) {
  return { ...state, halted: true }
}

function runInstruction(state) {
  const { memory, instructionPointer } = state

  if (instructionPointer > memory.length - 1) throw new TypeError('No valid instructions left!')

  const opcode = memory[instructionPointer]

  switch (opcode) {
    case 1:
      return addOp(state)
    case 2:
      return mulOp(state)
    case 99:
      return haltOp(state)
    default:
      throw new TypeError(`Invalid opcode ${opcode} given at instructionPointer ${instructionPointer}!`)
  }
}

function runProgram(memory) {
  let state = { halted: false, memory, instructionPointer: 0 }
  let run = 0
  let maximumRuns = 100000
  while (!state.halted && run < maximumRuns) {
    state = runInstruction(state)
    run += 1
  }
  return state
}

function parseCommaSeparatedValues(joined) {
  return joined.split(',');
}

const day2 = {
  part1: (program) => {
    const outputMemory = runProgram(program)
    return `halted: ${outputMemory.halted}, Memory: ${outputMemory.memory}, instructionPointer: ${outputMemory.instructionPointer}`
  },
  part2: (program) => {
    const targetOutput = 19690720
    let success = null
    for (const noun of Array(100).fill().map((_, index) => index)) {
      for (const verb of Array(100).fill().map((_, index) => index)) {
        const programWithInputs = [...program]
        programWithInputs[1] = noun
        programWithInputs[2] = verb
        const output = runProgram(programWithInputs)
        if (output.memory[0] === targetOutput) {
          success = { noun, verb }
          break
        }
      }
    }

    return !success
      ? 'Error! No solutions found!'
      : `Success! Noun = ${success.noun}, Verb = ${success.verb}, Answer: ${100 * success.noun + success.verb}`
  }
}

function onChangeAndKeyUp(query, func) {
  console.log(query)
  document.querySelector(query).addEventListener('change', func)
  document.querySelector(query).addEventListener('keyup', func)
}

let program = ""

window.onload = () => {
  // Attach Event Listeners
  const setProgram = (event) => {
    program = event.target.value
  }
  onChangeAndKeyUp("#day2-program", setProgram)

  const onRunProgram = () => {
    const parsedProgram = parseCommaSeparatedValues(program).map(s => parseInt(s))
    const output = day2.part2(parsedProgram)
    console.log(output)
    document.querySelector('#day2-output').textContent = output
  }
  document.querySelector('#day2-run-program').addEventListener('click', onRunProgram)
}

})()
