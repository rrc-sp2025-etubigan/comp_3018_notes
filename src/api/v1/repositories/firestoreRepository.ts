import { db } from "../../../config/firebaseConfig";

const createId = async(): Promise<string> => {
    try {
        const docRef = db.collection("item-info").
            doc("item-global-metrics");
        const snapshot = await docRef.get();
        const { ...data } = snapshot.data();

        const newCount = (data["count"] as number) + 1;
        const padded_num = newCount.toString().padStart(5, "0");
        const id = `itemId_${padded_num}`;

        docRef.update({
            "count": newCount,
        });
        return id;
    } catch (error:unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to create document id: ${errorMessage}`);
    }
};

// POST createDocument
export const createDocument = async<T>(
    collectionName: string,
    data: Partial<T>,
): Promise<string> => {
    try {
        const id = await createId();
        await db.collection(collectionName).doc(id).set(data);

        return id;
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to create document: ${errorMessage}`);
    }
};

// GET getAllDocuments
export const getAllDocuments = async<T>(
    collectionName: string,
): Promise<T[]> => {
    try {
        let collectRef: FirebaseFirestore.CollectionReference; 
        collectRef = db.collection(collectionName);

        return (await collectRef.get()).docs.map(docs => ({
            id: docs.id,
            ... (docs.data() as T),
        }));
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error("Failed to retrieve all " +
                         `documents: ${errorMessage}`);
    }
};

// GET getDocumentById
export const getDocumentById = async<T>(
    collectionName: string,
    id: string
): Promise<T | null> => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;
        docRef = db.collection(collectionName).doc(id);
        const snapshot = await docRef.get();

        if (!(snapshot.exists)) return null;

        return {
            id: snapshot.id,
            ...(snapshot.data() as T),
        };
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error("Failed to retrieve document by " +
                         `id(${id}): ${errorMessage}`);
    }
};

// PUT updateDocument
export const updateDocument = async<T>(
    collectionName: string,
    id: string,
    data: Partial<T>
) => {
    try {
        let docRef: FirebaseFirestore.DocumentReference;
        docRef = db.collection(collectionName).doc(id);
        
        docRef.update(data);
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error("Failed to update document with "+
                         `id(${id}): ${errorMessage}`);
    }
};

// DELETE deleteDocument
export const deleteDocument = async<T>(
    collectionName: string,
    id: string,
): Promise<void> => {
    try {
        db.collection(collectionName).doc(id).delete();
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error("Failed to delete document with " +
                         `id(${id}): ${errorMessage}`);
    }
};
