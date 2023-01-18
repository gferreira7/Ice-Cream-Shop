let player
let flavourOptions = ['vanilla', 'chocolate', 'strawberry']
const background = new Image()
background.src = './images/kitchen_floor.png'
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
    if(submitFunctionRan === 0){
      updateScore()
      gameBoard.combo = 0
    }
    submitFunctionRan++
  }
  console.log(pendingOrders, gameBoard.score, gameBoard.combo)
}
const startGame = () => {
  gameBoard.createCanvas()
}
