import userApiService from '../service/userApiService';
import roleApiService from '../service/roleApiService';

const readFUNC = async (req, res) => {
	try {
		{
			let data = await roleApiService.getAllRoles();
			return res.status(200).json({
				EM: data.EM,
				EC: data.EC,
				DT: data.DT
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			EM: 'error from server', //error message
			EC: '-1', //error code
			DT: '' //data
		});
	}
};
const createFUNC = async (req, res) => {
	try {
		let data = await roleApiService.createNewRoles(req.body);
		return res.status(200).json({
			EM: data.EM,
			EC: data.EC,
			DT: data.DT
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			EM: 'error from server', //error message
			EC: '-1', //error code
			DT: '' //data
		});
	}
};
const updateFUNC = async (req, res) => {
	try {
		let data = await userApiService.updateUser(req.body);
		return res.status(200).json({
			EM: data.EM,
			EC: data.EC,
			DT: data.DT
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			EM: 'error from server', //error message
			EC: '-1', //error code
			DT: '' //data
		});
	}
};
const deleteFUNC = async (req, res) => {
	try {
		let data = await roleApiService.deleteRole(req.body.id);
		return res.status(200).json({
			EM: data.EM,
			EC: data.EC,
			DT: data.DT
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			EM: 'error from server', //error message
			EC: '-1', //error code
			DT: '' //data
		});
	}
};
const getRoleByGroup = async (req, res) => {
	try {
		let id = req.params.groupId;
		let data = await roleApiService.getRoleByGroup(id);
		return res.status(200).json({
			EM: data.EM,
			EC: data.EC,
			DT: data.DT
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			EM: 'error from server', //error message
			EC: '-1', //error code
			DT: '' //data
		});
	}
};

const assignRoleToGroup = async (req, res) => {
	try {
		let data = await roleApiService.assignRoleToGroup(req.body.data); //bên file api serviece
		return res.status(200).json({
			EM: data.EM,
			EC: data.EC,
			DT: data.DT
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			EM: 'error from server', //error message
			EC: '-1', //error code
			DT: '' //data
		});
	}
};

module.exports = {
	readFUNC,
	createFUNC,
	updateFUNC,
	deleteFUNC,
	getRoleByGroup,
	assignRoleToGroup
};
