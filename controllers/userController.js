const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');


const filterObj = (obj, ...allowedFields) => {
    console.log(allowedFields);
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });

    return newObj;
}

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) filtered out unwanted fields name that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'userAddress', 'userName', 'mobile');

    console.log(filteredBody);

    // 2) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    })
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: "success",
        data: null
    })
})



// exports.getAllUsers = catchAsync(async (req, res) => {
//     const users = await User.find();
//     res.status(200).json({
//         status: 'success',
//         results: users.length,
//         data: {
//             users
//         }
//     })
// });

exports.createUser = (req, res) => {
    res.status(500).json({
        status: "Error",
        message: "This Route not yet difined"
    })
}

// exports.getUser = catchAsync(async (req, res, next) => {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         return next(new AppError('No Document found with that ID!', 404));
//     }

//     res.status(200).json({
//         status: "success",
//         data: user
//     })
// })

// 4) ROUTE UPDATE A PRODUCT | PATCH API, END-POINTS /api/v1/products
// exports.updateUser = catchAsync(async (req, res, next) => {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

//     if (!user) {
//         return next(new AppError('No documents found with that ID', 404));
//     }

//     res.status(200).json({
//         status: "Success",
//         data: {
//             user
//         }
//     })
// })

// exports.deleteUser = catchAsync(async (req, res, next) => {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//         return next(new AppError('No Document found with that ID!', 404));
//     }

//     res.status(204).json({
//         status: "success",
//         data: null
//     })
// })


exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
