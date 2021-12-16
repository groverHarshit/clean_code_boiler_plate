var express = require('express');
const { authService } = require('../services');
const router = express.Router();
const { BookingsController } = require('../Controllers/');

router.post('/create', authService.apiAuth, BookingsController.create);
router.get('/list', authService.apiAuth, BookingsController.list);
router.get('/:id', authService.apiAuth, BookingsController.read);
router.put('/:id', authService.apiAuth, BookingsController.update);
router.delete('/:id', authService.apiAuth, BookingsController.delete);

module.exports = router;
