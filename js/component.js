class Component {
    constructor(imgURL, posX, posY, width, height){
        this.imgURL = imgURL
        this.width = width
        this.height = height
        this.posX = posX
        this.posY = posY
    }
    render(){
        const ctx = gameBoard.ctx
        ctx.drawImage(this.imgURL, this.posX, this.posY, this.width, this.height)
    }
}
