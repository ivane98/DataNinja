const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required : true
    },
    
})

const Department = mongoose.model('department', departmentSchema)

module.exports = Department;