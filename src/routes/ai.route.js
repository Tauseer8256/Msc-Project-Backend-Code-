const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const aiController = require('../controllers/ai.controller');
const verifyToken = require('../middlewares/verifyToken');

router.route('/open-ai/:language')
    .post(verifyToken, asyncHandler(aiController.openAi));

module.exports = router;