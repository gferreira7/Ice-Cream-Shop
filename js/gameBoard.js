const gameBoard = {
  canvas: document.createElement('canvas'),
  // key items that have to be checked for collision
  components: [],
  //all other items that are used for background and will always render behind the player
  nonCollisionComponents: [],
  orders: [],
  gameTimeLeft: 100,
  //key triggers
  isUpKeyPressed: false,
  isDownKeyPressed: false,
  isLeftKeyPressed: false,
  isRightKeyPressed: false,
  isActionKeyPressed: false,
  isInstructionsKeyPressed: false,
  isPauseKeyPressed: false,
  isJumpKeyPressed: false,
  //player action triggers
  isAtCheckout: false,
  isAtMultistorage: false,
  isAtConeStorage: false,
  // game states
  isGameOver: false,
  isGameStarted: false,
  isGamePaused: false,
  isAtTutorial: false,
  isAtIntroScreen: false,
  orderSubmitOk: false,
  hasAttemptedSubmit: false,
  //alerts for player
  errorMessages: [
    'I NEED A CONE', //tries to get icecream before cone
    'THERE IS NOTHING TO DELIVER', //tries to deliver incomplete order
    'NO ONE ORDERED THIS', //tries to deliver incomplete order
    'ORDER EXPIRED', //triggers when expired orders are removed from array
    'HURRY UP!', //will flash when game time is almost up
  ],
  hasError: -1,
  //score keeping
  score: 0,
  combo: 0,
  createCanvas: function () {
    this.canvas.width = 1200
    this.canvas.height = 500
    this.ctx = this.canvas.getContext('2d')
    mainGame.appendChild(this.canvas)
  },
  addOrder: function () {
    if (gameBoard.orders.length < 4) {
      generateNewOrder()
    }
  },
  spawnMouse: function () {
    randomSpawnX = Math.floor(Math.random() * 2) * gameBoard.canvas.width
    mouse.posX = randomSpawnX
  },
  updateCanvas: function () {

    
    if (gameBoard.isGamePaused) return
    if (gameBoard.isGameOver) {
      gameOver()
    }

    if (randomSpawnX === 0) {
      mouse.direction = 'right'
      mouse.moveRight()
    } else {
      mouse.direction = 'left'
      mouse.moveLeft()
    }

    gameBoard.ctx.drawImage(
      purpleFloor,
      0,
      0,
      gameBoard.canvas.width,
      gameBoard.canvas.height
    )
    gameBoard.ctx.drawImage(
      ceramicBacksplash,
      0,
      0,
      gameBoard.canvas.width,
      gameBoard.canvas.height - 95
    )

    if (gameBoard.hasError !== -1) {
      alertPlayerError(gameBoard.hasError)
    }

    gameBoard.ctx.font = '32px Roboto Mono'
    gameBoard.ctx.fillStyle = 'yellow'

    if (gameBoard.isInstructionsKeyPressed) {
      gameBoard.ctx.fillText('Flavors', 100, 350)
      gameBoard.ctx.fillText('Cones', 300, 350)
      gameBoard.ctx.fillText('Checkout', 1050, 300)

      gameBoard.ctx.fillText('WASD to Move', 500, 40)
      gameBoard.ctx.fillText('E to pick up Items', 500, 80)
      gameBoard.ctx.fillText('E then 1,2,3 for flavor', 500, 120)
      gameBoard.ctx.fillText('Space to Jump', 500, 160)
    }

    if (player.posY < 200) {
      player.ySpeed = player.ySpeed - player.gravity
      player.posY -= player.ySpeed
    } else {
      player.hasJumped = false
    }

    if (gameBoard.isJumpKeyPressed) {
      if (!player.hasJumped) {
        player.jump()
      }
    }

    if (player.ySpeed < 0) {
      player.gravity = 0.7
    } else {
      player.gravity = 0.3
    }

    if (gameBoard.isLeftKeyPressed) {
      if (player.posX > -50) {
        player.moveLeft()
      }
    }
    if (gameBoard.isRightKeyPressed) {
      if (player.posX < gameBoard.canvas.width - 150) {
        player.moveRight()
      }
    }
    gameBoard.nonCollisionComponents.forEach((component) => {
      component.render()
    })

    gameBoard.components.forEach((component) => {
      component.render()
      if (component !== player) {
        if (player.checkCollision(component)) {
          if (component.name === 'coneStorage') {
            gameBoard.isAtConeStorage = true
          } else if (component.name === 'multistorage') {
            gameBoard.isAtMultistorage = true
          } else if (component.name === 'checkoutCounter') {
            gameBoard.isAtCheckout = true
          }
        } else {
          if (component.name === 'coneStorage') {
            gameBoard.isAtConeStorage = false
          } else if (component.name === 'multistorage') {
            gameBoard.isAtMultistorage = false
          } else if (component.name === 'checkoutCounter') {
            gameBoard.isAtCheckout = false
          }
        }
      }
      if (gameBoard.isActionKeyPressed) {
        if (
          !gameBoard.isAtCheckout &&
          !gameBoard.isAtConeStorage &&
          !gameBoard.isAtMultistorage
        ) {
        } else {
          player.action(component)
          assembleOrder()
          updateInventory()
        }
      }
    })

    if (gameBoard.isAtCheckout) {
      if (gameBoard.isActionKeyPressed) {
        submitOrder()
      }
    } else {
      gameBoard.hasAttemptedSubmit = false
    }

    if (gameBoard.orderSubmitOk) {
      if (dollars.posY > -150) {
        dollars.animate()
      } else {
        dollars.posY = 500
        gameBoard.orderSubmitOk = false
      }
    }
    if (!gameBoard.isAtMultistorage) {
      player.isChoosingFlavour = false
    }

    
    if (player.checkCollision(mouse) && mouse.posX < 600) {
      if(!player.hasBeenBitten){
        mouse.bite() 
      }
    } else{
      player.hasBeenBitten = false
    }

  },
}
