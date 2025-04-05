import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ContactMessage } from "./types";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form API endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body as ContactMessage;
      
      // Validate form data
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      
      // Store message
      const savedMessage = await storage.saveContactMessage({
        name,
        email,
        subject,
        message,
        createdAt: new Date()
      });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received successfully',
        data: savedMessage
      });
    } catch (error) {
      console.error('Error saving contact message:', error);
      return res.status(500).json({ message: 'Server error, please try again later' });
    }
  });

  // Get all contact messages (could be used for admin dashboard)
  app.get('/api/contact', async (_req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return res.status(500).json({ message: 'Server error, please try again later' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
