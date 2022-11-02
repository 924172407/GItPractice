const AppError = require('../utils/appError');
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
// const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopProducts = (req, res, next) => {
    req.query.limit = '4';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage';
    next();
}


exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);


// PRODUCT END-POINTS AND ROUTES
// 1) ROUTE GET ALL PRODUCTS | GET API, END-POINTS /api/v1/products
// exports.getAllProduct = catchAsync(async (req, res, next) => {

//     const features = new APIFeatures(Product.find(), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate()

//     // Execute the query
//     const tours = await features.query;

//     res.status(200).json({
//         status: 'success',
//         results: tours.length,
//         data: {
//             tours
//         }
//     })
// })

// 2) ROUTE GET PRODUCT | GET API, END-POINTS /api/v1/products/id
// exports.getProduct = catchAsync(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new AppError('No documents found with that ID', 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             product
//         }
//     })
// })

// 3) ROUTE ADD A PRODUCT | POST API, END-POINTS /api/v1/products
// exports.createProduct = catchAsync(async (req, res, next) => {

//     const newProduct = await Product.create(req.body);

//     res.status(200).json({
//         status: 'success',
//         data: {
//             newProduct
//         }
//     })
// })

// 4) ROUTE UPDATE A PRODUCT | PATCH API, END-POINTS /api/v1/products
// exports.updateProduct = catchAsync(async (req, res, next) => {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

//     if (!product) {
//         return next(new AppError('No documents found with that ID', 404));
//     }

//     res.status(200).json({
//         status: "Success",
//         data: {
//             product
//         }
//     })
// })

// 5) ROUTE DELETE A PRODUCT | DELETE API, END-POINTS /api/v1/products
// exports.deleteProduct = catchAsync(async (req, res, next) => {
//     const product = await Product.findByIdAndDelete(req.params.id);

//     if (!product) {
//         return next(new AppError('No documents found with that ID', 404));
//     }

//     res.status(204).json({
//         status: "Success",
//         data: null
//     })
// })

// Aggregation pipline
exports.getCart = async (req, res) => {
    try {
        const cart = await Product.aggregate([
            {
                $match: { size: "medium" }
            },
            {
                $group: {
                    _id: "$name",
                    numProducts: { $sum: 1 },
                    // totalQuantity: { $sum: "$quantity" },
                    totalPrice: { $sum: "$price" }
                }
            }
        ])

        res.status(200).json({
            status: 'success',
            results: cart.length,
            data: {
                cart
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}
