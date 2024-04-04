
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: String,
    purchaseHistory: [String], // Assuming purchase history is an array of product IDs
    shippingAddress: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
