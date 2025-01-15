const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }, 
    mobile: {
        type: Number,
        default: null
    },
    refreshToken: {
        type: String,
        default: ""
    },
    verifyEmail:{
        type : Boolean,
        default: false
    },
    lastLoginDate: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    addressDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    }],
    shoppingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartProduct"
    }],
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    forgotPasswordOTP: {
        type: String,
        default: null
    },
    forgotPasswordExpire: {
        type: Date,
        default: ""
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, {timestamps: true});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
