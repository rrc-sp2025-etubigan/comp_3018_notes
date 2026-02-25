import { Item } from "../models/itemModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const COLLECTION = "items"

// POST createItem
export const createItem = async(
    data: {
        name: string,
        quantity: number,
        category: string,
    },
): Promise<Item> => {
    try {
        const newItem = {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const id = await firestoreRepository
            .createDocument<Item>(COLLECTION, newItem);

        return { id, ...newItem };
    } catch (error: unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to create item: ${errorMessage}`);
    }
};

// GET getItemById
export const getItemById = async(
    id: string,
): Promise<Item> => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to retrieve \
                         item by id: ${errorMessage}`);
    }
};

// GET getAllItems
export const getAllItems = async(): Promise<Item[]> => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to retrieve all \
                         items: ${errorMessage}`);
    }
};

// UPDATE updateItem
export const updateItem = async(
    id: string,
    data: Pick<Item, "name" | "quantity" | "category">
): Promise<Item> => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to update \
                         item: ${errorMessage}`);
    }
};

// DELETE deleteItem
export const deleteItem = async(
    id: string,
): Promise<void> => {
    try {
        
    } catch (error: unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to delete \
                         item: ${errorMessage}`);
    }
};
