const gameBoard = {
  canvas: document.createElement('canvas'),
  components: [],
  nonCollisionComponents: [],
  orders: [],
  gameTimeLeft: 60,
  isUpKeyPressed: false,
  isDownKeyPressed: false,
  isLeftKeyPressed: false,
  isRightKeyPressed: false,
  isActionKeyPressed: false,
  isAtCheckout: false,
  isGameOver: false,
  isGameStarted: false,
  isGamePaused: false,
  isInstructionsKeyPressed: false,
  score: 0,
  combo: 0,
  createCanvas: function () {
    this.canvas.width = 1200
    this.canvas.height = 500
    this.ctx = this.canvas.getContext('2d')
    const mainDiv = document.getElementById('main-game-container')
    mainDiv.appendChild(this.canvas)
  },
  addOrder: function () {
    if (gameBoard.orders.length < 4) {
      generateNewOrder()
    }
  },
  updateCanvas: function () {

    if (gameBoard.isGamePaused) return

    gameBoard.ctx.clearRect(
      0,
      0,
      gameBoard.canvas.width,
      gameBoard.canvas.height
    )

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

    if (gameBoard.isInstructionsKeyPressed) {
      gameBoard.ctx.font = '32px Roboto Mono'
      gameBoard.ctx.fillStyle = 'yellow'

      gameBoard.ctx.fillText('Flavors', 100, 350)
      gameBoard.ctx.fillText('Cones', 300, 350)
      gameBoard.ctx.fillText('Checkout', 1050, 495)

      gameBoard.ctx.fillText('WASD to Move', 500, 40)
      gameBoard.ctx.fillText('P to pick up Items', 500, 80)
      gameBoard.ctx.fillText('P + 1,2,3 for flavor', 500, 120)
      gameBoard.ctx.fillText('Cone + Flavour', 500, 160)
      gameBoard.ctx.fillText('+ checkout = Cash ', 500, 200)
    }

    if (!this.isPlayerMoving) {
      player.idle()
    }

    if (gameBoard.isUpKeyPressed) {
      if (player.posY > 200) {
        player.moveUp()
      }
    }
    if (gameBoard.isDownKeyPressed) {
      if (player.posY < gameBoard.canvas.height - 250) {
        player.moveDown()
      }
    }
    if (gameBoard.isLeftKeyPressed) {
      if (player.posX > 0) {
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

      if (component !== player && component.checkCollision(player)) {
        if (gameBoard.isActionKeyPressed) {
          player.action(component)
          assembleOrder()
          updateInventory()
        }
        if (gameBoard.isAtCheckout && component.name === 'checkoutCounter') {
          submitOrder()
        }
      }
    })
  },
}
