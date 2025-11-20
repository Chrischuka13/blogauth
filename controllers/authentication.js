const User = require('../models/auth')
const handleError = require('../utils/handleError')

const register = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json({success: true, user})
    } catch (error) {
        const errors = handleError(error)
        res.status(404).json(errors)
    }
}

const login = async (req, res) => {
    const {email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({success: false, msg: 'provide correct credentials'})
    }
    try {
        const userExists = await User.findOne({email})
        if (!userExists) {
        //    return res.status(400).json({success: false, msg:'email does not exists'})
        throw Error('incorrect email')
        }
        const authenticated = await userExists.comparePassword(password)
        if (!authenticated) {
        //    return res.status(400).json({success: false, msg: 'email or password is not correct'})
        throw Error('incorrect password')
        }
        const token = userExists.generateToken()
        res.status(200).json({success: true, user: {name: userExists.name, email: userExists.email, token }})
    } catch (error) {
        // res.json({error})
        const errors = handleError(error)
        res.status(400).json(errors)
    }
}

module.exports = {login, register}