const mongoose = require('mongoose');
const slugify = require('slugify');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Product must have a Name'],
        unique: [true, 'A Product must have a unique Name'],
        trim: true,
        maxlength: [30, 'A Product must have less than qual to 30 charactors'],
        minlength: [3, 'A Product must have more than qual to 3 charactors'],
    },
    size: {
        type: String,
        enum: {
            values: ['large', 'small', 'medium'],
            message: 'Size is either: large, small or medium'
        },
        trim: true
    },
    quantity: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'A Product must have a Price'],
    },
    slug: String,
    imageCover: {
        type: String,
        required: [true, 'A Product must have a coverImage']
    },
    images: [String],
    summary: {
        type: String,
        trim: true,
        required: [true, 'A Product must have a Discription']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                // this only points to current doc, on NEW document creation not for update or any
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) must be below to reguler price'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'], // not only for number also for Dates
        // set: val => Math.round(val * 10) / 10 // 4.66666, 46.66666, 47, 4.7
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    canteens: [ // canteen: Array
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

productSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;