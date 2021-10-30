const Ajv = require('ajv');
const { hash, compare } = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const InvalidLoginInfoError = require('../errors/InvalidLoginInfoError');
const UserAlreadyExistsError = require('../errors/UserAlreadyExistsError');
const ValidationError = require('../errors/ValidationError');
const UserModel = require('../models/UserModel');
const UserInfoModel = require('../models/UserInfoModel');
const SuccessResponse = require('../responses/SuccessResponse');
const { createUserSchema } = require('../schemas/UserSchemas');
const { updateUserInfoSchema } = require('../schemas/UserInfoSchemas');
const UserServices = require('../services/UserServices');
const UserInfoServices = require('../services/UserInfoServices');
const { saltRounds } = require('../utils/constants/bcryptConstants');
const { AUTH_KEY, AUTH_OPTIONS } = require('../utils/constants/cookieConstants');
const { getToken } = require('../utils/hepers/tokenHelpers');

const ajv = new Ajv();

class UserController {
	// @desc   Creates an user
	// @route  POST /api/v1/users
	// @access PUBLIC
	static async createUser(req, res, next) {
		const { username, password } = req.body;
		const allowedRequestProperties = {
			username: String(username),
			password: String(password)
		};
		const valid = ajv.compile(createUserSchema)(allowedRequestProperties);
		let existingUser, hashedPassword, response, userCandidate;

		try {
			if (!valid) {
				throw new ValidationError();
			}

			userCandidate = new UserModel(allowedRequestProperties);
			existingUser = await UserServices.getUserByUsername(userCandidate.getUsername());

			if (existingUser) {
				throw new UserAlreadyExistsError();
			}

			hashedPassword = await hash(userCandidate.getPassword(), saltRounds);

			await UserServices.createOne(userCandidate.getUsername(), hashedPassword);

			response = new SuccessResponse(null, StatusCodes.CREATED).response;
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
		const { username, password } = req.body;
		const allowedRequestProperties = {
			username: String(username),
			password: String(password)
		};
		const valid = ajv.compile(createUserSchema)(allowedRequestProperties);
		let existingUser, response, correctPassword, validLogin, token, userCandidate;

		try {
			if (!valid) {
				throw new ValidationError();
			}

			userCandidate = new UserModel(allowedRequestProperties);
			existingUser = await UserServices.getUserByUsername(userCandidate.getUsername());

			if (existingUser) {
				existingUser = new UserModel(existingUser);
				correctPassword = await compare(userCandidate.getPassword(), existingUser.getPassword());
			}

			validLogin = existingUser && correctPassword;

			if (!validLogin) {
				throw new InvalidLoginInfoError();
			}

			token = getToken({ key: existingUser.getId() });
			response = new SuccessResponse(null).response;
		} catch (err) {
			return next(err);
		}

		return res
			.cookie(AUTH_KEY, token, AUTH_OPTIONS)
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Update user info
	// @route  PUT /api/v1/users
	// @access USER_SPECIFIC
	static async updateInfo(req, res, next) {
		const { body, userId } = req;
		const allowedRequestProperties = {
			email: body.email,
			firstName: body.firstName,
			lastName: body.lastName,
			nickname: body.nickname
		};
		const valid = ajv.compile(updateUserInfoSchema)(allowedRequestProperties);
		let userInfoCandidate, response;

		try {
			if (!valid) {
				throw new ValidationError();
			}

			userInfoCandidate = new UserInfoModel({ ...allowedRequestProperties, userId });

			await UserInfoServices.updateUserInfo(userInfoCandidate);

			response = new SuccessResponse(null).response;
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
			response = new SuccessResponse(userWithInfo).response;
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}
}

module.exports = UserController;