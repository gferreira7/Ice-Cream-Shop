class Player extends Component {
  constructor(name, imgURL, posX, posY, width, height) {
    super(name, imgURL, posX, posY, width, height)
    this.ySpeed = 4
    this.xSpeed = 4
    this.heldItems = {
      cone: false,
      vanilla: false,
      chocolate: false,
      strawberry: false,
    }
    this.readyToDeliver = ''
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
        gameBoard.isAtCheckout = false
        break
      case 'cupboard':
        if(assemblyCounterItems.hasCone){
          console.log('you already have a cone you dum dum') 
          return  
        }
        this.heldItems.cone = true
        this.heldItems.vanilla = false
        this.heldItems.chocolate = false
        this.heldItems.strawberry = false
        gameBoard.isAtAssemblyStation = false
        gameBoard.isAtCheckout = false
        break
      case 'vanilla':
        if(assemblyCounterItems.flavour === 'vanilla'){
          console.log('you already have this flavour you dum dum') 
          return  
        }
        this.heldItems.vanilla = true
        this.heldItems.chocolate = false
        this.heldItems.strawberry = false
        gameBoard.isAtAssemblyStation = false
        gameBoard.isAtCheckout = false
        break
      case 'chocolate':
        if(assemblyCounterItems.flavour === 'chocolate'){
          console.log('you already have this flavour you dum dum') 
          return  
        }  
      this.heldItems.vanilla = false
        this.heldItems.chocolate = true
        this.heldItems.strawberry = false
        gameBoard.isAtAssemblyStation = false
        gameBoard.isAtCheckout = false
        break
      case 'strawberry':
        if(assemblyCounterItems.flavour === 'strawberry'){
          console.log('you already have this flavour you dum dum') 
          return  
        }
        this.heldItems.vanilla = false
        this.heldItems.chocolate = false
        this.heldItems.strawberry = true
        gameBoard.isAtAssemblyStation = false
        gameBoard.isAtCheckout = false
      case 'checkoutCounter':
        gameBoard.isAtCheckout = true
        gameBoard.isAtAssemblyStation = false
        break
      default:
        break
    }
  }
}
