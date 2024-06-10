// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const bikeRoutes = require('./routes/bikeRoutes');
// const path = require('path');
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bikeRoutes from './routes/bikeRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectoryPath = path.join(__dirname, 'public');
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bikes', bikeRoutes);
app.use(express.static(publicDirectoryPath));

app.get('/',(req,res)=>{
    res.sendFile(path.join(publicDirectoryPath, 'index.html'));
})
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
// app.listen(3000,()=>{
//     console.log(`Server at 3000`);
// });