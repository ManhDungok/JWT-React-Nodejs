import express from 'express';
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from '../controller/groupController';
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction';
import roleController from '../controller/roleController';

const router = express.Router();

const initApiRoutes = (app) => {
	router.all('*', checkUserJWT, checkUserPermission);

	router.post('/register', apiController.handleRegister);
	router.post('/login', apiController.handleLogin);
	router.post('/logout', apiController.handleLogout);

	router.get('/account', userController.getUserAccount);

	//user routes
	router.get('/user/read', userController.readFUNC);
	router.post('/user/create', userController.createFUNC);
	router.put('/user/update', userController.updateFUNC);
	router.delete('/user/delete', userController.deleteFUNC);

	//roles routes
	router.get('/role/read', roleController.readFUNC);
	router.post('/role/create', roleController.createFUNC);
	router.put('/role/update', roleController.updateFUNC);
	router.delete('/role/delete', roleController.deleteFUNC);
	router.get('/role/by-group/:groupId', roleController.getRoleByGroup);
	router.post('/role/assign-to-group', roleController.assignRoleToGroup);

	//group routes
	router.get('/group/read', groupController.readFUNC);

	return app.use('/api/v1', router);
};

export default initApiRoutes;
