// Require packages
const express = require('express')
const cors = require('cors')

// App instance
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Endpoints

const {getDrinks, addDrink, deleteDrink, editDrink} = require('./controller')

app.get('/drinks', getDrinks)
app.post('/drinks', addDrink)
app.delete('/drinks/:id', deleteDrink)
app.put('/drinks/:id', editDrink)



// Start server

app.listen(2319, () => console.log("We've got a 2319!"))