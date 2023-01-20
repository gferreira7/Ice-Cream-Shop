class Component {
    constructor(name,img, posX, posY, width, height){
        this.img = img
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.name = name
    }
    render(){
        const ctx = gameBoard.ctx
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
        }
        else {
            gameBoard.isAtAssemblyStation = false
            gameBoard.isAtCheckout = false
            return false
        }
    }
}
