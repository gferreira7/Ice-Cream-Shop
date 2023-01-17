

const gameBoard = {
  canvas: document.createElement('canvas'),
  components: [],
  orders: [],
  isUpKeyPressed: false,
  isDownKeyPressed: false,
  isLeftKeyPressed: false,
  isRightKeyPressed: false,
  createCanvas: function () {
    this.canvas.width = 800
    this.canvas.height = 450
    this.ctx = this.canvas.getContext('2d')
    
    document.getElementById('main-game-container').appendChild(this.canvas)
  },
  updateCanvas: function () {
    
    const context = gameBoard.ctx
    if(gameBoard.isUpKeyPressed){
      player.moveUp()
    }
    if(gameBoard.isDownKeyPressed){
      player.moveDown()
    }
    if(gameBoard.isLeftKeyPressed){
      player.moveLeft()
    }
    if(gameBoard.isRightKeyPressed){
      player.moveRight()
    }

    //temp floor
    context.fillStyle = 'yellow'
    context.fillRect(0,0,gameBoard.canvas.width,gameBoard.canvas.height)
    
    //drawing boundaries for testing, for now
    context.strokeStyle = 'black';
    context.lineWidth = 5;
 
    context.beginPath();
    context.moveTo(0, 150);
    context.lineTo(gameBoard.canvas.width, 150);
    context.stroke();

    context.moveTo(0, 300);
    context.lineTo(gameBoard.canvas.width, 300);
    context.stroke();
    
    
    gameBoard.components.forEach(component => {
        component.render()
    })
  }

}


gameBoard.createCanvas()




