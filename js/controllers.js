let player
let playerImg = new Image()
playerImg.src = './images/heroImages/idle/right/hero1.png'
let playerFramesPath = './images/heroImages/'
let playerWalkFramesArray = [
  [
    `${playerFramesPath}/walk/right/hero1.png`,
    `${playerFramesPath}/walk/right/hero2.png`,
    `${playerFramesPath}/walk/right/hero3.png`,
    `${playerFramesPath}/walk/right/hero4.png`,
    `${playerFramesPath}/walk/right/hero5.png`,
    `${playerFramesPath}/walk/right/hero6.png`,
    `${playerFramesPath}/walk/right/hero7.png`,
    `${playerFramesPath}/walk/right/hero8.png`,
    `${playerFramesPath}/walk/right/hero9.png`,
  ],
  [
    `${playerFramesPath}/walk/left/hero1.png`,
    `${playerFramesPath}/walk/left/hero2.png`,
    `${playerFramesPath}/walk/left/hero3.png`,
    `${playerFramesPath}/walk/left/hero4.png`,
    `${playerFramesPath}/walk/left/hero5.png`,
    `${playerFramesPath}/walk/left/hero6.png`,
    `${playerFramesPath}/walk/left/hero7.png`,
    `${playerFramesPath}/walk/left/hero8.png`,
    `${playerFramesPath}/walk/left/hero9.png`,
  ],
]

let playerIdleFramesArray = [
  [
    `${playerFramesPath}/idle/right/hero1.png`,
    `${playerFramesPath}/idle/right/hero2.png`,
    `${playerFramesPath}/idle/right/hero3.png`,
    `${playerFramesPath}/idle/right/hero4.png`,
    `${playerFramesPath}/idle/right/hero5.png`,
    `${playerFramesPath}/idle/right/hero6.png`,
    `${playerFramesPath}/idle/right/hero7.png`,
  ],
  [
    `${playerFramesPath}/idle/left/hero1.png`,
    `${playerFramesPath}/idle/left/hero2.png`,
    `${playerFramesPath}/idle/left/hero3.png`,
    `${playerFramesPath}/idle/left/hero4.png`,
    `${playerFramesPath}/idle/left/hero5.png`,
    `${playerFramesPath}/idle/left/hero6.png`,
    `${playerFramesPath}/idle/left/hero7.png`,
  ],
]

let flavourOptions = ['vanilla', 'chocolate', 'strawberry']

let ceramicBacksplash
let purpleFloor

const generateNewOrder = () => {
  let randomFlavour = Math.floor(Math.random() * 3)
  let newFlavour = flavourOptions[randomFlavour]
  const order = new Order(newFlavour, `./images/${newFlavour}.png`)
  gameBoard.orders.push(order)
}

const assembleOrder = () => {
  if (player.heldItems.cone) {
    if (player.heldItems.vanilla) {
      player.readyToDeliver = 'vanilla'
    } else if (player.heldItems.chocolate) {
      player.readyToDeliver = 'chocolate'
    } else if (player.heldItems.strawberry) {
      player.readyToDeliver = 'strawberry'
    }
  }
}

let submitFunctionRan = 0

const submitOrder = () => {
  if (submitFunctionRan > 0) {
    return
  } else {
    let pendingOrders = []

    gameBoard.orders.forEach((order) => {
      pendingOrders.push(order.flavour)
    })

    let orderFound = pendingOrders.indexOf(player.readyToDeliver)
    if (orderFound === -1) {
      // order not found
      gameBoard.combo = 0
    } else {
      //order found
      if (gameBoard.orders[orderFound].timeLeft > 15) {
        gameBoard.combo++
      }
      console.log(gameBoard.orders)
      gameBoard.orders.splice(orderFound, 1)
      console.log(gameBoard.orders)

      gameBoard.score += 20 + gameBoard.combo
      updateOrders()
      updateScore()
      submitFunctionRan = 1
    }
    // cleanup whether order is valid or not
    player.readyToDeliver = ''
    player.heldItems.cone = false
    player.heldItems.vanilla = false
    player.heldItems.chocolate = false
    player.heldItems.strawberry = false
  }
}


const chooseFlavour = (flavourChosen) => {
  //player will choose via key
  switch (flavourChosen) {
    case '1':
      player.heldItems.vanilla = true
      player.heldItems.chocolate = false
      player.heldItems.strawberry = false
      gameBoard.isAtCheckout = false
      break
    case '2':
      player.heldItems.vanilla = false
      player.heldItems.chocolate = true
      player.heldItems.strawberry = false
      gameBoard.isAtCheckout = false
      break
    case '3':
      player.heldItems.vanilla = false
      player.heldItems.chocolate = false
      player.heldItems.strawberry = true
      gameBoard.isAtCheckout = false
      break
    default:
      break
  }
}
