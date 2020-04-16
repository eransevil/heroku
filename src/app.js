const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirctoryPath = path.join(__dirname, '../public')
const viewPath = path.join (__dirname, '../templates/views')
const partialsPath = path.join (__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirctoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:'weather',
        name:'Eran Sevil'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About me',
        name:'Eran Sevil',
    })
}) 

app.get('/help',(req, res)=>{
    res.render('help', {
        helptext:'this is some help text',
        title: 'help',
        name: 'Eran Sevil'
       })
})

app.get('/help/*', (req, res)=>{
  res.render('404', {
        title:'404',
        errorText:'help artical not found',
        name:'Eran Sevil'
    })
})

app.get('/weather', (req, res)=> {
    if(!req.query.address){
        return res.send ({
            error: 'you must provide a search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}= { }) =>{
        if(error){
            return res.send({error})
            console.log(error)
    }

    res.send({
        latitude:latitude,
        longitude:longitude,
        location:location,
    })

    }
    
)})
/* console.log (req.query.address)
    res.send({
        forecast:'it is snowing',
        location:'philadlelphia',
        address: req.query.address
    })
    */

app.get('/products', (req, res) =>{
    if(!req.query.search){ 
        return res.send ({
             error: "you nust provide a search term!"
        })
    }
    console.log (req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title:'404',
        errorText:'page not found',
        name:'Eran Sevil'
    })
})

app.listen(port, () =>{
    console.log('server is up on port '+ port)
})