const User = require("../models/user")
const bcrypt = require("bcrypt")
const utils = require("./utils/token")
require("dotenv").config()

exports.getUserByUsername = async (username) => {
    console.log('inside authService ')
    return await User.findOne({ username})
}

exports.getUserById = async(id) => {
    return await User.findById(id)
}

exports.getUserByIdAndDelete = async(id) => {
    return await User.getUserByIdAndDelete(id)
}

exports.registerUser = async (username, password) => {
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)
    const maxAge = 2 * 60 * 60

    const token = utils.getToken(username, maxAge)
    console.log((token))

    const newUser = await User.create({
        username: username,
        password: hasedPassword,
        token: token
    })

    console.log({ newUser})

    return { newUser, token, maxAge}
}

exports.loginUser = async (username, password) => {
    const user = await User.findOne({ username })
    const validPassword = await bcrypt.compare(password, user.password)
    const maxAge = 2 * 60 * 60
    const token  = utils.getToken(username, maxAge)

    user.token = token

    await user.save()

    console.log({ token })

    return{ user, validPassword, token, maxAge}
}

exports.updateUser = async (id) => {
    const userToUpdate = await User.findById(id)

    if(userToUpdate.role === 'Admin'){
        throw new Error('the sur is already an admin')
    }

    userToUpdate.role =  "Admin"
    userToUpdate.save()

    return userToUpdate;
}