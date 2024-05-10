const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.route('/:userId')
    .put(verifyToken, asyncHandler(userController.updateUser));

module.exports = router;