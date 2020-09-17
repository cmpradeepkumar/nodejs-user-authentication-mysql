const jwt = require('express-jwt');
// const { secret } = require('../config.json');
const db = require('../_db_helpers/db');
const secret = "76fa8990-8fcf-4a2d-8434-bddfdbafa076";

module.exports=authorize;

function authorize(){
    console.log('Authorize...');
    return [
        jwt({secret, algorithms:['HS256']}),
        async(req, res, next) => {
            // get user with id from token 'sub' (subject) property
            const user = await db.User.findByPk(req.user.sub);

            if(!user)
                return res.status(401).json({message: 'UnAuthorized'});

            req.user = user.get();
            next();
        }
    ]
}