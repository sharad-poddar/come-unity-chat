import express from "express";
import http from "http";
const { Server } = require("socket.io");

//@dev express server gets converted into http server
//@dev here http server converts to socket server
//@dev io is an socket server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  //@dev abolute path and file name with /
  res.sendFile(__dirname + "/index.html");
});

//@dev on connecting to socket server this runs
io.on("connection", (socket: any) => {

    socket.on("message", (data: { msg: string; from: string }) => {
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
