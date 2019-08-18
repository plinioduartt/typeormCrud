import { Router } from "express";
import UserController from './controllers/UserController';
import AuthController from "./controllers/AuthController";
const router = Router();
const version = "v1";
import middlewares from "./middlewares/middlewares";

const m = middlewares;

//Autenticação
router.post('/auth/'+version, AuthController.auth);
router.post('/logout/'+version, m.authMiddleware, AuthController.logout);

//Rotas do CRUD de usuários
router.get('/users/'+version,           m.authMiddleware, m.adminRole, UserController.index);
router.get('/users/'+version+'/:id',    m.authMiddleware, m.adminRole, UserController.show);
router.post('/users/'+version,           UserController.store);
router.put('/users/'+version+'/:id',    m.authMiddleware, m.adminRole, UserController.update);
router.delete('/users/'+version+'/:id', m.authMiddleware, m.adminRole, UserController.delete);

module.exports = router;
