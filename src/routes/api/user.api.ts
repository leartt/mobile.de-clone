import express from 'express';
import userController from "../../controllers/user.controller";

import { authenticate } from 'passport';

import { checkAdmin } from '../../utils/check.role'

const router = express.Router();


router.get('/', authenticate('jwt', { session: false }), checkAdmin, userController.getUsers);

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

router.post('/login', userController.login);

router.delete('/:id', userController.deleteUser);

export default router;