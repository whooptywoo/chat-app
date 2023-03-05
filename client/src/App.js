import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:4000");

function App() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);
	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", { room, username });
			setShowChat(true);
		}
	};

	return (
		<div className="flex flex-col w-screen h-screen items-center justify-center">
			{showChat === true ? (
				<Chat
					socket={socket}
					username={username}
					room={room}
				/>
			) : (
				<div
					className="flex flex-col bg-red-100 h-1/2 items-center rounded-2xl"
					style={{ width: "400px" }}
				>
					<h1 className="text-2xl font-bold mt-10">QuickChat</h1>
					<div className="flex flex-col mt-20 gap-5 w-full items-center">
						<input
							type="text"
							placeholder="Insert username"
							onChange={(event) => {
								setUsername(event.target.value);
							}}
							className="px-4 py-2 w-3/5 rounded-lg"
						/>
						<input
							type="text"
							placeholder="Insert room ID"
							onChange={(event) => {
								setRoom(event.target.value);
							}}
							className="px-4 py-2 w-3/5 rounded-lg"
						/>
					</div>
					<button
						onClick={joinRoom}
						className="mt-20 bg-pink-400 w-3/5 px-4 py-2 rounded-lg text-white font-bold"
					>
						Join A Room
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
