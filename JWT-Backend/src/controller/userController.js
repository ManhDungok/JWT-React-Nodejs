import userApiService from '../service/userApiService';

const readFUNC = async (req, res) => {
	try {
		if (req.query.page && req.query.limit) {
			let page = req.query.page;
			let limit = req.query.limit;

			let data = await userApiService.getUserWithPagination(+page, +limit);
			return res.status(200).json({
				EM: data.EM,
				EC: data.EC,
				DT: data.DT
			});
		} else {
			let data = await userApiService.getAllUSer();
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
		let data = await userApiService.createNewUser(req.body);
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
		let data = await userApiService.deleteUser(req.body.id);
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
const getUserAccount = async (req, res) => {
	return res.status(200).json({
		EM: 'Oke',
		EC: 0,
		DT: {
			access_token: req.token,
			groupWithRoles: req.user.groupWithRoles,
			email: req.user.email,
			username: req.user.username
		}
	});
};

module.exports = {
	readFUNC,
	createFUNC,
	updateFUNC,
	deleteFUNC,
	getUserAccount
};
