const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5003;

// MongoDB connection for deliveriesDB
mongoose.connect('mongodb://localhost:27017/deliveriesDB')
    .then(() => console.log('Connected to deliveriesDB'))
    .catch(err => console.error('Failed to connect to deliveriesDB', err));

// Middleware
app.use(cors());
app.use(express.json());

// Item Schema (sub-document for each delivery)
const itemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

// Delivery Schema
const deliverySchema = new mongoose.Schema({
    deliveryId: { type: String, required: true },
    guestName: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Pending' },  // Pending or Approved
    items: [itemSchema],  // Array of items for the delivery
    createdAt: { type: Date, default: Date.now },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

// Route to get all deliveries (history)
app.get('/api/deliveries', async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.json({ success: true, deliveries });
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to approve a delivery
app.post('/api/approve-delivery', async (req, res) => {
    const { deliveryId } = req.body;
    try {
        const delivery = await Delivery.findOneAndUpdate(
            { deliveryId },
            { status: 'Approved' },
            { new: true }
        );
        if (!delivery) {
            return res.status(404).json({ success: false, message: 'Delivery not found' });
        }
        res.json({ success: true, message: 'Delivery approved', delivery });
    } catch (error) {
        console.error('Error approving delivery:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Create a delivery (for testing purposes) with multiple items
app.post('/api/create-delivery', async (req, res) => {
    const { deliveryId, guestName, address, items } = req.body;
    try {
        const newDelivery = new Delivery({ deliveryId, guestName, address, items });
        await newDelivery.save();
        res.status(201).json({ success: true, message: 'Delivery created successfully' });
    } catch (error) {
        console.error('Error creating delivery:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
