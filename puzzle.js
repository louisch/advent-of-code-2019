const fuelCalc = (mass) => Math.floor(mass / 3) - 2

function calcFuelRecurse(mass) {
  let sum = 0
  let currentMass = mass
  while (true) {
    const fuelReq = fuelCalc(currentMass)
    if (fuelReq < 0) break
    sum += fuelReq
    currentMass = fuelReq
  }
  return sum
}

function sum(arr) {
  return arr.reduce((acc, current) => acc + current)
}

function parseLineValues(values) {
  return values.split(/\s+/)
}

function parseCommaSeparatedValues(values) {
  return values.split(',')
}

const day1 = {
  part1: function(masses) {
    return sum(masses.map(f => fuelCalc(f)))
  },
  part2: function(masses) {
    return sum(masses.map(f => calcFuelRecurse(f)))
  }
}

function getArgs(state, numberOfArgs) {
  const { position, tape } = state
  if (numberOfArgs === 0) return []
  if (position + numberOfArgs + 1 > tape.length) throw new TypeError(`Not enough arguments for executing opcode ${opcode} at position ${position}!`)
  return tape.slice(position + 1, position + numberOfArgs + 1)
}

function addOp(state) {
  const { tape, position } = state

  const [i1, i2, store] = getArgs(state, 3)
  if (tape[i1] === undefined) throw new TypeError(`Error OP: Add, POS: ${position} - Tape has nothing at position ${i1}`)
  if (tape[i2] === undefined) throw new TypeError(`Error OP: Add, POS: ${position} - Tape has nothing at position ${i2}`)

  const sum = tape[i1] + tape[i2]
  const newTape = [...tape]
  newTape[store] = sum

  return { ...state, tape: newTape, position: position + 4 }
}

function mulOp(state) {
  const { tape, position } = state

  const [i1, i2, store] = getArgs(state, 3)
  if (tape[i1] === undefined) throw new TypeError(`Error OP: Add, POS: ${position} - Tape has nothing at position ${i1}`)
  if (tape[i2] === undefined) throw new TypeError(`Error OP: Add, POS: ${position} - Tape has nothing at position ${i2}`)

  const sum = tape[i1] * tape[i2]
  const newTape = [...tape]
  newTape[store] = sum

  return { ...state, tape: newTape, position: position + 4 }
}

function termOp(state) {
  return { ...state, terminated: true }
}

function readInstruction(state) {
  const { tape, position } = state

  if (position > tape.length - 1) throw new TypeError('No valid tape left!')

  const opcode = tape[position]

  switch (opcode) {
    case 1:
      return addOp(state)
    case 2:
      return mulOp(state)
    case 99:
      return termOp(state)
    default:
      throw new TypeError(`Invalid opcode ${opcode} given at position ${position}!`)
  }
}

function readTape(tape) {
  let state = { terminated: false, tape, position: 0 }
  let run = 0
  let maximumRuns = 100000
  while (!state.terminated && run < maximumRuns) {
    state = readInstruction(state)
    run += 1
  }
  return state
}

const day2 = {
  part1: (inputTape) => {
    const outputTape = readTape(inputTape)
    return `Terminated: ${outputTape.terminated}, Tape: ${outputTape.tape}, Position: ${outputTape.position}`
  }
}

window.onload = () => {
  const onchange = (event) => {
    const parsed = parseCommaSeparatedValues(event.target.value)
    const output = day2.part1(parsed.map(s => parseInt(s)))
    console.log(output)
    document.querySelector('.output').textContent = output
  }
  document.querySelector(".textarea").addEventListener('change', onchange)
  document.querySelector(".textarea").addEventListener('keyup', onchange)
}
