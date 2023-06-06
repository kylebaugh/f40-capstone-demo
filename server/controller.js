let drinks = require('./db.json')
let globalId = 4

module.exports = {
    getDrinks: (req, res) => {
        res.status(200).send(drinks)
    },

    addDrink: (req, res) => {
        console.log(req.body)
        const {name, url, ingredients} = req.body

        let newDrink = {
            "drinkId": globalId,
            "drinkName": name,
            "pictureURL": url,
            "rating": 0,
            ingredients
        }

        drinks.push(newDrink)

        globalId++

        res.status(200).send(drinks)

    },

    deleteDrink: (req, res) => {

        // console.log(req.params)

        let {id} = req.params

        const index = drinks.findIndex((drink) => drink.drinkId === +id)

        drinks.splice(index, 1)

        res.status(200).send(drinks)
    },

    editDrink: (req, res) => {


        // check to see which id we're changing
        // check to see if it's an upvote or downvote
        // adjust rating property accordingly

        const {id} = req.params
        const {type} = req.body

        const index = drinks.findIndex((drink) => drink.drinkId === +id)


        if(type === 'upvote'){
            drinks[index].rating++
        }else if(type === 'downvote'){
            drinks[index].rating--
        }


        res.status(200).send(drinks)
    }

}