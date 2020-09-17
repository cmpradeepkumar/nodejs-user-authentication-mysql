const db = require('../_db_helpers/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = {
    authenticate,
    getAll,
    getUserById,
    create,
    update,
    delete: _delete
};


async function authenticate(params){
    console.log('username : '+params.user_name);
    const userInDb = await db.User.scope('withPass').findOne({where: {user_name: params.user_name}});
    console.log(userInDb);
    if(!userInDb || !(await bcrypt.compare(params.password, userInDb.password))) {
        throw 'Username or password not correct!';
    }
    const token = jwt.sign({sub: userInDb.id}, config.secret);
    return {...omitPassword(userInDb.get()) , token};
}

async function getAll() {
    return await db.User.findAll();
}

async function getUserById(id){
    const user = db.User.findByPk(id);
    if(!user) throw 'user not found';
    return user;
}

async function create(params) {
    if(await db.User.findOne({ where: {user_name: params.user_name}})) {
        throw 'userName "'+ username +'" is already taken';
    }

    if(params.password){
        params.password = await bcrypt.hash(params.password, 10);        
    }

    await db.User.create(params);
}

async function update(id, params) {
    console.log(id);
    const user = await getUserById(id);
    
    const userNameModified = params.username && user.username !== params.username;
    console.log(userNameModified);
    if(userNameModified && await db.User.findOne({where: {username: params.username}})) {
        throw 'userName "'+ username +'" is already taken';
    }
    params.id = id;
    Object.assign(user, params);
    await user.save();

    return omitPassword(user.get());
}

function omitPassword(user){
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword;
}

async function _delete(id) {
    const user = await getUserById(id);
    await user.destroy();
}