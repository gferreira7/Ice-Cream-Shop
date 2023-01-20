document.getElementById('start-button').addEventListener('click', () => {
  startGame()

  // creating Assets to load
  background = new Image()
  background.src = '/images/bluewall.png'

  const freezerImg = new Image()
  freezerImg.src = '/images/fridgeclosed.png'

  const coneStorageImg = new Image()
  coneStorageImg.src = '/images/conestorage.png'

  const assemblyCounterImg = new Image()
  assemblyCounterImg.src = '/images/assemblycounter.png'
  const assemblyCounter = new Component(
    'assemblyCounter',
    assemblyCounterImg,
    150,
    260,
    350,
    175
  )

  const multiStorage = new Component(
    'multistorage',
    freezerImg,
    450,
    230,
    180,
    200
  )
  const coneStorage = new Component(
    'coneStorage',
    coneStorageImg,
    5,
    170,
    150,
    250
  )

  player = new Player('player', playerImg, 400, 225, 100, 200)

  const checkoutImg = new Image()
  checkoutImg.src = '/images/checkoutcounter.png'

  const checkout = new Component(
    'checkoutCounter',
    checkoutImg,
    gameBoard.canvas.width - 320,
    200,
    350,
    350
  )

  gameBoard.components.push(coneStorage)
  gameBoard.components.push(assemblyCounter)
  gameBoard.components.push(multiStorage)
  gameBoard.components.push(player)

  gameBoard.components.push(checkout)

  const orderflowInterval = setInterval(() => {
    updateOrders()
    updateTimeLeft()
    updateScore()
    updateInventory()
    updateAssemblyCounter()
  }, 1000)

  const refreshRate = setInterval(gameBoard.updateCanvas, 10)
})

//handle Movement Keys

document.addEventListener('keydown', ({ key }) => {
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
    case ' ':
    case 'enter':
      return
    default:
      return
  }
})

document.addEventListener('keyup', ({ key }) => {
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
      player.isPlayerMoving = false

      break
    case 'd':
      gameBoard.isRightKeyPressed = false
      player.isPlayerMoving = false
      break
    case 'p':
      gameBoard.isActionKeyPressed = false
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
  const scoreDisplay = document.getElementById('score-display')

  scoreDisplay.innerHTML = ''
  scoreDisplay.innerHTML = `<h2>Score ${gameBoard.score}$</h2>
  <h2>Combo: ${gameBoard.combo} X</h2>`
}

const updateInventory = () => {
  const inventory = document.getElementById('inventory-container')
  inventory.innerHTML = ''
  const itemList = document.createElement('ul')

  for (let key in player.heldItems) {
    if (player.heldItems[key]) {
      let heldItem = document.createElement('li')
      heldItem.innerHTML = `In Hand: ${key}`
      itemList.appendChild(heldItem)
    }
  }

  inventory.appendChild(itemList)
}

const updateAssemblyCounter = () => {
  const assemblyCounter = document.getElementById('assembly-container')
  assemblyCounter.innerHTML = ''

  if (assemblyCounterItems.hasCone || assemblyCounterItems.flavour) {
    assemblyCounter.innerHTML = `<h2>In the Counter:</h2>`

    if (assemblyCounterItems.hasCone) {
      const coneItem = document.createElement('p')
      coneItem.innerHTML = 'Cone'
      assemblyCounter.appendChild(coneItem)
    }
    if (assemblyCounterItems.flavour) {
      const flavouritem = document.createElement('p')
      flavouritem.innerHTML = `${assemblyCounterItems.flavour}`
      assemblyCounter.appendChild(flavouritem)
    }
    if (assemblyCounterItems.hasCone && assemblyCounterItems.flavour) {
      const readyToDeliver = document.createElement('h3')
      readyToDeliver.innerHTML = `Ready to deliver: ${player.readyToDeliver}`
      assemblyCounter.appendChild(readyToDeliver)
    }
  }
}
