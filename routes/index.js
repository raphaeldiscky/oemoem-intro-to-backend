const express = require('express')
const router = express.Router()

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