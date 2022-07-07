const mongoose = require("mongoose");
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Ingrese un email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Ingrese un email valido'],
    },
    password: {
        type: String,
        required: [true, 'Ingrese una contraseña'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);