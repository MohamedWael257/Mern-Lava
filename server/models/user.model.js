const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 11,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    // confpassword: {
    //     type: String,
    //     required: true,
    //     minlength: 6,
    // },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    photoimage: {
        type: String,
        // default: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'
        // required: true,
        // unique: true,
    },
    // source: {
    //     type: String,
    //     required: [true, "source not specified"]
    // },
    // lastVisited: {
    //     type: Date,
    //     default: new Date()
    // }

});

const User = mongoose.model('user', UserSchema)
module.exports = User