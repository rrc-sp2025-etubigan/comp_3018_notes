import express from "express";
import { validateRequest } from "../middleware/validation";
import * as itemController from "../controllers/itemController";
import { itemSchemas } from "../validation/itemSchema";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const itemRouter = express.Router();

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Create new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         schema:
 *         type: object
 *         required:
 *           - name
 *           - quantity
 *           - category
 *         properties:
 *           name:
 *             type: string
 *             alphanum: true
 *             maxLength: 24
 *             example: "Hammer"
 *           quantity:
 *             type: integer
 *             min: 1
 *           category:
 *             type: string
 *             enum: [clothing, tool, food]
 *     responses:
 *       '201':
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validation/Items'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Error'
 */
itemRouter.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: [ "admin", "manager" ] }),
    validateRequest(itemSchemas.create),
    itemController.createItemHandler
);

itemRouter.get(
    "/",
    authenticate,
    itemController.getAllItemsHandler);

itemRouter.get(
    "/:id",
    authenticate,
    validateRequest(itemSchemas.getItemById),
    itemController.getItemByIdHandler
);

itemRouter.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: [ "admin", "manager" ], allowSameUser: true }),
    validateRequest(itemSchemas.update),
    itemController.updateItemHandler
);

itemRouter.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: [ "admin", "manager" ] }),
    validateRequest(itemSchemas.delete),
    itemController.deleteItemHandler
);

export default itemRouter;