class Player extends Component {
  constructor(name, imgURL, posX, posY, width, height) {
    super(name, imgURL, posX, posY, width, height)
    this.ySpeed = 2
    this.xSpeed = 2
    this.heldItems = {
      cone: false,
      vanilla: false,
      chocolate: false,
      strawberry: false,
    }
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
  action(component) {
    switch (component.name) {
      case 'assemblyCounter':
        gameBoard.isAtAssemblyStation = true
        break
      case 'cupboard':
        this.heldItems.cone = true
        break;
      case 'vanilla':
        this.heldItems.vanilla = true
        break
      case 'chocolate':
        this.heldItems.chocolate = true
        break
      case 'strawberry':
        this.heldItems.strawberry = true
      case 'checkoutCounter':
        gameBoard.isAtCheckout = true
        break
      default:
        break
    }
  }
}
