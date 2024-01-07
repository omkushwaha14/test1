const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  updateProfile
  
} = require("../controllers/authController");
// const {uselocation}= require('../controllers/addressController');

const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/password/change").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile)


router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'),allUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles('admin'),getUserDetails);
router.route("/admin/user/:id").put(isAuthenticatedUser, authorizeRoles('admin'),updateUser);
router.route("/admin/user/:id").delete(isAuthenticatedUser, authorizeRoles('admin'),deleteUser);
// router.route('/').get(uselocation);

module.exports = router;
