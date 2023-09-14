const express = require('express');
const path = require('path');
const router = express.Router();

// Router que nos lleva a corterRoute.

const corteRouter = require(path.join(__dirname, '../routes/', 'cortes.js'));
const usersRouter = require(path.join(__dirname, '../routes/', 'users.js'));
const employeesRouter = require(path.join(__dirname, '../routes/', 'employees.js'));

router.use('/cortes', corteRouter);
router.use('/users', usersRouter);
router.use('/employees', employeesRouter);

module.exports = router;