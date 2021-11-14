const { Router } = require('express');
const UserController = require('../../controllers/UserControllers');
const { authHandler } = require('../../middlewares/authHandler');

const userRoutes = Router();

userRoutes.get('/', authHandler, UserController.getInfo);
userRoutes.get('/logout', UserController.logout);
userRoutes.post('/login', UserController.login);
userRoutes.post('/', UserController.createUser);
userRoutes.put('/', authHandler, UserController.updateInfo);

module.exports = userRoutes;