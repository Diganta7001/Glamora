const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({

    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    comment: {
        type: String,
        maxlength: 500
    }

}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);