const mongoose = require('mongoose');

// Defines Schema
const userSchema = new mongoose.Schema({
    canteenName: String,
    buildingName: String,
    officeNum: String,
    userName: String,
    userAddress: String,
    mobile: {
        type: String,
        trim: true,
        // required: [true, 'Mobile Number is must!'],
        unique: [true, 'Mobile Number must be unique!'],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // return true or false, if regExp match returns true or false
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    photo: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phoneOtp: String,
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

// INSTANCE METHOD,
userSchema.methods.correctOTP = function (otp, phoneOtp) {
    return otp === phoneOtp;
}

// ONLY SHOW ACTIVE TRUE USERS
userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next();
})

// Making Model from userSchema
const User = mongoose.model('users', userSchema);
module.exports = User;