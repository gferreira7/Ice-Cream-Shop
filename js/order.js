
class Order {
    constructor(flavour, img){
        this.flavour = flavour
        this.img = img
        // Render progress bar in the DOM dynamically
        // so it can be tweaked later for hard mode or special events 
        this.timePerOrder = 10
        this.secondsElapsed = 0
        this.percentageDecrement = 100/this.timePerOrder
        this.currentTimeLeft = 100 //starts at 100 and drops percentage Decrement per secondsElapsed%
    }
    updateProgressBar(){
        this.currentTimeLeft = 100 - (this.secondsElapsed * this.percentageDecrement)
    }
}

