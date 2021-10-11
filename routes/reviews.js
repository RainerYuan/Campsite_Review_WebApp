const express=require('express');
const router=express.Router({ mergeParams: true });
const catchAsync=require("../utils/catchAsync")
const Reviews=require('../controllers/reviews')
const { validateReview, isLoggedIn, isReviewAuthor }=require('../middleware')


router.post('/', isLoggedIn, validateReview, catchAsync(Reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(Reviews.deleteReview))

module.exports=router;