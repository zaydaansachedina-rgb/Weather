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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})