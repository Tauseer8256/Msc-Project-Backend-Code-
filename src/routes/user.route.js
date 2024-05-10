const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyToken');

router.route('/:userId')
    .put(verifyToken, asyncHandler(userController.updateUser));

router.route('/get-total-count')
    .get(verifyToken, asyncHandler(userController.getTotalUsersCount));

router.route('/get-list')
    .get(verifyToken, asyncHandler(userController.getUsersList));

module.exports = router;