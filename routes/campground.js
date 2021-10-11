const express=require('express');
const router=express.Router();
const catchAsync=require("../utils/catchAsync")
const campgrounds=require('../controllers/campgrounds')
const { isLoggedIn, validateCampground, isAuthor }=require('../middleware')
const multer=require('multer')
const { storage }=require('../cloudinary')
const upload=multer({ storage })



router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))



router.get('/new', isLoggedIn, campgrounds.renderNewForm)
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isAuthor, catchAsync(campgrounds.deleteCampground))
// router.get('/', catchAsync(campgrounds.index))



// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

// router.get('/:id', catchAsync(campgrounds.showCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

// router.delete('/:id', isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports=router;