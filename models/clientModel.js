const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    canteenName: {
        type: String,
        required: [true, 'A Canteen must have a Name'],
        trim: true
    },
    buildingName: {
        type: String,
        required: [true, 'A Canteen must have a BuildingName'],
        trim: true
    },
    officeNum: {
        type: String,
        required: [true, 'A Canteen must have a OfficeNumber'],
        trim: true
    },
    isAdmin: {
        type: Boolean,
        required: [true, 'Must be define, you are a user or admin']
    },
    userName: {
        type: String,
        required: [true, 'Must have a userName'],
        unique: true,
        trim: true
    },
    mobileNum: {
        type: Number,
        required: [true, 'Mobile Number is Must']
    },
    createdAt: {
        type: Date,
        defaul: Date.now(),
    },
})

const Client = mongoose.model('clients', clientSchema);

module.exports = Client;