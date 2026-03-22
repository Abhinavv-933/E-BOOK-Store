const express = require('express');
const router = express.Router();
const {authenticateJWT, authorizeRole} = require('../../middleware/authMiddleware');
const { fetchOrders } = require('../../controller/admin/orderController');


router.get('/', authenticateJWT, authorizeRole('ADMIN'), fetchOrders );


module.exports = router;
