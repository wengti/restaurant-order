// Local Storage
let pastUserOrderArr = []
if (localStorage.getItem("userOrderArr")){
    pastUserOrderArr = JSON.parse(localStorage.getItem("userOrderArr"))
} 

// Get control of Elements
const yourOrderOuter = document.getElementById("your-order-outer")
const footerContainer = document.getElementById("footer-container")
const receiptIcon = document.getElementById("receipt-icon")

// Render
renderOrder()
const dateNow = new Date()
footerContainer.innerHTML = `<h2>Jimmy's Diner © ${dateNow.getFullYear()}</h2>`

function renderOrder() {
    orderOuter.innerHTML = getOrderPageInnerHtml()
}

function getOrderPageInnerHtml(){

    // Dynamically add the past order count to the receipt icon
    const orderNumberIcon = document.createElement("div")
    orderNumberIcon.textContent = (pastUserOrderArr.length > 99) ? 99 : pastUserOrderArr.length
    receiptIcon.appendChild(orderNumberIcon)


    let orderPageInnerHtml = ""

    return orderPageInnerHtml
}