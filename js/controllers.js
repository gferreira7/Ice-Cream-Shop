let player
let playerImg = new Image()
playerImg.src = 'images/playerImgs/idle0.png'

let playerFramesPath = '/images/playerImgs/'

let playerWalkFramesArray = [
  [
    `${playerFramesPath}walk0.png`,
    `${playerFramesPath}walk1.png`,
    `${playerFramesPath}walk2.png`,
    `${playerFramesPath}walk3.png`,
    `${playerFramesPath}walk4.png`,
    `${playerFramesPath}walk5.png`,
    `${playerFramesPath}walk6.png`,
    `${playerFramesPath}walk7.png`,
  ],
  [
    `${playerFramesPath}walkLeft0.png`,
    `${playerFramesPath}walkLeft1.png`,
    `${playerFramesPath}walkLeft2.png`,
    `${playerFramesPath}walkLeft3.png`,
    `${playerFramesPath}walkLeft4.png`,
    `${playerFramesPath}walkLeft5.png`,
    `${playerFramesPath}walkLeft6.png`,
    `${playerFramesPath}walkLeft7.png`,
  ],
]

let playerIdleFramesArray = [
  [
    `${playerFramesPath}idle0.png`,
    `${playerFramesPath}idle1.png`,
    `${playerFramesPath}idle2.png`,
    `${playerFramesPath}idle3.png`,
  ],
  [
    `${playerFramesPath}idleLeft0.png`,
    `${playerFramesPath}idleLeft1.png`,
    `${playerFramesPath}idleLeft2.png`,
    `${playerFramesPath}idleLeft3.png`,
  ],
]

let flavourOptions = ['vanilla', 'chocolate', 'strawberry']

let background

let assemblyCounterItems = {
  hasCone: false,
  flavour: '',
}
const generateNewOrder = () => {
  let randomFlavour = Math.floor(Math.random() * 3)
  let newFlavour = flavourOptions[randomFlavour]
  const order = new Order(newFlavour, `./images/${newFlavour}.png`)
  gameBoard.orders.push(order)
}

const assembleOrder = () => {
  if (player.heldItems.cone) {
    player.heldItems.cone = false
    assemblyCounterItems.hasCone = true
  }
  if (assemblyCounterItems.hasCone) {
    if (player.heldItems.vanilla) {
      player.readyToDeliver = 'vanilla'
      player.heldItems.vanilla = false
      assemblyCounterItems.flavour = 'vanilla'
    } else if (player.heldItems.chocolate) {
      player.readyToDeliver = 'chocolate'
      player.heldItems.chocolate = false
      assemblyCounterItems.flavour = 'chocolate'
    } else if (player.heldItems.strawberry) {
      player.readyToDeliver = 'strawberry'
      player.heldItems.strawberry = false
      assemblyCounterItems.flavour = 'strawberry'
    }
  } else {
    player.heldItems.vanilla = false
    player.heldItems.chocolate = false
    player.heldItems.strawberry = false
  }
}

let submitFunctionRan = 0
const submitOrder = () => {
  let pendingOrders = []
  gameBoard.orders.forEach((order, index) => {
    if (order.flavour === player.readyToDeliver) {
      pendingOrders.push(index)
    }
  })
  if (pendingOrders.length !== 0) {
    if (gameBoard.orders[pendingOrders[0]].timeLeft > 70) {
      gameBoard.combo += 3
    }
    gameBoard.orders.splice(pendingOrders[0], 1)
    assemblyCounterItems.flavour = ''
    assemblyCounterItems.hasCone = false
    player.readyToDeliver = ''

    gameBoard.score += 20 + gameBoard.combo
    updateOrders()
    updateScore()
    submitFunctionRan++
  } else {
    if (submitFunctionRan === 0) {
      updateScore()
      gameBoard.combo = 0
    }
    submitFunctionRan++
  }
}

const startGame = () => {
  gameBoard.createCanvas()
}

const chooseFlavour = (flavourChosen) => {
  //player will choose via key
  switch (flavourChosen) {
    case '1':
      if (assemblyCounterItems.flavour === 'vanilla') {
        return
      }
      player.heldItems.vanilla = true
      player.heldItems.chocolate = false
      player.heldItems.strawberry = false
      gameBoard.isAtAssemblyStation = false
      gameBoard.isAtCheckout = false
      break
    case '2':
      if (assemblyCounterItems.flavour === 'chocolate') {
        return
      }
      this.heldItems.vanilla = false
      player.heldItems.chocolate = true
      player.heldItems.strawberry = false
      gameBoard.isAtAssemblyStation = false
      gameBoard.isAtCheckout = false
      break
    case '3':
      if (assemblyCounterItems.flavour === 'strawberry') {
        return
      }
      player.heldItems.vanilla = false
      player.heldItems.chocolate = false
      player.heldItems.strawberry = true
      gameBoard.isAtAssemblyStation = false
      gameBoard.isAtCheckout = false
      break
    default:
      break
  }
}

