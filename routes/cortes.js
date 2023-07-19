const express = require('express');
const router = express.Router();
const path = require('path');
const moment = require('moment-timezone');
const { Corte } = require(path.join(__dirname, '../schemas', 'corteSchema.js'));
const { HTTP } = require(path.join(__dirname, '../config', 'config.js'))


// Ruta Base
router.get('/', (req, res) => {
  res.status(HTTP.OK).send('Página de corte');
});

// Ruta Details
router.get('/details', (req, res) => {
  res.status(HTTP.OK).send('Detalle de corte');
});

// Data
router.get('/data', (req, res) => {
    Corte.find({})
    .then((cortes) => {
        res.status(HTTP.FOUND).json(cortes);
    })
    .catch((error) => {
        console.error(error);
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener los cortes' });
    });
});

// Get Corte By RCC
router.get('/rcc/:rcc', (req, res) => {
    const rcc = req.params.rcc;

    Corte.findOne({ RCC: rcc })
    .then((corte) => {
        if (!corte) {
        return res.status(HTTP.BAD_REQUEST).json({ error: 'RCC Mal escrito o no encontrado.' });
        }

        res.status(HTTP.FOUND).json(corte);
    })
    .catch((error) => {
        console.error(error);
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener el corte' });
    });
});

// Get Corte Between RCC
router.get('/rcc', (req, res) => {
    const rcc1 = req.query.rcc1;
    const rcc2 = req.query.rcc2;
  
    Corte.find({ RCC: { $gte: rcc1, $lte: rcc2 } })
    .then((cortes) => {
        if (cortes.length === 0) {
            return res.status(HTTP.BAD_REQUEST).json({ error: 'RCC Mal escrito o no encontrado.' });
        }

        res.status(HTTP.FOUND).json(cortes);
    })
    .catch((error) => {
        console.error(error);
        res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener los cortes' });
    });
});

// Get Corte By Date
router.get('/date/:date', (req, res) => {
    const date = req.params.date;

    try {
        const fecha = moment.tz(date, 'America/Los_Angeles').toDate();
        const fechaInicio = moment(fecha).startOf('day').toDate();
        const fechaFin = moment(fecha).endOf('day').toDate();

        Corte.find({ fechaHora: { $gte: fechaInicio, $lt: fechaFin } })
        .then((cortes) => {
            res.status(HTTP.FOUND).json(cortes);
        })
        .catch((error) => {
            console.error(error);
            res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener los cortes' });
        });
    } catch (error) {
        return res.status(HTTP.BAD_REQUEST).json({ error: 'Formato de fecha inválido. Utiliza el formato YYYY-MM-DD' });
    }
});

// Get Corte Between Dates
router.get('/date', (req, res) => {
    const date1 = req.query.date1;
    const date2 = req.query.date2;

    try {
        const fechaInicio = moment.tz(date1, 'America/Los_Angeles');
        const fechaFin = moment.tz(date2, 'America/Los_Angeles').endOf('day');

        Corte.find({ fechaHora: { $gte: fechaInicio.toDate(), $lt: fechaFin.toDate() } })
        .then((cortes) => {
            res.status(HTTP.FOUND).json(cortes);
        })
        .catch((error) => {
            console.error(error);
            res.status(HTTP.INTERNAL_SERVER_ERROR).json({ error: 'Error al obtener los cortes' });
        });
    } catch (error) {
        return res.status(HTTP.BAD_REQUEST).json({ error: 'Formato de fecha inválido. Utiliza el formato YYYY-MM-DD' });
    }
});  

module.exports = router;
