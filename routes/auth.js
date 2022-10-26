const router = require('express').Router()
const User = require('../models/User')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Establece los parametros 
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    address:  Joi.string().max(255).required(),
    lastname: Joi.string().min(6).max(255).required(),
    age: Joi.number().required(),
    password: Joi.string().min(6).max(255).required(),
    username: Joi.string().min(6).max(255).required()
})

const schemaLogin = Joi.object({
    password: Joi.string().min(6).max(255).required(),
    username: Joi.string().min(6).max(255).required()
})

router.post('/register', async(req, res) =>{
    const { error } = schemaRegister.validate(req.body)
    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

//Validacion de si el usuario existe (await) 
    const isUserNameExist = await User.findOne({
        username: req.body.username
    })
    if(isUserNameExist){
        return res.status(400).json({
            error: "El usuario ya existe"
        })
    }

//Encriptar la contraseña del usuario
    const salt = await bcrypt.genSalt(10)
    const newPass = await bcrypt.hash(req.body.password, salt)

//Muestra los datos, guarda el nuevo usuario
    const user = new User({
        name: req.body.name,
        address : req.body.address,
        lastname : req.body.lastname,
        age : req.body.age,
        date : req.body.date,
        password: newPass,
        username : req.body.username
    })
    try{
        const savedUser = await user.save()
        res.json({
            error: null,
            data: savedUser
        })
    }catch(error){
        res.status(400).json({error})
    }
    
})

//Seccion del login
router.post('/login', async(req, res) =>{
    const {error} = schemaLogin.validate(req.body)

    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

//Valida que el usuario exista en la base de datos
    const user = await User.findOne({
        username: req.body.username
    })

    if(!user){
        return res.status(400).json({
            error: 'No se encontro el usuario'
        })
    }

//Compara la contraseña ingresada con la registrada
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        return res.status(400).json({
            error: 'La contraseña no coincide'
    })
}

//Crea un token del usuario
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
/* token: */  data: { token }
    })

})

module.exports = router
