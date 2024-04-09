const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');
const mongoose = require('mongoose');





// GET all carts
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a single cart by ID
router.get('/:id', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Create a new cart
router.post('/', async (req, res) => {
    const { user, products, quantities } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ error: 'Invalid user ID Format' });
        }

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }        

        const existingProductIds = (await Product.find({}, '_id')).map(product => product._id.toString());

        const invalidProductIds = products.filter(productId => !existingProductIds.includes(productId));
        if (invalidProductIds.length > 0) {
            return res.status(400).json({ error: 'Invalid product ID(s)' });
        }

        const cart = new Cart({ user, products, quantities });
        await cart.save();

        res.status(201).json(cart);
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Update a cart by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { user, products, quantities } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ error: 'Invalid user ID Format' });
        }

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }        

        const existingProductIds = (await Product.find({}, '_id')).map(product => product._id.toString());

        const invalidProductIds = products.filter(productId => !existingProductIds.includes(productId));
        if (invalidProductIds.length > 0) {
            return res.status(400).json({ error: 'Invalid product ID(s)' });
        }

        const cart = await Cart.findByIdAndUpdate(id, { user, products, quantities }, { new: true });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Delete a cart by ID
router.delete('/:id', async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;