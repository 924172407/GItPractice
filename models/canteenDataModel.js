const mongoose = require('mongoose');

const canteenSchema = new mongoose.Schema({
    canteenName: {
        type: String,
        required: [true, 'Please enter a valid CanteeNname'],
        unique: true
    },
    buildingName: {
        type: String,
        required: [true, 'Please enter a valid BuildingName']
    },
    officeNum: {
        type: String,
        required: [true, 'Please enter a valid Office Number']
    },
    createdAt: {
        type: Date,
        defaul: Date.now(),
    },
})

const Canteen = mongoose.model('canteens', canteenSchema);

module.exports = Canteen;