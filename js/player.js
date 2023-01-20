class Player extends Component {
  constructor(name, img, posX, posY, width, height) {
    super(name, img, posX, posY, width, height)
    this.ySpeed = 10
    this.xSpeed = 10
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
  }

  idle() {
    if(player.isFacingLeft){

      player.img.src = playerIdleFramesArray[1][this.moveTimer]
      if(this.moveTimer<3){
        this.moveTimer++
      } else{
        this.moveTimer = 0
      }
    } else{
      player.img.src = playerIdleFramesArray[0][this.moveTimer]
      if(this.moveTimer<3){
        this.moveTimer++
      } else{
        this.moveTimer = 0
      }
    } 
    
  }
  moveUp() {
    this.posY -= this.ySpeed
  }
  moveDown() {
    this.posY += this.ySpeed
  }
  moveLeft() {
    this.isFacingLeft = true
    this.isFacingRight = false
    this.posX -= this.xSpeed
    player.img.src = playerWalkFramesArray[1][this.moveTimer]
    if(this.moveTimer<6){
      this.moveTimer++
    } else{
      this.moveTimer = 0
    }
  }

  moveRight() {
    this.isFacingLeft = false
    this.isFacingRight = true
    this.posX += this.xSpeed
    player.img.src = playerWalkFramesArray[0][this.moveTimer]
    if(this.moveTimer<6){
      this.moveTimer++
    } else{
      this.moveTimer = 0
    }    
  }
  action(component) {
    switch (component.name) {
      case 'assemblyCounter':
        gameBoard.isAtAssemblyStation = true
        gameBoard.isAtCheckout = false
        break
      case 'coneStorage':
        if (assemblyCounterItems.hasCone) {
          return
        }
        this.heldItems.cone = true
        this.heldItems.vanilla = false
        this.heldItems.chocolate = false
        this.heldItems.strawberry = false

        gameBoard.isAtAssemblyStation = false
        gameBoard.isAtCheckout = false
        break
      case 'multistorage':
        player.isChoosingFlavour = true
        gameBoard.isAtAssemblyStation = false
        gameBoard.isAtCheckout = false
        break
      case 'checkoutCounter':
        gameBoard.isAtCheckout = true
        gameBoard.isAtAssemblyStation = false
        break
      default:
        break
    }
  }
}
