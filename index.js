// Server = computer that receives requests
// App = listens for requests, retrieves information from the database, and sends a response
// Databases = used to organize and persist dat

// run node index.js
// console.log("Hello World!")

// penjelasan mengenai express
// check stateofjs.com

// penjelasan mengenai npm
// npm init
// superheroes

// const superheroes = require('superheroes')
// const myHero = superheroes.random()
// console.log(myHero)

// creating our first server with express
const express = require('express')
const app = express() // simply function that represent express module
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
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

const kelToCel = (k) => {
  return Math.round(k - 273)
}

app.get('/', async (req, res) => {
  // dipanggil setiap browser melakukan get request ke server kita
  res.sendFile(__dirname + '/index2.html')
})

app.post('/', async (req, res) => {
  const cityName = req.body.cityName
  const apiKey = process.env.API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  try {
    const { data } = await axios.get(url)
    const temp = data.main.temp
    const weatherDesc = data.weather[0].description
    const icon = data.weather[0].icon
    const cityName = data.name
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    // using template literal
    res.send(
      `
            <p>The weather is currently ${weatherDesc}<p>
            <h1>The temperature in ${cityName} 
            is ${kelToCel(temp)} degrees Celcius.</h1>
            <img src=${iconURL}>
        `
    )
  } catch (error) {
    // console.error(error);
    res.send('<h1>Location not Found!</h1>')
  }
})

// instal dotenv
// make input city with post method
// app.use(express.urlencoded()) -> request data to be sent encoded in the URL

// connect database
mongoose.connect(String(process.env.URI_ATLAS), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// check connection
let db = mongoose.connection
db.on('connected', () => {
  console.log('Connected to MongoDB using Mongoose')
})

// create schema
const articleShcema = {
  title: String,
  content: String
}

// create model
const Article = mongoose.model('Article', articleShcema)

// ejs
app.get('/create-article', (req, res) => {
  res.render('create-article')
})

// create new article
app.post('/create-article', (req, res) => {
  //   console.log(req.body.title);
  //   console.log(req.body.content);
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })

  newArticle.save((err) => {
    if (!err) {
      // res.send('Successfullly added a new article!')
      res.redirect('/articles')
    } else {
      res.send(err)
    }
  })
})

// find all articles
app.get('/articles', (req, res) => {
  Article.find((err, foundArticle) => {
    if (!err) {
      // res.send(foundArticle)
      res.render('articles', {
        articles: foundArticle
      })
    } else {
      res.send('Articles is empty!')
    }
  })
})

// delete all articles
app.delete('/articles', (req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send('Successfully deleted all articles!')
    } else {
      res.send(err)
    }
  })
})

// get a specific article by id
app.get('/articles/:id', (req, res) => {
  Article.findOne({ _id: req.params.id }, (err, foundArticle) => {
    if (foundArticle) {
      res.send(foundArticle)
    } else {
      res.send('Article not found!')
    }
  })
})

// update specific article by id
app.put('/articles/:id', (req, res) => {
  Article.updateOne(
    { _id: req.params.id },
    // body-parser passing request
    { title: req.body.title, content: req.body.content },
    (err) => {
      if (!err) {
        res.send('Successfully updated article!')
      } else {
        res.send(err)
      }
    }
  )
})

// delete specific article by id
app.delete('/articles/:id', (req, res) => {
  Article.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.send('Successfully deleted article')
    } else {
      res.send(err)
    }
  })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})

// build your own restful api
