import { useState } from "react";

import "./App.css";

function App() {
  const [tac, setTac] = useState<"X" | "O">("X");
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
  const handleBoard = (position: number, tac: string) => {
    const findingBoard = board.map((eachBoardTac, index) => {
      if (position === index) {
        return tac;
      }
      return eachBoardTac;
    });

    setBoard(findingBoard);
    if (tac === "X") {
      setTac("O");
    } else {
      setTac("X");
    }
  };
  console.log(board);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <div className="grid grid-cols-3 gap-2 w-1/2 h-1/2 bg-amber-400 border-4 border-sky-500">
        {board.map((eachBoard, index) => (
          <div
            className="flex-1 flex justify-center items-center bg-purple-500"
            onClick={() => handleBoard(index, tac)}
          >
            {eachBoard}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
