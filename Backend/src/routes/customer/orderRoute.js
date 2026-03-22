const express = require('express');
const router = express.Router();
const {authenticateJWT, authorizeRole} = require('../../middleware/authMiddleware');
const { placeOrder , fetchOrderByUser} = require('../../controller/customer/orderController');


router.post('/', authenticateJWT, authorizeRole('CUSTOMER'), placeOrder);

router.get('/', authenticateJWT, authorizeRole('CUSTOMER'), fetchOrderByUser );


module.exports = router;
