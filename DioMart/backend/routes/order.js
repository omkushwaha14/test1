const express = require('express');

const router= express.Router();

const {newOrder,getSingleOrder,myOrders, allOrders,updateOrder,deleteOrder} =require('../controllers/orderController');

const {isAuthenticatedUser,authorizeRoles}= require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);   //user can create order
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);  //user can get single order
router.route('/orders/me').get(isAuthenticatedUser, myOrders);        //user can view his orders


router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'),  allOrders);   //admin can view all orders
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'),updateOrder);  //admin can update order status
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteOrder);  //admin can delete orders
module.exports=router;

