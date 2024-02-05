const conf = {
    apprwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    apprwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    apprwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    apprwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    apprwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default conf;