const express = require('express');
const productController = require('../controllers/productController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/top-4-best').get(productController.aliasTopProducts, productController.getAllProducts);
router.route('/mycart').get(productController.getCart);


router
    .route('/')
    .get(productController.getAllProducts) // it's free for everyone on application
    .post(authController.protect,
        authController.restrictTo('admin'),
        productController.createProduct);
router
    .route('/:id')
    .get(productController.getProduct) // it's free for everyone on application
    .patch(authController.protect,
        authController.restrictTo('admin'),
        productController.updateProduct)

    .delete(authController.protect,
        authController.restrictTo('admin'),
        productController.deleteProduct);

module.exports = router;