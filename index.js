import menuArray from "./data.js";

const itemOuter = document.getElementById("item-outer")

render()


function getInnerHtml(){
    let innerHtml = []

    innerHtml = menuArray.map( (menuItem) => {
        const {name, ingredients, id, price, image} = menuItem

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

    return innerHtml
}

function render() {
    itemOuter.innerHTML = getInnerHtml()
}


