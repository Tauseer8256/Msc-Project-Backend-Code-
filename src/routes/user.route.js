const router = require('express').Router(); // [1]
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

// [1] Express.js, "Express - Node.js web application framework," [Online]. Available: https://expressjs.com/. [Accessed: 01-May-2024].