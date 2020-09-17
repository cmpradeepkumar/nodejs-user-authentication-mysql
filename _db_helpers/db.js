const config = require('config.json');
const mysql = require('mysql2/promise');
const {Sequelize} = require('sequelize');
const userModel = require('../users/users-model');

module.exports=db={};

init();

async function init() {
    const {host, port, user, password, database} = config.database;
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root'
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequalize = new Sequelize(database, user, password, {dialect:'mysql'});

    db.User = userModel(sequalize);

    await sequalize.sync();
}