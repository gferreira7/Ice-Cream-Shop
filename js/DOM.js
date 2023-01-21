document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('start-button').style.visibility = 'none'
  startGame()

  // creating Assets to load
  purpleFloor = new Image()
  purpleFloor.src = './images/purplefloor.png'

  ceramicBacksplash = new Image()
  ceramicBacksplash.src = './images/brightpurplebacksplash.png'

  const tableImg = new Image()
  tableImg.src = './images/table.png'

  const iceCreamMachineImg = new Image()
  iceCreamMachineImg.src = './images/icecreammachine.png'

  const coneStorageImg = new Image()
  coneStorageImg.src = './images/waffle.png'

  const binImg = new Image()
  binImg.src = './images/bin.png'

  const wallSignImg = new Image()
  wallSignImg.src = './images/wallsign.png'

  const trayImg = new Image()
  trayImg.src = './images/bakingtray.png'

  const dishesImg = new Image()
  dishesImg.src = './images/dishes.png'

  const checkoutImg = new Image()
  checkoutImg.src = './images/counter.png'

  const speechBubbleImg = new Image()
  speechBubbleImg.src = './images/speechBubble.png'

  const iceCreamTable = new Component(
    'icecreamtable',
    tableImg,
    10,
    260,
    260,
    169
  )
  const coneTable = new Component('conetable', tableImg, 225, 260, 260, 169)

  const iceCreamMachine = new Component(
    'multistorage',
    iceCreamMachineImg,
    135,
    145,
    100,
    118
  )

  //stack of trays
  const tray1 = new Component('tray1', trayImg, 265, 243, 100, 20)
  const tray2 = new Component('tray2', trayImg, 265, 233, 100, 20)
  const tray3 = new Component('tray3', trayImg, 265, 223, 100, 20)
  const tray4 = new Component('tray4', trayImg, 265, 213, 100, 20)
  const tray5 = new Component('tray5', trayImg, 265, 203, 100, 20)

  const bin = new Component('bin', binImg, 770, 310, 140, 150)
  const wallSign = new Component(
    'wallsign',
    wallSignImg,
    gameBoard.canvas.width - 125,
    25,
    125,
    125
  )

  const coneStorage = new Component(
    'coneStorage',
    coneStorageImg,
    400,
    193,
    55,
    70
  )

  const dishes = new Component('dishes', dishesImg, 35, 205, 85, 60)
  player = new Player('player', playerImg, 450, 225, 120, 240)

  const checkout = new Component(
    'checkoutCounter',
    checkoutImg,
    gameBoard.canvas.width - 300,
    175,
    300,
    300
  )

  const speech = new Component(
    'speech',
    speechBubbleImg,
    player.posX,
    player.aapaposY,
    200,
    150
  )

  gameBoard.nonCollisionComponents.push(iceCreamTable)
  gameBoard.components.push(iceCreamMachine)
  gameBoard.nonCollisionComponents.push(coneTable)
  gameBoard.nonCollisionComponents.push(dishes)
  gameBoard.components.push(coneStorage)
  // tray stack
  gameBoard.nonCollisionComponents.push(tray1)
  gameBoard.nonCollisionComponents.push(tray2)
  gameBoard.nonCollisionComponents.push(tray3)
  gameBoard.nonCollisionComponents.push(tray4)
  gameBoard.nonCollisionComponents.push(tray5)
  gameBoard.nonCollisionComponents.push(wallSign)

  //
  gameBoard.components.push(player)
  gameBoard.components.push(speech)
  gameBoard.nonCollisionComponents.push(bin)
  gameBoard.components.push(checkout)

  const orderflowInterval = setInterval(() => {
    if (!gameBoard.isGamePaused) {
      updateOrders()
      updateTimeLeft()
      updateScore()
      updateInventory()
    }
  }, 1000)

  const refreshRate = setInterval(gameBoard.updateCanvas, 20)
})

const startGame = () => {
  gameBoard.isGameStarted = true
  document.getElementById('start-button').style.display = 'none'
  document.getElementById('game-title').style.display = 'none'
  document.getElementById('main-game-container').style.display = 'flex'
  gameBoard.createCanvas()
}

//handle Movement Keys

document.addEventListener('keydown', ({ key }) => {
  if (
    !gameBoard.isGameStarted ||
    gameBoard.isGameOver ||
    gameBoard.isGamePaused
  ) {
    return
  }
  switch (key) {
    case 'w':
      gameBoard.isUpKeyPressed = true
      player.isPlayerMoving = true
      break
    case 's':
      gameBoard.isDownKeyPressed = true
      player.isPlayerMoving = true
      break
    case 'a':
      gameBoard.isLeftKeyPressed = true
      player.isPlayerMoving = true
      player.isFacingLeft = true
      player.isFacingRight = false
      break
    case 'd':
      gameBoard.isRightKeyPressed = true
      player.isPlayerMoving = true
      player.isFacingLeft = false
      player.isFacingRight = true
      break
    case 'p':
      gameBoard.isActionKeyPressed = true
      break
    case '1':
    case '2':
    case '3':
      if (player.isChoosingFlavour) {
        chooseFlavour(key)
      }
      break
    case 'i':
      gameBoard.isInstructionsKeyPressed = true
      break
    case ' ':
    case 'enter':
      return
    default:
      return
  }
})

document.addEventListener('keyup', ({ key }) => {
  if (
    !gameBoard.isGameStarted ||
    gameBoard.isGameOver ||
    gameBoard.isGamePaused
  ) {
    return
  }
  switch (key) {
    case 'w':
      gameBoard.isUpKeyPressed = false
      player.isPlayerMoving = false
      break
    case 's':
      gameBoard.isDownKeyPressed = false
      player.isPlayerMoving = false
      break
    case 'a':
      gameBoard.isLeftKeyPressed = false
      player.hasRanFunction = 0
      player.isPlayerMoving = false
      break
    case 'd':
      gameBoard.isRightKeyPressed = false
      player.hasRanFunction = 0
      player.isPlayerMoving = false
      break
    case 'p':
      gameBoard.isActionKeyPressed = false
      break
    case 'i':
      gameBoard.isInstructionsKeyPressed = false
      break
    case '1':
    case '2':
    case '3':
      player.isChoosingFlavour = false
    case ' ':
    case 'enter':
      return
    default:
      return
  }
})

const updateOrders = () => {
  const pendingOrdersDisplay = document.getElementById('pending-orders-display')
  pendingOrdersDisplay.innerHTML = ''

  gameBoard.orders.forEach((order) => {
    order.currentTimeLeft--
    if (order.currentTimeLeft === 0) {
      gameBoard.orders.shift()
      gameBoard.combo = 0
    }
    console.log(gameBoard.orders)

  })
  gameBoard.addOrder()

  //update the DOM , add/remove new orders

  gameBoard.orders.forEach((order) => {
    const singlePendingOrderDiv = document.createElement('div')
    singlePendingOrderDiv.innerHTML = ''
    singlePendingOrderDiv.className = 'order-container'

    const progressBar = document.createElement('div')
    progressBar.classList = 'progress-bar'
    progressBar.style.height = '10px'
    progressBar.style.width = `${order.currentTimeLeft}%`
    progressBar.style.backgroundColor = 'green'
    singlePendingOrderDiv.innerHTML = `<img src="./images/${order.flavour}.png">`
    singlePendingOrderDiv.appendChild(progressBar)
    pendingOrdersDisplay.appendChild(singlePendingOrderDiv)
    console.log(gameBoard.orders)
    order.updateProgressBar()
    order.secondsElapsed++
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
  const scoreDisplay = document.getElementById('score-display')

  scoreDisplay.innerHTML = ''
  scoreDisplay.innerHTML = `<h2>Score ${gameBoard.score}$</h2>
  <h2>Combo: X${gameBoard.combo}</h2>`
}

const updateInventory = () => {
  const inventory = document.getElementById('inventory-list')
  inventory.innerHTML = ''
  for (let key in player.heldItems) {
    if (player.heldItems[key]) {
      let heldItemImg = document.createElement('img')
      heldItemImg.src = `./images/${key}.png`
      heldItemImg.style.objectFit = 'cover'
      inventory.appendChild(heldItemImg)
    }
  }
}

document.getElementById('pause-button').addEventListener('click', () => {
  gameBoard.isGamePaused = !gameBoard.isGamePaused

  console.log(gameBoard.isGamePaused)
})
