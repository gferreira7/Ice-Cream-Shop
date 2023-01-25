class Player extends Component {
  constructor(name, img, posX, posY, width, height) {
    super(name, img, posX, posY, width, height)
    this.ySpeed = 6
    this.xSpeed = 6 
    this.speedBoost = 0
    this.heldItems = {
      cone: false,
      vanilla: false,
      chocolate: false,
      strawberry: false,
    }
    this.readyToDeliver = ''
    this.isChoosingFlavour = false
    this.isPlayerMoving = false
    this.isFacingLeft = false
    this.isFacingRight = true
    this.frameSkip = 0
  }

  render() {
    if (gameBoard.isLeftKeyPressed) {
      this.img.src = './images/heroImages/walk/spritesheet.png'

      gameBoard.ctx.save()

      gameBoard.ctx.scale(-1, 1)
      gameBoard.ctx.drawImage(
        player.img,
        (this.img.width * this.frameSkip) / 9,
        0,
        this.img.width / 9,
        this.img.height,
        -(this.posX + this.width),
        this.posY,
        this.width,
        this.height
      )

      gameBoard.ctx.restore()
    } else if (gameBoard.isRightKeyPressed) {
      this.img.src = './images/heroImages/walk/spritesheet.png'

      gameBoard.ctx.drawImage(
        player.img,
        (this.img.width * this.frameSkip) / 9,
        0,
        this.img.width / 9,
        this.img.height,
        this.posX,
        this.posY,
        this.width,
        this.height
      )
    } else {
      // Drawing the idle player involves knowing where
      // it was turning last
      if (this.isFacingRight) {
        player.img.src = './images/heroImages/idle/spritesheet.png'
        gameBoard.ctx.drawImage(
          player.img,
          (this.img.width * this.frameSkip) / 12,
          0,
          this.img.width / 12,
          this.img.height,
          this.posX,
          this.posY,
          this.width,
          this.height
        )
      } else if (this.isFacingLeft) {
        this.img.src = './images/heroImages/idle/spritesheet.png'
        // save the context as it is to do some fancy inversion
        gameBoard.ctx.save()

        gameBoard.ctx.scale(-1, 1)
        gameBoard.ctx.drawImage(
          player.img,
          (this.img.width * this.frameSkip) / 12,
          0,
          this.img.width / 12,
          this.img.height,
          -(this.posX + this.width),
          this.posY,
          this.width,
          this.height
        )

        gameBoard.ctx.restore()
      }
    }
  }
  animate() {
    this.isFacingRight = true
    // animate in a different time scale than 60fps
    player.frameSkip++
    if (player.isPlayerMoving) {
      player.frameSkip = player.frameSkip % 9
    } else {
      player.frameSkip = player.frameSkip % 12
    }
  }

  moveLeft() {
    this.isFacingLeft = true
    this.isFacingRight = false
    this.posX -= this.xSpeed + this.speedBoost
  }

  moveRight() {
    this.isFacingLeft = false
    this.isFacingRight = true
    this.posX += this.xSpeed + this.speedBoost
  }

  moveUp() {
    this.posY -= this.ySpeed
  }
  moveDown() {
    this.posY += this.ySpeed
  }

  action(component) {
    switch (component.name) {
      case 'coneStorage':
        if (gameBoard.isAtConeStorage) {
          this.heldItems.cone = true
          this.heldItems.vanilla = false
          this.heldItems.chocolate = false
          this.heldItems.strawberry = false
        }
        break
      case 'multistorage':
        if (gameBoard.isAtMultistorage) {
          if(this.heldItems.cone){
            this.isChoosingFlavour = true

          } else{
            gameBoard.hasError = 0
            player.speedBoost = 0
          }
        } 
        break
      default:
        break
    }
  }
  emptyInventory(){
    this.readyToDeliver = ''
    this.heldItems.cone = false
    this.heldItems.vanilla = false
    this.heldItems.chocolate = false
    this.heldItems.strawberry = false
  }
}
