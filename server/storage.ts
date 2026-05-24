import { users, type User, type InsertUser } from "@shared/schema";
import { ContactMessage } from "./types";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveContactMessage(message: ContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: ContactMessage[];
  currentId: number;
  currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = [];
    this.currentId = 1;
    this.currentMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveContactMessage(message: ContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const savedMessage = { ...message, id };
    this.contactMessages.push(savedMessage);
    return savedMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return this.contactMessages;
  }
}

export const storage = new MemStorage();

