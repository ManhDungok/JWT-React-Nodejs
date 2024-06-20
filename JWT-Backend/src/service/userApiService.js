import db from '../models/index';
import {
	checkEmailExist,
	checkPhoneExist,
	hashUserPassword
} from './loginRegisterService';

const getAllUSer = async () => {
	try {
		let users = await db.User.findAll({
			attributes: ['id', 'username', 'email', 'phone', 'sex'],
			include: {
				model: db.Group,
				attributes: ['name', 'description', 'id']
			}
		});
		if (users) {
			return {
				EM: 'get data success',
				EC: 0,
				DT: users
			};
		} else {
			return {
				EM: 'get data success',
				EC: 0,
				DT: []
			};
		}
	} catch (e) {
		console.log(e);
		return {
			EM: 'something wrongs with service',
			EC: 1,
			DT: []
		};
	}
};

const getUserWithPagination = async (page, limit) => {
	try {
		let offset = (page - 1) * limit;
		const { count, rows } = await db.User.findAndCountAll({
			offset: offset,
			limit: limit,
			attributes: ['id', 'username', 'email', 'phone', 'sex', 'address'],
			include: {
				model: db.Group,
				attributes: ['name', 'description', 'id']
				//order: [['id', 'DESC']]
			}
		});

		let totalPages = Math.ceil(count / limit);
		let data = {
			totalRows: count,
			totalPages: totalPages,
			users: rows
		};

		return {
			EM: 'fetch OK',
			EC: 0,
			DT: data
		};
	} catch (e) {
		console.log(e);
		return {
			EM: 'something wrongs with service',
			EC: 1,
			DT: []
		};
	}
};

const createNewUser = async (data) => {
	try {
		//check email, phone
		let isEmailExist = await checkEmailExist(data.email);
		if (isEmailExist === true) {
			return {
				EM: 'The email is already exist',
				EC: 1,
				DT: 'email'
			};
		}
		let isPhoneExist = await checkPhoneExist(data.phone);
		if (isPhoneExist === true) {
			return {
				EM: 'The phone number is already exist',
				EC: 1,
				DT: 'phone'
			};
		}
		let hashPassword = hashUserPassword(data.password);

		//hash user password
		await db.User.create({ ...data, password: hashPassword });
		return {
			EM: 'create OK',
			EC: 0,
			DT: []
		};
	} catch (e) {
		return {
			EM: 'Something wrongs with services',
			EC: 1,
			DT: []
		};
	}
};

const updateUser = async (data) => {
	try {
		if (!data.groupId) {
			//TH ko tuyen len groupId
			return {
				EM: 'Error with empty groupId',
				EC: 1,
				DT: 'group'
			};
		}
		let user = await db.User.findOne({
			where: { id: data.id }
		});
		if (user) {
			//update

			await user.update({
				username: data.username,
				address: data.address,
				sex: data.sex,
				groupId: data.groupId
			});
			return {
				EM: 'Update user success',
				EC: 0,
				DT: ''
			};
		} else {
			//not found(TH ko tim thay user)
			return {
				EM: 'User not found',
				EC: 2,
				DT: ''
			};
		}
	} catch (e) {
		console.log(e);
		return {
			EM: 'Something wrongs with services',
			EC: 1,
			DT: []
		};
	}
};

const deleteUser = async (id) => {
	try {
		let user = await db.User.findOne({
			where: { id: id }
		});
		if (user) {
			await user.destroy();
			return {
				EM: 'Delete user success',
				EC: 0,
				DT: []
			};
		} else {
			return {
				EM: 'user not exist',
				EC: 2,
				DT: []
			};
		}
	} catch (e) {
		console.log(e);
		return {
			EM: 'error from service',
			EC: 1,
			DT: []
		};
	}
};

module.exports = {
	getAllUSer,
	createNewUser,
	updateUser,
	deleteUser,
	getUserWithPagination
};
