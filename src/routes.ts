import { Router } from "express";
import UsersController from './controllers/UserController';
const router = Router();

router.get('/users', UsersController.index);
router.post('/users', UsersController.store);

module.exports = router;
