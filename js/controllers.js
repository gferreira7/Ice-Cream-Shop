let player
let ordersArray = []

let flavourOptions = ['vanilla', 'chocolate', 'strawberry']

const generateNewOrder = () => {

    let randomFlavour = Math.floor(Math.random() * 3) 
    let newFlavour = flavourOptions[randomFlavour]
    const order = new Order(newFlavour, `./images/${newFlavour}.png`)
}


const getTimer = () => {
    const createdAt = new Date()
    

    setTimeout(() => {
       const newTime = new Date()
       let timeElapsed = newTime.now() - createdAt.now()

    }, 2000);
    console.log(timeElapsed)
}