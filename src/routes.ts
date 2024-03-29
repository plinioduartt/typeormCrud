import { Router } from "express";
import UserController from './controllers/UserController';
import AuthController from "./controllers/AuthController";
import NetworkController from "./controllers/NetworkController";
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
router.post('/users/'+version,          m.authMiddleware, m.adminRole, UserController.store);
router.put('/users/'+version+'/:id',    m.authMiddleware, m.adminRole, UserController.update);
router.delete('/users/'+version+'/:id', m.authMiddleware, m.adminRole, UserController.delete);

//Rotas do CRUD de redes
router.get('/networks/'+version,           m.authMiddleware, m.adminRole, NetworkController.index);
router.get('/networks/'+version+'/:id',    m.authMiddleware, m.adminRole, NetworkController.show);
router.post('/networks/'+version,          m.authMiddleware, m.adminRole, NetworkController.store);
router.put('/networks/'+version+'/:id',    m.authMiddleware, m.adminRole, NetworkController.update);
router.delete('/networks/'+version+'/:id', m.authMiddleware, m.adminRole, NetworkController.delete);

//Rotas para adicionar & remover usuários das redes, ":id" = id_rede
router.put('/networks/user/add/'+version+'/:id', m.authMiddleware, m.adminRole, NetworkController.networkAddUser);
router.put('/networks/user/rm/'+version+'/:id',  m.authMiddleware, m.adminRole, NetworkController.networkRmUser);


module.exports = router;
