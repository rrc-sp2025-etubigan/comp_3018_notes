import express from "express";
import { validateRequest } from "../middleware/validation";
import * as itemController from "../controllers/itemController";
import { itemSchemas } from "../validation/itemSchema";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const itemRouter = express.Router();

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