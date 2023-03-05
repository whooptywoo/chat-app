import { useEffect, useState } from "react";

export default function Chat({ socket, username, room }) {
	const [currentMessage, setCurrentMessage] = useState("");
	const [messageList, setMessageList] = useState([]);
	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			sendMessage();
		}
	};
	let time;
	if (new Date(Date.now()).getMinutes().length === 1) {
		time =
			new Date(Date.now()).getHours() +
			":" +
			"0" +
			new Date(Date.now()).getMinutes();
	} else {
		time =
			new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
	}
	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				room,
				author: username,
				message: currentMessage,
				time,
			};
			await socket.emit("send_message", messageData);
			setMessageList((list) => [...list, messageData]);
			setCurrentMessage("");
		}
	};
	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList((list) => [...list, data]);
			console.log(data);
		});
	}, [socket]);
	return (
		<div className="h-3/5 w-2/5 rounded-xl items-center justify-center relative border-2">
			<div className="w-full bg-red-100 text-center py-2 rounded-t-xl">
				<p className="text-xl">Room {room}</p>
			</div>
			<div className="chat-body px-12 flex flex-col h-4/5 overflow-scroll">
				{/* <div className="flex flex-col w-2/5">
					<h1 className="text-xs text-gray-500">Albertus</h1>
					<div className="flex flex-col border-2 rounded-2xl w-full">
						<h1 className="px-4 py-1  break-words">
							lorem ipsumalfjaoifjaoijfaoijadfjalkjdfalkfjioasdfjalkfjak
						</h1>
						<h1 className="text-xs  place-self-end mr-2 text-gray-500">
							12.00
						</h1>
					</div>
				</div>
				<div className="flex flex-col w-2/5 place-self-end items-end">
					<h1 className="text-xs text-gray-500">Albertus</h1>
					<div className="flex flex-col border-2 rounded-2xl w-full">
						<h1 className="px-4 py-1  break-words">
							lorem ipsumalfjaoifjaoijfaoijadfjalkjdfalkfjioasdfjalkfjak
						</h1>
						<h1 className="text-xs place-self-end mr-2 text-gray-500">12.00</h1>
					</div>
				</div> */}
				{messageList.map((message) => {
					if (username !== message.author) {
						return (
							<div className="flex flex-col max-w-2/5 place-self-start mb-2">
								<h1 className="text-xs text-gray-500">{message.author}</h1>
								<div className="flex flex-col border-2 rounded-2xl w-full">
									<h1 className="px-4 py-1  break-words">{message.message}</h1>
									<h1 className="text-xs  place-self-end mr-2 text-gray-500">
										{message.time}
									</h1>
								</div>
							</div>
						);
					} else {
						return (
							<div className="flex flex-col max-w-2/5 place-self-end items-end mb-2">
								<h1 className="text-xs text-gray-500">You</h1>
								<div className="flex flex-col border-2 rounded-2xl w-full">
									<h1 className="px-4 py-1  break-words">{message.message}</h1>
									<h1 className="text-xs place-self-end mr-2 text-gray-500">
										{message.time}
									</h1>
								</div>
							</div>
						);
					}
				})}
			</div>
			<div className="absolute bottom-0 w-full flex">
				<input
					type="text"
					placeholder="Your message here..."
					onChange={(e) => setCurrentMessage(e.target.value)}
					className="flex-grow py-3 px-4 rounded-bl-xl"
					onKeyPress={handleKeyPress}
				/>
				<button
					onClick={sendMessage}
					className="w-20 bg-pink-600 text-white rounded-br-lg"
				>
					Send
				</button>
			</div>
		</div>
	);
}
