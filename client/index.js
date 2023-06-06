console.log('JS connected successfully!')

const baseURL = 'http://localhost:2319/drinks'

// Step 1: Select an element
const drinkDisplay = document.querySelector('#drinkCardDisplay')
const form = document.querySelector('#drinkForm')
let drinkName = document.querySelector('#nameInput')
let drinkPic = document.querySelector('#urlInput')
let drinkIngredients = document.querySelector('#ingredientsInput')


// Step 2: Write a function

const createDrinkCard = (drink) => {
    const newDrinkCard = document.createElement('section')

    newDrinkCard.innerHTML = `
        <img src=${drink.pictureURL} alt='Picture of drink' class='drinkPic'/>
        <p>${drink.drinkName}</p>
        <p>Ingredients</p>
        <ul id='drink${drink.drinkId}'></ul>
        <p>Rating:</p>
        <section class='ratingButtons'>
            <button onclick='updateDrink(${drink.drinkId}, "downvote")'>-</button>
            <p>${drink.rating}</p>
            <button onclick='updateDrink(${drink.drinkId}, "upvote")'>+</button>
        </section>
        <button onclick='deleteDrink(${drink.drinkId})'>Delete</button>
    `

    drinkDisplay.appendChild(newDrinkCard)

    let myUl = document.querySelector(`#drink${drink.drinkId}`)

    for(let i = 0; i < drink.ingredients.length; i++){
        let listItem = document.createElement('li')
        listItem.textContent = drink.ingredients[i]

        myUl.appendChild(listItem)
    }
}


const displayAllDrinks = (arr) => {

    for(let i = 0; i < arr.length; i++){
        console.log(arr[i])
        createDrinkCard(arr[i])
    }
}


const getAllDrinks = () => {
    axios.get(baseURL)
        .then((res) => {
            console.log(res.data)
            displayAllDrinks(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}


const addDrink = (e) => {
    e.preventDefault()
    drinkDisplay.innerHTML = ''

    let bodyObj = {
        name: drinkName.value,
        url: drinkPic.value,
        ingredients: drinkIngredients.value.split(', ')
    }

    axios.post(baseURL, bodyObj)
        .then((res) => {
            console.log(res.data)
            displayAllDrinks(res.data)
            drinkName.value = ''
            drinkPic.value = ''
            drinkIngredients.value = ''
        })
        .catch((err) => {
            console.log(err)
        })

}


const deleteDrink = (id) => {
    drinkDisplay.innerHTML = ''
    axios.delete(`${baseURL}/${id}`)
        .then((res) => {
            displayAllDrinks(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const updateDrink = (id, type) => {
    drinkDisplay.innerHTML = ''
    axios.put(`${baseURL}/${id}`, {type})
        .then((res) => {
            displayAllDrinks(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}



// Step 3: Combine steps 1 and 2 with an event listener

form.addEventListener('submit', addDrink)

getAllDrinks()