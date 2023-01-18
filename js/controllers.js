let player
let flavourOptions = ['vanilla', 'chocolate', 'strawberry']

const generateNewOrder = () => {
  let randomFlavour = Math.floor(Math.random() * 3)
  let newFlavour = flavourOptions[randomFlavour]
  const order = new Order(newFlavour, `./images/${newFlavour}.png`)
  gameBoard.orders.push(order)
}

const startGame = () => {
  console.log('game started')
}

// const getTimer = () => {
//     const creationDate = Date.now()
//     setTimeout(() => {
//        const newTime = Date.now()

//        const timeElapsed = newTime - creationDate
//        console.log(timeElapsed/1000)
//     }, 2000);
// }
