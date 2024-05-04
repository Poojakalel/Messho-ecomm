import express from 'express'
const router=express.Router()

import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js'
import { allOrders, deleteorder, getOrderDetails, myOrders, newOrder, updateOrder } from '../controllers/orderController.js'

router.route('/order/new').post(isAuthenticatedUser,newOrder)
router.route('/orders/:id').get(isAuthenticatedUser,getOrderDetails)
router.route('/me/orders').get(isAuthenticatedUser,myOrders)

router.route("/admin/orders")
.get(isAuthenticatedUser,authorizeRoles("admin"),allOrders)
router.route("/admin/orders/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteorder)

export default router