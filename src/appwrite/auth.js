import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.apprwriteURL)
      .setProject(conf.apprwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        return this.login(email, password);
      } else {
        return user;
      }
    } catch (error) {
        console.log("error in creating  user",error);
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
        console.log("error in login user",error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
        console.log("error in getting current user",error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
        console.log("error in loging out user",error);
    }
  }
}

const authService = new AuthService();

export default authService;
