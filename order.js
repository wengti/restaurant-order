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
    yourOrderOuter.innerHTML = getOrderPageInnerHtml()
}

function getOrderPageInnerHtml(){

    // Dynamically add the past order count to the receipt icon
    const orderNumberIcon = document.createElement("div")
    orderNumberIcon.textContent = (pastUserOrderArr.length > 99) ? 99 : pastUserOrderArr.length
    receiptIcon.appendChild(orderNumberIcon)


    let orderPageInnerHtml = "<h1>Your Order</h1>"

    if (pastUserOrderArr.length > 0){

        for (let userOrderAll of pastUserOrderArr){
            let totalPrice = 0
            const {orderNumber, rating, orderTime} = userOrderAll[0]
            const orderTimeString = new Date(orderTime)

            orderPageInnerHtml += `
                <div class="order-item" id="order-item">
                        <p class="order-number">Order #${orderNumber}</p>
                        <p class="order-time">Order Time: ${orderTimeString.toLocaleString()}</p>
            `
            for (let i=1; i<userOrderAll.length; i++){
                const {name, orderCount, price} = userOrderAll[i]
                totalPrice += orderCount * price

                orderPageInnerHtml += `
                        <div class="order-item-detail" id="order-item-detail">
                            <p>${orderCount}x ${name}</p>
                            <p class="order-item-price">$${orderCount*price}</p>
                        </div>
                `
            }
            
            orderPageInnerHtml += `
                        <div class="order-item-total" id="order-item-total">
                            <p>Total Price</p>
                            <p class="order-item-total-price">$${totalPrice}</p>
                        </div>
                        <div class="rating-section">
                            <p>Rating:</p>
                            <span>
            `

            for (let i=0; i<rating; i++){
            orderPageInnerHtml += `
                <i class="fa-solid fa-star"></i>
            `
            }

            for (let i=0; i<(5-rating); i++){
            orderPageInnerHtml += `
                <i class="fa-regular fa-star"></i>
            `
            }
            
            orderPageInnerHtml += `
                            </span>
                        </div>
                    </div>
                    `
        }
    } 

    return orderPageInnerHtml
}
    



    