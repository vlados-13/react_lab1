import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import "./styles/App.css";

function App() {
  const [page, setPage] = useState("start");
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      {page === "start" && (
        <StartPage
          onStart={() => setPage("game")}
          onRecord={() => setPage("result")}
        />
      )}
      {page === "game" && (
        <GamePage
          onGameEnd={(r) => {
            setResult(r);
            // keep user on game page; they can open statistics from modal
          }}
          onShowStats={() => setPage("result")}
        />
      )}
      {page === "result" && (
        <ResultPage result={result} onRestart={() => setPage("start")} />
      )}
    </div>
  );
}

export default App;
