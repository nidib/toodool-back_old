const { pick } = require('lodash');
const { StatusCodes } = require('http-status-codes');
const InvalidLoginInfoError = require('../errors/InvalidLoginInfoError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const UserModel = require('../models/User/_UserModel');
const SuccessResponse = require('../responses/SuccessResponse');
const { createUserSchema, loginUserSchema } = require('../schemas/UserSchemas');
const { updateUserInfoSchema } = require('../schemas/UserInfoSchemas');
const UserServices = require('../services/UserServices');
const UserInfoServices = require('../services/UserInfoServices');
const { AUTH_KEY, AUTH_OPTIONS } = require('../utils/constants/cookieConstants');
const { getToken } = require('../utils/helpers/tokenHelpers');
const CreateUserModel = require('../models/User/CreateUserModel');
const LoginUserSchema = require('../models/User/LoginUserModel');
const UpdateUserInfoModel = require('../models/UserInfo/UpdateUserInfoModel');
const { hashPassword, comparePassword } = require('../config/bcrypt');

class UserController {
	// @desc   Creates an user
	// @route  POST /api/v1/users
	// @access PUBLIC
	static async createUser(req, res, next) {
		const allowedRequestProperties = pick(req.body, createUserSchema.allowedProperties);
		let existingUser, hashedPassword, response, user;

		try {
			user = new CreateUserModel(allowedRequestProperties);
			existingUser = await UserServices.getUserByUsername(user.getUsername());

			if (existingUser) {
				throw new UserAlreadyExistsError();
			}

			hashedPassword = await hashPassword(user.getPassword());

			await UserServices.createOne(user.getUsername(), hashedPassword);

			response = new SuccessResponse(null, StatusCodes.CREATED);
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Logs an user in
	// @route  POST /api/v1/users/login
	// @access PUBLIC
	static async login(req, res, next) {
		const allowedRequestProperties = pick(req.body, loginUserSchema.allowedProperties);
		let existingUser, response, correctPassword, token, user;

		try {
			user = new LoginUserSchema(allowedRequestProperties);
			existingUser = await UserServices.getUserByUsername(user.getUsername());

			if (existingUser) {
				existingUser = new UserModel(existingUser);
				correctPassword = await comparePassword(user.getPassword(), existingUser.getPassword());
			}

			if (!existingUser || !correctPassword) {
				throw new InvalidLoginInfoError();
			}

			token = getToken({ who: existingUser.getId() });
			response = new SuccessResponse();
		} catch (err) {
			return next(err);
		}

		return res
			.cookie(AUTH_KEY, token, AUTH_OPTIONS)
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Logs an user out
	// @route  POST /api/v1/users/logout
	// @access PUBLIC
	static logout(_req, res, _next) {
		const response = new SuccessResponse();

		return res
			.clearCookie(AUTH_KEY)
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Update user info
	// @route  PUT /api/v1/users
	// @access USER_SPECIFIC
	static async updateInfo(req, res, next) {
		const { body, userId } = req;
		const allowedRequestProperties = pick(body, updateUserInfoSchema.allowedProperties);
		let user, response;

		try {
			user = new UpdateUserInfoModel({ ...allowedRequestProperties, userId });

			await UserInfoServices.updateUserInfo(user);

			response = new SuccessResponse();
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Get an user info
	// @route  GET /api/v1/users
	// @access USER_SPECIFIC
	static async getInfo(req, res, next) {
		const { userId } = req;
		let userWithInfo, response;

		try {
			userWithInfo = await UserServices.getInfo(userId);
			response = new SuccessResponse(userWithInfo);
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}
}

module.exports = UserController;