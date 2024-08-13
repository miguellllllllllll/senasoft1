import { sleep } from './util.js'
import { getHanoiSolutions } from './hanoi.js'

// seleccionar todos los elementos de la torre
const towers = document.querySelectorAll('.tower')

// inicializa towerContent como una matriz bidimencional que representan los discos en cada torre
let towerContent = [[], [], []]

//inicializar el tamaño de los discos
let size = 3

let discs

// tiempo y velocidad de las pausas
const sleepTime = 300
let speed = 100

// color de discos
const DISC_COLORS = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#3a86ff']

// Ancho inicial de los discos
const startWidth = 90

// html elements
const newGameBtn = document.getElementById('newGameBtn')
const discSelect = document.getElementById('discSelect')
const speedRange = document.getElementById('speedRange')
const btnSolve = document.getElementById('btnSolve')

// Variables para rastrear la torre actual y de origen durante el arrastre.
let currentTower
let originTower

// Función para construir las torres con base y placas.
const buildTowers = (towers) => {
  towers.forEach(tower => {
    const stem = document.createElement('div')
    stem.className = 'stem'
    const plate = document.createElement('div')
    plate.className = 'plate'
    tower.innerHTML = ''
    tower.appendChild(stem)
    tower.appendChild(plate)
  })
}

// iniciar el juego
start()

function start() {
  /// restablecer la matriz towerContent
  towerContent = [[], [], []]

  // Construye las torres con los palos y placas.
  buildTowers(towers)

  // Crea discos y colócalos en la primera torre.
  for (let i = 0; i < size; i++) {
    let tower = document.createElement('div')
    tower.classList.add('disc')
    tower.draggable = true
    tower.style.backgroundColor = DISC_COLORS[i]
    tower.style.width = (startWidth - 15 * i) + 'px'
    towerContent[0].push(tower)
  }

  // Añade el disco a la primera torre en el DOM.
  towerContent[0].forEach(t => {
    towers[0].innerHTML = t.outerHTML + towers[0].innerHTML
  })

  // Agregue detectores de eventos para Dragenter y Dragover a cada torre.
  for (let i = 0; i < towers.length; i++) {
    towers[i].classList.add('t' + i)
    towers[i].addEventListener('dragenter', dragenter)
    towers[i].addEventListener('dragover', dragover)
  }

  // obtener referencias a todos los discos
  discs = document.querySelectorAll('.disc')

  discs.forEach(disc => {
    disc.addEventListener('dragstart', dragstart)
    disc.addEventListener('dragend', dragend)
  })
}

// evento handler por dragenter
function dragenter() {
  if (!originTower) {
    originTower = this
  }
}

// evento handler por dragover
function dragover() {
  currentTower = this
}

// evento handler por dragstart
function dragstart() {
  this.classList.add('is-dragging')
}

// evento handler por dragend

function dragend() {
  let originTowerIndex = originTower.classList[1][1]
  let currentTowerIndex = currentTower.classList[1][1]
  this.classList.remove('is-dragging')

  moveTower(originTowerIndex, currentTowerIndex, this)

  originTower = undefined
  originTowerIndex = undefined
}

// Mueve el disco desde la torre de origen a la torre actual.
function moveTower(originTowerIndex, currentTowerIndex, disc) {
  if (isDroppable(originTowerIndex, currentTowerIndex, disc)) {
    towerContent[currentTowerIndex].push(towerContent[originTowerIndex].pop())
    originTower.removeChild(disc)
    currentTower.prepend(disc)
  }
}

// Comprueba si el disco se puede dejar caer en la torre actual.
function isDroppable(originTowerIndex, currentTowerIndex, disc) {
  let top = isOnTop(originTowerIndex, disc)
  let topDiscIsLess = isDiscLessThan(currentTowerIndex, disc)

  return top && topDiscIsLess
}

// Comprueba si el disco está en la parte superior de la torre de origen.
function isOnTop(originTowerIndex, disc) {
  let size = towerContent[originTowerIndex].length
  return disc.style.width === towerContent[originTowerIndex][size - 1].style.width
}

// Comprueba si el disco es más pequeño que el disco superior de la torre actual.
function isDiscLessThan(currentTowerIndex, disc) {
  let size = towerContent[currentTowerIndex].length

  if (!towerContent[currentTowerIndex][size - 1]) {
    return true
  } else {
    let sizeTop = disc.style.width.substring(0, disc.style.width.indexOf('p'))
    let sizeBottom = towerContent[currentTowerIndex][size - 1].style.width.substring(0, towerContent[currentTowerIndex][size - 1].style.width.indexOf('p'))

    return Number(sizeTop) < Number(sizeBottom)
  }
}

// Mueve el disco superior de la torre de origen a la torre de destino.
function moveTopDisc(originTowerIndex, destinyTowerIndex) {
  originTower = towers[originTowerIndex]
  currentTower = towers[destinyTowerIndex]
  let disc = getTopDisc(originTowerIndex)
  moveTower(originTowerIndex, destinyTowerIndex, disc)
}

// Consigue el disco superior de la torre especificada.
function getTopDisc(towerIndex) {
  let size = towerContent[towerIndex].length

  let sizeDisc = towerContent[towerIndex][size - 1].style.width
  let indexDisc = -1
  discs.forEach((el, index) => {
    if (el.style.width === sizeDisc) {
      indexDisc = index
    }
  })
  return discs[indexDisc]
}

// animar los movimientos de la solución
async function moves(movements) {
  for (let i = 0; i < movements.length; i++) {
    const element = movements[i];
    moveTopDisc(element.origin, element.destiny)
    await sleep(5 * sleepTime - 14 * speed)
  }
}

// Game class
class Game {
  // método para iniciar un nuevo juego
  newGame = () => {
    // Detector de eventos para la entrada del rango de velocidad
    speedRange.addEventListener('input', event => {
      speed = event.target.value
    })

    // detector para el clic del botón del nuevo juego
    newGameBtn.addEventListener('click', () => {
      size = discSelect.selectedIndex + 1
      start()
    })

    // evento del boton resolver
    btnSolve.onclick = function() {
      const movements = getHanoiSolutions(size)
      moves(movements)
    }
  }
}

export default Game