class Mouse extends Component {
  constructor(name, img, posX, posY, width, height) {
    super(name, img, posX, posY, width, height)
    this.xSpeed = 5
    this.direction = ''
  }
  render() {
    if (this.direction === 'left') {
      gameBoard.ctx.save()
      gameBoard.ctx.scale(-1, 1)
      gameBoard.ctx.drawImage(
        mouse.img,
        -this.posX,
        this.posY,
        this.width,
        this.height
      )
      gameBoard.ctx.restore()
    } else if (this.direction === 'right') {
      gameBoard.ctx.drawImage(
        mouse.img,
        this.posX,
        this.posY,
        this.width,
        this.height
      )
    }
  }
  moveLeft() {
    this.posX -= this.xSpeed
  }
  moveRight() {
    this.posX += this.xSpeed
  }
}
