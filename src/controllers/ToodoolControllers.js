const { pick } = require('lodash');
const { StatusCodes } = require('http-status-codes');
const ToodoolAlreadyExistsError = require('../errors/ToodoolAlreadyExistsError');
const CreateToodoolModel = require('../models/Toodool/CreateToodoolModel');
const ToodoolModel = require('../models/Toodool/_ToodoolModel');
const UpdateToodoolModel = require('../models/Toodool/UpdateToodoolModel');
const SuccessResponse = require('../responses/SuccessResponse');
const ToodoolServices = require('../services/ToodoolServices');
const { createToodoolSchema, updateToodoolSchema } = require('../schemas/ToodoolSchemas');

class ToodoolController {
	// @desc   Get all toodools of the logged user
	// @route  GET /api/v1/toodools
	// @access USER_SPECIFIC
	static async getToodools(req, res, next) {
		const { userId } = req;
		let response, toodools;

		try {
			toodools = await ToodoolServices.getToodoolsByUser(userId);
			response = new SuccessResponse(toodools);
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Get a toodool
	// @route  GET /api/v1/toodools
	// @access USER_SPECIFIC
	static async getToodool(req, res, next) {
		const { params, userId } = req;
		const { id } = params;
		const requestParameters = { id, userId };
		let response, toodool;

		try {
			toodool = new ToodoolModel({ ...requestParameters });
			toodool = await ToodoolServices.getToodoolByUserAndId(toodool.getUserId(), toodool.getId());
			response = new SuccessResponse(toodool);
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Creates a toodool for the logged user
	// @route  POST /api/v1/toodools
	// @access USER_SPECIFIC
	static async createToodol(req, res, next) {
		const { body, userId } = req;
		const requestParameters = { userId };
		const allowedRequestProperties = pick(body, createToodoolSchema.allowedProperties);
		let existingToodool, toodool, response;

		try {
			toodool = new CreateToodoolModel({ ...allowedRequestProperties, ...requestParameters });
			existingToodool = await ToodoolServices.getToodoolByUserAndTitle(toodool.getUserId(), toodool.getTitle());

			if (existingToodool) {
				throw new ToodoolAlreadyExistsError();
			}

			await ToodoolServices.createOne(toodool);

			response = new SuccessResponse(null, StatusCodes.CREATED);
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Updates a toodool
	// @route  PUT /api/v1/toodools/:id
	// @access USER_SPECIFIC
	static async updateToodool(req, res, next) {
		const { body, params, userId } = req;
		const { id } = params;
		const requestParameters = { id, userId };
		const allowedRequestProperties = pick(body, updateToodoolSchema.allowedProperties);
		let toodool, response;

		try {
			toodool = new UpdateToodoolModel({ ...allowedRequestProperties, ...requestParameters });

			await ToodoolServices.updateToodol(toodool);

			response = new SuccessResponse();
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Delete a specific toodool
	// @route  DELETE /api/v1/toodools/:id
	// @access USER_SPECIFIC
	static async deleteToodool(req, res, next) {
		const { params, userId } = req;
		const { id } = params;
		const allowedRequestProperties = { id, userId };
		let response, toodool;

		try {
			toodool = new ToodoolModel(allowedRequestProperties);

			await ToodoolServices.deleteToodool(toodool);

			response = new SuccessResponse();
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}
}

module.exports = ToodoolController;