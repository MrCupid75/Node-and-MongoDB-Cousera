const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeData = {
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
};

const employees = new Schema(employeeData)

module.exports = mongoose.model('employees', employees)