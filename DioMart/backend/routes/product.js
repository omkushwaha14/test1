const express = require("express");

const router = express.Router();

const {
  getProducts,
  newProduct,
  getsingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/products").get(getProducts); 
router.route("/product/:id").get(getsingleProduct);


router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles('admin'), newProduct);        // isAuthenticatedUser
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct);      // isAuthenticatedUser
router.route("/admin/product/:id").delete(isAuthenticatedUser,authorizeRoles('admin'), deleteProduct);     // isAuthenticatedUser


router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/review").get(getProductReviews);
router.route("/review").delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview);

module.exports = router;
 