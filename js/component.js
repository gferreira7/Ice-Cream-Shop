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
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
  }
  checkCollision(otherComponent) {
    //offset of 70px for collision each side roughly
    //spritesheet made of 256x256 blocks
    if (
      this.posX < otherComponent.posX + 70 + (otherComponent.width - 70) &&
      this.posX + this.width > otherComponent.posX + 70 &&
      this.posY < otherComponent.posY + otherComponent.height &&
      this.posY + this.height > otherComponent.posY
    ) {
      switch (this.name) {
        case 'coneStorage':
          gameBoard.isAtConeStorage = true
          gameBoard.isAtMultistorage = false
          gameBoard.isAtCheckout = false
          break
        case 'multistorage':
          gameBoard.isAtConeStorage = false
          gameBoard.isAtMultistorage = true
          gameBoard.isAtCheckout = false
          break
        case 'checkoutCounter':
          gameBoard.isAtConeStorage = false
          gameBoard.isAtMultistorage = false
          gameBoard.isAtCheckout = true
          break
        default:
          break
      }
      return true
    } else {
      gameBoard.isAtConeStorage = false
      gameBoard.isAtMultistorage = false
      gameBoard.isAtCheckout = false
      return false
    }
  }
}
