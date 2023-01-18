let player
let flavourOptions = ['vanilla', 'chocolate', 'strawberry']

const generateNewOrder = () => {
  let randomFlavour = Math.floor(Math.random() * 3)
  let newFlavour = flavourOptions[randomFlavour]
  const order = new Order(newFlavour, `./images/${newFlavour}.png`)
  gameBoard.orders.push(order)
}

const assembleOrder = () => {

}
const submitOrder = () => {
  
}
const startGame = () => {
  // console.log('game started')
}

