const gameBoard = {
  canvas: document.createElement('canvas'),
  components: [],
  orders: [],
  gameTimeLeft: 100,
  isUpKeyPressed: false,
  isDownKeyPressed: false,
  isLeftKeyPressed: false,
  isRightKeyPressed: false,
  isActionKeyPressed: false,
  isAtCheckout: false,
  isAtAssemblyStation: false,
  isGameOver: false,
  isGameStarted: false,
  score: 0,
  combo: 0,
  createCanvas: function () {
    this.canvas.width = 1200
    this.canvas.height = 500
    this.ctx = this.canvas.getContext('2d')
    const mainDiv = document.getElementById('main-game-container')
    mainDiv.insertBefore(this.canvas, mainDiv.childNodes[0])
  },
  addOrder: function () {
    if (gameBoard.orders.length < 4) {
      generateNewOrder()
    }
  },
  updateCanvas: function () {
    gameBoard.ctx.drawImage(
      background,
      0,
      0,
      gameBoard.canvas.width,
      gameBoard.canvas.height
    )

    if(!this.isPlayerMoving){
      player.idle()
    }

    if (gameBoard.isUpKeyPressed) {
      if (player.posY > 230) {
        player.moveUp()
      }
    }
    if (gameBoard.isDownKeyPressed) {
      if (player.posY < gameBoard.canvas.height - 200) {
        player.moveDown()
      }
    }
    if (gameBoard.isLeftKeyPressed) {
      if (player.posX > 0) {
        player.moveLeft()
      }
    }
    if (gameBoard.isRightKeyPressed) {
      if (player.posX <gameBoard.canvas.width -100) {
        player.moveRight()
      }
    }

    gameBoard.components.forEach((component) => {
      component.render()
      if (component !== player && component.checkCollision(player)) {
        if (gameBoard.isActionKeyPressed) {
          player.action(component)
          if (
            gameBoard.isAtAssemblyStation &&
            component.name === 'assemblyCounter'
          ) {
            assembleOrder()
            gameBoard.isAtAssemblyStation = false
            updateInventory()
            updateAssemblyCounter()
          }
          if (gameBoard.isAtCheckout && component.name === 'checkoutCounter') {
            submitOrder()
          }
        }
      }
    })
  },
}
