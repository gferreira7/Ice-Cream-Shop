class Component {
    constructor(imgURL, posX, posY, width, height){
        this.imgURL = imgURL
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
        this.canUseAction = false
    }
    render(){
        const ctx = gameBoard.ctx
        ctx.drawImage(this.imgURL, this.posX, this.posY, this.width, this.height)
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
            return false
        }
    }
}
