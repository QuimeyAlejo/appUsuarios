const express = require('express');
const axios = require('axios')
const {User} = require('../db.js')
const { Op } = require("sequelize");


const createAcount = async (req,res) =>{
    try {
        const {nombre, apellido, correo, contraseña, fechaNacimiento} = req.body
        const acount = {nombre, apellido, correo, contraseña, fechaNacimiento}
        res.status(200).send('Cuenta registrada con exito')

    } catch (error) {
        res.status(400).send({error: "Error al crear la cuenta"})
    }
}

module.exports = {createAcount}