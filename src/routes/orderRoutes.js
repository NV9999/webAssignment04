const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');



const mongoose = require('mongoose');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { cartID, total, orderDate } = req.body;

        // Validate cartID format
        if (!mongoose.Types.ObjectId.isValid(cartID)) {
            return res.status(400).json({ error: 'Invalid cartID format' });
        }

        // Check if the cart with the provided ID exists
        const existingCart = await Cart.findById(cartID);
        if (!existingCart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        // Create and save the order
        const order = new Order({ cartID, total, orderDate });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing order
router.put('/:id', async (req, res) => {
    try {
        const { cartID, total, orderDate } = req.body;

        // Validate cartID format
        if (!mongoose.Types.ObjectId.isValid(cartID)) {
            return res.status(400).json({ error: 'Invalid cartID format' });
        }

        // Check if the cart with the provided ID exists
        const existingCart = await Cart.findById(cartID);
        if (!existingCart) {
            return res.status(400).json({ error: 'Cart not found' });
        }

        const order = await Order.findByIdAndUpdate(req.params.id, { cartID, total, orderDate }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
