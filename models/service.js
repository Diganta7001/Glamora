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
        url: String,
        filename: String
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);