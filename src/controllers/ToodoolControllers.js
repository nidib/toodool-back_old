const Ajv = require('ajv');
const { StatusCodes } = require('http-status-codes');
const ToodoolAlreadyExistsError = require('../errors/ToodoolAlreadyExistsError');
const ValidationError = require('../errors/ValidationError');
const ToodoolModel = require('../models/ToodoolModel');
const SuccessResponse = require('../responses/SuccessResponse');
const { createToodoolSchema, updateToodoolSchema, completeToodoolSchema } = require('../schemas/ToodoolSchemas');
const ToodoolServices = require('../services/ToodoolServices');

const ajv = new Ajv();

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

	// @desc   Get all toodools of the logged user
	// @route  GET /api/v1/toodools
	// @access USER_SPECIFIC
	static async getToodool(req, res, next) {
		const { params, userId } = req;
		const { id } = params;
		let response, toodool;

		try {
			toodool = await ToodoolServices.getToodoolByUserAndId(userId, id);
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
		const allowedRequestProperties = {
			title: String(body.title),
			description: String(body.description)
		};
		const valid = ajv.compile(allowedRequestProperties)(createToodoolSchema);
		let existingToodool, newToodool, response;

		try {
			if (!valid) {
				throw new ValidationError();
			}

			newToodool = new ToodoolModel({ ...allowedRequestProperties, userId });
			existingToodool = await ToodoolServices.getToodoolByUserAndTitle(newToodool.getUserId(), newToodool.getTitle());

			if (existingToodool) {
				throw new ToodoolAlreadyExistsError();
			}

			await ToodoolServices.createOne(newToodool);

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
		const allowedRequestProperties = {
			id,
			completed: body.completed,
			title: String(body.title),
			description: String(body.description)
		};
		const valid = ajv.compile(allowedRequestProperties)(updateToodoolSchema);
		let updatedToodoolCandidate, response;

		try {
			if (!valid) {
				throw new ValidationError();
			}

			updatedToodoolCandidate = new ToodoolModel({ ...allowedRequestProperties, userId });

			await ToodoolServices.updateToodol(updatedToodoolCandidate);

			response = new SuccessResponse();
		} catch (err) {
			return next(err);
		}

		return res
			.status(response.statusCode)
			.json(response);
	}

	// @desc   Complete a toodool
	// @route  PUT /api/v1/toodools/:id/complete
	// @access USER_SPECIFIC
	static async completeToodool(req, res, next) {
		const { body, params, userId } = req;
		const { completed } = body;
		const { id } = params;
		const allowedRequestProperties = { completed };
		const valid = ajv.compile(allowedRequestProperties)(completeToodoolSchema);
		let response;

		try {
			if (!valid) {
				throw new ValidationError();
			}

			await ToodoolServices.completeToodool(new ToodoolModel({ ...allowedRequestProperties, id, userId }));

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
		let response, toodool;

		try {
			toodool = new ToodoolModel({ id, userId });

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