import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.apprwriteURL)
      .setProject(conf.apprwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.apprwriteDatabaseId,
        conf.apprwriteCollectionId,
        slug,
        { title, content, featuredImg, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost({ title, slug, content, featuredImg, status }) {
    try {
      return await this.databases.updateDocument(
        conf.apprwriteDatabaseId,
        conf.apprwriteCollectionId,
        slug,
        { title, content, featuredImg, status }
      );
    } catch (error) {
      throw error;
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.apprwriteDatabaseId,
        conf.apprwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.apprwriteDatabaseId,
        conf.apprwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }

  async getPosts() {
    try {
      return await this.databases.listDocuments(
        conf.apprwriteDatabaseId,
        conf.apprwriteCollectionId,
        [Query.equal("status", ["active"])]
      );
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.apprwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(conf.apprwriteBucketId, fileID);
      return true;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileID) {
    return this.bucket.getFilePreview(conf.apprwriteBucketId, fileID);
  }
}

const service = new Service();

export default service;
