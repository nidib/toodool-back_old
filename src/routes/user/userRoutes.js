const { Router } = require('express');
const UserController = require('../../controllers/UserControllers');
const { authHandler } = require('../../middlewares/authHandler');

const userRoutes = Router();

userRoutes.get('/', authHandler, UserController.getInfo);
userRoutes.post('/', UserController.createUser);
userRoutes.put('/', authHandler, UserController.updateInfo);
userRoutes.post('/login', UserController.login);

module.exports = userRoutes;