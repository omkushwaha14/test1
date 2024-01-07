const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");

const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures= require('../utils/apiFeatures')
const cloudinary = require('cloudinary')

//get all product // search also => /api/v1/products?keyword=iphone
const getProducts = catchAsyncErrors(async (req, res, next) => {

 
 const perpage=3; 
 const allproduct = await Product.countDocuments();

 const apiFeatures = new APIFeatures(Product.find(), req.query)
                    .search()
                    .filter()
                    .pagination(perpage)

  const products = await  apiFeatures.query;

   
    res.status(200).json({
      success: true,
      allproduct,
      perpage,
      products
    });
  

  
});



//getsingle product => /api/v1/product/:id
const getsingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      product,
    });
  }
});

//ADMIN  STARTS/////////////////////////////////////////////

// Get all products (Admin)  =>   /api/v1/admin/products
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {

  const products = await Product.find();
  const  allproduct= await Product.countDocuments();
  res.status(200).json({
      success: true,
      allproduct,
      products
  })

})

//create new product => /api/v1/admin/product/new

const newProduct =  catchAsyncErrors(async (req, res, next) => {

  let images = []
  if (typeof req.body.images === 'string') {
      images.push(req.body.images)
  } else {
      images = req.body.images
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'products'
      });

      imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url
      })
  }

  req.body.images = imagesLinks
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product
  })
 
});

//update product => /api/v1/admin/product/:id

const updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product => /api/v1/admin/product/:id

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "product deleted",
  });
});

//ADMIN ENDS/////////////////////////////////////////////

// Create new review   =>   /api/v1/review
const createProductReview = catchAsyncErrors(async (req, res, next) => {

  const { rating, comment, productId } = req.body;

  const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
  }

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
  )

  if (isReviewed) {
      product.reviews.forEach(review => {
          if (review.user.toString() === req.user._id.toString()) {
              review.comment = comment;
              review.rating = rating;
          }
      })

  } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
      success: true
  })

})


//get product reviews => /api/v1/reviews
const getProductReviews= catchAsyncErrors(async(req,res,next)=>{

  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })

})


// Delete Product Review   =>   /api/v1/reviews
const deleteReview = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);

  console.log(product);

  const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

  const numOfReviews = reviews.length;

  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

  await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings,
      numOfReviews
  }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })

  res.status(200).json({
      success: true
  })
})




module.exports = {
  updateProduct,
  newProduct,
  getsingleProduct,
  getProducts,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts
};
