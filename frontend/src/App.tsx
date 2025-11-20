import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
import "./App.css";

function App() {
  const [tac, setTac] = useState<"X" | "O" | null>(null);
  const [roomName, setRoomName] = useState<string>("");
  const [board, setBoard] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const handleBoard = (position: number) => {};
  const handleJoinRoom = () => {
    socket.emit("join-room", roomName);
  };
  useEffect(() => {
    socket.on("receive-stats", (boardStats) => {
      setBoard(() => boardStats);
    });
    socket.on("tic-type", (ticType) => {
      setTac(() => ticType);
    });
  }, []);
  console.log(tac);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <span className="text-3xl text-white">{tac}</span>
      <input
        placeholder="join room"
        onChange={(e) => setRoomName(e.target.value)}
        className="bg-amber-500"
      />
      <button onClick={handleJoinRoom} className="bg-amber-500">
        Join Room
      </button>
      <div className="grid grid-cols-3 gap-2 w-1/2 h-1/2 bg-amber-400 border-4 border-sky-500">
        {board.map((eachBoard, index) => (
          <div
            className="flex-1 flex justify-center items-center bg-purple-500"
            // onClick={() => handleBoard(index, tac)}
          >
            {eachBoard}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
