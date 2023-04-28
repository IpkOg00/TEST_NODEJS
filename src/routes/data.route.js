const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const { isAuthenticated } = require('../validators/auth');
const dataController = require('../controllers/data.controller');

router.route('/').get(isAuthenticated, asyncHandler(dataController.getall));
router.route('/:id').get(isAuthenticated, asyncHandler(dataController.getbyid));

module.exports = router;