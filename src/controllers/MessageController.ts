import { Request, Response } from "express";
import { IMessageService } from "../services";
import { Message } from "../models";

export class MessageController {
  constructor(private readonly messageService: IMessageService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const message = new Message(req.body);
      const createdMessage = await this.messageService.createMessage(message);
      return res.status(201).json(createdMessage);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const messages = await this.messageService.listMessages();
      return res.json(messages);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
