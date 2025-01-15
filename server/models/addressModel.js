const mongoose = require("mongoose");

const adressSchema = new mongoose.Schema({
    adressLine: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: Number,
        default: 0
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Address = mongoose.model("address", adressSchema);

module.exports = Address;