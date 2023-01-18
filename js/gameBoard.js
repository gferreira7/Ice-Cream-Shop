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
  score: 0,
  combo: 0,
  createCanvas: function () {
    this.canvas.width = 800
    this.canvas.height = 600
    this.ctx = this.canvas.getContext('2d')
    const mainDiv = document.getElementById('main-game-container')
    mainDiv.insertBefore(this.canvas, mainDiv.childNodes[0])
    // document.getElementById('main-game-container').appendChild(this.canvas)
  },
  addOrder: function () {
    if (gameBoard.orders.length < 4) {
      generateNewOrder()
    }
  },
  updateCanvas: function () {
    const context = gameBoard.ctx

    //temp floor
    const background = new Image()
    background.src = './images/kitchen_floor.png'
    gameBoard.ctx.drawImage(
      background,
      0,
      0,
      gameBoard.canvas.width,
      gameBoard.canvas.height + 200
    )

    if (gameBoard.isUpKeyPressed) {
      player.moveUp()
    }
    if (gameBoard.isDownKeyPressed) {
      player.moveDown()
    }
    if (gameBoard.isLeftKeyPressed) {
      player.moveLeft()
    }
    if (gameBoard.isRightKeyPressed) {
      player.moveRight()
    }

    gameBoard.components.forEach((component) => {
      component.render()
      if (component !== player && component.checkCollision(player)) {
        // component.canUseAction = true
        //after Key Press
        if (gameBoard.isActionKeyPressed) {
          player.action(component)
          if (gameBoard.isAtAssemblyStation && component.name === 'assemblyCounter') {
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
