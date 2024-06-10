// Bike.js
import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true }
});

const Bike = mongoose.model('Bike',bikeSchema);
export default Bike;