const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator, isAuthenticated } = require('../validators/auth');
const authController = require('../controllers/auth.controller');
// const { isAuthenticated } = require('../middlewares/auth');

router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(signinValidator, asyncHandler(authController.signin));

router.route('/testjwt').post(isAuthenticated, asyncHandler(authController.signin));

module.exports = router;