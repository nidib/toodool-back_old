const { Router } = require('express');
const ToodoolController = require('../../controllers/ToodoolControllers');
const { authHandler } = require('../../middlewares/authHandler');

const toodoolRoutes = Router();

toodoolRoutes.post('/', authHandler, ToodoolController.createToodol);
toodoolRoutes.get('/', authHandler, ToodoolController.getToodools);
toodoolRoutes.get('/:id', authHandler, ToodoolController.getToodool);
toodoolRoutes.put('/:id', authHandler, ToodoolController.updateToodool);
toodoolRoutes.delete('/:id', authHandler, ToodoolController.deleteToodool);

module.exports = toodoolRoutes;