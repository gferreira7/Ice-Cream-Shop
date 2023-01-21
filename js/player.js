class Player extends Component {
  constructor(name, img, posX, posY, width, height) {
    super(name, img, posX, posY, width, height)
    this.ySpeed = 4
    this.xSpeed = 4 
    this.heldItems = {
      cone: false,
      vanilla: false,
      chocolate: false,
      strawberry: false,
    }
    this.readyToDeliver = ''
    this.speechBubble = ''
    this.isChoosingFlavour = false
    this.isPlayerMoving = false
    this.isFacingLeft = false
    this.isFacingRight = true
    this.moveTimer = 0
    this.hasRanFunction = 0
    this.frameSkip = 4
  }

  idle() {
    this.hasRanFunction++
    if (this.hasRanFunction % this.frameSkip === 0) {
      if (player.isFacingLeft) {
        if (this.moveTimer <= 11) {
          player.img.src = playerIdleFramesArray[1][this.moveTimer]
          this.moveTimer++
        } else {
          this.moveTimer = 0
        }
      } else {
        if (this.moveTimer <= 11) {
          player.img.src = playerIdleFramesArray[0][this.moveTimer]
          this.moveTimer++
        } else {
          this.moveTimer = 0
        }
      }
    }
    // console.group(`player is moving ${player.isPlayerMoving}`)
    // console.log(`face left ${player.isFacingLeft}`)
    // console.log(`face right ${player.isFacingRight}`)
    // console.log(`frameskip ${player.hasRanFunction}`)
    // console.log(`img frame ${player.moveTimer}`)
    // console.groupEnd()
  }
  moveUp() {
    this.posY -= this.ySpeed
  }
  moveDown() {
    this.posY += this.ySpeed
  }
  moveLeft() {
    this.hasRanFunction++
    this.isFacingLeft = true
    this.isFacingRight = false
    this.posX -= this.xSpeed
    if (this.hasRanFunction % this.frameSkip === 0) {
      if (this.moveTimer <= 8) {
        player.img.src = playerWalkFramesArray[1][this.moveTimer]
        this.moveTimer++
      } else {
        this.moveTimer = 0
      }
    }
    // console.group(`player is moving ${player.isPlayerMoving}`)
    // console.log(`face left ${player.isFacingLeft}`)
    // console.log(`face right ${player.isFacingRight}`)
    // console.log(`frameskip ${player.hasRanFunction}`)
    // console.log(`img frame ${player.moveTimer}`)
    // console.groupEnd()
  }

  moveRight() {
    this.hasRanFunction++
    this.isFacingLeft = false
    this.isFacingRight = true
    this.posX += this.xSpeed
    if (this.hasRanFunction % this.frameSkip === 0) {
      if (this.moveTimer <= 8) {
        player.img.src = playerWalkFramesArray[0][this.moveTimer]
        this.moveTimer++
      } else {
        this.moveTimer = 0
      }
    }
    // console.group(`player is moving ${player.isPlayerMoving}`)
    // console.log(`face left ${player.isFacingLeft}`)
    // console.log(`face right ${player.isFacingRight}`)
    // console.log(`frameskip ${player.hasRanFunction}`)
    // console.log(`img frame ${player.moveTimer}`)
    // console.groupEnd()
  }
  action(component) {
    switch (component.name) {
      case 'coneStorage':
        this.heldItems.cone = true
        this.heldItems.vanilla = false
        this.heldItems.chocolate = false
        this.heldItems.strawberry = false
        gameBoard.isAtCheckout = false
        submitFunctionRan = 0
        break
      case 'multistorage':
        this.isChoosingFlavour = true
        gameBoard.isAtCheckout = false
        break
      case 'checkoutCounter':
        gameBoard.isAtCheckout = true
        break
      default:
        break
    }
  }
}
