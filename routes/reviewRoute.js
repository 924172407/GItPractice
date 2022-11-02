// const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

// we allow to mergeParameters, it because by default a specific route to allow only his parameters 
const router = express.Router({ mergeParams: true });

router.use(authController.protect); // protect the route

// POST /tour/123fdsea/reviews     | it no matter route like this or this // POST /reviews | it will endUP with the all controller below
router
    .route('/') //it's root of parentRoute,
    .get(reviewController.getAllReviews)
    .post(authController.restrictTo('user'),
        reviewController.setTourUserIds,
        reviewController.createReview);

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(authController.restrictTo('user', 'admin'), reviewController.updateReview)
    .delete(authController.restrictTo('user', 'admin'), reviewController.deleteReview);


module.exports = router;