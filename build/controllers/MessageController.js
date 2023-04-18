"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
const models_1 = require("../models");
class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = new models_1.Message(req.body);
                const createdMessage = yield this.messageService.createMessage(message);
                return res.status(201).json(createdMessage);
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.messageService.listMessages();
                return res.json(messages);
            }
            catch (err) {
                console.error(err);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.MessageController = MessageController;
