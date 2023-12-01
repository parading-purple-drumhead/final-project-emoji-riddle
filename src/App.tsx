import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import GameSetup from "./pages/GameSetup";
import GameLobby from "./pages/GameLobby";
import GameScreen from "./pages/GameScreen";
import GameOver from "./pages/GameOver";

function App() {
  return (
    <div className="app bg-light" style={{ height: "100vh" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gamesetup" element={<GameSetup />} />
        <Route path="/gamelobby" element={<GameLobby />} />
        <Route path="/gamescreen" element={<GameScreen />} />
        <Route path="/gameover" element={<GameOver />} />
      </Routes>
    </div>
  );
}

export default App;