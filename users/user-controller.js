const express = require('express');
const router = express.Router();
const validateRequest = require('../_handlers_vaidators/request_validator');
const authorize = require('../_authorizer/request_authorizer');
const userService = require('./user-service');
const Joi = require('joi');

router.post('/authenticate', authSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getUserById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authSchema(req, res, next) {
    const schema = Joi.object({
        user_name: Joi.string().min(6).required(),
        password: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        user_name: Joi.string().min(6).required(),
        password: Joi.string().required()
    });

    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body).then(user => res.json(user)).catch(next);
}

function register(req, res, next) {
    userService.create(req.body).then(user => res.json(user)).catch(next);
}

function getAll(req, res, next) {
    userService.getAll().then(user => res.json(user)).catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.user);
}

function getUserById(req, res, next) {
    userService.getUserById(req.params.id).then(user => res.json(user)).catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body).then(user => res.json(user)).catch(next);
}

function _delete(req, res, next) {
    userService._delete(req.params.id).then(() => res.json({
        message: 'User deleted successfully'
    })).catch(next);
}