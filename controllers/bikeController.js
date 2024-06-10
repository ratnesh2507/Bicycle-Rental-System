// controllers/bikeController.js
import Bike from '../models/Bike.js';

export const getAllBikes = async (req, res) => {
    try {
        const bikes = await Bike.find();
        res.status(200).json(bikes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addBike = async (req, res) => {
    try {
        const bike = new Bike(req.body);
        await bike.save();
        res.status(201).json(bike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getBikeById = async (req, res) => {
    try {
        const bike = await Bike.findById(req.params.id);
        if (!bike) {
            return res.status(404).json({ message: 'Bike not found' });
        }
        res.status(200).json(bike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBike = async (req, res) => {
    try {
        const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bike) {
            return res.status(404).json({ message: 'Bike not found' });
        }
        res.status(200).json(bike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBike = async (req, res) => {
    try {
        const bike = await Bike.findByIdAndDelete(req.params.id);
        if (!bike) {
            return res.status(404).json({ message: 'Bike not found' });
        }
        res.status(200).json({ message: 'Bike deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
