const testCollisions = () => {
    console.group('Testing Collisions')
    console.log(`Cone Storage ${gameBoard.isAtConeStorage}`)
    console.log(`multistorage ${gameBoard.isAtMultistorage}`)
    console.log(`checkout ${gameBoard.isAtCheckout}`)
    console.log(`player X coordinates ${player.posX}, ${player.posX + player.width}`)
    console.groupEnd()
}

const checkOrderCycle = () => {
    console.group('Testing Order Cycle')
    console.log(`Player has Cone? ${player.heldItems.cone}`)
    console.log(`Player Has Ice cream? ${player.heldItems.vanilla || player.heldItems.chocolate || player.heldItems.strawberry}`)
    console.log(`Ready to Deliver: ${player.readyToDeliver}`)
    console.log(`Delivered? ${player.readyToDeliver}`)
    console.groupEnd()
}

const checkKeysPressed = () => {
    console.group('Testing Keys Pressed')
    console.log(`Up key? ${gameBoard.isUpKeyPressed}`)
    console.log(`Down key? ${gameBoard.isDownKeyPressed}`)
    console.log(`Left key? ${gameBoard.isLeftKeyPressed}`)
    console.log(`Right key? ${gameBoard.isRightKeyPressed}`)
    console.log(`Action key? ${gameBoard.isActionKeyPressed}`)
    console.groupEnd()
}
