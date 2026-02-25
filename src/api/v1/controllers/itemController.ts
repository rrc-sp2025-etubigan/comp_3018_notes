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
        
    } catch (error:unknown) {
        
    }
};

// Controller for retrieving item by id
export const getItemByIdHandler = async(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        
    } catch (error:unknown) {
        
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
