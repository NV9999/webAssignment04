
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const app = express();

app.use(cors());


dotenv.config();





app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://10viranininad:ninad123@cluster0.obtu6jf.mongodb.net/assignment04?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define routes
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
//const commentRoutes = require('./src/routes/commentRoutes');
const commentRoute = require('./src/routes/commentRoute');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
//app.use('/api/comments', commentRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/comments', commentRoute);


module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

