document.getElementById('start-button').addEventListener('click', () => {
  // creating Assets to load
  const cupBoardImg = new Image()
  cupBoardImg.src = './images/cupBoard.png'
  const cupBoard = new Component(cupBoardImg, 0, 0, 100, 200)
  gameBoard.components.push(cupBoard)

  // will probably have small repeatable kitchen counters so this will make it easier later?
  const counterStart = 100
  const counterWidth = 100
  const counterHeight = 150

  // top counters
  // counter 51*74 px
  const mainCounterImg = new Image()
  mainCounterImg.src = './images/counterMain.png'

  const mainCounter = new Component(
    mainCounterImg,
    counterStart,
    0,
    counterWidth,
    counterHeight
  )
  gameBoard.components.push(mainCounter)

  const mainCounter2 = new Component(
    mainCounterImg,
    counterStart + counterWidth,
    0,
    counterWidth,
    counterHeight
  )
  gameBoard.components.push(mainCounter2)

  const mainCounter3 = new Component(
    mainCounterImg,
    counterStart + counterWidth * 2,
    0,
    counterWidth,
    counterHeight
  )
  gameBoard.components.push(mainCounter3)

  //checkout counter 1200*1200 px
  const checkoutImg = new Image()
  checkoutImg.src = './images/checkout.png'

  const checkout = new Component(checkoutImg, 400, 0, 150, 150)
  gameBoard.components.push(checkout)

  const playerImg = new Image()
  playerImg.src = './images/leoBeo.png'
  player = new Player(playerImg, 400, 225, 84, 72)
  gameBoard.components.push(player)

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
    default:
      return
  }
})
