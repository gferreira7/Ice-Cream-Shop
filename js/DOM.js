document.getElementById('start-button').addEventListener('click', () => {
  gameBoard.createCanvas()

  // creating Assets to load
  const cupBoardImg = new Image()
  cupBoardImg.src = './images/cupBoard.png'
  const cupBoard = new Component('cupboard', cupBoardImg, 0, 0, 100, 200)
  gameBoard.components.push(cupBoard)

  // top counter
  // counter 51*74 px
  const mainCounterImg = new Image()
  mainCounterImg.src = './images/counterMain.png'
  const vanillaCounter = new Image()
  vanillaCounter.src = './images/vanillaCounter.png'
  const chocolateCounter = new Image()
  chocolateCounter.src = './images/chocolateCounter.png'
  const strawberryCounter = new Image()
  strawberryCounter.src = './images/strawberryCounter.png'

  const mainCounter = new Component(
    'assemblyCounter',
    mainCounterImg,
    300,
    0,
    100,
    150
  )
  gameBoard.components.push(mainCounter)

  //checkout counter 1200*1200 px
  const checkoutImg = new Image()
  checkoutImg.src = './images/checkout.png'

  const checkout = new Component(
    'checkoutCounter',
    checkoutImg,
    550,
    0,
    150,
    150
  )
  gameBoard.components.push(checkout)

  const bottomCounterLeft = new Component(
    'vanilla',
    vanillaCounter,
    0,
    gameBoard.canvas.height - 150,
    100,
    150
  )
  gameBoard.components.push(bottomCounterLeft)
  const bottomCounterMiddle = new Component(
    'chocolate',
    chocolateCounter,
    300,
    gameBoard.canvas.height - 150,
    100,
    150
  )
  gameBoard.components.push(bottomCounterMiddle)
  const bottomCounterRight = new Component(
    'strawberry',
    strawberryCounter,
    550,
    gameBoard.canvas.height - 150,
    100,
    150
  )
  gameBoard.components.push(bottomCounterRight)

  const playerImg = new Image()
  playerImg.src = './images/leoBeo.png'
  player = new Player('player', playerImg, 400, 225, 84, 72)
  gameBoard.components.push(player)

  //every second each recipe timer is updated 1s and it tries to add a new order (MAX.4)

  const orderflowInterval = setInterval(() => {
    updateOrders()
    updateTimeLeft()
    updateScore()
  }, 1000)

  const refreshRate = setInterval(gameBoard.updateCanvas, 20)
})

//handle Movement Keys
//TODO Action Key, pause menu
document.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'Up':
    case 'ArrowUp':
      gameBoard.isUpKeyPressed = true
      break
    case 'Down':
    case 'ArrowDown':
      gameBoard.isDownKeyPressed = true
      break
    case 'Left':
    case 'ArrowLeft':
      gameBoard.isLeftKeyPressed = true
      break
    case 'Right':
    case 'ArrowRight':
      gameBoard.isRightKeyPressed = true
      break
    case 'p':
      gameBoard.isActionKeyPressed = true
    default:
      return
  }
})

document.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'Up':
    case 'ArrowUp':
      gameBoard.isUpKeyPressed = false
      break
    case 'Down':
    case 'ArrowDown':
      gameBoard.isDownKeyPressed = false
      break
    case 'Left':
    case 'ArrowLeft':
      gameBoard.isLeftKeyPressed = false
      break
    case 'Right':
    case 'ArrowRight':
      gameBoard.isRightKeyPressed = false
      break
    case 'p':
      gameBoard.isActionKeyPressed = false
    default:
      return
  }
})

const updateOrders = () => {
  const pendingOrdersDisplay = document.getElementById('pending-orders-display')
  pendingOrdersDisplay.innerHTML = ''

  gameBoard.orders.forEach((order) => {
    order.timeLeft--
    if (order.timeLeft === 0) {
      gameBoard.orders.shift()
    }
  })
  gameBoard.addOrder()

  //update the DOM , add/remove new orders

  gameBoard.orders.forEach((order) => {
    const singlePendingOrderDiv = document.createElement('div')
    singlePendingOrderDiv.className = 'order-container'
    singlePendingOrderDiv.innerHTML = `${order.flavour}
    <img src="./images/${order.flavour}.png"><img /> 
    time left: ${order.timeLeft}`

    pendingOrdersDisplay.appendChild(singlePendingOrderDiv)
  })
}
const updateTimeLeft = () => {
  gameBoard.gameTimeLeft--
  if (gameBoard.gameTimeLeft <= 0) {
    gameBoard.isGameOver = true
  }

  const timeLeftDisplay = document.getElementById('time-left-display')
  timeLeftDisplay.innerHTML = ''
  timeLeftDisplay.innerHTML = gameBoard.isGameOver
    ? `<h1>GAME OVER</h1>`
    : `<h2>TIME LEFT ${gameBoard.gameTimeLeft}s</h2>`
}

const updateScore = () => {
  gameBoard.score += 20
  const scoreDisplay = document.getElementById('score-display')
  scoreDisplay.innerHTML = ''
  scoreDisplay.innerHTML = `<h2>Score ${gameBoard.score}$</h2>
  <h2>Combo: ${gameBoard.combo} X</h2>`
}

const updateInventory = () => {
  const inventory = document.getElementById('inventory-container')
  inventory.innerHTML = ''
  const itemList = document.createElement('ul')

  for (const key in player.heldItems) {
    if(player.heldItems[key]){
      const heldItem = document.createElement('li')
      heldItem.innerHTML = `${key}`
      itemList.appendChild(heldItem)
    }
  }

  inventory.appendChild(itemList)
  
  
}
