import express from "express";
import { validateRequest } from "../middleware/validation";
import * as itemController from "../controllers/itemController";
import { itemSchemas } from "../validation/itemSchema";

const itemRouter = express.Router();

itemRouter.post("/", validateRequest(itemSchemas.create), itemController.createItemHandler);
itemRouter.get("/", itemController.getAllItemsHandler);
itemRouter.get("/:id", validateRequest(itemSchemas.getItemById), itemController.getItemByIdHandler);
itemRouter.put("/:id", validateRequest(itemSchemas.update), itemController.updateItemHandler);
itemRouter.delete("/:id", validateRequest(itemSchemas.delete), itemController.deleteItemHandler);

export default itemRouter;