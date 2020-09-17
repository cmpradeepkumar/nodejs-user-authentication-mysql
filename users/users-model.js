const { DataTypes } = require('sequelize');

module.exports=model;

function model(sequelize) {
    const model_attributes = {
        first_name: {type: DataTypes.STRING, allowNull: false},
        last_name: {type: DataTypes.STRING, allowNull: false},
        user_name: {type: DataTypes.STRING, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false}
    }

    const optionScopes = {
        defaultScope: {
            attributes: {exclude: ['password', 'id', 'createdAt', 'updatedAt']}
        },
        scopes: {
            withPass: {attributes: {}}
        }
    };

    return sequelize.define('user_details', model_attributes, optionScopes );
}