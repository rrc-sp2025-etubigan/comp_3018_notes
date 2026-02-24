import Joi from "joi";

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
                    "string.alphanum": "name must use alphanumeric \
                                        characters only",
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
                    "any.valid": "category must these valid values \
                                  [clothing, tool, food]",
                }),
        }),
    },

    // GET getItemById
    getItemById: {
        params: Joi.object({
            id: Joi.string()
                .required()
                .alphanum()
                .messages({
                    "any.required": "id is required",
                    "string.empty": "id must not be empty",
                    "string.alphanum": "id contains only alphanumeric \
                                        characters",
                }),
        }),
    },

    // PUT updateItem
    update: {
        params: Joi.object({
            id: Joi.string()
                .required()
                .alphanum()
                .messages({
                    "any.required": "id is required",
                    "string.empty": "id must not be empty",
                    "string.alphanum": "id contains only alphanumeric \
                                        characters",
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
                    "any.valid": "category must these valid values \
                                  [clothing, tool, food]",
                }),
        }),
    },

    // DELETE deleteItem
    delete: {
        params: Joi.object({
            id: Joi.string()
                .required()
                .alphanum()
                .messages({
                    "any.required": "id is required",
                    "string.empty": "id must not be empty",
                    "string.alphanum": "id contains only alphanumeric \
                                        characters",
                }),
        }),
    },

    // GET getAllItems - if applicable.
};