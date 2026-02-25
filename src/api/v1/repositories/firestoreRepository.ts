import { db } from "../../../config/firebaseConfig";

const createId = async(): Promise<string> => {
    try {
        const itemInfoSnapshot = await db.collection("item-info").
            doc("item-global-metrics").get();
        const { ...data } = itemInfoSnapshot.data();
        const padded_num = ((data["count"] as number) + 1).
            toString().padStart(5, "0");
        const id = `itemId_${padded_num}`;

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
): Promise<string | null> => {
    try {
        const id = await createId();
        await db.collection(collectionName).doc(id).set(data);

        return id;
    } catch (error:unknown) {
        const errorMessage = 
            error instanceof Error ? error.message : "Unknown Error";
        throw new Error(`Failed to [replace] document: ${errorMessage}`);
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
        throw new Error(`Failed to [replace] document: ${errorMessage}`)
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

        if (!snapshot) return null;

        return {
            id: snapshot.id,
            ...(snapshot.data() as T),
        };
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
        let docRef: FirebaseFirestore.DocumentReference;
        docRef = db.collection(collectionName).doc(id);
        
        docRef.update(data);
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
