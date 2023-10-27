import { Link } from "react-router-dom";

const GameSetup = () => {
  return (
    <div className="game-setup">
      <h1>Game Setup</h1>
      {/* 
        TO-DO:
        Create a card with "Join A Game" / "Create A Game" form
        */}
      <p>Create a card with "Join A Game" / "Create A Game" form</p>
      <Link to="/gamelobby">Go to Game Lobby</Link>
    </div>
  );
};

export default GameSetup;
