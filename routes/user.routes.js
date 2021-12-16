var express = require('express');
const router = express.Router();
const { UserController } = require('../Controllers');
const { authService } = require('../services');

router.post('/register', UserController.create);
router.post('/login', UserController.login);
router.get('/profile', authService.apiAuth, UserController.read);
router.get('/list', authService.apiAuth, UserController.list);
router.delete('/delete/:id', authService.apiAuth, UserController.delete);
router.put('/update/:id', authService.apiAuth, UserController.update);

module.exports = router;
