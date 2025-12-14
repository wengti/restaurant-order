import menuArray from "./data.js";



// Local Storage
let pastUserOrderArr = []
if (localStorage.getItem("userOrderArr")){
    pastUserOrderArr = JSON.parse(localStorage.getItem("userOrderArr"))
} 

// Getting control of elements
const itemOuter = document.getElementById("item-outer")
const orderOuter = document.getElementById("order-outer")
const modal = document.getElementById("modal")
const overlay = document.getElementById("overlay")
const paymentForm = document.getElementById("payment-form")
const footerContainer = document.getElementById("footer-container")
const receiptIcon = document.getElementById("receipt-icon")

//
let highestRating = 0
const dateNow = new Date()

// Functions to run upon loading of the page
render()
footerContainer.innerHTML = `<h2>Jimmy's Diner © ${dateNow.getFullYear()}</h2>`



// Event Listener
document.addEventListener("click", function(event) {
    if (event.target.dataset.addOrderId) {
        addOrder(event.target.dataset.addOrderId)
    }
    else if (event.target.dataset.removeOrderId) {
        removeOrder(event.target.dataset.removeOrderId)
    }
    else if (event.target.id === "complete-order-btn") {
        overlay.style.display = "block";
        modal.style.display = "block";
    }
    else if (event.target.id === "overlay" || event.target.id === "payment-x"){
        overlay.style.display = "none";
        modal.style.display = "none";
    }
    else if (event.target.dataset.rating){
        handleRating(event.target.dataset.rating)
    }
    else if (event.target.id === 'rating-btn'){
        handleSubmitRating()
    }
})

paymentForm.addEventListener('submit', handlePayment)


// Add or Remove Order
function addOrder(itemId) {
    const targetItem = menuArray.filter( (menuItem) => {
        return menuItem.id === itemId
    })[0]

    targetItem.orderCount++

    render()
}

function removeOrder(itemId) {
    const targetItem = menuArray.filter( (menuItem) => {
        return menuItem.id === itemId
    })[0]

    targetItem.orderCount--

    render()
}

// handle payment
function handlePayment(event){
    event.preventDefault()

    // get user name from the payment form
    // to be put in the order message
    const paymentFormData = new FormData(paymentForm)
    const userName = paymentFormData.get("name")

    // Clear input field
    paymentForm.name.value = ""
    paymentForm.cardNumber.value = ""
    paymentForm.cardCvv.value = ""

    // Remove overlay and modal
    overlay.style.display = "none";
    modal.style.display = "none";

    // Record User's order
    const userOrderArray = menuArray.filter( menuItem => menuItem.orderCount !== 0)
    userOrderArray.unshift({"rating": 0})
    pastUserOrderArr.unshift(userOrderArray) //Record Locally
    localStorage.setItem("userOrderArr", JSON.stringify(pastUserOrderArr)) //Record in Local Storage

    // Clear orderCount since the payment is already processed
    for (let menuItem of menuArray){
        menuItem.orderCount = 0;
    }

    render(userName)
}

// handle rating
function handleRating(ratingId) {
    const ratingArr = document.querySelectorAll(".fa-star")
    const ratingBtn = document.getElementById("rating-btn")

    // First clear all rating
    ratingArr.forEach( ratingObj => ratingObj.classList.remove("fa-solid"))

    // Highlight rating up until the selected one
    // Only perform this if the clicked star is not the highest highlighted star
    if (Number(ratingId) === highestRating){
        highestRating = 0;
        ratingBtn.textContent = "Not Now"
    } else {
        highestRating = Number(ratingId)
        for (let i=0; i<highestRating; i++){
            ratingArr[i].classList.add("fa-solid")
        }
        ratingBtn.textContent = "Submit Now"
    }
}

function handleSubmitRating(){
    pastUserOrderArr[0][0].rating = highestRating
    localStorage.setItem("userOrderArr", JSON.stringify(pastUserOrderArr))
    render()
}



// render()
function getMenuHtml(){
    let menuHtml = []

    // Render out the menu
    menuHtml = menuArray.map( (menuItem) => {
        const {name, ingredients, id, price, image, orderCount, originalPrice} = menuItem

        const originalPriceHtml = originalPrice ? `$${originalPrice}` : ``
        const spacing = originalPrice ? `&nbsp;&nbsp;&nbsp;` : ``


        return `
            <div class="item-inner">
                <div class="food-img"><img src=${image}/></div>
                <div class="food-detail">
                    <p class="food-name">${name}</p>
                    <p class="food-ingredient">${ingredients.join(", ")}</p>
                    <p class="food-price">
                        <del>${originalPriceHtml}</del>
                        <span>${spacing}</span>
                        $${price}</p>
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

                <button class="complete-order-btn"
                    id="complete-order-btn">Complete order</button>
        `
    }

    return orderHtml

}

function getCompleteOrderHtml(userName) {
    return `
        <div class="complete-inner" id="complete-inner">
            <div class="complete-msg" id="complete-msg"> 
                <p>Thanks, ${userName}! Your order is on its way!</p>
            </div>

            <div class="rating" id="rating">
                <i class="fa-regular fa-star" tabindex="0" data-rating="1"></i>
                <i class="fa-regular fa-star" tabindex="0" data-rating="2"></i>
                <i class="fa-regular fa-star" tabindex="0" data-rating="3"></i>
                <i class="fa-regular fa-star" tabindex="0" data-rating="4"></i>
                <i class="fa-regular fa-star" tabindex="0" data-rating="5"></i>
            </div>

            <button class="rating-btn" id="rating-btn">Not Now</button>
        </div>
    `
}

function render(userName = "") {
    // Dynamically add the past order count to the receipt icon
    const orderNumberIcon = document.createElement("div")
    orderNumberIcon.textContent = (pastUserOrderArr.length > 99) ? 99 : pastUserOrderArr.length
    receiptIcon.appendChild(orderNumberIcon)

    itemOuter.innerHTML = getMenuHtml()
    if (userName) {
        orderOuter.innerHTML = getCompleteOrderHtml(userName)
    } 
    else {
        orderOuter.innerHTML = getOrderHtml()
    }
}


