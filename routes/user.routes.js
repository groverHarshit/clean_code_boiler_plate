var express = require('express');
const router = express.Router();
const { UserController } = require('../Controllers');
const { authService } = require('../services');

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Register User
 *     summary: Register a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *                type: string
 *             full_name:
 *                type: string
 *             mobile_number:
 *                type: number
 *           required:
 *              - email
 *              - password
 *              - full_name
 *              - mobile_number
 *     responses:
 *       200:
 *         description: Ok     
 *       400:
 *         description: Invalid request
 *       500:
 *          description: Internal Server Error
 */
router.post('/register', UserController.create);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login a user
 *     summary: Login a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *                type: string
 *           required:
 *              - email
 *              - password
 *     responses:
 *       200:
 *         description: Ok     
 *       400:
 *         description: Invalid request
 *       500:
 *          description: Internal Server Error
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     tags:
 *       - Users
 *     name: Get user profile
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok     
 *       400:
 *         description: Invalid request
 *       500:
 *          description: Internal Server Error
 */
router.get('/profile', authService.apiAuth, UserController.read);

/**
 * @swagger
 * /api/v1/users/list:
 *   get:
 *     tags:
 *       - Users
 *     name: Get users list
 *     summary: Get user list
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok     
 *       400:
 *         description: Invalid request
 *       500:
 *          description: Internal Server Error
 */
router.get('/list', authService.apiAuth, UserController.list);

/**
 * @swagger
 * /api/v1/users/delete/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     name: Delete user
 *     summary: Delete user
 *     parameters:
 *       - name: id
 *         in: path
 *         required:
 *           - id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok     
 *       400:
 *         description: Invalid request
 *       500:
 *          description: Internal Server Error
 */
router.delete('/delete/:id', authService.apiAuth, UserController.delete);

/**
 * @swagger
 * /api/v1/users/update/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     name: Update user
 *     summary: Update user
 *     parameters:
 *       - name: id
 *         in: path
 *         required:
 *           - id
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             full_name:
 *               type: string
 *             mobile_number:
 *                type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok     
 *       400:
 *         description: Invalid request
 *       500:
 *          description: Internal Server Error
 */
router.patch('/update/:id', authService.apiAuth, UserController.update);

module.exports = router;
