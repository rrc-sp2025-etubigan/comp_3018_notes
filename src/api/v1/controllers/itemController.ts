import { Request, Response, NextFunction } from "express";
import * as itemServices from "../services/itemService";
import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// Controller for creating item
export const createItemHandler = async(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { name, quantity, category } = req.body;
        const data = { name, quantity, category };

        const newItem = await itemServices.createItem(data);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newItem, "Item successfully created")
        );
    } catch (error:unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(errorMessage));
    }
};

// Controller for retrieving item by id
export const getItemByIdHandler = async(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { id } = req.params;

        const item = await itemServices.getItemById(id as string);

        res.status(HTTP_STATUS.OK).json(
            successResponse(item, "Item successfully retrieved")
        );
    } catch (error:unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse(errorMessage));
    }
};

// Controller for retrieving all items
export const getAllItemsHandler = async(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        
    } catch (error:unknown) {
        
    }
};

// Controller for updating item
export const updateItemHandler = async(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        
    } catch (error:unknown) {
        
    }
};

// Controller for deleting item
export const deleteItemHandler = async(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        
    } catch (error:unknown) {
        
    }
};
