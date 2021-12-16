var express = require('express');
const router = express.Router();
const { PumpController } = require('../Controllers');
const { authService } = require('../services');

router.post('/create', authService.apiAuth, PumpController.create);
router.get('/list', authService.apiAuth, PumpController.list);
router.get('/:id', authService.apiAuth, PumpController.read);
router.delete('/:id', authService.apiAuth, PumpController.delete);
router.put('/:id', authService.apiAuth, PumpController.update);

module.exports = router;
