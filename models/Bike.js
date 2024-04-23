// Bike.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bikeSchema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Bike', bikeSchema);
