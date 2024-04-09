const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
