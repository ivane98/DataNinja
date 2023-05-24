const mongoose=require('mongoose');

var employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
    },
    department: {
        type: String
    }
})

const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee;

