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
            default : "https://unsplash.com/photos/a-person-standing-in-front-of-a-atm-machine-mwlXsvNTA0U",
            set : (url)=> url==""?"https://unsplash.com/photos/a-person-standing-in-front-of-a-atm-machine-mwlXsvNTA0U":url
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
