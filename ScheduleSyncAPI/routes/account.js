const express = require('express');
const { check } = require('express-validator');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.post('/register', [
], accountController.registerUser);
router.post('/login', accountController.loginUser);
router.put('/edit', accountController.editUser);
router.delete('/delete', accountController.deleteUser);

module.exports = router;