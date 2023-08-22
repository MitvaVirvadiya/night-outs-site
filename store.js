if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    const removeCartitemButton = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartitemButton.length; i++){
        let button = removeCartitemButton[i]
        button.addEventListener('click', removeCartItem)
    }    

    const quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }  

    const addToCartButton = document.getElementsByClassName('shop-item-btn')
    for (let i = 0; i < addToCartButton.length; i++){
        let button = addToCartButton[i]
        button.addEventListener('click', addToCart)
    }  

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCart(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemtitle = document.getElementsByClassName('cart-item-title')
    for(let i = 0; i < cartItemtitle.length; i++){
        if(cartItemtitle[i].innerText == title){
            alert("This item is already added to the cart")
            return
        }
    }
    let cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function purchaseClicked() {
    alert("Thank you for Shopping with us")
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function updateCartTotal() {
    const cartItemContainer = document.getElementsByClassName('cart-items')[0]
    const cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0

    for(let i = 0; i< cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total += (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}