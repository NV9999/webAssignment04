
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: String,
    text: {
        type: String,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
