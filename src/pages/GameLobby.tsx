import { Link } from "react-router-dom";

const GameLobby = () => {
  return (
    <div className="game-lobby">
      <h1>Game Lobby</h1>
      {/* 
        TO-DO:
        Create a card with a Host / Non-host lobby
        */}
      <p>Create a card with a Host / Non-host lobby</p>
      <Link to="/gamescreen">Go to Game Screen</Link>
    </div>
  );
};

export default GameLobby;
