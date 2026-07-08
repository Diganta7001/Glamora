const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    appointment: {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    paymentMethod: {
        type: String,
        enum: [
            "Cash",
            "Card",
            "UPI",
            "Net Banking"
        ]
    },

    paymentStatus: {
        type: String,
        enum: [
            "Pending",
            "Paid",
            "Refunded"
        ],
        default: "Pending"
    },

    transactionId: String,

    paidAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);