const router = require('express').Router(); // [1]
const { asyncHandler } = require('../middlewares/asyncHandler');
const aiController = require('../controllers/ai.controller');
const verifyToken = require('../middlewares/verifyToken');

router.route('/open-ai/:language')
    .post(verifyToken, asyncHandler(aiController.openAi));

module.exports = router;

// [1] Express.js, "Express - Node.js web application framework," [Online]. Available: https://expressjs.com/. [Accessed: 01-May-2024].