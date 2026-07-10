const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;


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
        url: {
            type : String,
            default : "https://plus.unsplash.com/premium_photo-1755882951379-6b8c26fb0fd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
            set : (url)=> url==""?"https://plus.unsplash.com/premium_photo-1755882951379-6b8c26fb0fd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8":url
        },
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
