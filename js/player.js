class Player extends Component {
  constructor(imgURL, posX, posY, width, height) {
    super(imgURL, posX, posY, width, height)
    this.ySpeed = 2
    this.xSpeed = 2
  }

  moveUp() {
    
    this.posY -= this.ySpeed
  }
  moveDown() {
    this.posY += this.ySpeed
  }
  moveLeft() {
    this.posX -= this.xSpeed
  }

  moveRight() {
    this.posX += this.xSpeed
  }
}
