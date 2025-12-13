import menuArray from "./data.js";

// Getting control of elements
const itemOuter = document.getElementById("item-outer")


// Functions to run upon loading of the page
render()


// render()
function getInnerHtml(){
    let innerHtml = []


    // Render out the menu
    innerHtml = menuArray.map( (menuItem) => {
        const {name, ingredients, id, price, image, orderCount} = menuItem

        return `
            <div class="item-inner">
                <div class="food-img"><img src=${image}/></div>
                <div class="food-detail">
                    <p class="food-name">${name}</p>
                    <p class="food-ingredient">${ingredients.join(", ")}</p>
                    <p class="food-price">$${price}</p>
                </div>
                <button>+</button>
            </div>
        `
    }).join("")

    //Render out the order
    //First get the array containing foods that are ordered
    const orderArrByUser = menuArray.filter( (menuItem) => {
        return menuItem.orderCount > 0
    })

    if (orderArrByUser.length > 0){

        let totalPrice = 0

        innerHtml += `
            <section class="order-outer" id="order-outer">
                <p class="order-title">Your Order</p>
        `

        innerHtml += orderArrByUser.map( (orderObj) => {

            const {name, ingredients, id, price, image, orderCount} = orderObj
            totalPrice += price*orderCount

            return `
                <div class="order-item-inner">
                    <div class="order-item">
                        <div class="order-detail">${orderCount}x ${name}</div>
                        <div class="remove-btn">remove</div>
                        <div class="order-price">$${price*orderCount}</div>
                    </div>
                </div>
            `
        }).join("")


        innerHtml += `
                <div class="order-price-inner">
                    <div class="total-price">
                        <div class="order-detail">Total Price:</div>
                        <div class="order-price">$${totalPrice}</div>
                    </div>
                </div>            
            </section>
        `
    }

    return innerHtml
}

function render() {
    itemOuter.innerHTML = getInnerHtml()
}


