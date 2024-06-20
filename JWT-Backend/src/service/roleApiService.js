import { where } from 'sequelize';
import db from '../models/index';

const createNewRoles = async (roles) => {
	try {
		let currentRoles = await db.Role.findAll({
			attributes: ['url', 'description'],
			raw: true
		});

		const persists = roles.filter(
			//sẽ ko lấy cái nào có 2 url bằng nhau
			({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
		);
		if (persists.length === 0) {
			return {
				EM: 'Nothing to create...',
				EC: 0,
				DT: []
			};
		}
		//tạo 1 lúc nhiều role vs bulkCreate
		await db.Role.bulkCreate(persists);
		return {
			EM: `Create success ${persists.length} roles...!`,
			EC: 0,
			DT: []
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'Something wrongs with services',
			EC: 1,
			DT: []
		};
	}
};

const getAllRoles = async () => {
	try {
		let data = await db.Role.findAll({
			order: [['id', 'ASC']]
		});
		return {
			EM: 'Get all Roles success',
			EC: 0,
			DT: data
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'Something wrongs with services',
			EC: 1,
			DT: []
		};
	}
};

const deleteRole = async (id) => {
	try {
		let role = await db.Role.findOne({
			where: { id: id }
		});
		if (role) {
			await role.destroy();
		}

		return {
			EM: 'Delete Roles success',
			EC: 0,
			DT: []
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'Something wrongs with services',
			EC: 1,
			DT: []
		};
	}
};

const getRoleByGroup = async (id) => {
	try {
		if (!id) {
			return {
				EM: 'Not found any roles',
				EC: 0,
				DT: []
			};
		}
		let roles = await db.Group.findOne({
			where: { id: id },
			attributes: ['id', 'name', 'description'],
			include: {
				model: db.Role,
				attributes: ['id', 'url', 'description'],
				through: { attributes: [] }
			}
		});
		return {
			EM: 'Get roles by group success',
			EC: 0,
			DT: roles
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'Something wrongs with services',
			EC: 1,
			DT: []
		};
	}
};

const assignRoleToGroup = async (data) => {
	try {
		await db.Group_Role.destroy({
			where: { groupId: +data.groupId }
		});
		await db.Group_Role.bulkCreate(data.groupRoles); //khi insert vao db thi insert cai nay
		return {
			EM: 'Assign Role to group succeds',
			EC: 0,
			DT: []
		};
	} catch (error) {
		console.log(error);
		return {
			EM: 'Something wrongs with services',
			EC: 1,
			DT: []
		};
	}
};

module.exports = {
	createNewRoles,
	getAllRoles,
	deleteRole,
	getRoleByGroup,
	assignRoleToGroup
};
