const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;
console.log(passportLocalMongoose);
console.log(typeof passportLocalMongoose);

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    phone: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["customer", "staff", "admin"],
        default: "customer"
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    dateOfBirth: Date,

    profileImage: {
        url: String,
        filename: String
    },

    address: String,

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
