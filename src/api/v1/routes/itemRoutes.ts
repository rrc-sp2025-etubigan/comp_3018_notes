import express from "express";
import { validateRequest } from "../middleware/validation";
import * as itemController from "../controllers/itemController";
import { itemSchemas } from "../validation/itemSchema";

const itemRouter = express.Router();

export default itemRouter;