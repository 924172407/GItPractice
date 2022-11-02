const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const generateOTP = require('./../utils/generateOTP');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

exports.signup = catchAsync(async (req, res, next) => {

    let { mobile, canteenName, buildingName, officeNum, userName, role, userAddress } = req.body;

    // 1) check if mobile Number Exists
    const mobileExist = await User.findOne({ mobile });

    if (mobileExist) {
        return next(new AppError('The Mobile Number is Already Registered. Please try another one', 400))
    }

    // 2) if not exist, then create a new user
    const newUser = await User.create({
        mobile,
        canteenName,
        buildingName,
        officeNum,
        userName,
        role,
        userAddress
    });

    // if (newUser.role !== 'admin'){
    //     canteenName = undefined;
    //     buildingName = undefined;
    //     officeNum = undefined;
    //     userName = undefined;
    // }

    // await newUser.save();

    // 3) Generate OTP
    const otp = generateOTP(4);

    // 4) Save otp to user collection
    newUser.phoneOtp = otp;
    await newUser.save();

    // 5) Send the message
    res.status(200).json({
        status: 'success',
        message: "OTP sent to this mobile number!",
        data: {
            user: newUser.id
        }
    })
})


exports.login = catchAsync(async (req, res, next) => {

    const { mobile } = req.body

    // 1) Check if Mobile Number exists
    if (!mobile) {
        return next(new AppError('Please provide Mobile Number!', 500));
    }

    // 2) Check if user exists and Mobile Number is correct
    const user = await User.findOne({ mobile });

    // if (!user || user.mobile !== mobile) {
    if (!user) {
        return next(new AppError('Please provide a valid Mobile Number!', 500));
    }

    // 3) if everything ok, send OTP to the client
    // Generate OTP
    const otp = generateOTP(4);

    // 5) Save otp to user collection
    user.phoneOtp = otp;
    await user.save();

    // 4) Send the message
    res.status(200).json({
        status: 'success',
        message: "OTP sent to this mobile number!",
        data: {
            user: user.id
        }
    })

});


exports.verifyPhoneOtp = catchAsync(async (req, res, next) => {

    const { otp, userId } = req.body;

    const user = await User.findById(userId);
    // const user = await User.findOne({ userId }); findOne match the first occrance of given object

    if (!user) {
        return next(new AppError('You are not Registered yet. Please Registered Your self first!', 400))
    }

    if (!user.correctOTP(otp, user.phoneOtp)) {
        return next(new AppError('Incorrect OTP', 400));
    }

    // if (user.phoneOtp !== otp) {
    //     return next(new AppError('Incorrect OTP', 400))
    // }

    const token = signToken(user.id);

    user.phoneOtp = undefined;
    user.isVerified = true
    await user.save();

    res.status(201).json({
        status: "success",
        message: "OTP verified successfully",
        data: {
            token
        }
    });
});


exports.protect = catchAsync(async (req, res, next) => {

    // 1) Getting the Token and check, if it's there
    let token;
    console.log(token, req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please login First to get access.', 401));
    }

    // 2) Verification The Token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id); // put user into the currentUser

    if (!currentUser) {
        return next(new AppError(`The user belonging to this token does no longer exist!`, 401));
    }

    // GRANT ACCESS TO THE PROTECTED ROUTE
    req.user = currentUser;

    next(); // Get All Product route
});

// Restrict The DELETE ROUTE, only allow admin,
exports.restrictTo = (...roles) => { // roles ['admin']  role = 'user'
    return (req, res, next) => { 
        console.log(roles, 'from restrict function')
        if (!roles.includes(req.user.role)) { // req.user.role if it has value admin or lead-guide, then return true otherwise false
            return next(new AppError('You do not have a permission to perform these kind of action!', 403))
        }

        next(); // this is delete router function
    }
}