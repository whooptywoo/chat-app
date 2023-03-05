const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("User connected", socket.id);
	socket.on("join_room", (data) => {
		socket.join(data.room);
		console.log(`${data.username} joined room: ${data.room}`);
	});
	socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data);
	});
	socket.on("disconnect", () => {
		console.log("Disconnected", socket.id);
	});
});

server.listen(4000, () => {
	console.log("Server running");
});
