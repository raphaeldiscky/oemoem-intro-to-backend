// run node index.js
// console.log("Hello World!")

// penjelasan mengenai npm
// npm init
// superheroes

// const superheroes = require('superheroes')
// const myHero = superheroes.random()
// console.log(myHero)

// penjelasan mengenai express
// check stateofjs.com
// creating our first server with express
const express = require('express')
const axios = require('axios')
const app = express() // simpy function that represent express module

// app.get('/', (req, res) => { // function dari express, dipanggil setiap browser melakukan get request ke server kita
//     res.send("<h3>Home Hello World!</h3>")
// }) 

// app.get('/contact', (req, res) => {
//     res.sendFile(__dirname + "/index.html")
// })

// app.listen(3000, () => {
//     console.log('Server running on port 3000');
// })
// check localhost:3000, cannot get / --> browser tidak mendapatkan data apapun saat request ke server
// membuat code supaya server merespon ke browser/client
// handling req and res

// instal nodemon
// sendFile index.html

// API check yahoo.com, openweathermap
// facebook and instagram friend recommendation
// API = penghubung antara satu aplikasi ke aplikasi lain
// pemisalan jokeapi
// illustrate authentication API with openweathermap
// show postman to testing API

// instal axios for handling HTTP request
require('dotenv').config()
app.use(express.urlencoded({extended: true})) 

app.get("/", async (req,res) => {
   res.sendFile(__dirname + "/index2.html")
})

app.post("/", async (req,res) => {
    const cityName = req.body.cityName
    const apiKey = process.env.API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    try {
        const {data} = await axios.get(url)
        const temp = data.main.temp
        const weatherDesc = data.weather[0].description
        const icon = data.weather[0].icon
        const cityName = data.name
        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
        // using template literal
        res.send(`
            <p>The weather is currently ${weatherDesc}<p>
            <h1>The temperature in ${cityName} is ${temp} degrees Celcius.</h1>
            <img src=${iconURL}>
        `)
        

    } catch (error) {
        // console.error(error);
        res.send("<h1>Location not Found!</h1>")
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

// instal dotenv
// make input city with post method
// app.use(express.urlencoded()) -> request data to be sent encoded in the URL 