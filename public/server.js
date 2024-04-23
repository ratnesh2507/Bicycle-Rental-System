const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bikeRoutes = require('./routes/bikeRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bicycle_renting_app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
        // Start server
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch(err => console.error(err));
