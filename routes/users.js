const express = require('express');
const router = express.Router();
const path = require('path');
const { HTTP } = require(path.join(__dirname, '../config', 'config.js'))

// Ruta Base
router.get('/', (req, res) => {
    res.status(HTTP.OK).send('Página de users');
});

// Ruta Details
router.get('/details', (req, res) => {
    res.status(HTTP.OK).send('Detalle de users');
});

module.exports = router;