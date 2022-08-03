const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String },
    surname: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
})

module.exports = mongoose.model('User', userSchema);