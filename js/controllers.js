let player
let dollars
let playerImg = new Image()
playerImg.src = './images/heroImages/idle/spritesheet.png'

let flavourOptions = ['vanilla', 'chocolate', 'strawberry']

let ceramicBacksplash
let purpleFloor

let currentTutorialImage = 1 

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
      if (gameBoard.orders[orderFound].currentTimeLeft > 15) {
        gameBoard.combo++
      }
      gameBoard.orders.splice(orderFound, 1)

      gameBoard.score += 20 + gameBoard.combo

      updateOrders()
      updateScore()
      
      gameBoard.orderSubmitOk = true
      
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

const reset = () => {
  components= [] 
  nonCollisionComponents= [] 
  orders= [] 
  gameTimeLeft= 200 
  //key triggers
  isUpKeyPressed= false 
  isDownKeyPressed= false 
  isLeftKeyPressed= false 
  isRightKeyPressed= false 
  isActionKeyPressed= false 
  isInstructionsKeyPressed= false 
  isPauseKeyPressed= false 
  //player action triggers
  isAtCheckout= false 
  isAtMultistorage= false 
  isAtConeStorage= false 
  // game states
  isGameOver= false 
  isGameStarted= false 
  isGamePaused= false 
  isAtTutorial= false 
  isAtIntroScreen= false 
  orderSubmitOk= false 
  //score keeping
  score= 0 
  combo= 0 
}
