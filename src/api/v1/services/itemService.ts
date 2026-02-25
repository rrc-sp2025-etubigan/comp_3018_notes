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
        throw new Error(errorMessage);
    }
};

// GET getItemById
export const getItemById = async(
    id: string,
): Promise<Item> => {
    try {
        const item = await firestoreRepository
                                .getDocumentById<Item>(COLLECTION, id);

        if (!item) throw new Error(`Item with id ${id} not found`);
        
        return item
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(errorMessage);
    }
};

// GET getAllItems
export const getAllItems = async(): Promise<Item[]> => {
    try {
        return (await firestoreRepository
                                .getAllDocuments<Item>(COLLECTION));
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(errorMessage);
    }
};

// UPDATE updateItem
export const updateItem = async(
    id: string,
    data: Pick<Item, "name" | "quantity" | "category">
): Promise<Item> => {
    try {
        let updateData: Partial<Item> = {}

        if (data.name != undefined) updateData.name = data.name;
        if (data.quantity != undefined) updateData.quantity = data.quantity;
        if (data.category != undefined) updateData.category = data.category;

        if (Object.keys(data).length === 0) 
            throw new Error("No fields to provided to update with");

        updateData.updatedAt = new Date().toISOString();

        await firestoreRepository.updateDocument(COLLECTION, id, updateData);

        const updatedItem = await firestoreRepository
                                    .getDocumentById<Item>(COLLECTION, id);
        
        if (!updatedItem) throw new Error("Updated item not found");
        
        return updatedItem;
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(errorMessage);
    }
};

// DELETE deleteItem
export const deleteItem = async(
    id: string,
): Promise<void> => {
    try {
        await firestoreRepository.deleteDocument(COLLECTION, id);
    } catch (error: unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(errorMessage);
    }
};
