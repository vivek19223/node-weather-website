//required express module
const path = require('path');
const express = require('express')
const app = express();
const hbs = require('hbs');
var geocode = require('./utils/geocode.js');
var forecast = require('./utils/forecast.js');

//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//set handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set-up static directories to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Vivek'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Vivek'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        text : 'This page is dedicated for your help.',
        name : 'Vivek'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Address must be provided.!!'
        })
    }
    //We have to provide { latitude,longitude,location }={}, otherwise geocode will try to destructure values ending uo throwing error 
    geocode(req.query.address,(error,{ latitude,longitude,location }={})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })

    }
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404 ',{
        title : '404',
        text : "Help article not found.!!",
        name : 'Vivek'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        text : 'Page Not Found',
        name : 'Vivek'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})