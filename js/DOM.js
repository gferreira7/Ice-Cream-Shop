document.getElementById('start-button').addEventListener('click', () => {
  gameCountdown()
})

const gameCountdown = () => {
  let countdown = 3
  const gameCountdownScreen = document.getElementById('game-countdown-screen')
  document.getElementById('start-screen').style.display = 'none'

  //preventing flash of previous value on restart
  gameCountdownScreen.innerHTML = `${countdown}`
  gameCountdownScreen.style.display = 'flex'

  const countdownInterval = setInterval(() => {
    countdown--
    gameCountdownScreen.innerHTML = `${countdown}`
  }, 1000)

  setTimeout(() => {
    clearInterval(countdownInterval)
    gameCountdownScreen.style.display = 'none'
    startGame()
  }, 4000)
}

const startGame = () => {

  
  gameTheme = document.getElementById('game-theme')
  gameTheme.loop = true
  gameTheme.play()
  gameBoard.isGameStarted = true

  gameBoard.createCanvas()

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

  const bin = new Component('bin', binImg, 770, 350, 140, 150)
  dollars = new Component('dollars', dollarSignsImg, 900, 500, 150, 70)
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
  player = new Player('player', playerImg, 450, 225, 256, 256)
  mouse = new Mouse('mouse', mouseImg, 770, 425, 50, 50)

  const checkout = new Component(
    'checkoutCounter',
    checkoutImg,
    gameBoard.canvas.width - 300,
    240,
    300,
    300
  )

  const speech = new Component(
    'speech',
    speechBubbleImg,
    player.posX,
    player.posY,
    400,
    300
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
  gameBoard.components.push(mouse)
  gameBoard.components.push(player)
  gameBoard.components.push(speech)
  gameBoard.components.push(dollars)
  gameBoard.components.push(bin)
  gameBoard.components.push(checkout)

  document.getElementById('main-game-container').style.display = 'flex'

  if (!gameBoard.isGameOver) {
    orderflowInterval = setInterval(() => {
      if (!gameBoard.isGamePaused && gameBoard.isGameStarted) {
        updateOrders()
        updateTimeLeft()
        updateScore()
        updateInventory()
      }
    }, 1000)
    newOrderInterval = setInterval(() => {
      gameBoard.addOrder()
    }, 2000)
    mouseSpawnInterval = setInterval(() => {
      gameBoard.spawnMouse()
    }, 7000)
    refreshRate = setInterval(gameBoard.updateCanvas, 1000 / 60)
    animatePlayerInterval = setInterval(player.animate, 1000 / 10)
  }
}

document.getElementById('tutorial-button').addEventListener('click', () => {
  tutorial()
})

const tutorial = () => {
  document.getElementById('start-screen').style.display = 'none'
  document.getElementById('tutorial-screen').style.display = 'flex'
}

document.getElementById('next-button').addEventListener('click', () => {
  nextSlide()
  document.getElementById(
    'tutorial-img'
  ).src = `./images/tutorial/tutorial-section${currentTutorialImage}.png`
})

document.getElementById('skip-button').addEventListener('click', () => {
  document.getElementById('tutorial-screen').style.display = 'none'
  gameCountdown()
})

const nextSlide = () => {
  if (currentTutorialImage === 8) {
    currentTutorialImage = 1
  } else {
    currentTutorialImage++
  }
}

//handle Movement Keys
document.addEventListener('keydown', ({ key }) => {
  if (
    !gameBoard.isGameStarted ||
    gameBoard.isGameOver ||
    gameBoard.isGamePaused
  ) {
    if (key === 'p') {
      gameBoard.isGamePaused = false
    }

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
    case 'e':
      gameBoard.isActionKeyPressed = true
      break
    case 'p':
      gameBoard.isGamePaused = true
      gameBoard.isUpKeyPressed = false
      gameBoard.isDownKeyPressed = false
      gameBoard.isLeftKeyPressed = false
      gameBoard.isRightKeyPressed = false
      gameBoard.isActionKeyPressed = false
      gameBoard.isInstructionsKeyPressed = false
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
    case 'k':
      reset()
      break
    case ' ':
      gameBoard.isJumpKeyPressed = true
      break
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
      player.isPlayerMoving = false
      break
    case 'd':
      gameBoard.isRightKeyPressed = false
      player.isPlayerMoving = false
      break
    case 'e':
      gameBoard.isActionKeyPressed = false
      break
    case '1':
    case '2':
    case '3':
      player.isChoosingFlavour = false

    case 'i':
      gameBoard.isInstructionsKeyPressed = false
      break
    case 't':
      testCollisions()
      checkOrderCycle()
    // checkKeysPressed()
    case ' ':
      gameBoard.isJumpKeyPressed = false
      break
    case 'enter':
      return
    default:
      return
  }
})

const updateOrders = () => {
  if (gameBoard.orders.length === 0) {
    pendingOrdersDisplay.innerHTML = '<p>No Orders to deliver</p>'
  } else {
    pendingOrdersDisplay.innerHTML = ''
  }
  gameBoard.orders.forEach((order) => {
    if (order.currentTimeLeft === 0) {
      gameBoard.orders.shift()
      gameBoard.hasError = 3
      player.speedBoost = 0
      gameBoard.combo = 0
    }
  })

  //update the DOM , add/remove new orders
  gameBoard.orders.forEach((order) => {
    const singlePendingOrderDiv = document.createElement('div')
    singlePendingOrderDiv.innerHTML = ''
    singlePendingOrderDiv.className = 'order-container'

    const progressBar = document.createElement('div')
    progressBar.classList = 'progress-bar'
    progressBar.style.height = '10px'
    progressBar.style.width = `${order.currentTimeLeft}%`
    if (order.currentTimeLeft <= order.timerRedZone) {
      gameBoard.hasError = 4
      progressBar.style.backgroundColor = 'red'
      singlePendingOrderDiv.style.backgroundColor = 'purple'
      singlePendingOrderDiv.classList.add('blinker')
    } else {
      progressBar.style.backgroundColor = 'green'
    }
    singlePendingOrderDiv.innerHTML = `<img src="./images/${order.flavour}.png">`
    singlePendingOrderDiv.appendChild(progressBar)
    pendingOrdersDisplay, (innerHTML = '')
    pendingOrdersDisplay.appendChild(singlePendingOrderDiv)
    order.updateProgressBar()
    order.secondsElapsed++
  })
}

const updateInventory = () => {
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

const updateTimeLeft = () => {
  gameBoard.gameTimeLeft--
  if (gameBoard.gameTimeLeft <= 0) {
    gameBoard.isGameOver = true
  }
  timeLeftDisplay.innerHTML = ''
  timeLeftDisplay.innerHTML = gameBoard.isGameOver
    ? `<h3>GAME OVER</h3>`
    : `<h3>TIME LEFT</h3><h3> ${gameBoard.gameTimeLeft}s</h3>`
}

const updateScore = () => {
  scoreDisplay.innerHTML = ''
  scoreDisplay.innerHTML = `<h3>SCORE ${gameBoard.score}$</h3>
  <h3>COMBO: ${gameBoard.combo}</h3>`
}

const gameOver = () => {
  gameOverScreen.style.display = 'flex'

  gameTheme.pause()
  gameOverTheme = document.getElementById('game-over-theme')
  gameOverTheme.loop = true
  gameOverTheme.play()

  clearInterval(orderflowInterval)
  clearInterval(newOrderInterval)
  clearInterval(refreshRate)
  clearInterval(animatePlayerInterval)
  clearInterval(mouseSpawnInterval)

  let highScoresArray = JSON.parse(window.localStorage.getItem('highScores'))
  if (!highScoresArray) {
    highScoresArray = []
  }
  const playerDataToStore = {
    name: prompt('Enter your name:'),
    score: gameBoard.score,
  }

  highScoresArray.push(playerDataToStore)
  window.localStorage.setItem('highScores', JSON.stringify(highScoresArray))

  highScoresArray.sort((a,b) => b.score - a.score)
  const highScoreHolder = highScoresArray[0]

  // console.log(highScoresArray)

  document.getElementById('game-over-score').innerHTML = `SCORE: ${gameBoard.score}` 
  document.getElementById('highest-score').innerHTML = `HIGHSCORE: ${highScoreHolder.name} - ${highScoreHolder.score}` 
  
  document.addEventListener('keyup', ({ key }) => {
    if (key === 'r' && gameBoard.isGameOver) {
      reset()
      gameOverScreen.style.display = 'none'
      gameCountdown()
    }
    if (key === 'q' && gameBoard.isGameOver) {
      reset()
      gameOverScreen.style.display = 'none'
      mainGame.style.display = 'none'
      document.getElementById('start-screen').style.display = 'flex'
    }
  })
}

document.getElementById('restart-button').addEventListener('click', () => {
  reset()
  gameOverScreen.style.display = 'none'
  gameCountdown()
})
document.getElementById('home-button').addEventListener('click', () => {
  reset()
  gameOverScreen.style.display = 'none'
  mainGame.style.display = 'none'
  document.getElementById('start-screen').style.display = 'flex'
})
