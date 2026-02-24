import Joi from "joi";

export const itemSchemas = {
    // POST createItem
    create: {
        body: Joi.object({

        }),
    },

    // GET getItemById
    getItemById: {
        params: Joi.object({

        }),
    },

    // PUT updateItem
    update: {
        params: Joi.object({

        }),
        body: Joi.object({

        }),
    },

    // DELETE deleteItem
    delete: {
        params: Joi.object({

        }),
    },

    // GET getAllItems - if applicable.
};