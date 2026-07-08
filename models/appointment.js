const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({

    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    staff: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    appointmentDate: {
        type: Date,
        required: true
    },

    timeSlot: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"
        ],
        default: "Pending"
    },

    paymentStatus: {
        type: String,
        enum: [
            "Pending",
            "Paid"
        ],
        default: "Pending"
    },

    notes: String,

    serviceName: String,
    servicePrice: Number,
    serviceDuration: Number

}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);