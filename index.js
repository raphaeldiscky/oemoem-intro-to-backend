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
const app = express() // simpy function that represent express module
const axios = require('axios')
const mongoose = require('mongoose')

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

const kelToCel = (k) => {
    return Math.round(k - 273)
}

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
            <h1>The temperature in ${cityName} is ${kelToCel(temp)} degrees Celcius.</h1>
            <img src=${iconURL}>
        `)

    } catch (error) {
        // console.error(error);
        res.send("<h1>Location not Found!</h1>")
    }

})


mongoose.connect("mongodb://localhost:27017/test2021", {useNewUrlParser: true, useUnifiedTopology: true})
let db = mongoose.connection

db.on("connected", () => {
    console.log("Connected to MongoDB using Mongoose");
})

const articleShcema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleShcema)

// create new article
app.post("/articles", (req, res) => {
//   console.log(req.body.title);
//   console.log(req.body.content);
  const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
  })

  newArticle.save((err) => {
      if(!err) {
          res.send("Successfullly added a new article!")
      } else {
          res.send(err)
      }
  })
})

// find all articles
app.get("/articles", (req, res) => {
    Article.find((err, foundArticle) => {
        if(!err) {
            res.send(foundArticle)
        } else {
            res.send(err)
        }
    })
})

// delete all articles
app.delete("/articles", (req, res) => {
    Article.deleteMany((err) => {
        if(!err){
            res.send("Successfully deleted all articles!")
        } else {
            res.send(err)
        }
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})

// instal dotenv
// make input city with post method
// app.use(express.urlencoded()) -> request data to be sent encoded in the URL 

// build your own restful api
// 