import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Items:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifying name for the item
 *           example: "itemId_00001"
 *         name:
 *           type: string
 *           description: Name of the item
 *           example: "Screwdriver"
 *         quantity:
 *           type: number
 *           description: Current amount of items in stock
 *           example: 100
 *         category:
 *           type: string
 *           enum: [clothing, tool, food]
 *           example: "tool"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the item was created in ISO format
 *           example: "2026-08-01T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the item was last updated in ISO format
 *           example: "2026-09-20T15:36:12.000Z"
 */

export const itemSchemas = {
    // POST createItem
    create: {
        body: Joi.object({
            name: Joi.string()
                .required()
                .alphanum()
                .max(24)
                .messages({
                    "any.required": "name is required",
                    "string.empty": "name cannot be empty",
                    "string.alphanum": "name must use alphanumeric " +
                                       "characters only",
                    "string.max": "name maximum length is 24 characters",
                }),
            quantity: Joi.number()
                .required()
                .integer()
                .positive()
                .messages({
                    "any.required": "number is required",
                    "number.empty": "number cannot be empty",
                    "number.integer": "number must be an integer value",
                    "number.positive": "number must be a positive value",
                }),
            category: Joi.string()
                .required()
                .valid("clothing", "tool", "food")
                .messages({
                    "any.required": "category is required",
                    "string.empty": "category must not be empty",
                    "any.valid": "category must these valid values " +
                                 "[clothing, tool, food]",
                }),
        }),
    },

    // GET getItemById
    getItemById: {
        params: Joi.object({
            id: Joi.string()
                .required()
                .messages({
                    "any.required": "id is required",
                    "string.empty": "id must not be empty",
                }),
        }),
    },

    // PUT updateItem
    update: {
        params: Joi.object({
            id: Joi.string()
                .required()
                .messages({
                    "any.required": "id is required",
                    "string.empty": "id must not be empty",
                }),
        }),
        body: Joi.object({
            quantity: Joi.number()
                .optional()
                .integer()
                .positive()
                .messages({
                    "number.empty": "number cannot be empty",
                    "number.integer": "number must be an integer value",
                    "number.positive": "number must be a positive value",
                }),
            category: Joi.string()
                .optional()
                .valid("clothing", "tool", "food")
                .messages({
                    "string.empty": "category must not be empty",
                    "any.valid": "category must these valid values " +
                                 "[clothing, tool, food]",
                }),
        }),
    },

    // DELETE deleteItem
    delete: {
        params: Joi.object({
            id: Joi.string()
                .required()
                .messages({
                    "any.required": "id is required",
                    "string.empty": "id must not be empty",
                }),
        }),
    },

    // GET getAllItems - if applicable.
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human readable error-message
 *           example: "Name cannot be empty"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field: 
 *                 type: string
 *                 example: name
 *               issue:
 *                 type: string
 *                 example: "name cannot be empty"
 *           description: Detailed validations errors (optional)
 */