const jwt = require('jsonwebtoken');

const isAuthenticated = async (req,res,next)=>{
    try {
        // const {token} = req.cookies;
        const token = req.header('x-auth-token');

        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        // req.user = await userModel.findById(verify.id);
        console.log('vefify', verify);
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = isAuthenticated;