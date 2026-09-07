const express = require('express')  
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const Database = require('better-sqlite3');
app.use(bodyParser.json())
const db = new Database('weatherapp.db')

const fs = require('fs')


const schemaPath = `${__dirname}/schema.sql`//allows to find the file name schema.sql
const schemaSql = fs.readFileSync(schemaPath, 'utf8')// converst the file into readavle text not binary 
db.exec(schemaSql)//excutes the file


app.post('/api/favourites', (req, res) => {
    const {id, name, latitude, longitude} = req.body 
    if (!id || !name || !latitude || !longitude){
        return res.status(400).json("missing the required fields")

    }
    try{
        const stmt = db.prepare('INSERT INTO favourites (id, CityName, Longitude, Latitude) VALUES (?, ?, ?, ?)')
        stmt.run(id, name, longitude, latitude)
        res.status(201).json("Sent succesfully")
        console.log("sent favourite succesfully")

    }catch(error){
        console.error(error.message)
        res.send(error.message)
    }

})


app.get('/api/favourites', (req, res) => {
    try{
        const stmt = db.prepare('SELECT * FROM favourites ORDER BY AddDate DESC')
        const favoritesList = stmt.all()
        res.json(favoritesList)

    }catch(error){
        console.error(error.message)
        res.send(error.message)
    }  
})




app.get('/api/cities', async (req, res) => {    
    const city = req.query.city 
   // let realCity = ""
/*
    for (let i = 0; i < city.length; i++){ // gets rid of all diffrent spaces in the 
        if (city[i] !==" "){
            realCity += city[i]
        }
    }
*/
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}` //find something else for loop
    console.log(city)
    
    if (city === undefined ){  //city was not inputted
        console.log("No city!")
    }
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }
        const result = await response.json()
        const lat = result.results[0].latitude
        const long = result.results[0].longitude
        const cords = [lat, long]
        console.log(lat)
        console.log(long)
        res.send({cords})

    } catch (error) {
        console.error(error.message)
        
    }
})

//passing data using the body not possin
app.post('/api/weather', async (req, res) => {
    const data = req.body
    const latu = data.results[0].latitude
    const longu = data.results[0].longitude
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(latu)}&longitude=${encodeURIComponent(longu)}&hourly=temperature_2m`
    try {
        const anwser = await fetch(weatherUrl)

        if (!anwser.ok){
            throw new Error(`Response status: ${anwser.status}`)
        }

        const entry = await anwser.json()
        const weather = entry.hourly.temperature_2m[0]
        res.json({weather})

    } catch(error){
        console.error(error.message)
    }


})
app.delete('/api/favourites/:id', (req, res) => {
    const id = req.params.id
    try {
       const stmt =  db.prepare('DELETE FROM favourites WHERE ID = ?')
       stmt.run(id)
       res.status(201).json("deleted succesfully")
    }catch(error){
        console.error(error.message)
        res.send(error.message)
    }


})
/*
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
*/
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

