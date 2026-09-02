const express = require('express')
const app = express()
const port = 3000

app.get('/api/cities', async (req, res) => {    
    const city = req.query.q 
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
    console.log(url)

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const result = await response.json()
        const cityName = result.results[1].name
        
        res.json({cityName})

    } catch (error) {
        console.error(error.message)
        
    }
})


app.get('/api/weather/:lat/:long', async (req, res) => {
    const long = req.params.long
    const lat = req.params.lat
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(long)}&hourly=temperature_2m`
    console.log(weatherUrl)
    try { 
        const anwser = await fetch(weatherUrl)
        if (!anwser.ok) {
            throw new Error(`Response status: ${anwser.status}`)
        }
        const data = await anwser.json()
        const weather = data.hourly.temperature_2m[0]
        res.json({weather})

     } catch(error){
        console.error(error.message)

    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
