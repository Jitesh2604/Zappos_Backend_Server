const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: 3,
        maclength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minlength: 8,
        select: false
    },
    resetPasswordToken: String,
    resatPasswordExpires: Date,

    address: {
        type:[
            {
                street: String,
                city: String,
                state: String,
                countery: String,
                zipCode: String,
                isDefault: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        default: [],
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
    },
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Oreder"
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: { 
        type: String, 
    },
},{
    versionKey: false,
    timestamps: true, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;