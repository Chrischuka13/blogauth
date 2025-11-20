const mongoose = require('mongoose')
const {isEmail} = require('validator')

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'please provide a name']
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        unique: true,
        validator: [isEmail, 'provide a valid email address']
    },
    matricnumber: {
        type: String,
        required: [true, 'please provide a number'],
        unique: true
    },
    level: {
        type: String,
        required: [true, 'please provide a level'],
        enum: [100, 200, 300, 400, 500, 600]
    },
    department: {
        type: String,
        enum: ['Computer Science', 'Business Admin', 'Philosophy', 'English', 'Mathematics']
    },
    age: {
        type: String,
        required: [true, 'please provide an age']
    },
    gender: {
        type: String,
        required: [true, 'please provide gender'],
        enum: ['male', 'female']
    },
    gpa: {
        type: Number,
        required: [true, 'please provide a gpa']
    },
    createdby: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: [true, 'please provide a student']
    }

},{timestamps: true})

module.exports = mongoose.model('Student', studentSchema)
