"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const { Server } = require("socket.io");
//@dev express server gets converted into http server
//@dev here http server converts to socket server
//@dev io is an socket server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
    //@dev abolute path and file name with /
    res.sendFile(__dirname + "/index.html");
});
//@dev on connecting to socket server this runs
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (data) => {
        console.log(data);
        io.emit('message', data);
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
server.listen(8080, () => {
    console.log("http server is listening");
});
