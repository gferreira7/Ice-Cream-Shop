
class Order {
    constructor(flavour, imgUrl){
        this.flavour = flavour
        this.imgUrl = imgUrl
        this.creationTime = 0 //haven't figured out best way to implement timer
    }
    addOrder() {
        if(gameBoard.orders.length < 4){
            generateNewOrder()
        }
    }
}

