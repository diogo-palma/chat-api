"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const server_1 = __importDefault(require("./server"));
const server = (0, http_1.createServer)(server_1.default);
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
});
