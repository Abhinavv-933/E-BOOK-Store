const express = require('express');
const router = express.Router();
const {authenticateJWT, authorizeRole} = require('../../middleware/authMiddleware');
const {getAllBook, getBookById , searchBook} = require('../../controller/customer/bookController');

router.get('/', authenticateJWT, authorizeRole('CUSTOMER'), getAllBook);

router.get('/:id', authenticateJWT, authorizeRole('CUSTOMER'), getBookById);

router.get('/search/:genre', authenticateJWT, authorizeRole('CUSTOMER'), searchBook);

module.exports = router;
