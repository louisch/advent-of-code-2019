(function() {
function fuelCalc(mass) {
  return Math.floor(mass / 3) - 2
}

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

const day1 = {
  part1: function(masses) {
    return sum(masses.map(f => fuelCalc(f)))
  },
  part2: function(masses) {
    return sum(masses.map(f => calcFuelRecurse(f)))
  }
}

window.onload = () => {
  const onchange = (event) => {
    const parsed = parseLineValues(event.target.value)
    const output = day1.part1(parsed.map(s => parseInt(s)))
    document.querySelector('#output-day1').textContent = output
  }
  document.querySelector("#textarea-day1").addEventListener('change', onchange)
  document.querySelector("#textarea-day1").addEventListener('keyup', onchange)
}
})()
