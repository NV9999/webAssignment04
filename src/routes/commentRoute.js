const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Product = require('../models/Product');
const User = require('../models/User');
const cors = require('cors');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(cors());





// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        console.error('Error getting comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific comment by ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        console.error('Error getting comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Create a new comment

router.post('/', async (req, res) => {
    const { product, user, rating, image, text } = req.body; // Destructure in the desired order
    try {
        // Validate product ID format
        if (!mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }

        // Check if the product with the provided ID exists
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(400).json({ error: 'Product not found' });
        }

        // Validate user ID format
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Check if the user with the provided ID exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Create and save the comment
        const comment = new Comment({ user, product, rating, image, text });
        await comment.save();

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});







// Update a comment by ID
router.put('/:id', async (req, res) => {
    // Destructure the request body
    const { product, user, rating, image, text } = req.body;

    try {
        // Validate product ID format
        if (!mongoose.Types.ObjectId.isValid(product)) {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }

        // Check if the product with the provided ID exists
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(400).json({ error: 'Product not found' });
        }

        // Validate user ID format
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Check if the user with the provided ID exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Find and update the comment by ID
        const comment = await Comment.findByIdAndUpdate(req.params.id, { product, user, rating, image, text }, { new: true });

        // Check if the comment exists
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Respond with the updated comment
        res.json(comment);
    } catch (error) {
        // Handle errors
        console.error('Error updating comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;





// Delete a comment by ID
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
