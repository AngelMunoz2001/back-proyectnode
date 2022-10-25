//Declaracion de constantes 
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const { extend } = require('@hapi/joi/lib/base')
const { request } = require('express')
require('dotenv').config()

const app = express()

//Capturar el body
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())

//Conexion a la Base de datos

const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.jxeyr0p.mongodb.net/${process.env.DBNAME}test`

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conectado a BD')
}).catch(e =>{
    console.log('error: ', e)
})


//Importar rutas
const authRoutes = require('./routes/auth')


//Ruta del Middleware
app.use('/api/user', authRoutes)


app.get('/', (req, res) =>{
    res.json({
        estado: true,
        mensaje: 'WORKS FINE!!!'
    })
})

//Inicializar servidor
const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Servidor Corriendo: ${PORT}`)
})