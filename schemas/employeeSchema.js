const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = {Employee: Employee};