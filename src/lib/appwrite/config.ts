import { Client, Account, Avatars, Databases,Storage } from "appwrite";

export const appwriteConfig = {
    url : import.meta.env.VITE_APPWRITE_URL,
    projectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId : import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    storageId : import.meta.env.VITE_APPWRITE_STORAGE_ID,
    postCollectionId : import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    savesCollectionId : import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    commentCollectionId : import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID,
}
export const client = new Client()
    .setEndpoint(appwriteConfig.url) // Your API Endpoint
    .setProject(appwriteConfig.projectId);               // Your project ID

export const account = new Account(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
export const databases = new Databases(client);


