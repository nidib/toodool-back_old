const { Router } = require('express');
const ToodoolController = require('../../controllers/ToodoolControllers');
const { authHandler } = require('../../middlewares/authHandler');

const toodoolRoutes = Router();

toodoolRoutes.get('/', authHandler, ToodoolController.getToodools);
toodoolRoutes.get('/:id', authHandler, ToodoolController.getToodool);
toodoolRoutes.post('/', authHandler, ToodoolController.createToodol);
toodoolRoutes.put('/:id', authHandler, ToodoolController.updateToodool);
toodoolRoutes.put('/:id/complete', authHandler, ToodoolController.completeToodool);

module.exports = toodoolRoutes;