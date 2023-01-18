const gameBoard = {
  canvas: document.createElement('canvas'),
  components: [],
  orders: [],
  gameTimeLeft: 5,
  isUpKeyPressed: false,
  isDownKeyPressed: false,
  isLeftKeyPressed: false,
  isRightKeyPressed: false,
  isGameOver:false,
  score: 0,
  combo: 0,
  createCanvas: function () {
    this.canvas.width = 800
    this.canvas.height = 450
    this.ctx = this.canvas.getContext('2d')

  document.getElementById('main-game-container').appendChild(this.canvas)
  },
  addOrder: function() {
    if(gameBoard.orders.length < 4){
        generateNewOrder()
    }
  },
  updateCanvas: function () {
    const context = gameBoard.ctx
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

    //temp floor
    const background = new Image()
    background.src = '../images/kitchen_floor.png'
    gameBoard.ctx.drawImage(background,0, 0, gameBoard.canvas.width, gameBoard.canvas.height+200)

    gameBoard.components.forEach((component) => {
      component.render()
      if(component !== player && component.checkCollision(player)){
        component.canUseAction = true
        console.log(component.imgURL, component.canUseAction)
      } else{
        component.canUseAction = false
      }
      
    })
  },
}

gameBoard.createCanvas()
