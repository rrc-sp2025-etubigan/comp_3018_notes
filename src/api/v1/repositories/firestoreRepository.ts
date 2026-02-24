import { db } from "../../../config/firebaseConfig";

// POST createDocument
export const createDocument = async<T>(
    collectionName: string,
    data: Partial<T>,
): Promise<void> => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to [replace] document: ${errorMessage}`)
    }
};

// GET getAllDocuments
export const getAllDocuments = async<T>(
    collectionName: string,
): Promise<T[]> => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to [replace] document: ${errorMessage}`)
    }
};

// GET getDocumentById
export const getDocumentById = async<T>(
    collectionName: string,
    id: string
): Promise<T | null> => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to [replace] document: ${errorMessage}`)
    }
};

// PUT updateDocument
export const updateDocument = async<T>(
    collectionName: string,
    id: string,
    data: Partial<T>
) => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to [replace] document: ${errorMessage}`)
    }
};

// DELETE deleteDocument
export const deleteDocument = async<T>(
    collectionName: string,
    id: string,
): Promise<void> => {
    try {
        
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to [replace] document: ${errorMessage}`)
    }
};
