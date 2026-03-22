const express = require('express');
const router = express.Router();
const {authenticateJWT, authorizeRole} = require('../../middleware/authMiddleware');
const { postBookToCart,getCartByUser } = require('../../controller/customer/cartController');

router.post('/:bookId', authenticateJWT, authorizeRole('CUSTOMER'), postBookToCart);

router.get('/', authenticateJWT, authorizeRole('CUSTOMER'), getCartByUser);

module.exports = router;
