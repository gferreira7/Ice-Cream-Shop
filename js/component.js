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

    //hint to help choose flavours
    if (
      this.name === 'speech' &&
      gameBoard.isActionKeyPressed &&
      player.isChoosingFlavour
    ) {
      this.posX = player.posX
      this.posY = player.posY - 200
    }
    //hidden off canvas when not needed
    else if (this.name === 'speech') {
      this.posX = gameBoard.canvas.width + 300
      this.posY = gameBoard.canvas.height + 300
    }

    if (this.name === 'bin' && gameBoard.badDelivery) {
      gameBoard.ctx.save()
      ctx.scale(1, 0.95);
      }

    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    gameBoard.ctx.restore()
    gameBoard.badDelivery= false
  }
  checkCollision(otherComponent) {
    //offset of 70px for collision each side roughly
    //spritesheet made of 256x256 blocks
    if (
      this.posX + 70 < otherComponent.posX + otherComponent.width &&
      this.posX + (this.width - 70) > otherComponent.posX &&
      this.posY < otherComponent.posY + otherComponent.height &&
      this.posY + this.height > otherComponent.posY
    ) {
      return true
    } else {
      return false
    }
  }
  animate() {
    if (this.name === 'dollars') {
      this.posY -= 10
    }
  }
}
