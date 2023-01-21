class Component {
  constructor(name, img, posX, posY, width, height) {
    this.img = img
    this.width = width
    this.height = height
    this.posX = posX
    this.posY = posY
    this.name = name
    this.toggleSpecialAction = false
  }
  render() {
    const ctx = gameBoard.ctx

    if(this.name === 'speech' && gameBoard.isActionKeyPressed){
      this.posX = player.posX + 100
      this.posY = player.posY -100
    } 
    else if(this.name === 'speech'){
      this.posX = gameBoard.canvas.width + 300
      this.posY = gameBoard.canvas.height + 300
    }
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
  }
  checkCollision(otherComponent) {
    if (
      this.posX < otherComponent.posX + otherComponent.width &&
      this.posX + this.width > otherComponent.posX &&
      this.posY < otherComponent.posY + otherComponent.height &&
      this.posY + this.height > otherComponent.posY
    ) {
      return true
    } else {
      gameBoard.isAtAssemblyStation = false
      gameBoard.isAtCheckout = false

      return false
    }
  }
}
