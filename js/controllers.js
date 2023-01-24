let player
let dollars
let playerImg = new Image()
playerImg.src = './images/heroImages/idle/spritesheet.png'

let flavourOptions = ['vanilla', 'chocolate', 'strawberry']

let ceramicBacksplash
let purpleFloor

let currentTutorialImage = 1

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
 speechBubbleImg.src = './images/speechbubble.png'

 const dollarSignsImg = new Image()
 dollarSignsImg.src = './images/dollars.png'

const mainGame = document.getElementById('main-game-container')
const gameOverScreen = document.getElementById('gameover-screen')
const scoreDisplay = document.getElementById('score-display')
const timeLeftDisplay = document.getElementById('time-left-display')
const inventory = document.getElementById('inventory-list')
const pendingOrdersDisplay = document.getElementById('pending-orders-display')

let orderflowInterval
let newOrderInterval
let refreshRate
let animatePlayerInterval


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

  gameBoard.components = []
  gameBoard.nonCollisionComponents = []
  gameBoard.orders = []
  gameBoard.gameTimeLeft = 10
  gameBoard.ctx.clearRect(0,0,gameBoard.canvas.width, gameBoard.canvas.height)
  //key triggers
  gameBoard.isUpKeyPressed = false
  gameBoard.isDownKeyPressed = false
  gameBoard.isLeftKeyPressed = false
  gameBoard.isRightKeyPressed = false
  gameBoard.isActionKeyPressed = false
  gameBoard.isInstructionsKeyPressed = false
  gameBoard.isPauseKeyPressed = false
  //player action triggers
  gameBoard.isAtCheckout = false
  gameBoard.isAtMultistorage = false
  gameBoard.isAtConeStorage = false
  // game states
  gameBoard.isGameOver = false
  //score keeping
  gameBoard.score = 0
  gameBoard.combo = 0

  // player Reset
  player.heldItems = {
    cone: false,
    vanilla: false,
    chocolate: false,
    strawberry: false,
  }
  player.readyToDeliver = ''
  player.isChoosingFlavour = false

  updateOrders()
  updateInventory()
  updateScore()
  updateTimeLeft()
}
