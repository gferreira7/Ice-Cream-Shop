class Player extends Component {
  constructor(name, img, posX, posY, width, height) {
    super(name, img, posX, posY, width, height)
    this.ySpeed = 0
    this.xSpeed = 6
    this.gravity = 0.1
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
    this.isPlayerJumping = false
    this.hasJumped = false
    this.hasBeenBitten = false
    this.isFacingLeft = false
    this.isFacingRight = true
    this.frameSkip = 0
  }

  render() {
    if (gameBoard.isLeftKeyPressed && !gameBoard.isJumpKeyPressed) {
      gameBoard.ctx.save()
      gameBoard.ctx.scale(-1, 1)
      gameBoard.ctx.drawImage(
        player.img,
        (this.img.width * this.frameSkip) / 9,
        518,
        this.img.width / 9,
        this.img.height / 3,
        -(this.posX + this.width),
        this.posY,
        this.width,
        this.height
      )
      gameBoard.ctx.restore()
    } else if (gameBoard.isRightKeyPressed && !gameBoard.isJumpKeyPressed) {
      gameBoard.ctx.drawImage(
        player.img,
        (this.img.width * this.frameSkip) / 9,
        518,
        this.img.width / 9,
        this.img.height / 3,
        this.posX,
        this.posY,
        this.width,
        this.height
      )
    } else if (gameBoard.isJumpKeyPressed) {
      // Drawing the idle player involves knowing where
      // it was turning last
      if (this.isFacingRight) {
        gameBoard.ctx.drawImage(
          player.img,
          (this.img.width * this.frameSkip) / 9,
          259,
          this.img.width / 9,
          this.img.height / 3,
          this.posX,
          this.posY,
          this.width,
          this.height
        )
      } else if (this.isFacingLeft) {
        // save the context as it is to do some fancy inversion
        gameBoard.ctx.save()

        gameBoard.ctx.scale(-1, 1)
        gameBoard.ctx.drawImage(
          player.img,
          (this.img.width * this.frameSkip) / 9,
          259,
          this.img.width / 9,
          this.img.height / 3,
          -(this.posX + this.width),
          this.posY,
          this.width,
          this.height
        )

        gameBoard.ctx.restore()
      }
    } else {
      if (this.isFacingRight) {
        gameBoard.ctx.drawImage(
          player.img,
          (this.img.width * this.frameSkip) / 9,
          0,
          this.img.width / 9,
          this.img.height / 3,
          this.posX,
          this.posY,
          this.width,
          this.height
        )
      } else if (this.isFacingLeft) {
        // save the context as it is to do some fancy inversion
        gameBoard.ctx.save()

        gameBoard.ctx.scale(-1, 1)
        gameBoard.ctx.drawImage(
          player.img,
          (this.img.width * this.frameSkip) / 9,
          0,
          this.img.width / 9,
          this.img.height / 3,
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
    player.frameSkip = player.frameSkip % 9
  }

  moveLeft() {
    this.isFacingLeft = true
    this.isFacingRight = false
    this.posX -= this.xSpeed
    // missing speedB
  }

  moveRight() {
    this.isFacingLeft = false
    this.isFacingRight = true
    this.posX += this.xSpeed
    // missing speedB
  }

  moveUp() {
    // this.ySpeed = 2
    // this.posY -= this.ySpeed
  }
  moveDown() {
    // this.posY += this.ySpeed
  }

  jump() {
    this.posY -= 5
    this.ySpeed = 7
    this.hasJumped = true
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
          if (this.heldItems.cone) {
            this.isChoosingFlavour = true
          } else {
            gameBoard.hasError = 0
            player.speedBoost = 0
          }
        }
        break
      default:
        break
    }
  }
  emptyInventory() {
    this.readyToDeliver = ''
    this.heldItems.cone = false
    this.heldItems.vanilla = false
    this.heldItems.chocolate = false
    this.heldItems.strawberry = false
  }
}
