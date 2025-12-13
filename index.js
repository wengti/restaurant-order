import menuArray from "./data.js";

// Getting control of elements
const itemOuter = document.getElementById("item-outer")
const orderOuter = document.getElementById("order-outer")


// Functions to run upon loading of the page
render()

// Event Listener
document.addEventListener("click", function(event) {
    if (event.target.dataset.addOrderId) {
        addOrder(event.target.dataset.addOrderId)
    }
    else if (event.target.dataset.removeOrderId) {
        removeOrder(event.target.dataset.removeOrderId)
    }
})

// Add or Remove Order
function addOrder(itemId) {
    const targetItem = menuArray.filter( (menuItem) => {
        return menuItem.id === itemId
    })[0]
    console.log(targetItem)

    targetItem.orderCount++

    render()
}

function removeOrder(itemId) {
    const targetItem = menuArray.filter( (menuItem) => {
        return menuItem.id === itemId
    })[0]
    console.log(targetItem)

    targetItem.orderCount--

    render()
}










// render()
function getMenuHtml(){
    let menuHtml = []

    // Render out the menu
    menuHtml = menuArray.map( (menuItem) => {
        const {name, ingredients, id, price, image, orderCount} = menuItem

        return `
            <div class="item-inner">
                <div class="food-img"><img src=${image}/></div>
                <div class="food-detail">
                    <p class="food-name">${name}</p>
                    <p class="food-ingredient">${ingredients.join(", ")}</p>
                    <p class="food-price">$${price}</p>
                </div>
                <button data-add-order-id=${id} id="add-order-btn">+</button>
            </div>
        `
    }).join("")

    return menuHtml
}

function getOrderHtml(){

    let orderHtml = ""

    //Render out the order
    //First get the array containing foods that are ordered
    const orderArrByUser = menuArray.filter( (menuItem) => {
        return menuItem.orderCount > 0
    })

    if (orderArrByUser.length > 0){

        let totalPrice = 0

        orderHtml += `
                <p class="order-title">Your Order</p>
        `

        orderHtml += orderArrByUser.map( (orderObj) => {

            const {name, ingredients, id, price, image, orderCount} = orderObj
            totalPrice += price*orderCount

            return `
                <div class="order-item-inner">
                    <div class="order-item">
                        <div class="order-detail">${orderCount}x ${name}</div>
                        <button class="remove-btn" data-remove-order-id=${id}
                            id="remove-order-btn" tabindex="0">remove</button>
                        <div class="order-price">$${price*orderCount}</div>
                    </div>
                </div>
            `
        }).join("")


        orderHtml += `
                <div class="order-price-inner">
                    <div class="total-price">
                        <div class="order-detail">Total Price:</div>
                        <div class="order-price">$${totalPrice}</div>
                    </div>
                </div>

                <button class="complete-order-btn">Complete order</button>
        `
    }

    return orderHtml
}

function render() {
    itemOuter.innerHTML = getMenuHtml()
    orderOuter.innerHTML = getOrderHtml()

}


