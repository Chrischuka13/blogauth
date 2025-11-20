const mongoose  = require("mongoose");
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {isEmail} = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please provide your first name'],
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        unique: true,
        validator: [isEmail, 'please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'please input a password'],
        minlength: [7, 'password should be atleast 7 characters long']
    }, 
    // role: {
    //     type: String,
    //     enum: ['User', "Admin"]
    // }
}, {timestamps: true})


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.comparePassword = async function(inputPassword)  {
    const isCorrect = await bcrypt.compare(inputPassword, this.password)
    return isCorrect
}

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {userId: this._id, firstname: this.firstname, lastname: this.lastname},
        process.env.jwt_secret, {expiresIn: '1d'}
    )
}

module.exports = mongoose.model("User", userSchema)