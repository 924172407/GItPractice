const mongoose = require('mongoose');
// const Product = require('./productModel');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    product: { // Parent Refferencing id of parent document tour and user means guide
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Review must belong to a product.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user.']
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// // it will set the condition, that only one user can put on review with a perticuler tour not multiple with same tour
// reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// reviewSchema.pre(/^find/, function (next) {
//     // this.populate({
//     //     path: 'tour',
//     //     select: 'name'
//     // }).populate({
//     //     path: 'user',
//     //     select: 'name photo'
//     // })

//     this.populate({
//         path: 'user',
//         select: 'name photo'
//     })

//     next();
// })

// // the middleware basically identify with their hooks if, there is a hook with save so it is document middleware and if a hook has find to it is a query middleware 
// reviewSchema.statics.calcAverageRatings = async function (tourId) {
//     const stats = await this.aggregate([ // this points to current Model
//         {
//             $match: { tour: tourId }
//         },
//         {
//             $group: {
//                 _id: '$tour',
//                 nRating: { $sum: 1 },
//                 avgRating: { $avg: '$rating' }
//             }
//         }
//     ]);
//     console.log(stats);

//     if (stats.length > 0) {
//         await Tour.findByIdAndUpdate(tourId, {
//             ratingsQuantity: stats[0].nRating,
//             ratingsAverage: stats[0].avgRating
//         })
//     }
//     else {
//         await Tour.findByIdAndUpdate(tourId, { //if there is no ratingsQuantity set default values 4.5
//             ratingsQuantity: 0,
//             ratingsAverage: 4.5
//         })
//     }

// }

// // reviewSchema.pre('save', function(){
// //     // this points to current review
// //     // Review.calsAverageRatings(this.tour)
// //     this.constructor.calcAverageRatings(this.tour);
// // });

// reviewSchema.post('save', function () {
//     // this points to current review
//     // Review.calsAverageRatings(this.tour)
//     this.constructor.calcAverageRatings(this.tour);
// });



// // findByIdAndUpdate, because it use findOneAnd behind the scene
// // findByIdAndUpdate
// // Just for checking it give error and would update the doc
// // reviewSchema.pre(/^findOneAnd/, async function(next){
// //     // const r = await this.findOne();
// //     const r = await this.clone();
// //     console.log(r);
// //     // next();
// // })

// // Query Middlewares
// reviewSchema.pre(/^findOneAnd/, async function (next) {
//     // this.r = await this.findOne(); // create a new properti r and store doc into that
//     this.r = await this.clone(); // create a new properti r and store doc into that
//     console.log(this.r, "hello from r");
//     next();
// })

// reviewSchema.post(/^findOneAnd/, async function () {
//     // await this.findOne(); does not work here the query has already executed
//     // the function calcAverageRatings runs on Model only, constructor represents Model
//     // console.log(this, this.r, this.r.tour, "tour id");
//     await this.r.constructor.calcAverageRatings(this.r.tour);
// })

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;