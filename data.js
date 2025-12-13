const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        id: "0",
        price: 14,
        image: "./images/pizza.png",
        orderCount: 0
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        price: 12,
        image: "./images/burger.png",
        id: "1",
        orderCount: 0
    },
    {
        name: "Beer",
        ingredients: ["grain", "hops", "yeast", "water"],
        price: 12,
        image: "./images/beer.png",
        id: "2",
        orderCount: 0
    },
    {
        name: "Set A",
        ingredients: ["2x Hamburgers", "2x Beers"],
        originalPrice: 48,
        price: 43.20,
        image: "./images/SetA.png",
        id: "3",
        orderCount: 0
    },
    {
        name: "Set B",
        ingredients: ["1x Pizza", "4x Beers"],
        originalPrice: 62,
        price: 55.80,
        image: "./images/SetB.png",
        id: "4",
        orderCount: 0
    }
]

export default menuArray