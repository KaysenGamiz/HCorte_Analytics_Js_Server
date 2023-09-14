const express = require('express');
const router = express.Router();
const path = require('path');
const moment = require('moment-timezone');
const { Employee } = require(path.join(__dirname, '../schemas', 'employeeSchema.js'));
const { HTTP } = require(path.join(__dirname, '../config', 'config.js'))

// GET Base
router.get('/', async (req, res) => {
    res.status(HTTP.OK).send('Página de empleados');
});

// GET Data
router.get('/data', async (req, res) => {
    try {
        const empleados = await Employee.find({}, { nombre: 1, _id: 0 }); // Solo seleccionamos el campo "nombre"
        res.status(HTTP.OK).json(empleados);
    } catch (error) {
        console.log(error)
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: 'Error al obtener la lista de empleados.' });
    }
});

module.exports = router;