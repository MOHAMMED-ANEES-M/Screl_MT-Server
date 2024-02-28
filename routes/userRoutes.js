const express = require('express');
const { registerUser, loginUser, getUserById } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyTokenHandler');


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', verifyToken, getUserById);

module.exports = router;