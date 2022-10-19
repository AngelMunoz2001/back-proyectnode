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


//Importar rutas

//Ruta del Middleware
app.get('/', (req,res) =>{
    res.json({
        estado: true,
        mensaje: 'WORKS FINE!!!'
    })
})

//Inivializar servidor
const PORT = process.env.PORT || 3002
app.listen(PORT, () =>{
    console.log(`Servidor Corriendo: ${PORT}`)
})