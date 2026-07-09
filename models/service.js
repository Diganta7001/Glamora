const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({

    serviceName: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "Hair",
            "Face",
            "Nails",
            "Spa",
            "Massage",
            "Makeup",
            "Beard",
            "Other"
        ],
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    duration: {
        type: Number,
        required: true
    },

    image: {
        url: {
            type : String,
            default : "https://plus.unsplash.com/premium_photo-1780358585402-8c11e746e38a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set : (url) => url ==""?"https://plus.unsplash.com/premium_photo-1780358585402-8c11e746e38a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":url
        },
        filename: {
            type: String,
            default : "Unknown_Image"
        }
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);