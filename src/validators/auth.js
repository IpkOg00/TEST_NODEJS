const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');
const jwt = require('jsonwebtoken');
const { logger } = require('./../utils/logger');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        firstname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        lastname: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
            .required()
    });
    validatorHandler(req, res, next, schema);
};

const isAuthenticated = async (req,res,next)=>{
    try {
        // const {token} = req.cookies;
        // const token = req.header('x-auth-token');
        const token = req.get('x-auth-token');

        if(!token){
            logger.info('Please login to access the data');
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        // req.user = await userModel.findById(verify.id);
        // console.log('vefify', verify);
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = {
    signup,
    signin,
    isAuthenticated
};